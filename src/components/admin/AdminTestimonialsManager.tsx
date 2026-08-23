import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface AdminTestimonialsManagerProps {
  testimonialsList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
}

export default function AdminTestimonialsManager({
  testimonialsList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem
}: AdminTestimonialsManagerProps) {
  const filtered = testimonialsList.filter(t =>
    t.name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.comment?.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', color: '#081f13', margin: 0, fontWeight: 600 }}>
            Đánh Giá & Trải Nghiệm Khách Hàng (Testimonials)
          </h2>
          <p style={{ fontSize: '13px', color: '#525a54', margin: '4px 0 0 0' }}>
            Quản lý feedback, review và cảm nhận từ các hành khách đã tham gia retreat.
          </p>
        </div>
        <button onClick={() => openCreateModal('testimonials')} style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>+ Thêm Đánh Giá</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filtered.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid rgba(6, 27, 14, 0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <img src={item.avatar} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', color: '#081f13', fontWeight: 700 }}>{item.name}</h4>
                  <span style={{ fontSize: '12px', color: '#525a54' }}>{item.occupation}</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#525a54', margin: '0 0 12px 0', fontStyle: 'italic' }}>"{item.comment}"</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => openEditModal('testimonials', item)}
                style={{
                  width: '50px',
                  height: '32px',
                  backgroundColor: '#081f13',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Chỉnh sửa"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => handleDeleteItem('testimonials', item.id)}
                style={{
                  width: '50px',
                  height: '32px',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  border: '1px solid #fca5a5',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Xóa"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
