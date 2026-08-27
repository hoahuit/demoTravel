import React from 'react';
import './AdminPriceInput.css';

export interface AdminPriceInputProps {
  id?: string;
  label: string;
  value: number | undefined | null;
  onChange: (val: number) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  presets?: number[];
  showPresets?: boolean;
}

export const formatVndNumber = (amount: number | undefined | null): string => {
  if (amount === undefined || amount === null || isNaN(amount) || amount === 0) return '';
  return amount.toLocaleString('vi-VN');
};

export const formatVndReadable = (amount: number | undefined | null): string => {
  if (!amount || amount <= 0) return '0 VNĐ (Miễn phí / Chưa đặt)';
  if (amount >= 1_000_000_000) {
    const ty = (amount / 1_000_000_000).toLocaleString('vi-VN', { maximumFractionDigits: 2 });
    return `${amount.toLocaleString('vi-VN')} VNĐ (~${ty} tỷ)`;
  }
  if (amount >= 1_000_000) {
    const trieu = (amount / 1_000_000).toLocaleString('vi-VN', { maximumFractionDigits: 2 });
    return `${amount.toLocaleString('vi-VN')} VNĐ (~${trieu} triệu)`;
  }
  if (amount >= 1_000) {
    const nghin = (amount / 1_000).toLocaleString('vi-VN', { maximumFractionDigits: 0 });
    return `${amount.toLocaleString('vi-VN')} VNĐ (~${nghin} nghìn)`;
  }
  return `${amount.toLocaleString('vi-VN')} VNĐ`;
};

export default function AdminPriceInput({
  id,
  label,
  value,
  onChange,
  placeholder = 'Ví dụ: 5.000.000',
  hint,
  required = false,
  presets = [500000, 1000000, 5000000],
  showPresets = true,
}: AdminPriceInputProps) {
  const numValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const isZero = numValue === 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const cleanDigits = raw.replace(/\D/g, '');
    if (!cleanDigits) {
      onChange(0);
      return;
    }
    const parsed = parseInt(cleanDigits, 10);
    onChange(isNaN(parsed) ? 0 : parsed);
  };

  const handleAddPreset = (amountToAdd: number) => {
    onChange((numValue || 0) + amountToAdd);
  };

  const handleReset = () => {
    onChange(0);
  };

  return (
    <div className="serene-price-group">
      <div className="serene-price-header">
        <label htmlFor={id} className="serene-price-label">
          {label} {required && <span className="serene-required-star">*</span>}
        </label>
        <span className={`serene-price-badge-preview ${isZero ? 'zero' : ''}`}>
          {formatVndReadable(numValue)}
        </span>
      </div>

      <div className="serene-price-input-wrapper">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={formatVndNumber(numValue)}
          onChange={handleChange}
          required={required}
          className="serene-price-input"
          autoComplete="off"
        />
        <span className="serene-price-unit-tag">VNĐ</span>
      </div>

      {showPresets && (
        <div className="serene-price-presets">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handleAddPreset(preset)}
              className="serene-price-preset-btn"
              title={`Cộng thêm ${preset.toLocaleString('vi-VN')} VNĐ`}
            >
              +{preset >= 1000000 ? `${(preset / 1000000).toLocaleString('vi-VN')}tr` : `${(preset / 1000).toLocaleString('vi-VN')}k`}
            </button>
          ))}
          {!isZero && (
            <button
              type="button"
              onClick={handleReset}
              className="serene-price-preset-btn reset"
              title="Đặt giá về 0 VNĐ"
            >
              Đặt về 0
            </button>
          )}
        </div>
      )}

      {hint && <p className="serene-price-hint">{hint}</p>}
    </div>
  );
}
