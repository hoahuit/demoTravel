import React, { useState, useEffect, useMemo } from 'react';
import {
  fetchMenuCategoriesApi,
  createMenuCategoryApi,
  saveMenuCategoryApi,
  deleteMenuCategoryApi,
  MenuCategoryItem
} from '../../services/apiService';
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
    return <IconComponent size={size} style={{ color: color || '#4ade80' }} />;
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Header & Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e2e8f0'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f766e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              4U RETREAT • ĐIỀU HƯỚNG & DANH MỤC
            </span>
            <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
              Header & Mega Menu
            </span>
          </div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#0f172a',
              fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              margin: '0 0 4px 0',
              letterSpacing: '-0.02em',
              lineHeight: 1.3
            }}
          >
            Danh Mục Menu
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
            Quản lý quan hệ Cha - Con cho Menu Header và phân loại nhiều danh mục cho từng gói Tour.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => loadCategories(true)}
            style={{
              backgroundColor: '#ffffff',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
          >
            <RefreshCw size={14} color="#64748b" />
            <span>Làm Mới</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenCreate(null, 'mega_menu')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#0f766e',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(15, 118, 110, 0.2)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#115e59')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0f766e')}
          >
            <Plus size={15} />
            <span>Thêm Mới</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '14px 18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <Search size={18} style={{ color: '#819986' }} />
        <input
          type="text"
          placeholder="Tìm kiếm danh mục theo tên, slug, mô tả..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            width: '100%',
            color: '#081f13'
          }}
        />
        {searchFilter && (
          <button
            onClick={() => setSearchFilter('')}
            style={{
              background: 'none',
              border: 'none',
              color: '#819986',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600
            }}
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
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              border: '1px solid rgba(8, 31, 19, 0.08)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                borderBottom: '1px solid #edf2ee',
                paddingBottom: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Crown size={18} style={{ color: '#e5a50a' }} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#081f13' }}>
                  Menu Cố Định Hàng Trên (Fixed Top Badges)
                </h3>
              </div>
              <button
                onClick={() => handleOpenCreate(null, 'fixed_top')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#059669',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Plus size={14} /> Thêm Mục Hàng Trên
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f7f9f7', color: '#4d6453', textAlign: 'left' }}>
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
                          <code
                            style={{
                              backgroundColor: '#edf4ef',
                              color: '#084826',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '12px'
                            }}
                          >
                            {item.slug}
                          </code>
                        </td>
                        <td style={{ padding: '12px 14px', color: '#4d6453' }}>{item.orderIndex || 0}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              onClick={() => handleOpenEdit(item)}
                              style={{
                                background: '#f0f5f2',
                                border: 'none',
                                color: '#081f13',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '12px',
                                fontWeight: 600
                              }}
                            >
                              <Edit2 size={13} /> Sửa
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              style={{
                                background: '#fee2e2',
                                border: 'none',
                                color: '#dc2626',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '12px',
                                fontWeight: 600
                              }}
                            >
                              <Trash2 size={13} /> Xóa
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
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              border: '1px solid rgba(8, 31, 19, 0.08)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                borderBottom: '1px solid #edf2ee',
                paddingBottom: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} style={{ color: '#059669' }} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#081f13' }}>
                  Menu Hàng Dưới & Danh Mục Phân Cấp (Mega Menu)
                </h3>
              </div>
              <button
                onClick={() => handleOpenCreate(null, 'mega_menu')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#059669',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Plus size={14} /> Thêm Menu Cha
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f7f9f7', color: '#4d6453', textAlign: 'left' }}>
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
                              <code
                                style={{
                                  backgroundColor: '#edf4ef',
                                  color: '#084826',
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  fontSize: '12px'
                                }}
                              >
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
                                  title="Thêm danh mục con"
                                  style={{
                                    background: '#e0f2fe',
                                    border: 'none',
                                    color: '#0369a1',
                                    padding: '6px 10px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '12px',
                                    fontWeight: 600
                                  }}
                                >
                                  <Plus size={13} /> Thêm Con
                                </button>
                                <button
                                  onClick={() => handleOpenEdit(parent)}
                                  style={{
                                    background: '#f0f5f2',
                                    border: 'none',
                                    color: '#081f13',
                                    padding: '6px 10px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '12px',
                                    fontWeight: 600
                                  }}
                                >
                                  <Edit2 size={13} /> Sửa
                                </button>
                                <button
                                  onClick={() => handleDelete(parent)}
                                  style={{
                                    background: '#fee2e2',
                                    border: 'none',
                                    color: '#dc2626',
                                    padding: '6px 10px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '12px',
                                    fontWeight: 600
                                  }}
                                >
                                  <Trash2 size={13} /> Xóa
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
                                  <CornerDownRight size={14} style={{ color: '#059669' }} />
                                  <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '13px' }}>
                                    {sub.name}
                                  </span>
                                </div>
                              </td>
                              <td style={{ padding: '10px 14px' }}>
                                <code
                                  style={{
                                    backgroundColor: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    color: '#334155',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '11px'
                                  }}
                                >
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
                                    style={{
                                      background: '#f1f5f9',
                                      border: 'none',
                                      color: '#334155',
                                      padding: '5px 8px',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '3px',
                                      fontSize: '11px',
                                      fontWeight: 600
                                    }}
                                  >
                                    <Edit2 size={12} /> Sửa
                                  </button>
                                  <button
                                    onClick={() => handleDelete(sub)}
                                    style={{
                                      background: '#fee2e2',
                                      border: 'none',
                                      color: '#dc2626',
                                      padding: '5px 8px',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '3px',
                                      fontSize: '11px',
                                      fontWeight: 600
                                    }}
                                  >
                                    <Trash2 size={12} /> Xóa
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

      {/* LIVE HEADER THEME PREVIEW SECTION */}
      <div
        style={{
          marginTop: '36px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(8, 31, 19, 0.08)'
        }}
      >
        {/* Header toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 4px 12px rgba(16,185,129,0.25)' }}>
              <Eye size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#081f13', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Theme Live Preview (Xem Trước Giao Diện Menu)
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
                Mô phỏng trực quan cách danh mục hiển thị trên thanh Navigation Header thực tế trên website.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Viewport switch: Desktop vs Mobile */}
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <button
                onClick={() => setPreviewMode('desktop')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: previewMode === 'desktop' ? '#ffffff' : 'transparent',
                  color: previewMode === 'desktop' ? '#081f13' : '#64748b',
                  boxShadow: previewMode === 'desktop' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <Monitor size={14} /> Desktop
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: previewMode === 'mobile' ? '#ffffff' : 'transparent',
                  color: previewMode === 'mobile' ? '#081f13' : '#64748b',
                  boxShadow: previewMode === 'mobile' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <Smartphone size={14} /> Mobile
              </button>
            </div>

            {/* Theme switcher: Dark Luxury / Light Modern / Emerald */}
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <button
                onClick={() => setPreviewTheme('dark')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: previewTheme === 'dark' ? '#0a0f0b' : 'transparent',
                  color: previewTheme === 'dark' ? '#4ade80' : '#64748b'
                }}
              >
                <Moon size={13} /> Dark Lux
              </button>
              <button
                onClick={() => setPreviewTheme('light')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: previewTheme === 'light' ? '#ffffff' : 'transparent',
                  color: previewTheme === 'light' ? '#0f172a' : '#64748b',
                  boxShadow: previewTheme === 'light' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <Sun size={13} /> Light
              </button>
              <button
                onClick={() => setPreviewTheme('emerald')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: previewTheme === 'emerald' ? '#064e3b' : 'transparent',
                  color: previewTheme === 'emerald' ? '#a7f3d0' : '#64748b'
                }}
              >
                <Sparkles size={13} /> Emerald
              </button>
            </div>

            <button
              onClick={() => loadCategories(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '10px',
                border: '1px solid rgba(8,31,19,0.15)',
                background: '#ffffff',
                color: '#4d6453',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={13} /> Làm Mới
            </button>
          </div>
        </div>

        {/* PREVIEW CONTAINER */}
        {(() => {
          const isDark = previewTheme === 'dark';
          const isEmerald = previewTheme === 'emerald';

          const themeStyle = {
            bg: isDark ? '#0a0f0b' : isEmerald ? '#064e3b' : '#ffffff',
            topBarBg: isDark ? '#050805' : isEmerald ? '#022c22' : '#f8fafc',
            text: isDark || isEmerald ? '#ffffff' : '#0f172a',
            subtext: isDark ? '#a3b899' : isEmerald ? '#a7f3d0' : '#64748b',
            border: isDark ? 'rgba(255,255,255,0.1)' : isEmerald ? 'rgba(255,255,255,0.15)' : '#e2e8f0',
            dropdownBg: isDark ? '#121d15' : isEmerald ? '#047857' : '#f8fafc',
            hoverBg: isDark ? 'rgba(255,255,255,0.08)' : isEmerald ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.04)'
          };

          if (previewMode === 'mobile') {
            return (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', background: isDark ? '#050805' : isEmerald ? '#022c22' : '#f1f5f9', borderRadius: '16px' }}>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '380px',
                    borderRadius: '28px',
                    border: '8px solid #1e293b',
                    overflow: 'hidden',
                    backgroundColor: themeStyle.bg,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    color: themeStyle.text
                  }}
                >
                  {/* Mobile Header Bar */}
                  <div style={{ padding: '14px 18px', borderBottom: `1px solid ${themeStyle.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: themeStyle.topBarBg }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '15px', color: themeStyle.text }}>
                      <Leaf size={18} style={{ color: '#4ade80' }} />
                      <span>4U RETREATS</span>
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      style={{ background: 'transparent', border: 'none', color: themeStyle.text, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                  </div>

                  {/* Mobile Content */}
                  <div style={{ padding: '16px', minHeight: '340px' }}>
                    {/* Fixed top badges */}
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '12px', borderBottom: `1px solid ${themeStyle.border}` }}>
                      {headerPreviewData.fixedTop.map((item) => (
                        <span
                          key={item.id || item.slug}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            backgroundColor: themeStyle.hoverBg,
                            color: item.color || '#4ade80',
                            border: `1px solid ${item.color || '#4ade80'}40`,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          {renderCategoryIcon(item.icon, item.color, 12)} {item.name}
                        </span>
                      ))}
                    </div>

                    {/* Category Accordion */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {headerPreviewData.parentsWithChildren.map((parent) => {
                        const isExpanded = mobileExpandedSlug === parent.slug;
                        return (
                          <div key={parent.id || parent.slug} style={{ borderRadius: '10px', overflow: 'hidden', border: `1px solid ${themeStyle.border}`, backgroundColor: themeStyle.hoverBg }}>
                            <div
                              onClick={() => setMobileExpandedSlug(isExpanded ? null : parent.slug)}
                              style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: parent.color || themeStyle.text }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {renderCategoryIcon(parent.icon, parent.color, 14)}
                                <span>{parent.name}</span>
                              </div>
                              {parent.children.length > 0 && (
                                <ChevronRight size={14} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }} />
                              )}
                            </div>

                            {/* Children */}
                            {isExpanded && parent.children.length > 0 && (
                              <div style={{ padding: '8px 14px 12px 28px', borderTop: `1px solid ${themeStyle.border}`, backgroundColor: themeStyle.dropdownBg, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {parent.children.map((child) => (
                                  <div key={child.id || child.slug} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: themeStyle.text, padding: '4px 0' }}>
                                    {renderCategoryIcon(child.icon, child.color, 13)}
                                    <span>{child.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Desktop Mode Header Simulator
          return (
            <div style={{ overflow: 'hidden', borderRadius: '16px', border: `1px solid ${themeStyle.border}`, backgroundColor: themeStyle.bg, color: themeStyle.text, transition: 'all 0.3s ease' }}>
              {/* Row 1: Fixed Top Badges Bar */}
              <div
                style={{
                  minHeight: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px',
                  padding: '8px 20px',
                  borderBottom: `1px solid ${themeStyle.border}`,
                  backgroundColor: themeStyle.topBarBg,
                  flexWrap: 'wrap'
                }}
              >
                <span style={{ fontSize: '11px', color: themeStyle.subtext, fontWeight: 600 }}>Cố định hàng trên:</span>
                {headerPreviewData.fixedTop.length > 0 ? (
                  headerPreviewData.fixedTop.map((item) => (
                    <span
                      key={item.id || item.slug}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: item.color || '#4ade80',
                        fontSize: '12px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        backgroundColor: themeStyle.hoverBg
                      }}
                    >
                      {renderCategoryIcon(item.icon, item.color, 13)} {item.name}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '12px', color: themeStyle.subtext }}>Chưa tạo danh mục "fixed_top".</span>
                )}
              </div>

              {/* Row 2: Main Desktop Nav Header */}
              <div
                style={{
                  padding: '14px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  position: 'relative'
                }}
              >
                {/* Brand Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '18px', letterSpacing: '0.05em', color: themeStyle.text, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  <Leaf size={22} style={{ color: '#4ade80' }} />
                  <span>4U RETREATS</span>
                </div>

                {/* Main Navigation items */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
                  {headerPreviewData.parentsWithChildren.length > 0 ? (
                    headerPreviewData.parentsWithChildren.map((parent) => {
                      const isHovered = activeHoverSlug === parent.slug;
                      return (
                        <div
                          key={parent.id || parent.slug}
                          onMouseEnter={() => setActiveHoverSlug(parent.slug)}
                          onClick={() => setActiveHoverSlug(isHovered ? null : parent.slug)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: parent.color || themeStyle.text,
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            backgroundColor: isHovered ? themeStyle.hoverBg : 'transparent',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {renderCategoryIcon(parent.icon, parent.color, 14)}
                          <span>{parent.name}</span>
                          {parent.children.length > 0 && (
                            <ChevronDown size={14} style={{ transform: isHovered ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', opacity: 0.8 }} />
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <span style={{ fontSize: '13px', color: themeStyle.subtext }}>Chưa có danh mục Mega Menu.</span>
                  )}
                </div>

                {/* Search & Action mock */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: themeStyle.hoverBg, padding: '6px 12px', borderRadius: '20px', border: `1px solid ${themeStyle.border}`, fontSize: '12px', color: themeStyle.subtext }}>
                    <Search size={14} />
                    <span>Tìm tour...</span>
                  </div>
                  <div style={{ backgroundColor: '#059669', color: '#ffffff', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={13} /> Hotline
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Mega Menu Panel */}
              {(() => {
                const activeParent = headerPreviewData.parentsWithChildren.find(
                  (p) => p.slug === activeHoverSlug
                ) || headerPreviewData.parentsWithChildren.find((p) => p.children.length > 0);

                if (!activeParent || activeParent.children.length === 0) return null;

                return (
                  <div
                    style={{
                      borderTop: `1px solid ${themeStyle.border}`,
                      backgroundColor: themeStyle.dropdownBg,
                      padding: '20px 28px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: themeStyle.subtext, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Mega Menu Dropdown Preview: <span style={{ color: activeParent.color || '#4ade80' }}>{activeParent.name}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: themeStyle.subtext }}>Rê chuột vào menu cha ở trên để xem danh mục khác</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                      {activeParent.children.map((child) => (
                        <div
                          key={child.id || child.slug}
                          style={{
                            padding: '12px 14px',
                            borderRadius: '12px',
                            backgroundColor: themeStyle.hoverBg,
                            border: `1px solid ${themeStyle.border}`,
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px'
                          }}
                        >
                          <div style={{ marginTop: '2px' }}>{renderCategoryIcon(child.icon, child.color, 16)}</div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: child.color || themeStyle.text }}>{child.name}</div>
                            <div style={{ fontSize: '11px', color: themeStyle.subtext, marginTop: '2px' }}>{child.description || `Xem danh sách tour thuộc ${child.name}`}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })()}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              padding: '28px',
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '20px',
                fontWeight: 700,
                color: '#081f13',
                margin: '0 0 20px 0',
                borderBottom: '1px solid #edf2ee',
                paddingBottom: '12px'
              }}
            >
              {isEditing ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
            </h2>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Tên Danh Mục */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  Tên Danh Mục <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Retreat Chữa Lành, Yoga & Spa..."
                  value={editingItem.name || ''}
                  onChange={(e) => handleNameChange(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(8, 31, 19, 0.18)', fontSize: '14px', outline: 'none' }}
                />
              </div>

              {/* Slug */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  Slug Định Danh (Dùng trong URL & Tour Categories) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="chua-lanh"
                  value={editingItem.slug || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(8, 31, 19, 0.18)', fontSize: '14px', outline: 'none', fontFamily: 'monospace' }}
                />
              </div>

              {/* Menu Type & Menu Cha */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Vị Trí Menu
                  </label>
                  <select
                    value={editingItem.menuType || 'mega_menu'}
                    onChange={(e) => setEditingItem({ ...editingItem, menuType: e.target.value, parentSlug: e.target.value === 'fixed_top' ? null : editingItem.parentSlug })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(8, 31, 19, 0.18)', fontSize: '14px', backgroundColor: '#ffffff', outline: 'none' }}
                  >
                    <option value="mega_menu">Hàng Dưới (Mega Menu)</option>
                    <option value="fixed_top">Hàng Trên (Menu Cố Định)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Menu Cha (Parent)
                  </label>
                  <select
                    disabled={editingItem.menuType === 'fixed_top'}
                    value={editingItem.parentSlug || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, parentSlug: e.target.value ? e.target.value : null })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(8, 31, 19, 0.18)', fontSize: '14px', backgroundColor: editingItem.menuType === 'fixed_top' ? '#f1f5f9' : '#ffffff', outline: 'none' }}
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
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Icon
                  </label>
                  <select
                    value={editingItem.icon || 'Leaf'}
                    onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(8, 31, 19, 0.18)', fontSize: '14px', backgroundColor: '#ffffff', outline: 'none' }}
                  >
                    {Object.keys(AVAILABLE_ICONS).map((iconName) => (
                      <option key={iconName} value={iconName}>
                        {iconName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
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
                      style={{ flex: 1, padding: '10px 10px', borderRadius: '8px', border: '1px solid rgba(8, 31, 19, 0.18)', fontSize: '13px', fontFamily: 'monospace' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Thứ Tự Sắp Xếp
                  </label>
                  <input
                    type="number"
                    value={editingItem.orderIndex ?? 1}
                    onChange={(e) => setEditingItem({ ...editingItem, orderIndex: parseInt(e.target.value, 10) || 0 })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(8, 31, 19, 0.18)', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Mô Tả */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  Mô Tả Ngắn (Hiển thị Tooltip hoặc Subtitle)
                </label>
                <textarea
                  rows={2}
                  placeholder="Mô tả trải nghiệm của danh mục..."
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(8, 31, 19, 0.18)', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#4d6453',
                    border: '1px solid rgba(8,31,19,0.18)',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '13px'
                  }}
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#081f13',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 22px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '13px'
                  }}
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
