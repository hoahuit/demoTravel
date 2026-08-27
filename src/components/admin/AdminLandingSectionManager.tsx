import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Copy,
  Star,
  CheckCircle,
  Edit2,
  Search,
  RotateCcw,
  Layers,
  Sparkles,
  Check,
  LayoutTemplate,
  Eye,
  X,
  Monitor,
  Tablet,
  Smartphone
} from 'lucide-react';
import SectionLandingPage from '../SectionLandingPage';
import AdminVisualLandingEditor from './AdminVisualLandingEditor';
import {
  LandingSectionTemplate,
  DEFAULT_LANDING_SECTION_TEMPLATES,
  DEFAULT_LANDING_SECTION_DATA,
  getAllLandingSectionTemplates,
  saveLandingSectionTemplate,
  deleteLandingSectionTemplate,
  duplicateLandingSectionTemplate,
  saveAllLandingSectionTemplates
} from '../../data/landingSectionData';
import {
  fetchLandingSectionTemplatesApi,
  saveLandingSectionTemplateApi,
  createLandingSectionTemplateApi,
  deleteLandingSectionTemplateApi,
  duplicateLandingSectionTemplateApi,
  resetLandingSectionTemplatesApi
} from '../../services/apiService';

interface AdminLandingSectionManagerProps {
  toast: {
    success: (msg: string) => void;
    error: (msg: string) => void;
  };
}

type EditorTabKey =
  | 'general'
  | 'hero'
  | 'signals'
  | 'about'
  | 'benefits'
  | 'trust'
  | 'steps'
  | 'pricing'
  | 'faq';

const TAB_NAV_ITEMS: { id: EditorTabKey; label: string }[] = [
  { id: 'general', label: '1. Thông Tin Chung' },
  { id: 'hero', label: '2. Hero Banner' },
  { id: 'signals', label: '3. Tín Hiệu Cơ Thể' },
  { id: 'about', label: '4. Giới Thiệu & Phương Pháp' },
  { id: 'benefits', label: '5. Lợi Ích 21 Ngày' },
  { id: 'trust', label: '6. Vì Sao Tin Tưởng' },
  { id: 'steps', label: '7. Lộ Trình Tham Gia' },
  { id: 'pricing', label: '8. Học Phí & Quyền Lợi' },
  { id: 'faq', label: '9. Câu Hỏi FAQ' }
];

export default function AdminLandingSectionManager({ toast }: AdminLandingSectionManagerProps) {
  const [templates, setTemplates] = useState<LandingSectionTemplate[]>(() => getAllLandingSectionTemplates());
  const [editingTemplate, setEditingTemplate] = useState<LandingSectionTemplate | null>(null);
  const [editorMode, setEditorMode] = useState<'visual' | 'form'>('visual');
  const [previewTemplate, setPreviewTemplate] = useState<LandingSectionTemplate | null>(null);
  const [selectedPreviewTemplate, setSelectedPreviewTemplate] = useState<LandingSectionTemplate | null>(null);
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<EditorTabKey>('general');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'All' | 'active' | 'draft'>('All');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Close preview on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && previewTemplate) {
        setPreviewTemplate(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewTemplate]);

  const loadData = async (force = false) => {
    setLoading(true);
    try {
      const list = await fetchLandingSectionTemplatesApi(force);
      if (Array.isArray(list) && list.length > 0) {
        setTemplates(list);
      }
    } catch {
      setTemplates(getAllLandingSectionTemplates());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);
  }, []);

  const handleOpenCreate = () => {
    const newTemplate: LandingSectionTemplate = {
      id: `section-landing-${Date.now().toString().slice(-4)}`,
      name: 'Mẫu Section Landing Page Mới',
      description: 'Mô tả ngắn gọn về mẫu section này (Vận động, Hơi thở, Trị liệu...)...',
      isDefault: templates.length === 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      data: JSON.parse(JSON.stringify(DEFAULT_LANDING_SECTION_DATA))
    };
    setEditingTemplate(newTemplate);
    setIsCreating(true);
    setActiveTab('general');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenEdit = (tpl: LandingSectionTemplate) => {
    setEditingTemplate(JSON.parse(JSON.stringify(tpl)));
    setIsCreating(false);
    setActiveTab('general');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSetDefault = async (id: string) => {
    try {
      const target = templates.find((t) => t.id === id);
      if (target) {
        await saveLandingSectionTemplateApi({ ...target, isDefault: true });
      }
      const updated = templates.map((t) => ({
        ...t,
        isDefault: t.id === id
      }));
      saveAllLandingSectionTemplates(updated);
      setTemplates(updated);
      toast.success('Đã đặt mẫu làm Mặc Định thành công!');
    } catch (e: any) {
      toast.error(`Lỗi đặt mặc định: ${e?.message || e}`);
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const duplicated = await duplicateLandingSectionTemplateApi(id);
      if (duplicated) {
        setTemplates((prev) => [...prev, duplicated]);
        saveLandingSectionTemplate(duplicated);
        toast.success(`Đã nhân bản mẫu "${duplicated.name}"!`);
      }
    } catch {
      const duplicated = duplicateLandingSectionTemplate(id);
      if (duplicated) {
        setTemplates((prev) => [...prev, duplicated]);
        toast.success(`Đã nhân bản mẫu "${duplicated.name}"!`);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const target = templates.find((t) => t.id === id);
    if (target?.isDefault && templates.length > 1) {
      toast.error('Không thể xóa mẫu đang được đặt làm Mặc Định. Hãy chọn mẫu khác làm mặc định trước!');
      return;
    }
    if (templates.length <= 1) {
      toast.error('Hệ thống phải có ít nhất 1 mẫu Section!');
      return;
    }

    if (window.confirm(`Bạn có chắc chắn muốn xóa mẫu "${target?.name}" không?`)) {
      try {
        await deleteLandingSectionTemplateApi(id);
        deleteLandingSectionTemplate(id);
        setTemplates((prev) => prev.filter((t) => t.id !== id));
        toast.success('Đã xóa mẫu thành công!');
      } catch (e: any) {
        toast.error(`Lỗi khi xóa: ${e?.message || e}`);
      }
    }
  };

  const handleResetToDefaults = async () => {
    if (
      window.confirm(
        'Bạn có chắc muốn khôi phục danh sách mẫu Section Landing Page về các mẫu mặc định ban đầu?'
      )
    ) {
      try {
        await resetLandingSectionTemplatesApi();
        saveAllLandingSectionTemplates(DEFAULT_LANDING_SECTION_TEMPLATES);
        await loadData(true);
        toast.success('Đã khôi phục các mẫu mặc định ban đầu!');
      } catch (e: any) {
        toast.error(`Lỗi khôi phục mặc định: ${e?.message || e}`);
      }
    }
  };

  const handleSaveEditor = async () => {
    if (!editingTemplate) return;
    if (!editingTemplate.name.trim()) {
      toast.error('Vui lòng nhập tên mẫu Section!');
      return;
    }
    if (!editingTemplate.id.trim()) {
      toast.error('Vui lòng nhập mã ID mẫu!');
      return;
    }

    setIsSaving(true);
    try {
      if (isCreating) {
        const created = await createLandingSectionTemplateApi(editingTemplate);
        saveLandingSectionTemplate(created || editingTemplate);
        setTemplates((prev) => [...prev, created || editingTemplate]);
      } else {
        const updated = await saveLandingSectionTemplateApi(editingTemplate);
        saveLandingSectionTemplate(updated || editingTemplate);
        setTemplates((prev) => prev.map((t) => (t.id === editingTemplate.id ? (updated || editingTemplate) : t)));
      }
      toast.success(`Đã lưu thành công mẫu "${editingTemplate.name}"!`);
      setEditingTemplate(null);
    } catch (e: any) {
      saveLandingSectionTemplate(editingTemplate);
      setTemplates(getAllLandingSectionTemplates());
      toast.success(`Đã lưu mẫu "${editingTemplate.name}"!`);
      setEditingTemplate(null);
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered Templates
  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      const matchSearch =
        searchQuery === '' ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        selectedStatusFilter === 'All' || t.status === selectedStatusFilter;

      return matchSearch && matchStatus;
    });
  }, [templates, searchQuery, selectedStatusFilter]);

  // Metrics calculation
  const activeCount = useMemo(() => templates.filter((t) => t.status === 'active').length, [templates]);
  const defaultTemplate = useMemo(() => templates.find((t) => t.isDefault) || templates[0], [templates]);

  // --------------------------------------------------------------------------
  // RENDER: LIVE PREVIEW MODAL
  // --------------------------------------------------------------------------
  const renderPreviewModal = () => {
    if (!previewTemplate) return null;
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: 'rgba(8, 15, 12, 0.82)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflow: 'hidden'
        }}
      >
        {/* Preview Top Header Bar */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#081f13',
            color: '#ffffff',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexShrink: 0,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
            boxSizing: 'border-box'
          }}
        >
          {/* Title & Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: 'rgba(52, 211, 153, 0.15)',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Eye size={18} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {previewTemplate.name}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(52, 211, 153, 0.15)', color: '#34d399', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
                  Live Preview
                </span>
              </div>
              <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                Mã mẫu: <code>{previewTemplate.id}</code> • Giao diện Section Landing Page thực tế
              </span>
            </div>
          </div>

          {/* Device Viewport Switcher */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '999px',
              padding: '3px',
              gap: '3px'
            }}
          >
            <button
              type="button"
              onClick={() => setPreviewViewport('desktop')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: previewViewport === 'desktop' ? '#006d36' : 'transparent',
                color: previewViewport === 'desktop' ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Monitor size={14} />
              <span>Desktop (Toàn màn hình)</span>
            </button>

            <button
              type="button"
              onClick={() => setPreviewViewport('tablet')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: previewViewport === 'tablet' ? '#006d36' : 'transparent',
                color: previewViewport === 'tablet' ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Tablet size={14} />
              <span>Tablet (768px)</span>
            </button>

            <button
              type="button"
              onClick={() => setPreviewViewport('mobile')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: previewViewport === 'mobile' ? '#006d36' : 'transparent',
                color: previewViewport === 'mobile' ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Smartphone size={14} />
              <span>Mobile (390px)</span>
            </button>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setPreviewTemplate(null)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.4)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
            title="Đóng xem trước (ESC)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Preview Scrollable Viewport Frame */}
        <div
          style={{
            flex: 1,
            width: '100%',
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
            padding: previewViewport === 'desktop' ? '0' : '32px 16px',
            boxSizing: 'border-box',
            backgroundColor: previewViewport === 'desktop' ? '#f3f8f5' : '#03100a'
          }}
        >
          <div
            style={{
              width: previewViewport === 'desktop' ? '100%' : previewViewport === 'tablet' ? '768px' : '390px',
              maxWidth: '100%',
              minHeight: '100%',
              backgroundColor: '#f3f8f5',
              borderRadius: previewViewport === 'desktop' ? '0' : '24px',
              overflow: 'hidden',
              boxShadow: previewViewport === 'desktop' ? 'none' : '0 25px 60px rgba(0,0,0,0.6), 0 0 0 8px #1e293b',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative'
            }}
          >
            <SectionLandingPage
              templateData={previewTemplate.data}
              retreatTitle={previewTemplate.name}
            />
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // RENDER: FULL-PAGE DETAIL EDITOR VIEW
  // --------------------------------------------------------------------------
  if (editingTemplate) {
    return (
      <div style={{ width: '100%', boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: '80px' }}>
        {/* Sticky Header Bar (Glassmorphism concept with uniform padding) */}
        <div
          style={{
            position: 'sticky',
            top: '64px',
            zIndex: 90,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid #e2e8f0',
            padding: '14px 36px',
            margin: '-28px -36px 24px -36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
          }}
        >
          {/* Left Side: Back & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
            <button
              type="button"
              onClick={() => setEditingTemplate(null)}
              title="Quay lại danh sách mẫu"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
            >
              <ArrowLeft size={18} />
            </button>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#0f172a',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.3
                  }}
                >
                  {isCreating ? 'Tạo Mới Mẫu Section Landing Page' : editingTemplate.name}
                </h2>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: '6px',
                    backgroundColor: isCreating ? '#dcfce7' : '#f1f5f9',
                    color: isCreating ? '#15803d' : '#475569',
                    border: `1px solid ${isCreating ? '#bbf7d0' : '#e2e8f0'}`
                  }}
                >
                  {isCreating ? 'Chế độ tạo mới' : 'Chế độ chỉnh sửa'}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                Mã định danh: <code>{editingTemplate.id}</code>
              </p>
            </div>
          </div>

          {/* Right Side: Action Buttons (Unified heights: 38px) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {/* Editor Mode Switcher */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#f1f5f9',
                borderRadius: '8px',
                padding: '3px',
                border: '1px solid #cbd5e1'
              }}
            >
              <button
                type="button"
                onClick={() => setEditorMode('visual')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: editorMode === 'visual' ? '#006d36' : 'transparent',
                  color: editorMode === 'visual' ? '#ffffff' : '#64748b',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <Sparkles size={14} />
                <span>✨ Sửa Trực Tiếp Giao Diện</span>
              </button>
              <button
                type="button"
                onClick={() => setEditorMode('form')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: editorMode === 'form' ? '#006d36' : 'transparent',
                  color: editorMode === 'form' ? '#ffffff' : '#64748b',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <LayoutTemplate size={14} />
                <span>Chế Độ Form</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setEditingTemplate(null)}
              style={{
                height: '38px',
                padding: '0 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#475569',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
            >
              Hủy Bỏ
            </button>

            <button
              type="button"
              onClick={handleSaveEditor}
              disabled={isSaving}
              style={{
                height: '38px',
                padding: '0 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#006d36',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 1px 3px rgba(0, 109, 54, 0.25)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005228')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#006d36')}
            >
              <Save size={16} />
              <span>{isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
            </button>
          </div>
        </div>

        {/* VISUAL WYSIWYG MODE (DEFAULT) */}
        {editorMode === 'visual' && (
          <div style={{ width: '100%', marginTop: '8px' }}>
            {/* Full-Width Interactive Editable Landing Page Container */}
            <div
              style={{
                width: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '2px solid #006d36',
                boxShadow: '0 10px 40px rgba(0, 109, 54, 0.12)',
                backgroundColor: '#f3f8f5'
              }}
            >
              <AdminVisualLandingEditor
                templateData={editingTemplate.data}
                retreatTitle={editingTemplate.name}
                onChange={(newData) => {
                  setEditingTemplate({
                    ...editingTemplate,
                    data: newData
                  });
                }}
              />
            </div>
          </div>
        )}

        {/* FORM MODE (TRADITIONAL TABS) */}
        {editorMode === 'form' && (
          <div>
            {/* Tab Navigation Strip */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '14px',
                marginBottom: '24px'
              }}
            >
              {TAB_NAV_ITEMS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: isActive ? '1px solid #bbf7d0' : '1px solid transparent',
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? '#006d36' : '#64748b',
                      backgroundColor: isActive ? '#e8f5e9' : '#f8fafc',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = '#f1f5f9';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Editor Body Form Container */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e5e7eb',
                padding: '24px 28px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              {/* ── TAB 1: THÔNG TIN CHUNG ── */}
              {activeTab === 'general' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Thông Tin Nhận Diện Mẫu Section
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                      Thiết lập tên gọi, mã định danh và trạng thái áp dụng của mẫu Section này trong hệ thống.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Tên Mẫu Section *
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.name}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                        placeholder="VD: Vận Động 3Đ • Chia tay Đau Cổ, Vai, Gáy"
                        style={{
                          width: '100%',
                          padding: '9px 13px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13.5px',
                          color: '#0f172a',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Mã Định Danh (Slug ID) *
                      </label>
                      <input
                        type="text"
                        disabled={!isCreating}
                        value={editingTemplate.id}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, id: e.target.value })}
                        placeholder="VD: van-dong-co-vai-gay"
                        style={{
                          width: '100%',
                          padding: '9px 13px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13.5px',
                          color: '#0f172a',
                          backgroundColor: !isCreating ? '#f8fafc' : '#ffffff',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Mô Tả Mục Đích & Định Hướng
                    </label>
                    <textarea
                      rows={3}
                      value={editingTemplate.description}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                      placeholder="Mô tả tóm tắt giá trị và đối tượng áp dụng của mẫu section này..."
                      style={{
                        width: '100%',
                        padding: '9px 13px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13.5px',
                        color: '#0f172a',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingTop: '10px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Trạng Thái Áp Dụng
                      </label>
                      <select
                        value={editingTemplate.status}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, status: e.target.value as any })}
                        style={{
                          width: '100%',
                          padding: '9px 13px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13.5px',
                          color: '#0f172a',
                          backgroundColor: '#ffffff',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="active">Hoạt động (Active)</option>
                        <option value="draft">Bản nháp (Draft)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Thiết Lập Mặc Định
                      </label>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '9px 13px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          cursor: 'pointer',
                          backgroundColor: '#f8fafc',
                          boxSizing: 'border-box'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={editingTemplate.isDefault}
                          onChange={(e) => setEditingTemplate({ ...editingTemplate, isDefault: e.target.checked })}
                          style={{ width: '16px', height: '16px', accentColor: '#006d36' }}
                        />
                        <span style={{ fontSize: '13px', color: '#1e293b', fontWeight: 600 }}>
                          Đặt mẫu này làm Mặc Định toàn hệ thống
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 2: HERO BANNER ── */}
              {activeTab === 'hero' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Khối Hero Banner (Đầu Trang)
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                      Nội dung tiêu đề lớn, thông điệp chính và nút kêu gọi hành động (CTA) xuất hiện ngay trên đầu Section.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Huy Hiệu Đầu Trang (Badge)
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.hero.badge}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, hero: { ...editingTemplate.data.hero, badge: e.target.value } }
                          })
                        }
                        placeholder="VD: Chương trình Thực Hành 3Đ 21 ngày liên tục"
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Tiêu Đề Chính (Title)
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.hero.title}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, hero: { ...editingTemplate.data.hero, title: e.target.value } }
                          })
                        }
                        placeholder="VD: Thể Dục ĐÚNG"
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 600, boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Tiêu Đề Phụ Nghiêng (Title Italic)
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.hero.titleItalic}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, hero: { ...editingTemplate.data.hero, titleItalic: e.target.value } }
                          })
                        }
                        placeholder='VD: "Chia tay Đau Cổ, Vai, Gáy"'
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontStyle: 'italic', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Chữ Trên Nút Kêu Gọi (CTA Button Text)
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.hero.ctaText}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, hero: { ...editingTemplate.data.hero, ctaText: e.target.value } }
                          })
                        }
                        placeholder="VD: Tham gia Info Session để tìm hiểu thêm"
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 600, boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Nội Dung Giới Thiệu Ngắn (Description)
                    </label>
                    <textarea
                      rows={3}
                      value={editingTemplate.data.hero.description}
                      onChange={(e) =>
                        setEditingTemplate({
                          ...editingTemplate,
                          data: { ...editingTemplate.data, hero: { ...editingTemplate.data.hero, description: e.target.value } }
                        })
                      }
                      style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Dòng Thông Tin Lịch Học & Khai Giảng (Sub Info)
                    </label>
                    <input
                      type="text"
                      value={editingTemplate.data.hero.subInfo}
                      onChange={(e) =>
                        setEditingTemplate({
                          ...editingTemplate,
                          data: { ...editingTemplate.data, hero: { ...editingTemplate.data.hero, subInfo: e.target.value } }
                        })
                      }
                      placeholder="VD: Khai giảng 16 / 9 · 07:00 Sáng · 60 phút mỗi ngày · Online qua ZOOM"
                      style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              )}

              {/* ── TAB 3: TÍN HIỆU CƠ THỂ (SIGNALS) ── */}
              {activeTab === 'signals' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Khối 4 Tín Hiệu Cơ Thể (Signals)
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                      Khối đồng cảm nỗi đau của học viên: Đau cổ vai gáy, Giấc ngủ kém, Đau thắt lưng, Mệt mỏi mãn tính.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Eyebrow
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.signals.eyebrow}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, signals: { ...editingTemplate.data.signals, eyebrow: e.target.value } }
                          })
                        }
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Tiêu Đề Khối
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.signals.heading}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, signals: { ...editingTemplate.data.signals, heading: e.target.value } }
                          })
                        }
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 600, boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Đoạn Văn Dẫn Nhập
                    </label>
                    <textarea
                      rows={2}
                      value={editingTemplate.data.signals.description}
                      onChange={(e) =>
                        setEditingTemplate({
                          ...editingTemplate,
                          data: { ...editingTemplate.data, signals: { ...editingTemplate.data.signals, description: e.target.value } }
                        })
                      }
                      style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
                      Danh Sách 4 Triệu Chứng / Nỗi Đau
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      {editingTemplate.data.signals.items.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '16px',
                            backgroundColor: '#f8fafc',
                            borderRadius: '10px',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                          }}
                        >
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#006d36' }}>
                            Triệu Chứng #{idx + 1}
                          </span>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...editingTemplate.data.signals.items];
                              updated[idx].title = e.target.value;
                              setEditingTemplate({
                                ...editingTemplate,
                                data: { ...editingTemplate.data, signals: { ...editingTemplate.data.signals, items: updated } }
                              });
                            }}
                            placeholder="Tiêu đề triệu chứng"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: 600, boxSizing: 'border-box' }}
                          />
                          <textarea
                            rows={3}
                            value={item.description}
                            onChange={(e) => {
                              const updated = [...editingTemplate.data.signals.items];
                              updated[idx].description = e.target.value;
                              setEditingTemplate({
                                ...editingTemplate,
                                data: { ...editingTemplate.data, signals: { ...editingTemplate.data.signals, items: updated } }
                              });
                            }}
                            placeholder="Mô tả chi tiết cảm giác đau..."
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px', boxSizing: 'border-box' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 4: GIỚI THIỆU & PHƯƠNG PHÁP 3Đ ── */}
              {activeTab === 'about' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Khái Niệm & 3 Điểm Vàng Phương Pháp Sivananda
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                      Trình bày triết lý 3Đ (Thể Dục ĐÚNG, Hít Thở ĐÚNG, Thư Giãn ĐÚNG) và hình ảnh minh họa.
                    </p>
                  </div>

                  {/* About Block */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                          Eyebrow Giới Thiệu
                        </label>
                        <input
                          type="text"
                          value={editingTemplate.data.about.eyebrow}
                          onChange={(e) =>
                            setEditingTemplate({
                              ...editingTemplate,
                              data: { ...editingTemplate.data, about: { ...editingTemplate.data.about, eyebrow: e.target.value } }
                            })
                          }
                          style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                          Tiêu Đề Giới Thiệu
                        </label>
                        <input
                          type="text"
                          value={editingTemplate.data.about.heading}
                          onChange={(e) =>
                            setEditingTemplate({
                              ...editingTemplate,
                              data: { ...editingTemplate.data, about: { ...editingTemplate.data.about, heading: e.target.value } }
                            })
                          }
                          style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 600, boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                          Đoạn Văn 01
                        </label>
                        <textarea
                          rows={3}
                          value={editingTemplate.data.about.para1}
                          onChange={(e) =>
                            setEditingTemplate({
                              ...editingTemplate,
                              data: { ...editingTemplate.data, about: { ...editingTemplate.data.about, para1: e.target.value } }
                            })
                          }
                          style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                          Đoạn Văn 02
                        </label>
                        <textarea
                          rows={3}
                          value={editingTemplate.data.about.para2}
                          onChange={(e) =>
                            setEditingTemplate({
                              ...editingTemplate,
                              data: { ...editingTemplate.data, about: { ...editingTemplate.data.about, para2: e.target.value } }
                            })
                          }
                          style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Đường Dẫn Hình Ảnh Minh Họa
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.about.image}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, about: { ...editingTemplate.data.about, image: e.target.value } }
                          })
                        }
                        placeholder="/images/yoga-practice-guide.jpg"
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  {/* 3 Points Method */}
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
                      Cấu Hình 3 Điểm Vàng (Method)
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                      {editingTemplate.data.method.items.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '16px',
                            backgroundColor: '#f8fafc',
                            borderRadius: '10px',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                          }}
                        >
                          <input
                            type="text"
                            value={item.point}
                            onChange={(e) => {
                              const updated = [...editingTemplate.data.method.items];
                              updated[idx].point = e.target.value;
                              setEditingTemplate({
                                ...editingTemplate,
                                data: { ...editingTemplate.data, method: { ...editingTemplate.data.method, items: updated } }
                              });
                            }}
                            placeholder="Điểm 01 · Vận Động"
                            style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 700, color: '#006d36', boxSizing: 'border-box' }}
                          />
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...editingTemplate.data.method.items];
                              updated[idx].title = e.target.value;
                              setEditingTemplate({
                                ...editingTemplate,
                                data: { ...editingTemplate.data, method: { ...editingTemplate.data.method, items: updated } }
                              });
                            }}
                            placeholder="Tiêu đề điểm"
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 700, boxSizing: 'border-box' }}
                          />
                          <input
                            type="text"
                            value={item.sanskrit}
                            onChange={(e) => {
                              const updated = [...editingTemplate.data.method.items];
                              updated[idx].sanskrit = e.target.value;
                              setEditingTemplate({
                                ...editingTemplate,
                                data: { ...editingTemplate.data, method: { ...editingTemplate.data.method, items: updated } }
                              });
                            }}
                            placeholder="Tên tiếng Phạn / Chú thích"
                            style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontStyle: 'italic', boxSizing: 'border-box' }}
                          />
                          <textarea
                            rows={4}
                            value={item.description}
                            onChange={(e) => {
                              const updated = [...editingTemplate.data.method.items];
                              updated[idx].description = e.target.value;
                              setEditingTemplate({
                                ...editingTemplate,
                                data: { ...editingTemplate.data, method: { ...editingTemplate.data.method, items: updated } }
                              });
                            }}
                            placeholder="Nội dung mô tả điểm vàng..."
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px', boxSizing: 'border-box' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 5: LỢI ÍCH 21 NGÀY (BENEFITS) ── */}
              {activeTab === 'benefits' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Khối 6 Lợi Ích Sau 21 Ngày Liên Tục
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                      Các chuyển hóa rõ rệt về giấc ngủ, giảm đau, năng lượng và tâm trí.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Eyebrow
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.benefits.eyebrow}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, benefits: { ...editingTemplate.data.benefits, eyebrow: e.target.value } }
                          })
                        }
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Tiêu Đề Khối
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.benefits.heading}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, benefits: { ...editingTemplate.data.benefits, heading: e.target.value } }
                          })
                        }
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 600, boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '8px' }}>
                    {editingTemplate.data.benefits.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '16px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}
                      >
                        <span style={{ fontWeight: 700, fontSize: '12px', color: '#006d36' }}>
                          Lợi ích #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...editingTemplate.data.benefits.items];
                            updated[idx].title = e.target.value;
                            setEditingTemplate({
                              ...editingTemplate,
                              data: { ...editingTemplate.data, benefits: { ...editingTemplate.data.benefits, items: updated } }
                            });
                          }}
                          placeholder="Tiêu đề lợi ích"
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 700, boxSizing: 'border-box' }}
                        />
                        <textarea
                          rows={3}
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...editingTemplate.data.benefits.items];
                            updated[idx].description = e.target.value;
                            setEditingTemplate({
                              ...editingTemplate,
                              data: { ...editingTemplate.data, benefits: { ...editingTemplate.data.benefits, items: updated } }
                            });
                          }}
                          placeholder="Mô tả chuyển hóa..."
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px', boxSizing: 'border-box' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── TAB 6: VÌ SAO TIN TƯỞNG (TRUST) ── */}
              {activeTab === 'trust' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Vì Sao Tin Tưởng & Đội Ngũ Chuyên Gia
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                      Cấu hình các số liệu bảo chứng, 4 cam kết giá trị, thông tin Master Trainer và Tổ chức bảo trợ.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Eyebrow
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.trust.eyebrow}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, trust: { ...editingTemplate.data.trust, eyebrow: e.target.value } }
                          })
                        }
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Tiêu Đề Khối
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.trust.heading}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, trust: { ...editingTemplate.data.trust, heading: e.target.value } }
                          })
                        }
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 600, boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Mô Tả Tổng Quan Khối
                    </label>
                    <textarea
                      rows={2}
                      value={editingTemplate.data.trust.description || ''}
                      onChange={(e) =>
                        setEditingTemplate({
                          ...editingTemplate,
                          data: { ...editingTemplate.data, trust: { ...editingTemplate.data.trust, description: e.target.value } }
                        })
                      }
                      style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                    />
                  </div>

                  {/* 4 Stats Cards */}
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                      4 Số Liệu Thống Kê / Bảo Chứng
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                      {(editingTemplate.data.trust.stats || []).map((stat, idx) => (
                        <div key={idx} style={{ padding: '14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#006d36', display: 'block', marginBottom: '6px' }}>
                            Chỉ số #{idx + 1}
                          </span>
                          <input
                            type="text"
                            value={stat.number}
                            onChange={(e) => {
                              const updated = [...(editingTemplate.data.trust.stats || [])];
                              updated[idx].number = e.target.value;
                              setEditingTemplate({
                                ...editingTemplate,
                                data: { ...editingTemplate.data, trust: { ...editingTemplate.data.trust, stats: updated } }
                              });
                            }}
                            placeholder="21 / 80+ / 100+"
                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '15px', fontWeight: 800, textAlign: 'center', marginBottom: '8px', boxSizing: 'border-box' }}
                          />
                          <textarea
                            rows={2}
                            value={stat.label}
                            onChange={(e) => {
                              const updated = [...(editingTemplate.data.trust.stats || [])];
                              updated[idx].label = e.target.value;
                              setEditingTemplate({
                                ...editingTemplate,
                                data: { ...editingTemplate.data, trust: { ...editingTemplate.data.trust, stats: updated } }
                              });
                            }}
                            placeholder="Mô tả chỉ số"
                            style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4 Feature Commitments */}
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                      4 Đặc Điểm / Cam Kết Giá Trị (Features)
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                      {(editingTemplate.data.trust.features || []).map((feat, idx) => (
                        <div key={idx} style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#006d36' }}>
                            Cam kết #{idx + 1}
                          </span>
                          <input
                            type="text"
                            value={feat.title}
                            onChange={(e) => {
                              const updated = [...(editingTemplate.data.trust.features || [])];
                              updated[idx].title = e.target.value;
                              setEditingTemplate({
                                ...editingTemplate,
                                data: { ...editingTemplate.data, trust: { ...editingTemplate.data.trust, features: updated } }
                              });
                            }}
                            placeholder="Tiêu đề cam kết"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 700, boxSizing: 'border-box' }}
                          />
                          <textarea
                            rows={3}
                            value={feat.description}
                            onChange={(e) => {
                              const updated = [...(editingTemplate.data.trust.features || [])];
                              updated[idx].description = e.target.value;
                              setEditingTemplate({
                                ...editingTemplate,
                                data: { ...editingTemplate.data, trust: { ...editingTemplate.data.trust, features: updated } }
                              });
                            }}
                            placeholder="Nội dung mô tả cam kết..."
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px', boxSizing: 'border-box' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Master Profile & Organization */}
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
                      Thông Tin Chuyên Gia Giảng Dạy & Tổ Chức Bảo Trợ
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Teacher Card */}
                      <div style={{ padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                          Chuyên Gia / Master Trainer
                        </span>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Huy hiệu / Badge</label>
                          <input
                            type="text"
                            value={editingTemplate.data.trust.teacher?.badge || ''}
                            onChange={(e) =>
                              setEditingTemplate({
                                ...editingTemplate,
                                data: {
                                  ...editingTemplate.data,
                                  trust: {
                                    ...editingTemplate.data.trust,
                                    teacher: { ...(editingTemplate.data.trust.teacher || {}), badge: e.target.value } as any
                                  }
                                }
                              })
                            }
                            placeholder="CHUYÊN GIA HƯỚNG DẪN"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Tên Chuyên Gia</label>
                          <input
                            type="text"
                            value={editingTemplate.data.trust.teacher?.title || ''}
                            onChange={(e) =>
                              setEditingTemplate({
                                ...editingTemplate,
                                data: {
                                  ...editingTemplate.data,
                                  trust: {
                                    ...editingTemplate.data.trust,
                                    teacher: { ...(editingTemplate.data.trust.teacher || {}), title: e.target.value } as any
                                  }
                                }
                              })
                            }
                            placeholder="Cô Đinh Kim Dung"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 700, boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Tiểu Sử & Kinh Nghiệm</label>
                          <textarea
                            rows={3}
                            value={editingTemplate.data.trust.teacher?.bio || ''}
                            onChange={(e) =>
                              setEditingTemplate({
                                ...editingTemplate,
                                data: {
                                  ...editingTemplate.data,
                                  trust: {
                                    ...editingTemplate.data.trust,
                                    teacher: { ...(editingTemplate.data.trust.teacher || {}), bio: e.target.value } as any
                                  }
                                }
                              })
                            }
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Link Ảnh Chân Dung</label>
                          <input
                            type="text"
                            value={editingTemplate.data.trust.teacher?.image || ''}
                            onChange={(e) =>
                              setEditingTemplate({
                                ...editingTemplate,
                                data: {
                                  ...editingTemplate.data,
                                  trust: {
                                    ...editingTemplate.data.trust,
                                    teacher: { ...(editingTemplate.data.trust.teacher || {}), image: e.target.value } as any
                                  }
                                }
                              })
                            }
                            placeholder="/images/yoga-teacher-portrait.jpg"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                          />
                        </div>
                      </div>

                      {/* Organization Card */}
                      <div style={{ padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                          Tổ Chức Bảo Trợ / Đồng Hành
                        </span>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Huy hiệu / Badge</label>
                          <input
                            type="text"
                            value={editingTemplate.data.trust.organization?.badge || ''}
                            onChange={(e) =>
                              setEditingTemplate({
                                ...editingTemplate,
                                data: {
                                  ...editingTemplate.data,
                                  trust: {
                                    ...editingTemplate.data.trust,
                                    organization: { ...(editingTemplate.data.trust.organization || {}), badge: e.target.value } as any
                                  }
                                }
                              })
                            }
                            placeholder="BẢO TRỢ CHUYÊN MÔN"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Tên Tổ Chức</label>
                          <input
                            type="text"
                            value={editingTemplate.data.trust.organization?.title || ''}
                            onChange={(e) =>
                              setEditingTemplate({
                                ...editingTemplate,
                                data: {
                                  ...editingTemplate.data,
                                  trust: {
                                    ...editingTemplate.data.trust,
                                    organization: { ...(editingTemplate.data.trust.organization || {}), title: e.target.value } as any
                                  }
                                }
                              })
                            }
                            placeholder="4U Wellness · Tổ chức Phi Lợi nhuận"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 700, boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Giới Thiệu Tổ Chức</label>
                          <textarea
                            rows={3}
                            value={editingTemplate.data.trust.organization?.bio || ''}
                            onChange={(e) =>
                              setEditingTemplate({
                                ...editingTemplate,
                                data: {
                                  ...editingTemplate.data,
                                  trust: {
                                    ...editingTemplate.data.trust,
                                    organization: { ...(editingTemplate.data.trust.organization || {}), bio: e.target.value } as any
                                  }
                                }
                              })
                            }
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Link Logo Tổ Chức</label>
                          <input
                            type="text"
                            value={editingTemplate.data.trust.organization?.logo || ''}
                            onChange={(e) =>
                              setEditingTemplate({
                                ...editingTemplate,
                                data: {
                                  ...editingTemplate.data,
                                  trust: {
                                    ...editingTemplate.data.trust,
                                    organization: { ...(editingTemplate.data.trust.organization || {}), logo: e.target.value } as any
                                  }
                                }
                              })
                            }
                            placeholder="/Logo-4U-Wellness.png"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 7: LỘ TRÌNH 4 BƯỚC (STEPS) ── */}
              {activeTab === 'steps' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Khối Lộ Trình 4 Bước Đơn Giản (Steps)
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                      Quy trình 4 bước từ Đăng ký Info Session đến Bắt đầu 21 ngày thực hành.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Eyebrow
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.steps.eyebrow}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, steps: { ...editingTemplate.data.steps, eyebrow: e.target.value } }
                          })
                        }
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Tiêu Đề Khối
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.steps.heading}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, steps: { ...editingTemplate.data.steps, heading: e.target.value } }
                          })
                        }
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 600, boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginTop: '8px' }}>
                    {editingTemplate.data.steps.items.map((stepItem, idx) => (
                      <div key={idx} style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input
                          type="text"
                          value={stepItem.step}
                          onChange={(e) => {
                            const updated = [...editingTemplate.data.steps.items];
                            updated[idx].step = e.target.value;
                            setEditingTemplate({
                              ...editingTemplate,
                              data: { ...editingTemplate.data, steps: { ...editingTemplate.data.steps, items: updated } }
                            });
                          }}
                          placeholder="Bước 01"
                          style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 700, color: '#006d36', boxSizing: 'border-box' }}
                        />
                        <input
                          type="text"
                          value={stepItem.title}
                          onChange={(e) => {
                            const updated = [...editingTemplate.data.steps.items];
                            updated[idx].title = e.target.value;
                            setEditingTemplate({
                              ...editingTemplate,
                              data: { ...editingTemplate.data, steps: { ...editingTemplate.data.steps, items: updated } }
                            });
                          }}
                          placeholder="Tiêu đề bước"
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 700, boxSizing: 'border-box' }}
                        />
                        <textarea
                          rows={3}
                          value={stepItem.description}
                          onChange={(e) => {
                            const updated = [...editingTemplate.data.steps.items];
                            updated[idx].description = e.target.value;
                            setEditingTemplate({
                              ...editingTemplate,
                              data: { ...editingTemplate.data, steps: { ...editingTemplate.data.steps, items: updated } }
                            });
                          }}
                          placeholder="Mô tả bước thực hiện..."
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── TAB 8: BẢNG GIÁ & QUYỀN LỢI (PRICING) ── */}
              {activeTab === 'pricing' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Khối Bảng Giá & Quyền Lợi Khóa Học (Pricing)
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                      Thiết lập giá gốc, giá ưu đãi, huy hiệu khuyến mãi và danh sách quyền lợi đính kèm.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Eyebrow
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.pricing.eyebrow}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, pricing: { ...editingTemplate.data.pricing, eyebrow: e.target.value } }
                          })
                        }
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Tên Gói / Tiêu Đề Khối
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.pricing.heading}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, pricing: { ...editingTemplate.data.pricing, heading: e.target.value } }
                          })
                        }
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 600, boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Giá Gốc (Original Price)
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.pricing.originalPrice}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, pricing: { ...editingTemplate.data.pricing, originalPrice: e.target.value } }
                          })
                        }
                        placeholder="VD: 3.500.000đ"
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Giá Ưu Đãi (Discounted Price)
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.pricing.discountedPrice}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, pricing: { ...editingTemplate.data.pricing, discountedPrice: e.target.value } }
                          })
                        }
                        placeholder="VD: 1.990.000đ"
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 700, color: '#006d36', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Huy Hiệu Ưu Đãi (Badge)
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.pricing.badge}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, pricing: { ...editingTemplate.data.pricing, badge: e.target.value } }
                          })
                        }
                        placeholder="VD: ƯU ĐÃI KHÓA SẮP KHAI GIẢNG"
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Danh Sách Quyền Lợi (Mỗi dòng 1 quyền lợi)
                    </label>
                    <textarea
                      rows={4}
                      value={editingTemplate.data.pricing.inclusions.join('\n')}
                      onChange={(e) => {
                        const lines = e.target.value.split('\n');
                        setEditingTemplate({
                          ...editingTemplate,
                          data: { ...editingTemplate.data, pricing: { ...editingTemplate.data.pricing, inclusions: lines } }
                        });
                      }}
                      placeholder="21 Buổi học trực tiếp qua Zoom cùng Chuyên gia&#10;Giáo trình Vận Động & Hít Thở chuẩn Sivananda&#10;Tham gia cộng đồng thực hành Sống Không Bệnh..."
                      style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              )}

              {/* ── TAB 9: CÂU HỎI THƯỜNG GẶP (FAQ) ── */}
              {activeTab === 'faq' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Khối Câu Hỏi Thường Gặp (FAQ)
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                      Giải đáp các băn khoăn phổ biến của người mới tham gia lớp học.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Eyebrow
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.faq.eyebrow}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, faq: { ...editingTemplate.data.faq, eyebrow: e.target.value } }
                          })
                        }
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Tiêu Đề Khối
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.data.faq.heading}
                        onChange={(e) =>
                          setEditingTemplate({
                            ...editingTemplate,
                            data: { ...editingTemplate.data, faq: { ...editingTemplate.data.faq, heading: e.target.value } }
                          })
                        }
                        style={{ width: '100%', padding: '9px 13px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 600, boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '6px' }}>
                    {editingTemplate.data.faq.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '16px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}
                      >
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#006d36' }}>
                          Câu hỏi #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => {
                            const updated = [...editingTemplate.data.faq.items];
                            updated[idx].question = e.target.value;
                            setEditingTemplate({
                              ...editingTemplate,
                              data: { ...editingTemplate.data, faq: { ...editingTemplate.data.faq, items: updated } }
                            });
                          }}
                          placeholder="Câu hỏi..."
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: 600, boxSizing: 'border-box' }}
                        />
                        <textarea
                          rows={3}
                          value={item.answer}
                          onChange={(e) => {
                            const updated = [...editingTemplate.data.faq.items];
                            updated[idx].answer = e.target.value;
                            setEditingTemplate({
                              ...editingTemplate,
                              data: { ...editingTemplate.data, faq: { ...editingTemplate.data.faq, items: updated } }
                            });
                          }}
                          placeholder="Câu trả lời..."
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px', boxSizing: 'border-box' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Live Preview Modal */}
        {renderPreviewModal()}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: TABLE LIST VIEW (STANDARDIZED CONCEPT WITH KOLLECTION 4U)
  // --------------------------------------------------------------------------
  return (
    <div style={{ width: '100%', boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header & Metrics */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '1px solid #e2e8f0'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#006d36', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                HỆ THỐNG LANDING PAGE • QUẢN LÝ SECTION
              </span>
              <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
                Khóa Học Thực Hành 3Đ 21 Ngày
              </span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
              Danh Sách Mẫu Section Landing Page
            </h1>
            <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
              Quản lý các cấu hình Section Landing Page (Vận động 3Đ, Hít thở Pranayama, Trị liệu Cột sống) hiển thị trên website và Product Detail.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleResetToDefaults}
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
                height: '38px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
            >
              <RotateCcw size={14} color="#64748b" />
              <span>Khôi Phục Mặc Định</span>
            </button>

            <button
              type="button"
              onClick={handleOpenCreate}
              style={{
                backgroundColor: '#006d36',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                height: '38px',
                boxShadow: '0 1px 3px rgba(0, 109, 54, 0.2)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005228')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#006d36')}
            >
              <Plus size={15} />
              <span>Thêm Mẫu Mới</span>
            </button>
          </div>
        </div>

        {/* Metrics Row (Identical standard metrics card concept) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Tổng Số Mẫu Section</span>
              <LayoutTemplate size={20} style={{ color: '#006d36' }} />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#081f13' }}>{templates.length}</div>
          </div>

          <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Mẫu Đang Hoạt Động</span>
              <CheckCircle size={20} style={{ color: '#166534' }} />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#081f13' }}>{activeCount}</div>
          </div>

          <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Mẫu Mặc Định Hệ Thống</span>
              <Star size={20} style={{ color: '#eab308' }} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#081f13', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {defaultTemplate.name.split('•')[0].trim()}
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Cấu Trúc Section</span>
              <Layers size={20} style={{ color: '#2563eb' }} />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#081f13' }}>9 <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>khối nội dung</span></div>
          </div>
        </div>

        {/* Filters Bar */}
        <div style={{ background: '#ffffff', padding: '14px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
            <Search size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Tìm theo tên mẫu, mã ID hoặc mô tả..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#4b5563' }}>Trạng thái:</span>
            <button
              type="button"
              onClick={() => setSelectedStatusFilter('All')}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                background: selectedStatusFilter === 'All' ? '#006d36' : '#f3f4f6',
                color: selectedStatusFilter === 'All' ? '#ffffff' : '#4b5563'
              }}
            >
              Tất Cả ({templates.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatusFilter('active')}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                background: selectedStatusFilter === 'active' ? '#006d36' : '#f3f4f6',
                color: selectedStatusFilter === 'active' ? '#ffffff' : '#4b5563'
              }}
            >
              Hoạt Động ({activeCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatusFilter('draft')}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                background: selectedStatusFilter === 'draft' ? '#006d36' : '#f3f4f6',
                color: selectedStatusFilter === 'draft' ? '#ffffff' : '#4b5563'
              }}
            >
              Bản Nháp ({templates.length - activeCount})
            </button>
          </div>
        </div>
      </div>

      {/* Table Data Card (Standardized 100% with AdminProductsManager) */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '14px 20px' }}>Mẫu Section</th>
              <th style={{ padding: '14px 16px' }}>Mã Định Danh (ID)</th>
              <th style={{ padding: '14px 16px' }}>Tiêu Đề Hero Banner</th>
              <th style={{ padding: '14px 16px' }}>Học Phí</th>
              <th style={{ padding: '14px 16px' }}>Trạng Thái</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredTemplates.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '48px 20px', textAlign: 'center', color: '#9ca3af' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', marginBottom: '8px' }}>
                    Không tìm thấy mẫu Section nào phù hợp
                  </div>
                  <p style={{ margin: 0, fontSize: '13px' }}>Hãy thử đổi từ khóa tìm kiếm hoặc bấm Thêm Mẫu Mới.</p>
                </td>
              </tr>
            ) : (
              filteredTemplates.map((tpl) => {
                const isDefaultTpl = tpl.isDefault;
                return (
                  <tr
                    key={tpl.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background 0.2s ease',
                      backgroundColor: isDefaultTpl ? '#f0fdf4' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!isDefaultTpl) e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      if (!isDefaultTpl) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {/* Name & Badge */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        <span style={{ fontWeight: 800, color: '#111827', fontSize: '14px' }}>
                          {tpl.name}
                        </span>
                        {isDefaultTpl && (
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 800,
                              background: '#fef9c3',
                              color: '#854d0e',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              border: '1px solid #fde047'
                            }}
                          >
                            default
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#6b7280',
                          maxWidth: '360px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {tpl.description}
                      </div>
                    </td>

                    {/* Slug ID */}
                    <td style={{ padding: '14px 16px', fontSize: '13px' }}>
                      <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0369a1' }}>
                        {tpl.id}
                      </div>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>Cập nhật: {tpl.updatedAt || 'N/A'}</div>
                    </td>

                    {/* Hero Title */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>
                        {tpl.data.hero.title}
                      </div>
                      <div style={{ fontSize: '12px', fontStyle: 'italic', color: '#006d36' }}>
                        {tpl.data.hero.titleItalic}
                      </div>
                    </td>

                    {/* Pricing */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 800, color: '#006d36', fontSize: '14px' }}>
                        {tpl.data.pricing.discountedPrice}
                      </div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'line-through' }}>
                        {tpl.data.pricing.originalPrice}
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: 800,
                          background: tpl.status === 'active' ? '#dcfce7' : '#f1f5f9',
                          color: tpl.status === 'active' ? '#166534' : '#64748b'
                        }}
                      >
                        {tpl.status === 'active' ? 'Hoạt động' : 'Bản nháp'}
                      </span>
                    </td>

                    {/* Actions (Exact width: 50px, height: 32px standard button size) */}
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {!isDefaultTpl ? (
                          <button
                            type="button"
                            onClick={() => handleSetDefault(tpl.id)}
                            title="Đặt làm mẫu mặc định"
                            style={{
                              width: '50px',
                              height: '32px',
                              borderRadius: '8px',
                              border: '1px solid #fde047',
                              background: '#fef9c3',
                              color: '#854d0e',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fef08a')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fef9c3')}
                          >
                            <Star size={14} fill="#eab308" color="#ca8a04" />
                          </button>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPreviewTemplate(tpl);
                            const el = document.getElementById('live-preview-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          style={{
                            width: '50px',
                            height: '32px',
                            borderRadius: '8px',
                            border: '1px solid #bae6fd',
                            background: '#f0f9ff',
                            color: '#0284c7',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease'
                          }}
                          title="Xem trực quan mẫu này ở bên dưới"
                        >
                          <Eye size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(tpl)}
                          style={{
                            width: '50px',
                            height: '32px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            background: '#f9fafb',
                            color: '#374151',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease'
                          }}
                          title="Chỉnh sửa chi tiết"
                        >
                          <Edit2 size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDuplicate(tpl.id)}
                          style={{
                            width: '50px',
                            height: '32px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            background: '#f9fafb',
                            color: '#374151',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease'
                          }}
                          title="Nhân bản mẫu"
                        >
                          <Copy size={14} />
                        </button>

                        {!isDefaultTpl && (
                          <button
                            type="button"
                            onClick={() => handleDelete(tpl.id)}
                            style={{
                              width: '50px',
                              height: '32px',
                              borderRadius: '8px',
                              border: '1px solid #fecaca',
                              background: '#fff1f2',
                              color: '#b91c1c',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                            title="Xóa mẫu"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Live Preview Modal (nếu người dùng bấm chế độ xem riêng) */}
      {renderPreviewModal()}
    </div>
  );
}
