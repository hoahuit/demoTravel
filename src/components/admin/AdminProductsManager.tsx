import React, { useState, useEffect, useMemo } from 'react';
import {
  fetchProductsApi,
  createProductApi,
  saveProductApi,
  deleteProductApi,
  uploadImageApi,
  getImageUrl,
  KollectionProduct
} from '../../services/apiService';
import './AdminProductsManager.css';
import {
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  AlertCircle,
  Tag,
  Package,
  Sparkles,
  DollarSign,
  Upload,
  RefreshCw,
  Eye,
  Star,
  Flame,
  Layers,
  X
} from 'lucide-react';
import AdminPriceInput from './AdminPriceInput';

interface AdminProductsManagerProps {
  toast?: any;
  onNavigate?: (path: string) => void;
}

export const PRODUCT_CATEGORIES = [
  'Trà & Thảo Mộc',
  'Nến Thơm & Tinh Dầu',
  'Trang Phục Tĩnh Dưỡng',
  'Phụ Kiện Du Lịch',
  'Thủ Công Mỹ Nghệ & Trầm',
  'Bộ Quà Tặng Cao Cấp'
];

export default function AdminProductsManager({ toast, onNavigate }: AdminProductsManagerProps) {
  const [products, setProducts] = useState<KollectionProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const [editingItem, setEditingItem] = useState<Partial<KollectionProduct>>({
    title: '',
    slug: '',
    subtitle: '',
    category: 'Trà & Thảo Mộc',
    sku: '',
    price: 500000,
    originalPrice: 650000,
    stock: 50,
    heroImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    description: '',
    specifications: '',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 5,
    reviewsCount: 0
  });

  const loadProducts = async (force = false) => {
    setLoading(true);
    try {
      const data = await fetchProductsApi(force);
      setProducts(data);
    } catch (err: any) {
      toast?.show?.('Không thể tải danh sách sản phẩm: ' + (err?.message || err), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleTitleChange = (title: string) => {
    const updated: Partial<KollectionProduct> = { ...editingItem, title };
    if (!isEditing || !editingItem.slug) {
      const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      updated.slug = slug;
    }
    setEditingItem(updated);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadImageApi(file);
      const uploadedUrl = typeof res === 'string' ? res : (res?.url || res?.fileUrl || '');
      if (uploadedUrl) {
        setEditingItem(prev => ({ ...prev, heroImage: uploadedUrl }));
        toast?.show?.('Tải ảnh đại diện thành công!', 'success');
      }
    } catch (err: any) {
      toast?.show?.('Lỗi tải ảnh: ' + (err?.message || err), 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingItem({
      title: '',
      slug: '',
      subtitle: '',
      category: 'Trà & Thảo Mộc',
      sku: `4U-PROD-${String(products.length + 1).padStart(3, '0')}`,
      price: 500000,
      originalPrice: 650000,
      stock: 50,
      heroImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
      description: '',
      specifications: '',
      isFeatured: false,
      isNewArrival: true,
      isBestSeller: false,
      rating: 5,
      reviewsCount: 0
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: KollectionProduct) => {
    setIsEditing(true);
    setEditingItem({ ...item });
    setModalOpen(true);
  };

  const handleDelete = async (item: KollectionProduct) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${item.title}"?`)) return;

    try {
      await deleteProductApi(item.id || item.slug);
      toast?.show?.(`Đã xóa sản phẩm "${item.title}" thành công!`, 'success');
      loadProducts(true);
    } catch (err: any) {
      toast?.show?.('Lỗi xóa sản phẩm: ' + (err?.message || err), 'error');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.title?.trim() || !editingItem.slug?.trim()) {
      toast?.show?.('Vui lòng nhập đầy đủ Tên sản phẩm và Slug', 'error');
      return;
    }

    try {
      if (isEditing && editingItem.id) {
        await saveProductApi(editingItem.id, editingItem);
        toast?.show?.(`Đã cập nhật sản phẩm "${editingItem.title}"!`, 'success');
      } else {
        await createProductApi(editingItem);
        toast?.show?.(`Đã tạo sản phẩm "${editingItem.title}" thành công!`, 'success');
      }
      setModalOpen(false);
      loadProducts(true);
    } catch (err: any) {
      toast?.show?.('Lỗi lưu sản phẩm: ' + (err?.message || err), 'error');
    }
  };

  // Filtered list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        searchFilter === '' ||
        p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchFilter.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(searchFilter.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(searchFilter.toLowerCase()));

      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;

      return matchSearch && matchCat;
    });
  }, [products, searchFilter, selectedCategory]);

  const totalStock = useMemo(() => {
    return products.reduce((sum, p) => sum + (p.stock || 0), 0);
  }, [products]);

  const formatVnd = (amount?: number) => {
    if (!amount) return '0 ₫';
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  return (
    <div className="admin-products-root">
      {/* Header & Metrics */}
      <div className="admin-products-header-wrap">
        <div className="admin-products-header">
          <div>
            <div className="admin-products-meta-row">
              <span className="admin-products-tag">
                KOLLECTION 4U • QUẢN LÝ SẢN PHẨM
              </span>
              <span className="admin-products-dot" />
              <span className="admin-products-subtag">
                Gian hàng NomadStore
              </span>
            </div>
            <h1 className="admin-products-title">
              Quản Lý Sản Phẩm (Kollection 4U)
            </h1>
            <p className="admin-products-desc">
              Quản lý các sản phẩm vật lý độc bản, trà thảo mộc, nến thơm & quà tặng lưu niệm của 4U Retreat.
            </p>
          </div>

          <div className="admin-products-btn-group">
            <button
              type="button"
              onClick={() => loadProducts(true)}
              className="admin-products-refresh-btn"
            >
              <RefreshCw size={14} color="#64748b" />
              <span>Làm Mới</span>
            </button>

            <button
              type="button"
              onClick={handleOpenCreate}
              className="admin-products-add-btn"
            >
              <Plus size={15} />
              <span>Thêm Mới</span>
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="admin-products-metrics-grid">
          <div className="admin-products-metric-card">
            <div className="admin-products-metric-top">
              <span className="admin-products-metric-label">Tổng Sản Phẩm</span>
              <Package size={20} color="#006d36" />
            </div>
            <div className="admin-products-metric-val">{products.length}</div>
          </div>

          <div className="admin-products-metric-card">
            <div className="admin-products-metric-top">
              <span className="admin-products-metric-label">Tổng Tồn Kho</span>
              <Layers size={20} color="#2563eb" />
            </div>
            <div className="admin-products-metric-val">{totalStock} <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>món</span></div>
          </div>

          <div className="admin-products-metric-card">
            <div className="admin-products-metric-top">
              <span className="admin-products-metric-label">Sản Phẩm Bán Chạy</span>
              <Flame size={20} color="#f97316" />
            </div>
            <div className="admin-products-metric-val">{products.filter(p => p.isBestSeller).length}</div>
          </div>

          <div className="admin-products-metric-card">
            <div className="admin-products-metric-top">
              <span className="admin-products-metric-label">Sản Phẩm Nổi Bật</span>
              <Star size={20} color="#eab308" />
            </div>
            <div className="admin-products-metric-val">{products.filter(p => p.isFeatured).length}</div>
          </div>
        </div>

        {/* Filters bar */}
        <div className="admin-products-filter-bar">
          <div className="admin-products-search-wrap">
            <Search size={17} className="admin-products-search-icon" />
            <input
              type="text"
              placeholder="Tìm theo tên sản phẩm, mã SKU, slug..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="admin-products-search-input"
            />
          </div>

          <div className="admin-products-cats-wrap">
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#4b5563' }}>Phân loại:</span>
            <button
              onClick={() => setSelectedCategory('All')}
              className={`admin-products-cat-btn ${selectedCategory === 'All' ? 'active' : ''}`}
            >
              Tất Cả ({products.length})
            </button>
            {PRODUCT_CATEGORIES.map(cat => {
              const count = products.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`admin-products-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product List Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <RefreshCw size={28} className="spin" color="#006d36" style={{ marginBottom: '12px' }} />
          <p style={{ color: '#6b7280', margin: 0, fontWeight: 600 }}>Đang tải danh sách sản phẩm...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <ShoppingBag size={48} color="#9ca3af" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1f2937', margin: '0 0 6px 0' }}>Chưa có sản phẩm nào phù hợp</h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 16px 0' }}>Hãy thử đổi từ khóa tìm kiếm hoặc nhấn nút thêm mới.</p>
          <button
            onClick={handleOpenCreate}
            className="admin-products-add-btn"
          >
            + Thêm Sản Phẩm Mới
          </button>
        </div>
      ) : (
        <div className="admin-products-table-wrap">
          <table className="admin-products-table">
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th className="admin-products-th title-col">Sản Phẩm</th>
                <th className="admin-products-th">Mã SKU / Slug</th>
                <th className="admin-products-th">Phân Loại</th>
                <th className="admin-products-th">Giá Bán</th>
                <th className="admin-products-th">Tồn Kho</th>
                <th className="admin-products-th">Đặc Điểm</th>
                <th className="admin-products-th actions">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const stockCount = p.stock || 0;
                const stockClass = stockCount > 10 ? 'in-stock' : stockCount > 0 ? 'low-stock' : 'out-stock';

                return (
                  <tr key={p.id} className="admin-products-tr">
                    <td className="admin-products-td title-col">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img
                          src={getImageUrl(p.heroImage)}
                          alt={p.title}
                          className="admin-products-thumb"
                        />
                        <div>
                          <div className="admin-products-name">{p.title}</div>
                          <div className="admin-products-sub">
                            {p.subtitle || 'Không có mô tả ngắn'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="admin-products-td" style={{ fontSize: '13px' }}>
                      <div className="admin-products-sku">{p.sku || 'N/A'}</div>
                      <div className="admin-products-slug">/{p.slug}</div>
                    </td>

                    <td className="admin-products-td">
                      <span className="admin-products-cat-badge">
                        {p.category}
                      </span>
                    </td>

                    <td className="admin-products-td">
                      <div className="admin-products-price">{formatVnd(p.price)}</div>
                      {p.originalPrice && p.originalPrice > p.price && (
                        <div className="admin-products-original-price">{formatVnd(p.originalPrice)}</div>
                      )}
                    </td>

                    <td className="admin-products-td">
                      <span className={`admin-products-stock-badge ${stockClass}`}>
                        {stockCount > 0 ? `Còn ${stockCount}` : 'Hết hàng'}
                      </span>
                    </td>

                    <td className="admin-products-td">
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {p.isFeatured && (
                          <span style={{ fontSize: '10px', fontWeight: 800, background: '#fef9c3', color: '#854d0e', padding: '2px 6px', borderRadius: '4px' }}>
                            Nổi bật
                          </span>
                        )}
                        {p.isBestSeller && (
                          <span style={{ fontSize: '10px', fontWeight: 800, background: '#ffedd5', color: '#9a3412', padding: '2px 6px', borderRadius: '4px' }}>
                            Bán chạy
                          </span>
                        )}
                        {p.isNewArrival && (
                          <span style={{ fontSize: '10px', fontWeight: 800, background: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: '4px' }}>
                            Mới
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="admin-products-td actions">
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="admin-products-btn-edit"
                          title="Chỉnh sửa"
                        >
                          <Edit2 size={14} />
                        </button>

                        <button
                          onClick={() => handleDelete(p)}
                          className="admin-products-btn-delete"
                          title="Xóa"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Add / Edit Product */}
      {modalOpen && (
        <div className="admin-products-modal-backdrop">
          <div className="admin-products-modal-box">

            {/* Modal Header */}
            <div className="admin-products-modal-header">
              <div>
                <h2 className="admin-products-modal-title">
                  {isEditing ? 'Chỉnh Sửa Sản Phẩm Kollection' : 'Thêm Sản Phẩm Vật Lý Mới'}
                </h2>
                <p className="admin-products-modal-desc">
                  Nhập thông số chi tiết của sản phẩm để hiển thị lên gian hàng Kollection 4U.
                </p>
              </div>
              <button onClick={() => setModalOpen(false)} className="admin-products-modal-close-btn">
                <X size={22} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="admin-products-modal-form">

              {/* Row 1: Title & Slug */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="admin-products-modal-label">Tên Sản Phẩm *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Trà Sen Bách Diệp Tây Hồ"
                    value={editingItem.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="admin-products-modal-input"
                  />
                </div>

                <div>
                  <label className="admin-products-modal-label">Slug Đường Dẫn *</label>
                  <input
                    type="text"
                    required
                    placeholder="tra-sen-bach-diep-tay-ho"
                    value={editingItem.slug || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    className="admin-products-modal-input"
                  />
                </div>
              </div>

              {/* Row 2: Subtitle */}
              <div>
                <label className="admin-products-modal-label">Mô Tả Ngắn (Subtitle)</label>
                <input
                  type="text"
                  placeholder="Điểm nhấn chính của sản phẩm (ví dụ: Tuyển chọn từ búp sen trăm cánh ngậm sương sớm...)"
                  value={editingItem.subtitle || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                  className="admin-products-modal-input"
                />
              </div>

              {/* Row 3: Category & SKU & Stock */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="admin-products-modal-label">Phân Loại Sản Phẩm</label>
                  <select
                    value={editingItem.category || 'Trà & Thảo Mộc'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="admin-products-modal-select"
                  >
                    {PRODUCT_CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="admin-products-modal-label">Mã SKU</label>
                  <input
                    type="text"
                    placeholder="4U-TEA-001"
                    value={editingItem.sku || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, sku: e.target.value })}
                    className="admin-products-modal-input"
                  />
                </div>

                <div>
                  <label className="admin-products-modal-label">Số Lượng Tồn Kho</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="50"
                    value={editingItem.stock ?? 50}
                    onChange={(e) => setEditingItem({ ...editingItem, stock: Number(e.target.value) })}
                    className="admin-products-modal-input"
                  />
                </div>
              </div>

              {/* Row 4: Price & Original Price */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <AdminPriceInput
                  id="prod-price"
                  label="Giá Bán (VNĐ)"
                  value={editingItem.price}
                  onChange={(val) => setEditingItem({ ...editingItem, price: val })}
                  placeholder="Ví dụ: 850.000"
                  presets={[100000, 200000, 500000, 1000000]}
                  required
                />

                <AdminPriceInput
                  id="prod-original-price"
                  label="Giá Gốc Niêm Yết (VNĐ)"
                  value={editingItem.originalPrice}
                  onChange={(val) => setEditingItem({ ...editingItem, originalPrice: val })}
                  placeholder="Ví dụ: 1.100.000"
                  presets={[100000, 200000, 500000, 1000000]}
                />
              </div>

              {/* Row 5: Hero Image & Upload */}
              <div>
                <label className="admin-products-modal-label">Ảnh Đại Diện Sản Phẩm (Hero Image)</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={editingItem.heroImage || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, heroImage: e.target.value })}
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                  <label className="admin-products-modal-upload-btn">
                    <Upload size={16} /> {uploading ? 'Đang tải...' : 'Chọn File Ảnh'}
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
                  </label>
                </div>

                {editingItem.heroImage && (
                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={getImageUrl(editingItem.heroImage)} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Xem trước ảnh đại diện</span>
                  </div>
                )}
              </div>

              {/* Row 6: Description & Specifications */}
              <div>
                <label className="admin-products-modal-label">Bài Viết Chi Tiết / Câu Chuyện Sản Phẩm</label>
                <textarea
                  rows={4}
                  placeholder="Mô tả chi tiết nguồn gốc xuất xứ, nghệ nhân chế tác, công dụng phục hồi sức khỏe..."
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label className="admin-products-modal-label">Thông Số Kỹ Thuật (Specifications)</label>
                <input
                  type="text"
                  placeholder="Trọng lượng: 200g | Kích thước: 15x10cm | Hạn dùng: 12 tháng | Xuất xứ: Việt Nam"
                  value={editingItem.specifications || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, specifications: e.target.value })}
                  className="admin-products-modal-input"
                />
              </div>

              {/* Row 7: Checkboxes Tags */}
              <div className="admin-products-modal-checkbox-row">
                <label className="admin-products-modal-checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingItem.isFeatured || false}
                    onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#006d36' }}
                  />
                  ⭐ Sản Phẩm Nổi Bật (Featured)
                </label>

                <label className="admin-products-modal-checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingItem.isNewArrival || false}
                    onChange={(e) => setEditingItem({ ...editingItem, isNewArrival: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#006d36' }}
                  />
                  ✨ Sản Phẩm Mới Về (New Arrival)
                </label>

                <label className="admin-products-modal-checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingItem.isBestSeller || false}
                    onChange={(e) => setEditingItem({ ...editingItem, isBestSeller: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#006d36' }}
                  />
                  🔥 Bán Chạy Nhất (Best Seller)
                </label>
              </div>

              {/* Modal Actions */}
              <div className="admin-products-modal-footer">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="admin-products-modal-dismiss-btn"
                >
                  Hủy Bỏ
                </button>

                <button
                  type="submit"
                  className="admin-products-modal-save-btn"
                >
                  {isEditing ? 'Cập Nhật Sản Phẩm' : 'Tạo Sản Phẩm Mới'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
