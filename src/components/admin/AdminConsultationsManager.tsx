import React, { useState, useMemo } from 'react';
import EmptyState from '../ui/EmptyState';
import {
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Search,
  Trash2,
  Edit2,
  Eye,
  X,
  Copy,
  Check,
  Compass,
  FileText,
  Download,
  Plus,
  ChevronDown,
  Sparkles,
  RefreshCw,
  ShoppingBag,
  CreditCard,
  Package,
  MapPin
} from 'lucide-react';

interface AdminConsultationsManagerProps {
  consultationsList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
  handleStatusUpdate?: (item: any, newStatus: string) => void;
}

export default function AdminConsultationsManager({
  consultationsList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem,
  handleStatusUpdate
}: AdminConsultationsManagerProps) {
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('all');
  const [selectedDetailItem, setSelectedDetailItem] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Quick clipboard copy helper
  const handleCopyText = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Structured parser for consultation, custom tour design, and shop orders
  const parseConsultationData = (item: any) => {
    const rawNote = String(item.note || item.message || '').trim();
    const tourTitle = String(item.tourName || item.tour || '').trim();

    // 1. Check if Shop Order (Đơn Hàng Mua Sắm Kollection)
    const isShopOrder =
      rawNote.includes('[ĐƠN HÀNG KOLLECTION') ||
      tourTitle.toLowerCase().includes('đơn hàng kollection') ||
      rawNote.includes('KOLLECTION 4U') ||
      item.type === 'shop_order';

    // 2. Check if Custom Planner (Thiết Kế Lịch Trình Riêng)
    const isCustomPlanner =
      !isShopOrder &&
      (rawNote.includes('[THIẾT KẾ LỊCH TRÌNH RIÊNG]') ||
       tourTitle.toLowerCase().includes('thiết kế lịch trình') ||
       tourTitle.toLowerCase().includes('thiết kế tour') ||
       item.type === 'custom_tour_planner');

    // 3. Tour Consultation (Tư Vấn Tour Retreat)
    const isTourConsultation = !isShopOrder && !isCustomPlanner;

    // QR Payment Status for Shop Orders
    const isQrPaid =
      rawNote.includes('ĐÃ CHUYỂN KHOẢN QR') ||
      rawNote.includes('ĐÃ QUÉT QR') ||
      rawNote.includes('CHUYỂN TIỀN THÀNH CÔNG');

    // Parse Shop Order Details
    let orderProducts = '';
    let orderTotal = '';
    let orderAddress = '';
    let orderCustomerNote = '';

    if (isShopOrder) {
      const productMatch = rawNote.match(/Sản phẩm:\s*([^.]+?)(?=\.\s*Tổng tiền:|$)/i);
      if (productMatch) orderProducts = productMatch[1].trim();

      const totalMatch = rawNote.match(/Tổng tiền:\s*([^.]+?)(?=\.\s*Địa chỉ|$)/i);
      if (totalMatch) orderTotal = totalMatch[1].trim();

      const addressMatch = rawNote.match(/Địa chỉ(?: nhận hàng)?:\s*([^.]+?)(?=\.\s*Ghi chú:|\.\s*\[|$)/i);
      if (addressMatch) orderAddress = addressMatch[1].trim();

      const noteMatch = rawNote.match(/Ghi chú(?: khách)?:\s*([^.]+?)(?=\.|\s*\[|$)/i);
      if (noteMatch && noteMatch[1].trim() !== 'Không') orderCustomerNote = noteMatch[1].trim();
    }

    // Parse Custom Planner Specifics
    let region = '';
    let destination = '';
    let guests = '';
    let requirements = '';

    if (isCustomPlanner && rawNote) {
      const lines = rawNote.split('\n');
      lines.forEach((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('- Vùng miền:')) region = trimmed.replace('- Vùng miền:', '').trim();
        else if (trimmed.startsWith('- Điểm đến mong muốn:')) destination = trimmed.replace('- Điểm đến mong muốn:', '').trim();
        else if (trimmed.startsWith('- Số lượng khách:') || trimmed.startsWith('- Số lượng người:')) {
          guests = trimmed.replace(/^- Số lượng (khách|người):/, '').trim();
        } else if (trimmed.startsWith('- Nhu cầu cụ thể:') || trimmed.startsWith('- Thông tin / Nhu cầu chuyến đi:')) {
          requirements = trimmed.replace(/^- (Nhu cầu cụ thể|Thông tin \/ Nhu cầu chuyến đi):/, '').trim();
        }
      });
    }

    // Clean display title
    let displayTitle = tourTitle;
    let requestType = 'tour_consultation';

    if (isShopOrder) {
      requestType = 'shop_order';
      displayTitle = tourTitle || 'Đơn Hàng Kollection 4U';
    } else if (isCustomPlanner) {
      requestType = 'custom_planner';
      const cleanDest = destination || tourTitle.replace(/^Thiết kế lịch trình riêng:\s*/i, '');
      displayTitle = cleanDest ? `Thiết kế lịch trình: ${cleanDest}` : 'Thiết kế lịch trình riêng';
    }

    return {
      requestType,
      isShopOrder,
      isCustomPlanner,
      isTourConsultation,
      isQrPaid,
      displayTitle,
      orderProducts,
      orderTotal,
      orderAddress,
      orderCustomerNote,
      region,
      destination,
      guests,
      requirements: requirements || (!region && !destination && !isShopOrder ? rawNote : ''),
      rawNote
    };
  };

  // KPI Metrics calculation
  const stats = useMemo(() => {
    const list = consultationsList || [];
    const total = list.length;
    const pending = list.filter((c) => (c.status || 'Chưa tư vấn') === 'Chưa tư vấn').length;
    const completed = list.filter((c) => c.status === 'Đã tư vấn').length;
    const callback = list.filter((c) => c.status === 'Hẹn gọi lại' || c.status === 'Không nghe máy').length;

    let shopOrders = 0;
    let shopQrPaid = 0;
    let customPlanner = 0;
    let tourConsultation = 0;

    list.forEach((item) => {
      const parsed = parseConsultationData(item);
      if (parsed.isShopOrder) {
        shopOrders++;
        if (parsed.isQrPaid) shopQrPaid++;
      } else if (parsed.isCustomPlanner) {
        customPlanner++;
      } else {
        tourConsultation++;
      }
    });

    return {
      total,
      pending,
      completed,
      callback,
      shopOrders,
      shopQrPaid,
      customPlanner,
      tourConsultation
    };
  }, [consultationsList]);

  // Filtered entries
  const filteredList = useMemo(() => {
    return (consultationsList || []).filter((item) => {
      const searchLower = searchFilter.toLowerCase();
      const parsed = parseConsultationData(item);
      const name = String(item.customerName || item.name || item.customer || '').toLowerCase();
      const phone = String(item.customerPhone || item.phone || '').toLowerCase();
      const tour = String(item.tourName || item.tour || '').toLowerCase();
      const note = String(item.note || item.message || '').toLowerCase();
      const id = String(item.id || '').toLowerCase();

      const matchesSearch =
        name.includes(searchLower) ||
        phone.includes(searchLower) ||
        tour.includes(searchLower) ||
        note.includes(searchLower) ||
        id.includes(searchLower);

      if (!matchesSearch) return false;

      if (selectedStatusTab === 'all') return true;
      if (selectedStatusTab === 'shop_order') return parsed.isShopOrder;
      if (selectedStatusTab === 'custom') return parsed.isCustomPlanner;
      if (selectedStatusTab === 'tour') return parsed.isTourConsultation;
      if (selectedStatusTab === 'pending') return (item.status || 'Chưa tư vấn') === 'Chưa tư vấn';
      if (selectedStatusTab === 'completed') return item.status === 'Đã tư vấn';
      if (selectedStatusTab === 'callback') return item.status === 'Hẹn gọi lại' || item.status === 'Không nghe máy';

      return true;
    });
  }, [consultationsList, searchFilter, selectedStatusTab]);

  // Export to CSV helper
  const handleExportCSV = () => {
    if (!consultationsList || consultationsList.length === 0) return;
    const headers = ['Mã ID', 'Khách Hàng', 'Số Điện Thoại', 'Email', 'Thời Gian Gọi', 'Dịch Vụ / Tour', 'Trạng Thái', 'Ghi Chú'];
    const rows = consultationsList.map((item) => {
      const parsed = parseConsultationData(item);
      return [
        item.id || '',
        `"${(item.customerName || item.name || '').replace(/"/g, '""')}"`,
        `"${item.customerPhone || item.phone || ''}"`,
        `"${item.customerEmail || item.email || ''}"`,
        `"${item.preferredCallTime || item.preferredTime || 'Linh hoạt'}"`,
        `"${parsed.displayTitle.replace(/"/g, '""')}"`,
        `"${item.status || 'Chưa tư vấn'}"`,
        `"${parsed.rawNote.replace(/"/g, '""').replace(/\n/g, ' ')}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Yeu_Cau_Tu_Van_4U_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }}
    >
      
      {/* ─────────────────────────────────────────────────────────────
          1. ENTERPRISE HEADER & ACTIONS
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '20px',
          marginBottom: '24px',
          borderBottom: '1px solid #e2e8f0',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f766e', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              CRM & Quản Trị Khách Hàng
            </span>
            <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', whiteSpace: 'nowrap' }}>
              Dữ liệu trực tiếp
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '24px',
              margin: 0,
              color: '#0f172a',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              whiteSpace: 'nowrap'
            }}
          >
            Yêu Cầu Tư Vấn & Thiết Kế Lịch Trình
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: '#64748b', whiteSpace: 'nowrap' }}>
            Theo dõi, xử lý và chăm sóc toàn bộ lịch hẹn tư vấn và yêu cầu may đo lịch trình từ khách hàng.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'nowrap' }}>
          <button
            type="button"
            onClick={() => window.location.reload()}
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
            onClick={handleExportCSV}
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
            <Download size={14} color="#64748b" />
            <span>Xuất Dữ Liệu</span>
          </button>

          <button
            type="button"
            onClick={() => openCreateModal('consultations')}
            style={{
              backgroundColor: '#0f766e',
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

      {/* ─────────────────────────────────────────────────────────────
          2. ENTERPRISE KPI METRIC TILES
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Tile 1: All */}
        <div
          onClick={() => setSelectedStatusTab('all')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '16px 20px',
            border: selectedStatusTab === 'all' ? '1.5px solid #0f766e' : '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', whiteSpace: 'nowrap' }}>
              Tổng Yêu Cầu & Đơn
            </span>
            <FileText size={16} color="#64748b" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
            {stats.total}
          </div>
          <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px', whiteSpace: 'nowrap' }}>
            Toàn bộ cơ sở dữ liệu
          </div>
        </div>

        {/* Tile 2: Shop Orders */}
        <div
          onClick={() => setSelectedStatusTab('shop_order')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '16px 20px',
            border: selectedStatusTab === 'shop_order' ? '1.5px solid #7e22ce' : '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#7e22ce', whiteSpace: 'nowrap' }}>
              🛍️ Đơn Mua Hàng
            </span>
            <ShoppingBag size={16} color="#7e22ce" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#7e22ce', lineHeight: 1.2 }}>
            {stats.shopOrders}
          </div>
          <div style={{ fontSize: '11.5px', color: '#9333ea', marginTop: '3px', whiteSpace: 'nowrap' }}>
            {stats.shopQrPaid > 0 ? `${stats.shopQrPaid} đơn đã quét QR` : 'Đơn hàng Kollection 4U'}
          </div>
        </div>

        {/* Tile 3: Custom Itinerary Planner */}
        <div
          onClick={() => setSelectedStatusTab('custom')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '16px 20px',
            border: selectedStatusTab === 'custom' ? '1.5px solid #0f766e' : '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#0f766e', whiteSpace: 'nowrap' }}>
              ✏️ Thiết Kế Riêng
            </span>
            <Compass size={16} color="#0f766e" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#0f766e', lineHeight: 1.2 }}>
            {stats.customPlanner}
          </div>
          <div style={{ fontSize: '11.5px', color: '#0d9488', marginTop: '3px', whiteSpace: 'nowrap' }}>
            Yêu cầu may đo hành trình
          </div>
        </div>

        {/* Tile 4: Tour Consultation */}
        <div
          onClick={() => setSelectedStatusTab('tour')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '16px 20px',
            border: selectedStatusTab === 'tour' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#1d4ed8', whiteSpace: 'nowrap' }}>
              🌿 Tư Vấn Tour
            </span>
            <PhoneCall size={16} color="#2563eb" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#1d4ed8', lineHeight: 1.2 }}>
            {stats.tourConsultation}
          </div>
          <div style={{ fontSize: '11.5px', color: '#2563eb', marginTop: '3px', whiteSpace: 'nowrap' }}>
            Tour retreat tiêu chuẩn
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. FILTER BAR & SEGMENTED TABS
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '12px 18px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Segmented Status Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Tất cả', count: stats.total },
            { id: 'shop_order', label: '🛍️ Đơn Mua Hàng', count: stats.shopOrders },
            { id: 'custom', label: '✏️ Thiết Kế Riêng', count: stats.customPlanner },
            { id: 'tour', label: '🌿 Tư Vấn Tour', count: stats.tourConsultation },
            { id: 'pending', label: 'Chờ xử lý', count: stats.pending },
            { id: 'completed', label: 'Đã tư vấn', count: stats.completed },
            { id: 'callback', label: 'Hẹn gọi lại / Khác', count: stats.callback }
          ].map((tab) => {
            const isActive = selectedStatusTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedStatusTab(tab.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: isActive ? '#0f172a' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#475569',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#e2e8f0',
                    color: isActive ? '#ffffff' : '#64748b',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '1px 5px',
                    borderRadius: '4px'
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div style={{ position: 'relative', width: '360px', maxWidth: '100%' }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8'
            }}
          />
          <input
            type="text"
            placeholder="Tìm theo tên khách, SĐT, vùng miền, tour..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 30px 8px 34px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '13px',
              backgroundColor: '#f8fafc',
              color: '#0f172a',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'all 0.15s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#0f766e';
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
          />
          {searchFilter && (
            <button
              type="button"
              onClick={() => setSearchFilter('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. ENTERPRISE DATA GRID TABLE
      ───────────────────────────────────────────────────────────── */}
      {filteredList.length === 0 ? (
        <EmptyState
          title="Không tìm thấy yêu cầu phù hợp"
          description="Không có lịch hẹn hoặc yêu cầu thiết kế lịch trình nào khớp với tiêu chí tìm kiếm."
          actionLabel="Tạo Yêu Cầu Mới"
          onAction={() => openCreateModal('consultations')}
          transparent={true}
        />
      ) : (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    color: '#64748b',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  <th style={{ padding: '12px 14px', width: '50px', whiteSpace: 'nowrap' }}>ID</th>
                  <th style={{ padding: '12px 14px', width: '180px', whiteSpace: 'nowrap' }}>Khách Hàng</th>
                  <th style={{ padding: '12px 14px' }}>Hành Trình / Yêu Cầu</th>
                  <th style={{ padding: '12px 14px', width: '160px', whiteSpace: 'nowrap' }}>Thời Gian Liên Hệ</th>
                  <th style={{ padding: '12px 14px', width: '140px', whiteSpace: 'nowrap' }}>Trạng Thái</th>
                  <th style={{ padding: '12px 14px', width: '130px', textAlign: 'right', whiteSpace: 'nowrap' }}>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((item, idx) => {
                  const name = String(item.customerName || item.name || item.customer || 'Khách hàng').trim();
                  const phone = String(item.customerPhone || item.phone || '').trim();
                  const email = String(item.customerEmail || item.email || '').trim();
                  const callTime = item.preferredCallTime || item.preferredTime || 'Linh hoạt';
                  const currentStatus = item.status || 'Chưa tư vấn';
                  const parsed = parseConsultationData(item);

                  // Extract initial for avatar
                  const nameParts = name.split(' ');
                  const initial = nameParts[nameParts.length - 1]?.charAt(0)?.toUpperCase() || 'K';

                  // Status badge configurations
                  let statusConfig = {
                    bg: '#fef3c7',
                    text: '#92400e',
                    border: '#fde68a'
                  };

                  if (currentStatus === 'Đã tư vấn') {
                    statusConfig = {
                      bg: '#dcfce7',
                      text: '#166534',
                      border: '#bbf7d0'
                    };
                  } else if (currentStatus === 'Hẹn gọi lại') {
                    statusConfig = {
                      bg: '#e0f2fe',
                      text: '#075985',
                      border: '#bae6fd'
                    };
                  } else if (currentStatus === 'Không nghe máy') {
                    statusConfig = {
                      bg: '#fee2e2',
                      text: '#991b1b',
                      border: '#fecaca'
                    };
                  }

                  return (
                    <tr
                      key={item.id || idx}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background-color 0.1s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      onClick={() => setSelectedDetailItem(item)}
                    >
                      {/* 1. ID Column */}
                      <td style={{ padding: '14px 14px', fontWeight: 600, color: '#64748b', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                        #{item.id}
                      </td>

                      {/* 2. Customer Column */}
                      <td style={{ padding: '14px 14px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              backgroundColor: parsed.isCustomPlanner ? '#0f766e' : '#e2e8f0',
                              color: parsed.isCustomPlanner ? '#ffffff' : '#334155',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '12px',
                              flexShrink: 0
                            }}
                          >
                            {initial}
                          </div>

                          <div>
                            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '13px', marginBottom: '2px', whiteSpace: 'nowrap' }}>
                              {name}
                            </div>

                            {phone && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', whiteSpace: 'nowrap' }}>
                                <a
                                  href={`tel:${phone}`}
                                  onClick={(e) => e.stopPropagation()}
                                  style={{
                                    color: '#0f766e',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  <Phone size={10} /> {phone}
                                </a>
                                <button
                                  type="button"
                                  title="Sao chép số điện thoại"
                                  onClick={(e) => handleCopyText(phone, `phone-${item.id}`, e)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#94a3b8',
                                    cursor: 'pointer',
                                    padding: '1px 2px',
                                    display: 'inline-flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  {copiedKey === `phone-${item.id}` ? <Check size={10} color="#16a34a" /> : <Copy size={10} />}
                                </button>
                              </div>
                            )}

                            {email && (
                              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px', whiteSpace: 'nowrap' }}>
                                {email}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 3. Journey, Requirements or Shop Order */}
                      <td style={{ padding: '14px 14px' }}>
                        <div>
                          {/* Classification Pill + Title */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            {parsed.isShopOrder ? (
                              <>
                                <span
                                  style={{
                                    backgroundColor: '#f3e8ff',
                                    color: '#7e22ce',
                                    border: '1px solid #e9d5ff',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.04em',
                                    padding: '1px 6px',
                                    borderRadius: '4px',
                                    textTransform: 'uppercase',
                                    whiteSpace: 'nowrap',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    flexShrink: 0
                                  }}
                                >
                                  <ShoppingBag size={10} /> Đơn Mua Hàng
                                </span>
                                {parsed.isQrPaid ? (
                                  <span
                                    style={{
                                      backgroundColor: '#dcfce7',
                                      color: '#15803d',
                                      border: '1px solid #bbf7d0',
                                      fontSize: '9.5px',
                                      fontWeight: 700,
                                      padding: '1px 5px',
                                      borderRadius: '4px',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    <CheckCircle2 size={10} /> ĐÃ QUÉT QR
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      backgroundColor: '#fef3c7',
                                      color: '#b45309',
                                      border: '1px solid #fde68a',
                                      fontSize: '9.5px',
                                      fontWeight: 600,
                                      padding: '1px 5px',
                                      borderRadius: '4px',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    ⏳ CHỜ THANH TOÁN
                                  </span>
                                )}
                              </>
                            ) : parsed.isCustomPlanner ? (
                              <span
                                style={{
                                  backgroundColor: '#f0fdf4',
                                  color: '#166534',
                                  border: '1px solid #bbf7d0',
                                  fontSize: '10px',
                                  fontWeight: 700,
                                  letterSpacing: '0.04em',
                                  padding: '1px 6px',
                                  borderRadius: '4px',
                                  textTransform: 'uppercase',
                                  whiteSpace: 'nowrap',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  flexShrink: 0
                                }}
                              >
                                <Compass size={10} /> Thiết kế riêng
                              </span>
                            ) : (
                              <span
                                style={{
                                  backgroundColor: '#eff6ff',
                                  color: '#1d4ed8',
                                  border: '1px solid #bfdbfe',
                                  fontSize: '10px',
                                  fontWeight: 700,
                                  padding: '1px 6px',
                                  borderRadius: '4px',
                                  textTransform: 'uppercase',
                                  whiteSpace: 'nowrap',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  flexShrink: 0
                                }}
                              >
                                <PhoneCall size={10} /> Tư vấn tour
                              </span>
                            )}

                            <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '13px' }}>
                              {parsed.displayTitle}
                            </span>
                          </div>

                          {/* Structured Detail Snippets */}
                          {parsed.isShopOrder ? (
                            <div
                              style={{
                                backgroundColor: '#faf5ff',
                                border: '1px solid #f3e8ff',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                fontSize: '11.5px',
                                color: '#475569',
                                lineHeight: 1.4
                              }}
                            >
                              {parsed.orderProducts && (
                                <div style={{ fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                                  <Package size={12} style={{ color: '#7e22ce', flexShrink: 0, marginTop: '2px' }} />
                                  <span>{parsed.orderProducts}</span>
                                </div>
                              )}
                              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px 14px', marginTop: '3px' }}>
                                {parsed.orderTotal && (
                                  <span style={{ color: '#065f46', fontWeight: 700 }}>
                                    Tổng: {parsed.orderTotal}
                                  </span>
                                )}
                                {parsed.orderAddress && (
                                  <span style={{ color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                    <MapPin size={10} /> {parsed.orderAddress}
                                  </span>
                                )}
                              </div>
                              {parsed.orderCustomerNote && (
                                <div style={{ color: '#9333ea', marginTop: '2px', fontSize: '11px' }}>
                                  Ghi chú: {parsed.orderCustomerNote}
                                </div>
                              )}
                            </div>
                          ) : parsed.isCustomPlanner ? (
                            <div
                              style={{
                                backgroundColor: '#f8fafc',
                                border: '1px solid #edf2f7',
                                borderRadius: '6px',
                                padding: '5px 10px',
                                fontSize: '11.5px',
                                color: '#475569',
                                lineHeight: 1.4
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px 12px', fontWeight: 500 }}>
                                {parsed.region && (
                                  <span>
                                    <strong style={{ color: '#0f172a' }}>Vùng:</strong> {parsed.region}
                                  </span>
                                )}
                                {parsed.destination && (
                                  <span>
                                    <strong style={{ color: '#0f172a' }}>Điểm đến:</strong> {parsed.destination}
                                  </span>
                                )}
                                {parsed.guests && (
                                  <span>
                                    <strong style={{ color: '#0f172a' }}>Số khách:</strong> {parsed.guests}
                                  </span>
                                )}
                              </div>
                              {parsed.requirements && (
                                <div style={{ color: '#64748b', marginTop: '3px', borderTop: '1px solid #f1f5f9', paddingTop: '3px' }}>
                                  Ghi chú: {parsed.requirements}
                                </div>
                              )}
                            </div>
                          ) : (
                            parsed.rawNote && (
                              <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                                Ghi chú: {parsed.rawNote}
                              </div>
                            )
                          )}
                        </div>
                      </td>

                      {/* 4. Preferred Contact Time */}
                      <td style={{ padding: '14px 14px', whiteSpace: 'nowrap' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: 500,
                            color: '#334155',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <Clock size={11} color="#64748b" />
                          <span style={{ whiteSpace: 'nowrap' }}>{callTime}</span>
                        </div>
                      </td>

                      {/* 5. CRM Status Dropdown */}
                      <td style={{ padding: '14px 14px', whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
                          <select
                            value={currentStatus}
                            onChange={(e) => handleStatusUpdate && handleStatusUpdate(item, e.target.value)}
                            style={{
                              padding: '5px 22px 5px 10px',
                              borderRadius: '6px',
                              border: `1px solid ${statusConfig.border}`,
                              backgroundColor: statusConfig.bg,
                              color: statusConfig.text,
                              fontSize: '11.5px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              outline: 'none',
                              appearance: 'none',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <option value="Chưa tư vấn">Chưa tư vấn</option>
                            <option value="Đã tư vấn">Đã tư vấn</option>
                            <option value="Hẹn gọi lại">Hẹn gọi lại</option>
                            <option value="Không nghe máy">Không nghe máy</option>
                          </select>
                          <ChevronDown
                            size={11}
                            style={{
                              position: 'absolute',
                              right: '6px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none',
                              color: statusConfig.text
                            }}
                          />
                        </div>
                      </td>

                      {/* 6. Action Column */}
                      <td style={{ padding: '14px 14px', textAlign: 'right', whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', flexWrap: 'nowrap' }}>
                          <button
                            type="button"
                            title="Xem chi tiết hồ sơ"
                            onClick={() => setSelectedDetailItem(item)}
                            style={{
                              backgroundColor: '#f1f5f9',
                              color: '#334155',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <Eye size={11} />
                            <span style={{ whiteSpace: 'nowrap' }}>Chi tiết</span>
                          </button>

                          <button
                            type="button"
                            title="Chỉnh sửa thông tin"
                            onClick={() => openEditModal('consultations', item)}
                            style={{
                              width: '50px',
                              height: '32px',
                              backgroundColor: '#f1f5f9',
                              color: '#475569',
                              border: '1px solid #cbd5e1',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Edit2 size={13} />
                          </button>

                          <button
                            type="button"
                            title="Xóa yêu cầu"
                            onClick={() => handleDeleteItem('consultations', item.id)}
                            style={{
                              width: '50px',
                              height: '32px',
                              backgroundColor: '#fee2e2',
                              color: '#dc2626',
                              border: '1px solid #fecdd3',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. ENTERPRISE DETAIL MODAL (CLEAN CRM DOSSIER)
      ───────────────────────────────────────────────────────────── */}
      {selectedDetailItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box'
          }}
          onClick={() => setSelectedDetailItem(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '620px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: '1px solid #e2e8f0',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                    Hồ Sơ Yêu Cầu
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f766e', fontFamily: 'monospace' }}>
                    #{selectedDetailItem.id}
                  </span>
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>
                  {selectedDetailItem.customerName || selectedDetailItem.name || 'Khách Hàng'}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDetailItem(null)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  width: '30px',
                  height: '30px',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal Content Body */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Contact Information Block */}
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 10px 0' }}>
                  Thông Tin Liên Lạc
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '14px 16px'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '2px' }}>
                      Số Điện Thoại / Zalo
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '14px', color: '#0f172a' }}>
                        {selectedDetailItem.customerPhone || selectedDetailItem.phone || 'Chưa cung cấp'}
                      </strong>
                      {selectedDetailItem.customerPhone && (
                        <button
                          type="button"
                          title="Sao chép số điện thoại"
                          onClick={(e) => handleCopyText(selectedDetailItem.customerPhone, 'modal-phone', e)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            padding: '2px'
                          }}
                        >
                          {copiedKey === 'modal-phone' ? <Check size={13} color="#16a34a" /> : <Copy size={12} />}
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '2px' }}>
                      Thời Gian Tiện Gọi
                    </span>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                      {selectedDetailItem.preferredCallTime || selectedDetailItem.preferredTime || 'Linh hoạt'}
                    </div>
                  </div>

                  {selectedDetailItem.customerEmail && (
                    <div>
                      <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '2px' }}>
                        Email
                      </span>
                      <div style={{ fontSize: '13px', color: '#334155' }}>
                        {selectedDetailItem.customerEmail}
                      </div>
                    </div>
                  )}

                  <div>
                    <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '2px' }}>
                      Trạng Thái CSKH
                    </span>
                    <select
                      value={selectedDetailItem.status || 'Chưa tư vấn'}
                      onChange={(e) => {
                        const nextStatus = e.target.value;
                        if (handleStatusUpdate) handleStatusUpdate(selectedDetailItem, nextStatus);
                        setSelectedDetailItem({ ...selectedDetailItem, status: nextStatus });
                      }}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Chưa tư vấn">Chưa tư vấn</option>
                      <option value="Đã tư vấn">Đã tư vấn</option>
                      <option value="Hẹn gọi lại">Hẹn gọi lại</option>
                      <option value="Không nghe máy">Không nghe máy</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Trip, Custom Planner or Shop Order Specifications */}
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 10px 0' }}>
                  Chi Tiết Yêu Cầu / Đơn Hàng
                </h3>

                {(() => {
                  const parsed = parseConsultationData(selectedDetailItem);

                  if (parsed.isShopOrder) {
                    return (
                      <div
                        style={{
                          backgroundColor: '#faf5ff',
                          border: '1px solid #e9d5ff',
                          borderRadius: '8px',
                          padding: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ backgroundColor: '#7e22ce', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                              🛍️ Đơn Mua Hàng
                            </span>
                            <strong style={{ fontSize: '15px', color: '#0f172a' }}>{parsed.displayTitle}</strong>
                          </div>

                          {parsed.isQrPaid ? (
                            <span style={{ backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle2 size={12} /> ĐÃ QUÉT QR THANH TOÁN
                            </span>
                          ) : (
                            <span style={{ backgroundColor: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px' }}>
                              ⏳ CHỜ THANH TOÁN
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#334155' }}>
                          {parsed.orderProducts && (
                            <div>
                              <span style={{ color: '#64748b', minWidth: '130px', display: 'inline-block' }}>Sản phẩm đã chọn:</span>
                              <strong style={{ color: '#0f172a' }}>{parsed.orderProducts}</strong>
                            </div>
                          )}
                          {parsed.orderTotal && (
                            <div>
                              <span style={{ color: '#64748b', minWidth: '130px', display: 'inline-block' }}>Tổng tiền thanh toán:</span>
                              <strong style={{ color: '#065f46', fontSize: '14px' }}>{parsed.orderTotal}</strong>
                            </div>
                          )}
                          {parsed.orderAddress && (
                            <div>
                              <span style={{ color: '#64748b', minWidth: '130px', display: 'inline-block' }}>Địa chỉ giao hàng:</span>
                              <strong style={{ color: '#0f172a' }}>{parsed.orderAddress}</strong>
                            </div>
                          )}
                          {parsed.orderCustomerNote && (
                            <div style={{ marginTop: '6px', paddingTop: '8px', borderTop: '1px solid #e9d5ff' }}>
                              <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Ghi chú đơn hàng:</span>
                              <div
                                style={{
                                  backgroundColor: '#ffffff',
                                  border: '1px solid #e9d5ff',
                                  borderRadius: '6px',
                                  padding: '8px 12px',
                                  color: '#1e293b'
                                }}
                              >
                                {parsed.orderCustomerNote}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  if (parsed.isCustomPlanner) {
                    return (
                      <div
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                          <span style={{ backgroundColor: '#0f766e', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                            ✏️ Thiết Kế Riêng
                          </span>
                          <strong style={{ fontSize: '14.5px', color: '#0f172a' }}>{parsed.displayTitle}</strong>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#334155' }}>
                          {parsed.region && (
                            <div>
                              <span style={{ color: '#64748b', minWidth: '130px', display: 'inline-block' }}>Vùng miền:</span>
                              <strong style={{ color: '#0f172a' }}>{parsed.region}</strong>
                            </div>
                          )}
                          {parsed.destination && (
                            <div>
                              <span style={{ color: '#64748b', minWidth: '130px', display: 'inline-block' }}>Điểm đến:</span>
                              <strong style={{ color: '#0f172a' }}>{parsed.destination}</strong>
                            </div>
                          )}
                          {parsed.guests && (
                            <div>
                              <span style={{ color: '#64748b', minWidth: '130px', display: 'inline-block' }}>Số lượng khách:</span>
                              <strong style={{ color: '#0f172a' }}>{parsed.guests}</strong>
                            </div>
                          )}
                          {parsed.requirements && (
                            <div style={{ marginTop: '6px', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                              <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Nhu cầu cụ thể & Ghi chú:</span>
                              <div
                                style={{
                                  backgroundColor: '#f8fafc',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '6px',
                                  padding: '10px 12px',
                                  whiteSpace: 'pre-line',
                                  lineHeight: 1.5,
                                  color: '#1e293b'
                                }}
                              >
                                {parsed.requirements}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // Default Tour Consultation
                  return (
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '16px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                        <span style={{ backgroundColor: '#1d4ed8', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                          🌿 Tư Vấn Tour
                        </span>
                        <strong style={{ fontSize: '14.5px', color: '#0f172a' }}>{parsed.displayTitle}</strong>
                      </div>

                      {parsed.rawNote && (
                        <div style={{ marginTop: '6px', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                          <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Nội dung tư vấn & Ghi chú:</span>
                          <div
                            style={{
                              backgroundColor: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              padding: '10px 12px',
                              whiteSpace: 'pre-line',
                              lineHeight: 1.5,
                              color: '#1e293b'
                            }}
                          >
                            {parsed.rawNote}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                {selectedDetailItem.customerPhone && (
                  <a
                    href={`tel:${selectedDetailItem.customerPhone}`}
                    style={{
                      backgroundColor: '#0f766e',
                      color: '#ffffff',
                      textDecoration: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <PhoneCall size={14} />
                    <span>Gọi Điện Ngay</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const itm = selectedDetailItem;
                    setSelectedDetailItem(null);
                    openEditModal('consultations', itm);
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#334155',
                    border: '1px solid #cbd5e1',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Chỉnh Sửa
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
