import React, { useState, useEffect, useMemo } from 'react';
import {
  fetchMenuCategoriesApi,
  createMenuCategoryApi,
  saveMenuCategoryApi,
  deleteMenuCategoryApi,
  MenuCategoryItem
} from '../../services/apiService';
import './AdminCategoriesManager.css';
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  CornerDownRight,
  Layers,
  Crown,
  Calendar,
  Flame,
  Zap,
  Heart,
  Shield,
  Leaf,
  Sparkles,
  Compass,
  BookOpen,
  Star,
  Search,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Monitor,
  Smartphone,
  Sun,
  Moon,
  Eye,
  Menu,
  X,
  Phone,
  RefreshCw
} from 'lucide-react';

interface AdminCategoriesManagerProps {
  toast?: any;
}

const AVAILABLE_ICONS: Record<string, any> = {
  Crown,
  Calendar,
  Flame,
  Zap,
  Heart,
  Shield,
  Leaf,
  Sparkles,
  Compass,
  BookOpen,
  Star,
  Layers,
  FolderTree,
  ChevronDown,
  ChevronRight,
  Search,
  CheckCircle,
  AlertCircle
};

export default function AdminCategoriesManager({ toast }: AdminCategoriesManagerProps) {
  const [categories, setCategories] = useState<MenuCategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Partial<MenuCategoryItem>>({
    name: '',
    slug: '',
    parentSlug: null,
    menuType: 'mega_menu',
    orderIndex: 1,
    icon: 'Leaf',
    color: '#4ade80',
    description: ''
  });

  // State for Live Theme Preview
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light' | 'emerald'>('dark');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeHoverSlug, setActiveHoverSlug] = useState<string | null>(null);
  const [mobileExpandedSlug, setMobileExpandedSlug] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const renderCategoryIcon = (iconName?: string, color?: string, size: number = 14) => {
    if (!iconName || !AVAILABLE_ICONS[iconName]) {
      return <Leaf size={size} style={{ color: color || '#4ade80', flexShrink: 0 }} />;
    }
    const IconComponent = AVAILABLE_ICONS[iconName];
    return <IconComponent size={size} style={{ color: color || '#4ade80', flexShrink: 0 }} />;
  };

  const headerPreviewData = useMemo(() => {
    const fixedTop = categories.filter((c) => c.menuType === 'fixed_top');
    const parentItems = categories.filter((c) => c.menuType !== 'fixed_top' && !c.parentSlug);
    const parentsWithChildren = parentItems.map((parent) => ({
      ...parent,
      children: categories.filter((c) => c.parentSlug === parent.slug)
    }));
    return { fixedTop, parentsWithChildren };
  }, [categories]);

  const loadCategories = async (force = false) => {
    setLoading(true);
    try {
      const data = await fetchMenuCategoriesApi(force);
      setCategories(data);
    } catch (err: any) {
      toast?.show?.('Không thể tải danh mục: ' + (err?.message || err), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Filter categories
  const filteredCategories = useMemo(() => {
    if (!searchFilter.trim()) return categories;
    const q = searchFilter.toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [categories, searchFilter]);

  // Grouped structure: Parent items and their sub-items
  const { fixedTopCategories, megaParents, subCategoriesMap } = useMemo(() => {
    const fixedTop = filteredCategories.filter((c) => c.menuType === 'fixed_top');
    const mega = filteredCategories.filter((c) => c.menuType !== 'fixed_top' && !c.parentSlug);

    const subMap: Record<string, MenuCategoryItem[]> = {};
    filteredCategories.forEach((c) => {
      if (c.parentSlug) {
        if (!subMap[c.parentSlug]) subMap[c.parentSlug] = [];
        subMap[c.parentSlug].push(c);
      }
    });

    return { fixedTopCategories: fixedTop, megaParents: mega, subCategoriesMap: subMap };
  }, [filteredCategories]);

  // List of potential parents (items without parentSlug)
  const potentialParents = useMemo(() => {
    return categories.filter((c) => !c.parentSlug && c.menuType !== 'fixed_top');
  }, [categories]);

  // Helper to generate slug from name
  const handleNameChange = (name: string) => {
    const updated: Partial<MenuCategoryItem> = { ...editingItem, name };
    if (!isEditing || !editingItem.slug) {
      const slug = name
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

  const handleOpenCreate = (parentSlug: string | null = null, menuType = 'mega_menu') => {
    setIsEditing(false);
    setEditingItem({
      name: '',
      slug: '',
      parentSlug,
      menuType,
      orderIndex: categories.length + 1,
      icon: 'Leaf',
      color: '#4ade80',
      description: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: MenuCategoryItem) => {
    setIsEditing(true);
    setEditingItem({ ...item });
    setModalOpen(true);
  };

  const handleDelete = async (item: MenuCategoryItem) => {
    const hasChildren = categories.some((c) => c.parentSlug === item.slug);
    let confirmMsg = `Bạn có chắc muốn xóa danh mục "${item.name}"?`;
    if (hasChildren) {
      confirmMsg += `\n⚠️ Lưu ý: Danh mục này có các danh mục con! Hãy chắc chắn bạn muốn xóa.`;
    }
    if (!window.confirm(confirmMsg)) return;

    try {
      await deleteMenuCategoryApi(item.id || item.slug);
      toast?.show?.(`Đã xóa danh mục "${item.name}" thành công!`, 'success');
      loadCategories(true);
    } catch (err: any) {
      toast?.show?.('Lỗi xóa danh mục: ' + (err?.message || err), 'error');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.name?.trim() || !editingItem.slug?.trim()) {
      toast?.show?.('Vui lòng điền đầy đủ Tên danh mục và Slug', 'error');
      return;
    }

    try {
      if (isEditing && editingItem.id) {
        await saveMenuCategoryApi(editingItem.id, editingItem);
        toast?.show?.(`Đã cập nhật "${editingItem.name}" thành công!`, 'success');
      } else {
        await createMenuCategoryApi(editingItem);
        toast?.show?.(`Đã tạo danh mục "${editingItem.name}" thành công!`, 'success');
      }
      setModalOpen(false);
      loadCategories(true);
    } catch (err: any) {
      toast?.show?.('Lỗi lưu danh mục: ' + (err?.message || err), 'error');
    }
  };

  const renderIcon = (iconName?: string, color?: string, size = 16) => {
    const IconComponent = (iconName && AVAILABLE_ICONS[iconName]) || FolderTree;
    return <IconComponent size={size} color={color || '#4ade80'} />;
  };

  return (
    <div className="admin-categories-root">
      {/* Header & Controls */}
      <div className="admin-categories-header">
        <div>
          <div className="admin-categories-meta-row">
            <span className="admin-categories-tag">
              4U RETREAT • ĐIỀU HƯỚNG & DANH MỤC
            </span>
            <span className="admin-categories-dot" />
            <span className="admin-categories-subtag">
              Header & Mega Menu
            </span>
          </div>
          <h1 className="admin-categories-title">
            Danh Mục Menu
          </h1>
          <p className="admin-categories-desc">
            Quản lý quan hệ Cha - Con cho Menu Header và phân loại nhiều danh mục cho từng gói Tour.
          </p>
        </div>

        <div className="admin-categories-btn-group">
          <button
            type="button"
            onClick={() => loadCategories(true)}
            className="admin-categories-refresh-btn"
          >
            <RefreshCw size={14} color="#64748b" />
            <span>Làm Mới</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenCreate(null, 'mega_menu')}
            className="admin-categories-add-btn"
          >
            <Plus size={15} />
            <span>Thêm Mới</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="admin-categories-search-bar">
        <Search size={18} color="#819986" />
        <input
          type="text"
          placeholder="Tìm kiếm danh mục theo tên, slug, mô tả..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="admin-categories-search-input"
        />
        {searchFilter && (
          <button
            onClick={() => setSearchFilter('')}
            className="admin-categories-clear-filter-btn"
          >
            Xóa lọc
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: '#4d6453' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Đang tải danh mục từ máy chủ...</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* SECTION 1: FIXED TOP BADGES */}
          <div className="admin-categories-section-card">
            <div className="admin-categories-card-header">
              <div className="admin-categories-card-title-wrap">
                <Crown size={18} color="#e5a50a" />
                <h3 className="admin-categories-card-title">
                  Menu Cố Định Hàng Trên (Fixed Top Badges)
                </h3>
              </div>
              <button
                onClick={() => handleOpenCreate(null, 'fixed_top')}
                className="admin-categories-quick-add-btn"
              >
                <Plus size={14} /> Thêm Mục Hàng Trên
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="admin-categories-table">
                <thead>
                  <tr className="admin-categories-th-row">
                    <th style={{ padding: '10px 14px', borderRadius: '6px 0 0 6px' }}>Icon</th>
                    <th style={{ padding: '10px 14px' }}>Tên Danh Mục</th>
                    <th style={{ padding: '10px 14px' }}>Slug Định Danh</th>
                    <th style={{ padding: '10px 14px' }}>Thứ Tự</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', borderRadius: '0 6px 6px 0' }}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {fixedTopCategories.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#819986' }}>
                        Không có danh mục nào phù hợp
                      </td>
                    </tr>
                  ) : (
                    fixedTopCategories.map((item) => (
                      <tr
                        key={item.id || item.slug}
                        style={{ borderBottom: '1px solid #edf2ee', transition: 'background 0.15s ease' }}
                      >
                        <td style={{ padding: '12px 14px' }}>{renderIcon(item.icon, item.color, 18)}</td>
                        <td style={{ padding: '12px 14px', fontWeight: 700, color: '#081f13' }}>{item.name}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <code className="admin-categories-slug-badge">
                            {item.slug}
                          </code>
                        </td>
                        <td style={{ padding: '12px 14px', color: '#4d6453' }}>{item.orderIndex || 0}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleOpenEdit(item)}
                              className="admin-categories-btn-edit"
                              title="Chỉnh sửa"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              className="admin-categories-btn-delete"
                              title="Xóa"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 2: MAIN MEGA MENUS (TREE VIEW CHA - CON) */}
          <div className="admin-categories-section-card">
            <div className="admin-categories-card-header">
              <div className="admin-categories-card-title-wrap">
                <Layers size={18} color="#059669" />
                <h3 className="admin-categories-card-title">
                  Menu Hàng Dưới & Danh Mục Phân Cấp (Mega Menu)
                </h3>
              </div>
              <button
                onClick={() => handleOpenCreate(null, 'mega_menu')}
                className="admin-categories-quick-add-btn"
              >
                <Plus size={14} /> Thêm Menu Cha
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="admin-categories-table">
                <thead>
                  <tr className="admin-categories-th-row">
                    <th style={{ padding: '10px 14px', borderRadius: '6px 0 0 6px', width: '60px' }}>Icon</th>
                    <th style={{ padding: '10px 14px' }}>Cấu Trúc Danh Mục (Cha & Con)</th>
                    <th style={{ padding: '10px 14px' }}>Slug Định Danh</th>
                    <th style={{ padding: '10px 14px' }}>Thứ Tự</th>
                    <th style={{ padding: '10px 14px' }}>Mô Tả</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', borderRadius: '0 6px 6px 0' }}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {megaParents.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '20px', textAlign: 'center', color: '#819986' }}>
                        Không có danh mục nào phù hợp
                      </td>
                    </tr>
                  ) : (
                    megaParents.map((parent) => {
                      const subItems = subCategoriesMap[parent.slug] || [];
                      return (
                        <React.Fragment key={parent.id || parent.slug}>
                          {/* PARENT ROW */}
                          <tr
                            style={{
                              backgroundColor: '#f9fbf9',
                              borderTop: '1px solid #d9e5dc',
                              borderBottom: subItems.length > 0 ? 'none' : '1px solid #edf2ee'
                            }}
                          >
                            <td style={{ padding: '14px' }}>{renderIcon(parent.icon, parent.color, 18)}</td>
                            <td style={{ padding: '14px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontWeight: 800, fontSize: '14px', color: '#081f13' }}>
                                  {parent.name}
                                </span>
                                <span
                                  style={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    backgroundColor: '#081f13',
                                    color: '#ffffff',
                                    padding: '2px 8px',
                                    borderRadius: '12px'
                                  }}
                                >
                                  Menu Cha ({subItems.length} con)
                                </span>
                              </div>
                            </td>
                            <td style={{ padding: '14px' }}>
                              <code className="admin-categories-slug-badge">
                                {parent.slug}
                              </code>
                            </td>
                            <td style={{ padding: '14px', fontWeight: 600, color: '#4d6453' }}>
                              {parent.orderIndex || 0}
                            </td>
                            <td style={{ padding: '14px', color: '#64748b', fontSize: '12px' }}>
                              {parent.description || '—'}
                            </td>
                            <td style={{ padding: '14px', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '8px' }}>
                                <button
                                  onClick={() => handleOpenCreate(parent.slug, 'mega_menu')}
                                  className="admin-categories-btn-add-sub"
                                >
                                  <Plus size={13} /> Thêm Con
                                </button>
                                <button
                                  onClick={() => handleOpenEdit(parent)}
                                  className="admin-categories-btn-edit"
                                  title="Chỉnh sửa"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(parent)}
                                  className="admin-categories-btn-delete"
                                  title="Xóa"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>

                          {/* SUB ROWS */}
                          {subItems.map((sub, sIdx) => (
                            <tr
                              key={sub.id || sub.slug}
                              style={{
                                backgroundColor: '#ffffff',
                                borderBottom: sIdx === subItems.length - 1 ? '1px solid #d9e5dc' : '1px solid #f1f5f2'
                              }}
                            >
                              <td style={{ padding: '10px 14px 10px 28px' }}>
                                {renderIcon(sub.icon, sub.color, 16)}
                              </td>
                              <td style={{ padding: '10px 14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '16px' }}>
                                  <CornerDownRight size={14} color="#059669" />
                                  <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '13px' }}>
                                    {sub.name}
                                  </span>
                                </div>
                              </td>
                              <td style={{ padding: '10px 14px' }}>
                                <code className="admin-categories-sub-slug-badge">
                                  {sub.slug}
                                </code>
                              </td>
                              <td style={{ padding: '10px 14px', color: '#64748b', fontSize: '12px' }}>
                                {sub.orderIndex || 0}
                              </td>
                              <td style={{ padding: '10px 14px', color: '#64748b', fontSize: '12px' }}>
                                {sub.description || '—'}
                              </td>
                              <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', gap: '6px' }}>
                                  <button
                                    onClick={() => handleOpenEdit(sub)}
                                    className="admin-categories-btn-edit"
                                    title="Chỉnh sửa"
                                  >
                                    <Edit2 size={13} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(sub)}
                                    className="admin-categories-btn-delete"
                                    title="Xóa"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="admin-categories-modal-backdrop">
          <div className="admin-categories-modal-box">
            <h2 className="admin-categories-modal-title">
              {isEditing ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
            </h2>

            <form onSubmit={handleSave} className="admin-categories-modal-form">
              {/* Tên Danh Mục */}
              <div>
                <label className="admin-categories-modal-label">
                  Tên Danh Mục <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Retreat Chữa Lành, Yoga & Spa..."
                  value={editingItem.name || ''}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="admin-categories-modal-input"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="admin-categories-modal-label">
                  Slug Định Danh (Dùng trong URL & Tour Categories) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="chua-lanh"
                  value={editingItem.slug || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                  className="admin-categories-modal-input"
                  style={{ fontFamily: 'monospace' }}
                />
              </div>

              {/* Menu Type & Menu Cha */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="admin-categories-modal-label">
                    Vị Trí Menu
                  </label>
                  <select
                    value={editingItem.menuType || 'mega_menu'}
                    onChange={(e) => setEditingItem({ ...editingItem, menuType: e.target.value, parentSlug: e.target.value === 'fixed_top' ? null : editingItem.parentSlug })}
                    className="admin-categories-modal-select"
                  >
                    <option value="mega_menu">Hàng Dưới (Mega Menu)</option>
                    <option value="fixed_top">Hàng Trên (Menu Cố Định)</option>
                  </select>
                </div>

                <div>
                  <label className="admin-categories-modal-label">
                    Menu Cha (Parent)
                  </label>
                  <select
                    disabled={editingItem.menuType === 'fixed_top'}
                    value={editingItem.parentSlug || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, parentSlug: e.target.value ? e.target.value : null })}
                    className="admin-categories-modal-select"
                    style={{ backgroundColor: editingItem.menuType === 'fixed_top' ? '#f1f5f9' : '#ffffff' }}
                  >
                    <option value="">-- Là Menu Cha (Không có cha) --</option>
                    {potentialParents.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} ({p.slug})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Icon & Màu Sắc & Thứ Tự */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="admin-categories-modal-label">
                    Icon
                  </label>
                  <select
                    value={editingItem.icon || 'Leaf'}
                    onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                    className="admin-categories-modal-select"
                  >
                    {Object.keys(AVAILABLE_ICONS).map((iconName) => (
                      <option key={iconName} value={iconName}>
                        {iconName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="admin-categories-modal-label">
                    Màu Sắc
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="color"
                      value={editingItem.color || '#4ade80'}
                      onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                      style={{ width: '38px', height: '38px', borderRadius: '8px', border: 'none', cursor: 'pointer', padding: 0 }}
                    />
                    <input
                      type="text"
                      value={editingItem.color || '#4ade80'}
                      onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                      className="admin-categories-modal-input"
                      style={{ fontFamily: 'monospace' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="admin-categories-modal-label">
                    Thứ Tự Sắp Xếp
                  </label>
                  <input
                    type="number"
                    value={editingItem.orderIndex ?? 1}
                    onChange={(e) => setEditingItem({ ...editingItem, orderIndex: parseInt(e.target.value, 10) || 0 })}
                    className="admin-categories-modal-input"
                  />
                </div>
              </div>

              {/* Mô Tả */}
              <div>
                <label className="admin-categories-modal-label">
                  Mô Tả Ngắn (Hiển thị Tooltip hoặc Subtitle)
                </label>
                <textarea
                  rows={2}
                  placeholder="Mô tả trải nghiệm của danh mục..."
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="admin-categories-modal-textarea"
                />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="admin-categories-modal-dismiss-btn"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="admin-categories-modal-save-btn"
                >
                  {isEditing ? 'Lưu Thay Đổi' : 'Tạo Danh Mục'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
