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
    <div style={{ padding: '4px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header & Metrics */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#081f13', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag size={26} style={{ color: '#006d36' }} />
              Quản Lý Sản Phẩm (Kollection 4U)
            </h1>
            <p style={{ fontSize: '14px', color: '#525a54', margin: 0 }}>
              Quản lý các sản phẩm vật lý độc bản, trà thảo mộc, nến thơm & quà tặng lưu niệm của 4U Retreat.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {onNavigate && (
              <button
                onClick={() => onNavigate('/kollection-4u')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#166534',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <Eye size={15} /> Xem Gian Hàng (NomadStore)
              </button>
            )}

            <button
              onClick={() => loadProducts(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                borderRadius: '8px',
                background: '#ffffff',
                border: '1px solid #d1d5db',
                color: '#374151',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={15} /> Làm Mới
            </button>

            <button
              onClick={handleOpenCreate}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #006d36 0%, #081f13 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 109, 54, 0.25)'
              }}
            >
              <Plus size={18} /> Thêm Sản Phẩm Mới
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Tổng Sản Phẩm</span>
              <Package size={20} style={{ color: '#006d36' }} />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#081f13' }}>{products.length}</div>
          </div>

          <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Tổng Tồn Kho</span>
              <Layers size={20} style={{ color: '#2563eb' }} />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#081f13' }}>{totalStock} <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>món</span></div>
          </div>

          <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Sản Phẩm Bán Chạy</span>
              <Flame size={20} style={{ color: '#f97316' }} />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#081f13' }}>{products.filter(p => p.isBestSeller).length}</div>
          </div>

          <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Sản Phẩm Nổi Bật</span>
              <Star size={20} style={{ color: '#eab308' }} />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#081f13' }}>{products.filter(p => p.isFeatured).length}</div>
          </div>
        </div>

        {/* Filters bar */}
        <div style={{ background: '#ffffff', padding: '14px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
            <Search size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Tìm theo tên sản phẩm, mã SKU, slug..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 38px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#4b5563' }}>Phân loại:</span>
            <button
              onClick={() => setSelectedCategory('All')}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                background: selectedCategory === 'All' ? '#006d36' : '#f3f4f6',
                color: selectedCategory === 'All' ? '#ffffff' : '#4b5563'
              }}
            >
              Tất Cả ({products.length})
            </button>
            {PRODUCT_CATEGORIES.map(cat => {
              const count = products.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: selectedCategory === cat ? '#006d36' : '#f3f4f6',
                    color: selectedCategory === cat ? '#ffffff' : '#4b5563'
                  }}
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
          <RefreshCw size={28} className="spin" style={{ color: '#006d36', marginBottom: '12px' }} />
          <p style={{ color: '#6b7280', margin: 0, fontWeight: 600 }}>Đang tải danh sách sản phẩm...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <ShoppingBag size={48} style={{ color: '#9ca3af', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1f2937', margin: '0 0 6px 0' }}>Chưa có sản phẩm nào phù hợp</h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 16px 0' }}>Hãy thử đổi từ khóa tìm kiếm hoặc nhấn nút thêm mới.</p>
          <button
            onClick={handleOpenCreate}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              background: '#006d36',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            + Thêm Sản Phẩm Mới
          </button>
        </div>
      ) : (
        <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 20px' }}>Sản Phẩm</th>
                <th style={{ padding: '14px 16px' }}>Mã SKU / Slug</th>
                <th style={{ padding: '14px 16px' }}>Phân Loại</th>
                <th style={{ padding: '14px 16px' }}>Giá Bán</th>
                <th style={{ padding: '14px 16px' }}>Tồn Kho</th>
                <th style={{ padding: '14px 16px' }}>Đặc Điểm</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={getImageUrl(p.heroImage)}
                        alt={p.title}
                        style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #e5e7eb', flexShrink: 0 }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, color: '#111827', fontSize: '14px', marginBottom: '3px' }}>{p.title}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280', maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.subtitle || 'Không có mô tả ngắn'}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '14px 16px', fontSize: '13px' }}>
                    <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0369a1' }}>{p.sku || 'N/A'}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>/{p.slug}</div>
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, background: 'rgba(0,109,54,0.08)', color: '#006d36' }}>
                      {p.category}
                    </span>
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 800, color: '#081f13', fontSize: '14px' }}>{formatVnd(p.price)}</div>
                    {p.originalPrice && p.originalPrice > p.price && (
                      <div style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'line-through' }}>{formatVnd(p.originalPrice)}</div>
                    )}
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 800,
                      background: (p.stock || 0) > 10 ? '#dcfce7' : (p.stock || 0) > 0 ? '#fef3c7' : '#fee2e2',
                      color: (p.stock || 0) > 10 ? '#166534' : (p.stock || 0) > 0 ? '#92400e' : '#991b1b',
                    }}>
                      {(p.stock || 0) > 0 ? `Còn ${p.stock}` : 'Hết hàng'}
                    </span>
                  </td>

                  <td style={{ padding: '14px 16px' }}>
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

                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          background: '#ffffff',
                          color: '#374151',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Edit2 size={13} /> Sửa
                      </button>

                      <button
                        onClick={() => handleDelete(p)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #fecaca',
                          background: '#fff1f2',
                          color: '#b91c1c',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Trash2 size={13} /> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Add / Edit Product */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '780px', maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '20px 28px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div>
                <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#081f13', margin: '0 0 2px 0' }}>
                  {isEditing ? 'Chỉnh Sửa Sản Phẩm Kollection' : 'Thêm Sản Phẩm Vật Lý Mới'}
                </h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  Nhập thông số chi tiết của sản phẩm để hiển thị lên gian hàng Kollection 4U.
                </p>
              </div>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}>
                <X size={22} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} style={{ overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Row 1: Title & Slug */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Tên Sản Phẩm *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Trà Sen Bách Diệp Tây Hồ"
                    value={editingItem.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Slug Đường Dẫn *</label>
                  <input
                    type="text"
                    required
                    placeholder="tra-sen-bach-diep-tay-ho"
                    value={editingItem.slug || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Row 2: Subtitle */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Mô Tả Ngắn (Subtitle)</label>
                <input
                  type="text"
                  placeholder="Điểm nhấn chính của sản phẩm (ví dụ: Tuyển chọn từ búp sen trăm cánh ngậm sương sớm...)"
                  value={editingItem.subtitle || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Row 3: Category & SKU & Stock */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Phân Loại Sản Phẩm</label>
                  <select
                    value={editingItem.category || 'Trà & Thảo Mộc'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box', background: '#ffffff' }}
                  >
                    {PRODUCT_CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Mã SKU</label>
                  <input
                    type="text"
                    placeholder="4U-TEA-001"
                    value={editingItem.sku || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, sku: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Số Lượng Tồn Kho</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="50"
                    value={editingItem.stock ?? 50}
                    onChange={(e) => setEditingItem({ ...editingItem, stock: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Row 4: Price & Original Price */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Giá Bán (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="10000"
                    placeholder="850000"
                    value={editingItem.price ?? ''}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box', fontWeight: 700, color: '#006d36' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Giá Gốc Niêm Yết (VNĐ)</label>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    placeholder="1100000"
                    value={editingItem.originalPrice ?? ''}
                    onChange={(e) => setEditingItem({ ...editingItem, originalPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Row 5: Hero Image & Upload */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Ảnh Đại Diện Sản Phẩm (Hero Image)</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={editingItem.heroImage || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, heroImage: e.target.value })}
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '8px', background: '#f1f5f9', color: '#475569', fontWeight: 700, fontSize: '13px', cursor: 'pointer', border: '1px solid #cbd5e1' }}>
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
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Bài Viết Chi Tiết / Câu Chuyện Sản Phẩm</label>
                <textarea
                  rows={4}
                  placeholder="Mô tả chi tiết nguồn gốc xuất xứ, nghệ nhân chế tác, công dụng phục hồi sức khỏe..."
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Thông Số Kỹ Thuật (Specifications)</label>
                <input
                  type="text"
                  placeholder="Trọng lượng: 200g | Kích thước: 15x10cm | Hạn dùng: 12 tháng | Xuất xứ: Việt Nam"
                  value={editingItem.specifications || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, specifications: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Row 7: Checkboxes Tags */}
              <div style={{ display: 'flex', gap: '24px', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingItem.isFeatured || false}
                    onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#006d36' }}
                  />
                  ⭐ Sản Phẩm Nổi Bật (Featured)
                </label>

                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingItem.isNewArrival || false}
                    onChange={(e) => setEditingItem({ ...editingItem, isNewArrival: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#006d36' }}
                  />
                  ✨ Sản Phẩm Mới Về (New Arrival)
                </label>

                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#334155', cursor: 'pointer' }}>
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
                >
                  Hủy Bỏ
                </button>

                <button
                  type="submit"
                  style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #006d36 0%, #081f13 100%)', color: '#ffffff', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0, 109, 54, 0.25)' }}
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
