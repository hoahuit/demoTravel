import React, { useState, useRef } from 'react';
import {
  FileSpreadsheet,
  Download,
  UploadCloud,
  X,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Loader2,
  Info
} from 'lucide-react';
import {
  downloadExcelTemplate,
  importExcelApi,
  ExcelImportApiResponse
} from '../../services/apiService';

interface AdminExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'tours' | 'products';
  onSuccess: () => void;
  toast?: any;
}

export default function AdminExcelImportModal({
  isOpen,
  onClose,
  type,
  onSuccess,
  toast,
}: AdminExcelImportModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isServerDefault, setIsServerDefault] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExcelImportApiResponse | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const isTour = type === 'tours';
  const title = isTour ? 'Nhập Dữ Liệu Gói Tour Từ Excel' : 'Nhập Dữ Liệu Sản Phẩm Từ Excel';
  const templateFilename = isTour ? 'tour-update.xlsx' : 'kollection4u-update.xlsx';

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadExcelTemplate(type);
      toast?.success?.(`Đã tải xuống file mẫu "${templateFilename}"!`);
    } catch (err: any) {
      toast?.error?.(`Lỗi tải file mẫu: ${err?.message || err}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        toast?.error?.('Vui lòng chọn file định dạng Excel (.xlsx hoặc .xls)!');
        return;
      }
      setSelectedFile(file);
      setIsServerDefault(false);
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        toast?.error?.('Vui lòng chọn file định dạng Excel (.xlsx hoặc .xls)!');
        return;
      }
      setSelectedFile(file);
      setIsServerDefault(false);
      setResult(null);
    }
  };

  const handleStartImport = async () => {
    if (!selectedFile && !isServerDefault) {
      toast?.warning?.('Vui lòng chọn file Excel từ máy tính hoặc tích chọn dùng file máy chủ!');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await importExcelApi(type, isServerDefault ? null : selectedFile);
      setResult(res);

      if (res.success) {
        toast?.success?.(
          `Import thành công! Đã xử lý ${res.importedCount} mục (${res.createdCount} mới, ${res.updatedCount} cập nhật)`
        );
        onSuccess();
      }
    } catch (err: any) {
      toast?.error?.(`Lỗi khi import: ${err?.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setIsServerDefault(false);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f8fafc',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #a7f3d0',
              }}
            >
              <FileSpreadsheet size={22} />
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#0f172a',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {title}
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
                Hỗ trợ tải template chuẩn, import tự động và đồng bộ cơ sở dữ liệu
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <X size={20} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* STEP 1: DOWNLOAD TEMPLATE CARD */}
          <div
            style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  flexShrink: 0,
                }}
              >
                <Download size={18} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#14532d' }}>
                  Template Mẫu: <span style={{ fontFamily: 'monospace' }}>{templateFilename}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#15803d', marginTop: '2px' }}>
                  {isTour
                    ? 'Gồm 5 tabs (Thông Tin & Phân Phối, Bảng Giá & Dịch Vụ, Điểm Nổi Bật, Lịch Trình, Bộ Sưu Tập)'
                    : 'Gồm 15 cột chuẩn (SKU, Giá bán, Giá niêm yết, Tồn kho, Hero Image, Gallery, Thông số...)'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              style={{
                backgroundColor: '#16a34a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '9px 16px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: isDownloading ? 'wait' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={(e) => {
                if (!isDownloading) e.currentTarget.style.backgroundColor = '#15803d';
              }}
              onMouseLeave={(e) => {
                if (!isDownloading) e.currentTarget.style.backgroundColor = '#16a34a';
              }}
            >
              {isDownloading ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
              <span>Tải File Mẫu</span>
            </button>
          </div>

          {/* STEP 2: CHOOSE FILE OR SERVER FILE */}
          {!result && (
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#334155',
                  marginBottom: '8px',
                }}
              >
                Tải lên tập tin Excel (.xlsx) cần import:
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {/* DROP ZONE */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                style={{
                  border: isDragOver ? '2px dashed #059669' : '2px dashed #cbd5e1',
                  backgroundColor: isDragOver ? '#ecfdf5' : '#f8fafc',
                  borderRadius: '12px',
                  padding: '32px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#e2e8f0',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                  }}
                >
                  <UploadCloud size={24} />
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>
                  {selectedFile ? (
                    <span style={{ color: '#059669' }}>Tập tin đã chọn: {selectedFile.name}</span>
                  ) : (
                    'Kéo & thả file Excel vào đây, hoặc bấm để duyệt file'
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  Hỗ trợ định dạng .xlsx, .xls (dung lượng tối đa 25MB)
                </div>
              </div>

              {/* FILE SELECTED BADGE */}
              {selectedFile && (
                <div
                  style={{
                    marginTop: '10px',
                    padding: '8px 14px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileCheck size={16} color="#059669" />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                      {selectedFile.name}
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Xóa
                  </button>
                </div>
              )}

              {/* OR CHECKBOX FOR SERVER FILE */}
              <div
                style={{
                  marginTop: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                }}
              >
                <input
                  type="checkbox"
                  id="serverFileCheckbox"
                  checked={isServerDefault}
                  onChange={(e) => {
                    setIsServerDefault(e.target.checked);
                    if (e.target.checked) setSelectedFile(null);
                  }}
                  style={{ cursor: 'pointer', accentColor: '#0f766e', width: '16px', height: '16px' }}
                />
                <label
                  htmlFor="serverFileCheckbox"
                  style={{ fontSize: '13px', color: '#334155', cursor: 'pointer', fontWeight: 500 }}
                >
                  Sử dụng file có sẵn trên máy chủ (
                  <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{templateFilename}</span>)
                </label>
              </div>

              {/* NOTICE BOX */}
              <div
                style={{
                  marginTop: '14px',
                  display: 'flex',
                  gap: '10px',
                  padding: '12px 14px',
                  backgroundColor: '#fffbeb',
                  borderRadius: '8px',
                  border: '1px solid #fef3c7',
                  fontSize: '12.5px',
                  color: '#92400e',
                  lineHeight: '1.5',
                }}
              >
                <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Cơ chế Upsert thông minh:</strong> Hệ thống tự động so khớp theo{' '}
                  <strong>{isTour ? 'Slug / Tên Tour' : 'Mã SKU / Slug / Tên Sản phẩm'}</strong>. Nếu đã tồn
                  tại trong cơ sở dữ liệu, bản ghi sẽ được cập nhật đồng bộ các chi tiết con; nếu chưa có, sẽ được tạo mới hoàn toàn.
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: RESULT DISPLAY */}
          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <CheckCircle2 size={32} color="#16a34a" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#14532d' }}>
                    Quá Trình Import Đã Hoàn Tất!
                  </div>
                  <div style={{ fontSize: '13px', color: '#15803d', marginTop: '2px' }}>
                    Đã xử lý tổng cộng <strong>{result.importedCount}</strong> bản ghi (
                    <span style={{ color: '#047857', fontWeight: 600 }}>{result.createdCount} tạo mới</span>,{' '}
                    <span style={{ color: '#0369a1', fontWeight: 600 }}>{result.updatedCount} cập nhật</span>)
                  </div>
                </div>
              </div>

              {/* ITEMS LIST */}
              {result.items && result.items.length > 0 && (
                <div
                  style={{
                    maxHeight: '220px',
                    overflowY: 'auto',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                        <th style={{ padding: '10px 14px', color: '#64748b' }}>Hành động</th>
                        <th style={{ padding: '10px 14px', color: '#64748b' }}>ID</th>
                        <th style={{ padding: '10px 14px', color: '#64748b' }}>Tên</th>
                        <th style={{ padding: '10px 14px', color: '#64748b' }}>Slug</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.items.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px 14px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                backgroundColor: item.action === 'created' ? '#dcfce7' : '#e0f2fe',
                                color: item.action === 'created' ? '#15803d' : '#0369a1',
                              }}
                            >
                              {item.action === 'created' ? 'MỚI' : 'CẬP NHẬT'}
                            </span>
                          </td>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#334155' }}>
                            #{item.id}
                          </td>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#0f172a' }}>
                            {item.title}
                          </td>
                          <td style={{ padding: '8px 14px', color: '#64748b', fontFamily: 'monospace' }}>
                            {item.slug}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* WARNINGS / ERRORS */}
              {result.errors && result.errors.length > 0 && (
                <div
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    fontSize: '12.5px',
                    color: '#991b1b',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px' }}>
                    <AlertTriangle size={15} />
                    <span>Các cảnh báo / lỗi cần chú ý:</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {result.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          {result ? (
            <>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Import file khác
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '9px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#0f766e',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Xong & Đóng
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Hủy Bỏ
              </button>

              <button
                type="button"
                onClick={handleStartImport}
                disabled={loading || (!selectedFile && !isServerDefault)}
                style={{
                  padding: '9px 22px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: loading || (!selectedFile && !isServerDefault) ? '#94a3b8' : '#0f766e',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: loading || (!selectedFile && !isServerDefault) ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 1px 3px rgba(15, 118, 110, 0.2)',
                  transition: 'all 0.15s ease',
                }}
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                <span>{loading ? 'Đang Xử Lý...' : 'Tiến Hành Import'}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
