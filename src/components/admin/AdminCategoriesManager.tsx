import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  fetchMenuCategoriesApi,
  createMenuCategoryApi,
  saveMenuCategoryApi,
  deleteMenuCategoryApi,
  MenuCategoryItem
} from '../../services/apiService';
import '../Admin.css';

interface AdminCategoriesManagerProps {
  toast?: any;
}

// Full rich icon library with Vietnamese descriptions and searchable keywords
export interface IconOption {
  name: string;
  label: string;
  category: 'nature' | 'travel' | 'badge' | 'shop' | 'content';
  categoryLabel: string;
  keywords: string;
}

export const ICON_LIBRARY: IconOption[] = [
  // Thiên nhiên & Sức khỏe (Nature & Wellness)
  { name: 'eco', label: 'Lá cây / Sinh thái', category: 'nature', categoryLabel: 'Thiên nhiên', keywords: 'la cay thien nhien sinh thai rung eco leaf' },
  { name: 'healing', label: 'Chữa lành / Trị liệu', category: 'nature', categoryLabel: 'Thiên nhiên', keywords: 'chua lanh tri lieu healing health suc khoe' },
  { name: 'spa', label: 'Spa / Thư giãn', category: 'nature', categoryLabel: 'Thiên nhiên', keywords: 'spa thu gian massage tam hon' },
  { name: 'self_improvement', label: 'Thiền / Tâm trí', category: 'nature', categoryLabel: 'Thiên nhiên', keywords: 'thien yoga tam hon self improvement binh yen' },
  { name: 'nature', label: 'Cây cối / Tự nhiên', category: 'nature', categoryLabel: 'Thiên nhiên', keywords: 'thien nhien cay coi nature hoang so' },
  { name: 'park', label: 'Công viên / Thảo mộc', category: 'nature', categoryLabel: 'Thiên nhiên', keywords: 'cong vien thao moc park tree cay xanh' },
  { name: 'forest', label: 'Rừng nguyên sinh', category: 'nature', categoryLabel: 'Thiên nhiên', keywords: 'rung nguyen sinh forest cay dai ngan' },
  { name: 'psychology', label: 'Tâm lý / Triết lý', category: 'nature', categoryLabel: 'Thiên nhiên', keywords: 'tam ly triet ly dau oc psychology trai nghiem' },
  { name: 'water_drop', label: 'Suối nguồn / Nước', category: 'nature', categoryLabel: 'Thiên nhiên', keywords: 'nuoc suoi khoang nong water drop' },
  { name: 'sunny', label: 'Ánh nắng / Bình minh', category: 'nature', categoryLabel: 'Thiên nhiên', keywords: 'nang binh minh mat troi sun hoang hon' },

  // Du lịch & Điểm đến (Travel & Destinations)
  { name: 'explore', label: 'Khám phá điểm đến', category: 'travel', categoryLabel: 'Du lịch', keywords: 'kham pha diem den explore compass la ban' },
  { name: 'location_on', label: 'Địa điểm / Vùng miền', category: 'travel', categoryLabel: 'Du lịch', keywords: 'dia diem vi tri vung mien location map pin bac trung nam' },
  { name: 'travel_explore', label: 'Cẩm nang du lịch', category: 'travel', categoryLabel: 'Du lịch', keywords: 'cam nang du lich travel trai nghiem' },
  { name: 'route', label: 'Lộ trình / Hành trình', category: 'travel', categoryLabel: 'Du lịch', keywords: 'lo trinh hanh trinh route duong di van phong' },
  { name: 'flight', label: 'Máy bay / Di chuyển', category: 'travel', categoryLabel: 'Du lịch', keywords: 'may bay flight airline ve di chuyen' },
  { name: 'hotel', label: 'Resort / Khách sạn', category: 'travel', categoryLabel: 'Du lịch', keywords: 'resort khach san hotel phong nghi' },
  { name: 'beach_access', label: 'Biển đảo / Nghỉ mát', category: 'travel', categoryLabel: 'Du lịch', keywords: 'bien dao nghi duong beach du cat trang' },
  { name: 'landscape', label: 'Núi non / Phong cảnh', category: 'travel', categoryLabel: 'Du lịch', keywords: 'nui non phong canh landscape mountain hung vi' },
  { name: 'directions_bus', label: 'Xe đưa đón', category: 'travel', categoryLabel: 'Du lịch', keywords: 'xe bus dua don limousine' },

  // Huy hiệu & Điểm nhấn (Badges & Highlights)
  { name: 'crown', label: 'Vương miện (Crown)', category: 'badge', categoryLabel: 'Huy hiệu', keywords: 'crown vuong mien doc quyen hoang gia vip king queen' },
  { name: 'workspace_premium', label: 'Đặc quyền VIP (Premium)', category: 'badge', categoryLabel: 'Huy hiệu', keywords: 'doc quyen vip premium crown vuong mien dac quyen' },
  { name: 'diamond', label: 'Kim cương (Diamond)', category: 'badge', categoryLabel: 'Huy hiệu', keywords: 'diamond kim cuong quy gia sang trong vip' },
  { name: 'emoji_events', label: 'Cúp vàng / Danh hiệu', category: 'badge', categoryLabel: 'Huy hiệu', keywords: 'cup vang cup danh hieu trophy gold giai thuong' },
  { name: 'calendar_today', label: 'Lịch mới / Khởi hành', category: 'badge', categoryLabel: 'Huy hiệu', keywords: 'lich moi khoi hanh calendar date sap toi' },
  { name: 'local_fire_department', label: 'Hot / Không thể bỏ lỡ', category: 'badge', categoryLabel: 'Huy hiệu', keywords: 'hot khong the bo lo flame lua chay thinh hanh' },
  { name: 'timer', label: 'Giờ chót / Flash Sale', category: 'badge', categoryLabel: 'Huy hiệu', keywords: 'gio chot uu dai flash sale timer dong ho giam gia' },
  { name: 'stars', label: 'Đặc sắc / 5 Sao', category: 'badge', categoryLabel: 'Huy hiệu', keywords: 'dac sac ngoi sao star rating danh gia cao' },
  { name: 'shield', label: 'Bảo tồn / An toàn', category: 'badge', categoryLabel: 'Huy hiệu', keywords: 'bao ton an toan shield la chan rung' },
  { name: 'volunteer_activism', label: 'Thiện nguyện / Yêu thương', category: 'badge', categoryLabel: 'Huy hiệu', keywords: 'thien nguyen trai tim yeu thuong volunteer heart gieo mam' },
  { name: 'favorite', label: 'Yêu thích', category: 'badge', categoryLabel: 'Huy hiệu', keywords: 'yeu thich tym trai tim favorite' },
  { name: 'verified', label: 'Chứng thực / Đạt chuẩn', category: 'badge', categoryLabel: 'Huy hiệu', keywords: 'chung thuc dat chuan verify check' },

  // Nội dung & Bài viết (Content)
  { name: 'menu_book', label: '101 Điều Hay / Sách', category: 'content', categoryLabel: 'Nội dung', keywords: '101 dieu hay sach doc book kien thuc' },
  { name: 'article', label: 'Bài viết / Tạp chí', category: 'content', categoryLabel: 'Nội dung', keywords: 'bai viet tap chi tin tuc article doc song khoe' },
  { name: 'lightbulb', label: 'Lưu ý / Mẹo hay', category: 'content', categoryLabel: 'Nội dung', keywords: 'luu y meo hay y tuong lightbulb bong den thiet ke' },
  { name: 'help', label: 'Vì sao chọn / Hỏi đáp', category: 'content', categoryLabel: 'Nội dung', keywords: 'vi sao chon hoi dap faq help cau hoi' },

  // Mua sắm & Sản phẩm (Shop & Products)
  { name: 'shopping_bag', label: 'Kollection 4U / Mua sắm', category: 'shop', categoryLabel: 'Sản phẩm', keywords: 'kollection mua sam shopping bag gio hang' },
  { name: 'card_giftcard', label: 'Quà lưu niệm / Gift', category: 'shop', categoryLabel: 'Sản phẩm', keywords: 'qua luu niem hop qua gift card ky niem' },
  { name: 'backpack', label: 'Trang bị / Balo', category: 'shop', categoryLabel: 'Sản phẩm', keywords: 'trang bi balo tui du lich backpack dung cu' },
  { name: 'check_circle', label: 'Thiết yếu / Cần thiết', category: 'shop', categoryLabel: 'Sản phẩm', keywords: 'thiet yeu vat dung check circle khong the thieu' },
  { name: 'sell', label: 'Mã giảm / Thẻ giá', category: 'shop', categoryLabel: 'Sản phẩm', keywords: 'ma giam the gia tag discount sell voucher' },
  { name: 'inventory_2', label: 'Gói combo / Hộp quà', category: 'shop', categoryLabel: 'Sản phẩm', keywords: 'goi combo hop qua inventory package' },
  { name: 'bug_report', label: 'Kiểm tra hệ thống', category: 'shop', categoryLabel: 'Sản phẩm', keywords: 'bug test kiem tra he thong' }
];

export const ICON_CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'nature', label: '🌿 Thiên nhiên' },
  { id: 'travel', label: '🧭 Du lịch' },
  { id: 'badge', label: '👑 Huy hiệu' },
  { id: 'content', label: '📖 Nội dung' },
  { id: 'shop', label: '🛍️ Sản phẩm' }
];

// Initial fallback mock items matching Figma if API is empty
const DEFAULT_INITIAL_CATEGORIES: MenuCategoryItem[] = [
  // Fixed Top Badges
  { name: 'Retreats Độc quyền', slug: 'doc-quyen', menuType: 'fixed_top', orderIndex: 1, icon: 'workspace_premium', color: '#15fa30ff', description: 'Đặc quyền thành viên' },
  { name: 'Retreats Mới', slug: 'sap-khoi-hanh', menuType: 'fixed_top', orderIndex: 2, icon: 'calendar_today', color: '#ffffff', description: 'Lịch trình khởi hành mới' },
  { name: 'KHÔNG THỂ BỎ LỠ', slug: 'khong-the-bo-lo', menuType: 'fixed_top', orderIndex: 3, icon: 'local_fire_department', color: '#ffffff', description: 'Tour thịnh hành nhất' },
  { name: 'Ưu đãi GIỜ CHÓT', slug: 'uu-dai-gio-chot', menuType: 'fixed_top', orderIndex: 4, icon: 'timer', color: '#ffffff', description: 'Giảm giá đặc biệt' },

  // Mega Parents & Children
  // Column 1: Series Retreat
  { name: 'Series Retreat', slug: 'series-retreat', menuType: 'mega_menu', orderIndex: 1, icon: 'eco', color: '#059669', description: 'Các dòng tour retreat đặc sắc' },
  { name: 'Retreat Chữa lành', slug: 'chua-lanh', parentSlug: 'series-retreat', menuType: 'mega_menu', orderIndex: 1, icon: 'healing', color: '#059669', description: 'Chữa lành Thân - Tâm - Trí' },
  { name: 'Retreat Bảo tồn', slug: 'bao-ton', parentSlug: 'series-retreat', menuType: 'mega_menu', orderIndex: 2, icon: 'shield', color: '#059669', description: 'Bảo tồn rừng nguyên sinh' },
  { name: 'Retreat Thiên nhiên', slug: 'thien-nhien', parentSlug: 'series-retreat', menuType: 'mega_menu', orderIndex: 3, icon: 'nature', color: '#059669', description: 'Hòa mình vẻ đẹp hoang sơ' },
  { name: 'Retreat Thiện nguyện', slug: 'thien-nguyen', parentSlug: 'series-retreat', menuType: 'mega_menu', orderIndex: 4, icon: 'volunteer_activism', color: '#059669', description: 'Gieo mầm yêu thương' },

  // Column 2: Khám phá điểm đến
  { name: 'Khám phá điểm đến', slug: 'diem-den', menuType: 'mega_menu', orderIndex: 2, icon: 'explore', color: '#ea580c', description: 'Hành trình 3 miền' },
  { name: 'Miền Bắc', slug: 'mien-bac', parentSlug: 'diem-den', menuType: 'mega_menu', orderIndex: 1, icon: 'location_on', color: '#ea580c', description: 'Vùng cao hùng vĩ' },
  { name: 'Miền Trung', slug: 'mien-trung', parentSlug: 'diem-den', menuType: 'mega_menu', orderIndex: 2, icon: 'location_on', color: '#ea580c', description: 'Biển xanh cát trắng' },
  { name: 'Miền Nam', slug: 'mien-nam', parentSlug: 'diem-den', menuType: 'mega_menu', orderIndex: 3, icon: 'location_on', color: '#ea580c', description: 'Sông nước hữu tình' },

  // Column 3: 101 Điều HAY
  { name: '101 Điều HAY', slug: '101-dieu-hay', menuType: 'mega_menu', orderIndex: 3, icon: 'menu_book', color: '#d4af37', description: 'Cẩm nang & chia sẻ' },
  { name: 'Bài viết chữa lành', slug: 'bai-viet-chua-lanh', parentSlug: '101-dieu-hay', menuType: 'mega_menu', orderIndex: 1, icon: 'article', color: '#d4af37', description: 'Kiến thức sống khỏe' },
  { name: 'Du lịch', slug: 'du-lich', parentSlug: '101-dieu-hay', menuType: 'mega_menu', orderIndex: 2, icon: 'travel_explore', color: '#d4af37', description: 'Cẩm nang khám phá' },
  { name: 'Thư giãn tâm hồn', slug: 'thu-gian-tam-hon', parentSlug: '101-dieu-hay', menuType: 'mega_menu', orderIndex: 3, icon: 'self_improvement', color: '#d4af37', description: 'Góc nhỏ bình yên' },

  // Column 4: Kollection 4U
  { name: 'Kollection 4U', slug: 'kollection-4u', menuType: 'mega_menu', orderIndex: 4, icon: 'shopping_bag', color: '#ea580c', description: 'Sản phẩm lưu niệm & tiện ích' },
  { name: 'Quà lưu niệm', slug: 'qua-luu-niem', parentSlug: 'kollection-4u', menuType: 'mega_menu', orderIndex: 1, icon: 'card_giftcard', color: '#ea580c', description: 'Kỷ niệm chuyến đi' },
  { name: 'Trang bị', slug: 'trang-bi', parentSlug: 'kollection-4u', menuType: 'mega_menu', orderIndex: 2, icon: 'backpack', color: '#ea580c', description: 'Đồ dùng chuyên dụng' },
  { name: 'Thiết yếu', slug: 'thiet-yeu', parentSlug: 'kollection-4u', menuType: 'mega_menu', orderIndex: 3, icon: 'check_circle', color: '#ea580c', description: 'Vật dụng không thể thiếu' },
  { name: 'test', slug: 'test', parentSlug: 'kollection-4u', menuType: 'mega_menu', orderIndex: 4, icon: 'bug_report', color: '#ea580c', description: 'Mục kiểm tra hệ thống' },

  // Column 5: Vì sao chọn 4U?
  { name: 'Vì sao chọn 4U?', slug: 'vi-sao-chon-4u', menuType: 'mega_menu', orderIndex: 5, icon: 'help', color: '#06170d', description: 'Giá trị cốt lõi & câu chuyện' },
  { name: 'Triết lý thiết kế', slug: 'triet-ly-thiet-ke', parentSlug: 'vi-sao-chon-4u', menuType: 'mega_menu', orderIndex: 1, icon: 'psychology', color: '#06170d', description: 'Tâm huyết trải nghiệm' },
  { name: 'Hành trình vp', slug: 'hanh-trinh-vp', parentSlug: 'vi-sao-chon-4u', menuType: 'mega_menu', orderIndex: 2, icon: 'route', color: '#06170d', description: 'Văn phòng và đội ngũ' }
];

export default function AdminCategoriesManager({ toast }: AdminCategoriesManagerProps) {
  const [categories, setCategories] = useState<MenuCategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'kanban' | 'list' | 'trash'>('kanban');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [trashItems, setTrashItems] = useState<MenuCategoryItem[]>([]);

  // Modal State
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Partial<MenuCategoryItem>>({
    name: '',
    slug: '',
    parentSlug: null,
    menuType: 'mega_menu',
    orderIndex: 1,
    icon: 'eco',
    color: '#059669',
    description: ''
  });

  // Visual Icon Picker State
  const [iconPickerOpen, setIconPickerOpen] = useState<boolean>(true);
  const [iconSearchQuery, setIconSearchQuery] = useState<string>('');
  const [iconCategoryFilter, setIconCategoryFilter] = useState<string>('all');

  // Sub-links Manager UI state
  const [showAdvancedSubItems, setShowAdvancedSubItems] = useState<boolean>(false);
  const [customLinkInput, setCustomLinkInput] = useState<string>('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadCategories = async (force = false) => {
    setLoading(true);
    try {
      const data = await fetchMenuCategoriesApi(force);
      if (Array.isArray(data) && data.length > 0) {
        setCategories(data);
      } else {
        setCategories(DEFAULT_INITIAL_CATEGORIES);
      }
    } catch (err: any) {
      console.warn('[LOAD CATEGORIES WARNING]', err);
      setCategories(DEFAULT_INITIAL_CATEGORIES);
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

  // Drag and Drop State
  const [dragItem, setDragItem] = useState<{
    type: 'column' | 'card' | 'badge';
    slug: string;
    parentSlug?: string | null;
  } | null>(null);

  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  // Column Drag & Drop
  const handleColumnDragStart = (e: React.DragEvent, parentSlug: string) => {
    setDragItem({ type: 'column', slug: parentSlug });
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'column', slug: parentSlug }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleColumnDragOver = (e: React.DragEvent, targetParentSlug: string) => {
    e.preventDefault();
    if (dragItem?.type === 'column' && dragItem.slug !== targetParentSlug) {
      setDragOverKey(`col-${targetParentSlug}`);
    } else if (dragItem?.type === 'card') {
      setDragOverKey(`col-card-${targetParentSlug}`);
    }
  };

  const handleColumnDrop = async (e: React.DragEvent, targetParentSlug: string) => {
    e.preventDefault();
    setDragOverKey(null);

    if (!dragItem) return;

    // Case A: Reordering Columns
    if (dragItem.type === 'column') {
      if (dragItem.slug === targetParentSlug) return;

      const currentMegaParents = categories.filter((c) => c.menuType !== 'fixed_top' && !c.parentSlug);
      const sourceIndex = currentMegaParents.findIndex((c) => c.slug === dragItem.slug);
      const targetIndex = currentMegaParents.findIndex((c) => c.slug === targetParentSlug);

      if (sourceIndex === -1 || targetIndex === -1) return;

      const newParents = [...currentMegaParents];
      const [moved] = newParents.splice(sourceIndex, 1);
      newParents.splice(targetIndex, 0, moved);

      // Re-assign orderIndex
      const updatedParents = newParents.map((p, idx) => ({ ...p, orderIndex: idx + 1 }));
      const otherCategories = categories.filter((c) => c.menuType === 'fixed_top' || c.parentSlug);
      const newAllCategories = [...otherCategories, ...updatedParents];

      setCategories(newAllCategories);
      setDragItem(null);

      try {
        await Promise.all(updatedParents.map((p) => saveMenuCategoryApi(p.id || p.slug, p)));
        toast?.show?.('Đã cập nhật vị trí cột Kanban!', 'success');
        toast?.success?.('Đã cập nhật vị trí cột Kanban!');
      } catch {
        toast?.show?.('Đã lưu vị trí cột cục bộ!', 'success');
      }
      return;
    }

    // Case B: Dropping a Card directly into a column container
    if (dragItem.type === 'card') {
      const movedCard = categories.find((c) => c.slug === dragItem.slug);
      if (!movedCard) return;

      const oldParent = movedCard.parentSlug;
      const newParent = targetParentSlug;

      if (oldParent === newParent) return;

      const updatedCard = { ...movedCard, parentSlug: newParent };
      const newAllCategories = categories.map((c) => (c.slug === movedCard.slug ? updatedCard : c));

      setCategories(newAllCategories);
      setDragItem(null);

      try {
        await saveMenuCategoryApi(updatedCard.id || updatedCard.slug, updatedCard);
        toast?.show?.(`Đã chuyển "${updatedCard.name}" sang cột mới!`, 'success');
        toast?.success?.(`Đã chuyển "${updatedCard.name}" sang cột mới!`);
      } catch {
        toast?.show?.(`Đã chuyển "${updatedCard.name}" sang cột mới!`, 'success');
      }
    }
  };

  // Card Drag & Drop
  const handleCardDragStart = (e: React.DragEvent, cardSlug: string, parentSlug: string) => {
    e.stopPropagation();
    setDragItem({ type: 'card', slug: cardSlug, parentSlug });
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'card', slug: cardSlug, parentSlug }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCardDragOver = (e: React.DragEvent, targetCardSlug: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragItem?.type === 'card' && dragItem.slug !== targetCardSlug) {
      setDragOverKey(`card-${targetCardSlug}`);
    }
  };

  const handleCardDrop = async (e: React.DragEvent, targetCardSlug: string, targetParentSlug: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverKey(null);

    if (!dragItem || dragItem.type !== 'card') return;
    if (dragItem.slug === targetCardSlug) return;

    const movedCard = categories.find((c) => c.slug === dragItem.slug);
    if (!movedCard) return;

    const targetCards = categories.filter((c) => c.parentSlug === targetParentSlug && c.slug !== movedCard.slug);
    const targetIndex = targetCards.findIndex((c) => c.slug === targetCardSlug);

    const updatedCard = { ...movedCard, parentSlug: targetParentSlug };
    const newTargetCards = [...targetCards];
    if (targetIndex === -1) {
      newTargetCards.push(updatedCard);
    } else {
      newTargetCards.splice(targetIndex, 0, updatedCard);
    }

    const updatedTargetCards = newTargetCards.map((c, idx) => ({ ...c, orderIndex: idx + 1 }));
    const otherCategories = categories.filter((c) => c.parentSlug !== targetParentSlug && c.slug !== movedCard.slug);
    const newAllCategories = [...otherCategories, ...updatedTargetCards];

    setCategories(newAllCategories);
    setDragItem(null);

    try {
      await Promise.all(updatedTargetCards.map((c) => saveMenuCategoryApi(c.id || c.slug, c)));
      toast?.show?.(`Đã sắp xếp lại vị trí "${movedCard.name}"!`, 'success');
      toast?.success?.(`Đã sắp xếp lại vị trí "${movedCard.name}"!`);
    } catch {
      toast?.show?.(`Đã cập nhật vị trí "${movedCard.name}"!`, 'success');
    }
  };

  // Fixed Top Badge Drag & Drop
  const handleBadgeDragStart = (e: React.DragEvent, badgeSlug: string) => {
    setDragItem({ type: 'badge', slug: badgeSlug });
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'badge', slug: badgeSlug }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleBadgeDragOver = (e: React.DragEvent, targetBadgeSlug: string) => {
    e.preventDefault();
    if (dragItem?.type === 'badge' && dragItem.slug !== targetBadgeSlug) {
      setDragOverKey(`badge-${targetBadgeSlug}`);
    }
  };

  const handleBadgeDrop = async (e: React.DragEvent, targetBadgeSlug: string) => {
    e.preventDefault();
    setDragOverKey(null);

    if (!dragItem || dragItem.type !== 'badge') return;
    if (dragItem.slug === targetBadgeSlug) return;

    const currentBadges = categories.filter((c) => c.menuType === 'fixed_top');
    const sourceIdx = currentBadges.findIndex((c) => c.slug === dragItem.slug);
    const targetIdx = currentBadges.findIndex((c) => c.slug === targetBadgeSlug);

    if (sourceIdx === -1 || targetIdx === -1) return;

    const newBadges = [...currentBadges];
    const [moved] = newBadges.splice(sourceIdx, 1);
    newBadges.splice(targetIdx, 0, moved);

    const updatedBadges = newBadges.map((b, idx) => ({ ...b, orderIndex: idx + 1 }));
    const otherCategories = categories.filter((c) => c.menuType !== 'fixed_top');
    const newAllCategories = [...updatedBadges, ...otherCategories];

    setCategories(newAllCategories);
    setDragItem(null);

    try {
      await Promise.all(updatedBadges.map((b) => saveMenuCategoryApi(b.id || b.slug, b)));
      toast?.show?.('Đã cập nhật thứ tự Fixed Badges!', 'success');
      toast?.success?.('Đã cập nhật thứ tự Fixed Badges!');
    } catch {
      toast?.show?.('Đã lưu thứ tự Fixed Badges!', 'success');
    }
  };

  // Grouped structure
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

  // Potential parents (items without parentSlug)
  const potentialParents = useMemo(() => {
    return categories.filter((c) => !c.parentSlug && c.menuType !== 'fixed_top');
  }, [categories]);

  // Filtered icons for visual picker
  const filteredIcons = useMemo(() => {
    return ICON_LIBRARY.filter((item) => {
      const matchCat = iconCategoryFilter === 'all' || item.category === iconCategoryFilter;
      if (!matchCat) return false;
      if (!iconSearchQuery.trim()) return true;
      const q = iconSearchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.label.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
      );
    });
  }, [iconSearchQuery, iconCategoryFilter]);

  // Find currently selected icon object
  const selectedIconObj = useMemo(() => {
    return ICON_LIBRARY.find((item) => item.name === editingItem.icon) || null;
  }, [editingItem.icon]);

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
      icon: parentSlug ? 'location_on' : 'eco',
      color: '#059669',
      iconColor: '',
      description: '',
      subItems: []
    });
    setIconPickerOpen(true);
    setIconSearchQuery('');
    setIconCategoryFilter('all');
    setModalOpen(true);
  };

  const handleOpenEdit = (item: MenuCategoryItem) => {
    setIsEditing(true);
    let subItems: any[] = [];
    if (Array.isArray(item.subItems)) {
      subItems = JSON.parse(JSON.stringify(item.subItems));
    } else if (typeof (item as any).subItems === 'string') {
      try {
        subItems = JSON.parse((item as any).subItems);
      } catch {
        subItems = [];
      }
    }
    setEditingItem({
      ...item,
      iconColor: item.iconColor || '',
      subItems
    });
    setIconPickerOpen(false);
    setIconSearchQuery('');
    setIconCategoryFilter('all');
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
      setTrashItems((prev) => [...prev, item]);
      setCategories((prev) => prev.filter((c) => (item.id ? c.id !== item.id : c.slug !== item.slug)));
      toast?.show?.(`Đã chuyển "${item.name}" vào thùng rác!`, 'success');
      toast?.success?.(`Đã chuyển "${item.name}" vào thùng rác!`);
    } catch {
      setTrashItems((prev) => [...prev, item]);
      setCategories((prev) => prev.filter((c) => (item.id ? c.id !== item.id : c.slug !== item.slug)));
      toast?.show?.(`Đã xóa "${item.name}"!`, 'success');
      toast?.success?.(`Đã xóa "${item.name}"!`);
    }
  };

  const handleRestore = async (item: MenuCategoryItem) => {
    try {
      await createMenuCategoryApi(item);
      setTrashItems((prev) => prev.filter((c) => c.slug !== item.slug));
      setCategories((prev) => [...prev, item]);
      toast?.show?.(`Đã khôi phục "${item.name}" thành công!`, 'success');
      toast?.success?.(`Đã khôi phục "${item.name}" thành công!`);
    } catch {
      setTrashItems((prev) => prev.filter((c) => c.slug !== item.slug));
      setCategories((prev) => [...prev, item]);
      toast?.show?.(`Đã khôi phục "${item.name}"!`, 'success');
      toast?.success?.(`Đã khôi phục "${item.name}"!`);
    }
  };

  const handlePermanentDelete = (item: MenuCategoryItem) => {
    if (!window.confirm(`Xóa vĩnh viễn danh mục "${item.name}"? Thao tác này không thể hoàn tác.`)) return;
    setTrashItems((prev) => prev.filter((c) => c.slug !== item.slug));
    toast?.show?.(`Đã xóa vĩnh viễn "${item.name}".`, 'info');
    toast?.success?.(`Đã xóa vĩnh viễn "${item.name}".`);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.name?.trim() || !editingItem.slug?.trim()) {
      toast?.show?.('Vui lòng điền đầy đủ Tên danh mục và Slug', 'error');
      toast?.error?.('Vui lòng điền đầy đủ Tên danh mục và Slug');
      return;
    }

    try {
      if (isEditing && editingItem.id) {
        await saveMenuCategoryApi(editingItem.id, editingItem);
        toast?.show?.(`Đã cập nhật "${editingItem.name}" thành công!`, 'success');
        toast?.success?.(`Đã cập nhật "${editingItem.name}" thành công!`);
      } else {
        await createMenuCategoryApi(editingItem);
        toast?.show?.(`Đã tạo danh mục "${editingItem.name}" thành công!`, 'success');
        toast?.success?.(`Đã tạo danh mục "${editingItem.name}" thành công!`);
      }
      setModalOpen(false);
      loadCategories(true);
    } catch {
      if (isEditing) {
        setCategories((prev) =>
          prev.map((c) => (c.slug === editingItem.slug || (c.id && c.id === editingItem.id) ? (editingItem as MenuCategoryItem) : c))
        );
      } else {
        setCategories((prev) => [...prev, editingItem as MenuCategoryItem]);
      }
      setModalOpen(false);
      toast?.show?.(`Đã lưu "${editingItem.name}" thành công!`, 'success');
      toast?.success?.(`Đã lưu "${editingItem.name}" thành công!`);
    }
  };

  // Helper for Column theme styling
  const getColumnTheme = (parent: MenuCategoryItem, index: number) => {
    const slug = (parent.slug || '').toLowerCase();
    if (slug.includes('retreat') || slug.includes('series') || index % 5 === 0) {
      return {
        borderClass: 'border-emerald',
        themeKey: 'emerald',
        icon: parent.icon || 'eco',
        subIcon: 'healing'
      };
    }
    if (slug.includes('diem-den') || slug.includes('destination') || index % 5 === 1) {
      return {
        borderClass: 'border-orange',
        themeKey: 'orange',
        icon: parent.icon || 'explore',
        subIcon: 'location_on'
      };
    }
    if (slug.includes('101') || slug.includes('dieu-hay') || slug.includes('blog') || index % 5 === 2) {
      return {
        borderClass: 'border-gold',
        themeKey: 'gold',
        icon: parent.icon || 'menu_book',
        subIcon: 'article'
      };
    }
    if (slug.includes('kollection') || slug.includes('san-pham') || slug.includes('shop') || index % 5 === 3) {
      return {
        borderClass: 'border-orange',
        themeKey: 'orange',
        icon: parent.icon || 'shopping_bag',
        subIcon: 'card_giftcard'
      };
    }
    return {
      borderClass: 'border-dark',
      themeKey: 'dark',
      icon: parent.icon || 'help',
      subIcon: 'psychology'
    };
  };

  // Helper for Fixed Top Badge theme styling
  const getBadgeThemeClass = (badge: MenuCategoryItem, index: number) => {
    const slug = (badge.slug || '').toLowerCase();
    if (slug.includes('doc-quyen') || index % 4 === 0) return 'badge-theme-amber';
    if (slug.includes('sap-khoi-hanh') || slug.includes('moi') || index % 4 === 1) return 'badge-theme-blue';
    if (slug.includes('khong-the-bo-lo') || slug.includes('hot') || index % 4 === 2) return 'badge-theme-red';
    return 'badge-theme-teal';
  };

  const getMaterialIcon = (iconName?: string) => {
    if (!iconName || iconName === 'none' || iconName.trim() === '') return '';
    const clean = iconName.toLowerCase().trim();
    if (clean === 'leaf' || clean === 'leafygreen') return 'eco';
    if (clean === 'compass') return 'explore';
    if (clean === 'bookopen') return 'menu_book';
    if (clean === 'shoppingbag') return 'shopping_bag';
    if (clean === 'calendar') return 'calendar_today';
    if (clean === 'flame') return 'local_fire_department';
    if (clean === 'zap' || clean === 'clock') return 'timer';
    if (clean === 'heart') return 'healing';
    if (clean === 'shield') return 'shield';
    if (clean === 'sparkles') return 'nature';
    if (clean === 'star') return 'stars';
    return iconName;
  };

  return (
    <div className="menu-mgmt-wrapper">
      {/* 1. TOP HEADER BAR */}
      <header className="menu-mgmt-header">
        <div className="menu-mgmt-header-left">
          <div className="menu-mgmt-accent-bar"></div>
          <div>
            <h1 className="menu-mgmt-title">Cấu trúc Menu & Phân cấp</h1>
            <p className="menu-mgmt-subtitle">Tổ chức luồng điều hướng cho Header và Mega Menu</p>
          </div>
        </div>
        <div className="menu-mgmt-header-right">
          <div className="menu-mgmt-search-box">
            <span className="material-symbols-outlined">search</span>
            <input
              className="menu-mgmt-search-input"
              placeholder="Tìm kiếm mục menu..."
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => handleOpenCreate(null, 'mega_menu')}
            className="menu-mgmt-btn-primary"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            <span>Thêm mục mới</span>
          </button>
        </div>
      </header>

      {/* 2. OVERVIEW TABS & TOP SECTION */}
      <div className="menu-mgmt-top-row">
        <div className="menu-mgmt-top-left">
          {/* Tabs */}
          <div className="menu-mgmt-tabs">
            <button
              type="button"
              onClick={() => setActiveTab('kanban')}
              className={`menu-mgmt-tab ${activeTab === 'kanban' ? 'active' : ''}`}
            >
              Kanban Board
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`menu-mgmt-tab ${activeTab === 'list' ? 'active' : ''}`}
            >
              List View
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('trash')}
              className={`menu-mgmt-tab ${activeTab === 'trash' ? 'active' : ''}`}
            >
              Thùng rác {trashItems.length > 0 && `(${trashItems.length})`}
            </button>
          </div>

          {/* Fixed Badges Strip */}
          <section className="menu-mgmt-badges-card">
            <div className="menu-mgmt-badges-header">
              <div className="menu-mgmt-badges-title-group">
                <span className="material-symbols-outlined">push_pin</span>
                <h2 className="menu-mgmt-badges-title">Fixed Top Badges</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="menu-mgmt-badge-pill">Hiển thị đầu trang</span>
                <button
                  type="button"
                  onClick={() => handleOpenCreate(null, 'fixed_top')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#15766e',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span> Thêm badge
                </button>
              </div>
            </div>
            <div className="menu-mgmt-badges-scroll kanban-scroll">
              {fixedTopCategories.length === 0 ? (
                <div style={{ fontSize: '13px', color: '#94a3b8', padding: '12px' }}>Chưa có badge cố định nào</div>
              ) : (
                fixedTopCategories.map((badge, bIdx) => {
                  const themeClass = getBadgeThemeClass(badge, bIdx);
                  const isDragging = dragItem?.slug === badge.slug;
                  const isDropActive = dragOverKey === `badge-${badge.slug}`;
                  return (
                    <div
                      key={badge.id || badge.slug}
                      draggable={true}
                      onDragStart={(e) => handleBadgeDragStart(e, badge.slug)}
                      onDragOver={(e) => handleBadgeDragOver(e, badge.slug)}
                      onDragLeave={() => {
                        if (dragOverKey === `badge-${badge.slug}`) setDragOverKey(null);
                      }}
                      onDrop={(e) => handleBadgeDrop(e, badge.slug)}
                      className={`menu-mgmt-badge-item ${themeClass} drag-handle ${isDragging ? 'item-is-dragging' : ''} ${isDropActive ? 'badge-drop-active' : ''}`}
                      title="Kéo thả để sắp xếp thứ tự badge"
                    >
                      <div className="badge-icon-box" style={{ color: badge.iconColor || badge.color }}>
                        <span className="material-symbols-outlined">{getMaterialIcon(badge.icon)}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 className="badge-name">{badge.name}</h3>
                        <p className="badge-slug">
                          {badge.slug.startsWith('/') ? badge.slug : `/${badge.slug}`}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(badge)}
                          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', borderRadius: '6px' }}
                          title="Chỉnh sửa"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(badge)}
                          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', borderRadius: '6px' }}
                          title="Xóa"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>


      </div>

      {/* 3. MAIN WORKSPACE VIEW (KANBAN OR LIST OR TRASH) */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', backgroundColor: '#ffffff', borderRadius: '16px' }}>
          <div style={{ width: '32px', height: '32px', border: '3px solid #15766e', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite', margin: '0 auto 12px auto' }}></div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#64748b', margin: 0 }}>Đang tải cấu trúc Menu...</p>
        </div>
      ) : activeTab === 'kanban' ? (
        /* KANBAN BOARD SECTION */
        <section className="menu-mgmt-kanban-section">
          <div className="menu-mgmt-kanban-header-bar">
            <div className="menu-mgmt-kanban-title-group">
              <span className="material-symbols-outlined">view_column</span>
              <h2 className="menu-mgmt-kanban-title">Mega Menu Structure (Kanban)</h2>
            </div>
            <button
              type="button"
              onClick={() => handleOpenCreate(null, 'mega_menu')}
              className="menu-mgmt-btn-add-parent"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_box</span>
              <span>Thêm Cột Parent</span>
            </button>
          </div>

          {/* Kanban Scroll Container */}
          <div className="menu-mgmt-kanban-scroll kanban-scroll">
            {megaParents.length === 0 ? (
              <div style={{ width: '100%', textAlign: 'center', padding: '40px', backgroundColor: '#ffffff', borderRadius: '16px' }}>
                <p style={{ fontSize: '14px', color: '#94a3b8' }}>Không tìm thấy cột danh mục nào phù hợp.</p>
              </div>
            ) : (
              megaParents.map((parent, pIndex) => {
                const subItems = subCategoriesMap[parent.slug] || [];
                const theme = getColumnTheme(parent, pIndex);
                const isDropdownOpen = activeDropdown === parent.slug;
                const isColDragging = dragItem?.slug === parent.slug;
                const isColDropActive = dragOverKey === `col-${parent.slug}` || dragOverKey === `col-card-${parent.slug}`;

                return (
                  <div
                    key={parent.id || parent.slug}
                    onDragOver={(e) => handleColumnDragOver(e, parent.slug)}
                    onDragLeave={() => {
                      if (dragOverKey === `col-${parent.slug}` || dragOverKey === `col-card-${parent.slug}`) {
                        setDragOverKey(null);
                      }
                    }}
                    onDrop={(e) => handleColumnDrop(e, parent.slug)}
                    className={`menu-mgmt-column-wrapper ${isColDragging ? 'item-is-dragging' : ''} ${isColDropActive ? 'column-drop-active' : ''}`}
                  >
                    {/* Column Header */}
                    <div
                      draggable={true}
                      onDragStart={(e) => handleColumnDragStart(e, parent.slug)}
                      className={`menu-mgmt-column-header ${theme.borderClass} drag-handle`}
                      title="Kéo thả để thay đổi vị trí cột"
                    >
                      <div className="menu-mgmt-column-top">
                        <div
                          className="menu-mgmt-col-info"
                          onClick={() => handleOpenEdit(parent)}
                          style={{ cursor: 'pointer', flex: 1, minWidth: 0 }}
                          title="Bấm để chỉnh sửa cột này"
                        >
                          <div className={`menu-mgmt-col-icon-box ${theme.themeKey}`} style={{ color: parent.iconColor || parent.color }}>
                            <span className="material-symbols-outlined">{parent.icon ? getMaterialIcon(parent.icon) : getMaterialIcon(theme.icon)}</span>
                          </div>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <h3 className="menu-mgmt-col-title">{parent.name}</h3>
                            <p className="menu-mgmt-col-slug">
                              {parent.slug.startsWith('/') ? parent.slug : `/${parent.slug}`}
                            </p>
                          </div>
                        </div>

                        {/* Direct Action Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }} onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEdit(parent);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#64748b',
                              cursor: 'pointer',
                              padding: '5px',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            title="Chỉnh sửa cột"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(parent);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#94a3b8',
                              cursor: 'pointer',
                              padding: '5px',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            title="Xóa cột"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                          </button>
                        </div>
                      </div>

                      <div className="menu-mgmt-column-bottom">
                        <span className="menu-mgmt-items-count">{subItems.length} items</span>
                        <button
                          type="button"
                          onClick={() => handleOpenCreate(parent.slug, 'mega_menu')}
                          className={`menu-mgmt-btn-add-item ${theme.themeKey}`}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>add</span> Add Item
                        </button>
                      </div>
                    </div>

                    {/* Cards Container */}
                    <div className="menu-mgmt-cards-container">
                      {subItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '24px 12px', fontSize: '12px', color: '#94a3b8', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                          Chưa có mục con nào (Kéo thả thẻ vào đây)
                        </div>
                      ) : (
                        subItems.map((child) => {
                          const isCardDragging = dragItem?.slug === child.slug;
                          const isCardDropActive = dragOverKey === `card-${child.slug}`;
                          return (
                            <div
                              key={child.id || child.slug}
                              draggable={true}
                              onDragStart={(e) => handleCardDragStart(e, child.slug, parent.slug)}
                              onDragOver={(e) => handleCardDragOver(e, child.slug)}
                              onDragLeave={() => {
                                if (dragOverKey === `card-${child.slug}`) setDragOverKey(null);
                              }}
                              onDrop={(e) => handleCardDrop(e, child.slug, parent.slug)}
                              className={`menu-mgmt-child-card drag-handle ${isCardDragging ? 'item-is-dragging' : ''} ${isCardDropActive ? 'card-drop-active' : ''}`}
                              title="Kéo thả để sắp xếp hoặc chuyển sang cột khác"
                            >
                              <span className="material-symbols-outlined menu-mgmt-drag-icon">
                                drag_indicator
                              </span>
                              <div className="menu-mgmt-child-info">
                                <div className={`menu-mgmt-child-icon-box ${theme.themeKey}`} style={{ color: child.iconColor || child.color }}>
                                  <span className="material-symbols-outlined">
                                    {child.icon ? getMaterialIcon(child.icon) : theme.subIcon}
                                  </span>
                                </div>
                                <div style={{ minWidth: 0, flex: 1 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <h4 className="menu-mgmt-child-title">{child.name}</h4>
                                    {child.subItems && child.subItems.length > 0 ? (
                                      <span style={{ fontSize: '10px', backgroundColor: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>
                                        {child.subItems.length} links
                                      </span>
                                    ) : (
                                      <span style={{ fontSize: '10px', backgroundColor: '#f8fafc', color: '#94a3b8', padding: '1px 5px', borderRadius: '4px' }}>
                                        Link đơn
                                      </span>
                                    )}
                                  </div>
                                  <p className="menu-mgmt-child-desc">{child.description || child.slug}</p>
                                </div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <button
                                  type="button"
                                  onClick={() => handleOpenEdit(child)}
                                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
                                  title="Chỉnh sửa"
                                >
                                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(child)}
                                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
                                  title="Xóa"
                                >
                                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>delete</span>
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      ) : activeTab === 'list' ? (
        /* LIST VIEW TABLE (RULE 85 COMPLIANT) */
        <section style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#374151', margin: 0 }}>Danh Sách Toàn Bộ Menu</h2>
            <button
              type="button"
              onClick={() => handleOpenCreate(null, 'mega_menu')}
              style={{ fontSize: '12px', fontWeight: 700, color: '#15766e', backgroundColor: '#f0fdfa', padding: '6px 14px', borderRadius: '8px', border: '1px solid #ccfbf1', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span> Thêm Danh Mục
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '14px 20px', width: '60px' }}>Icon</th>
                  <th style={{ padding: '14px 16px' }}>Tên Danh Mục</th>
                  <th style={{ padding: '14px 16px' }}>Phân Loại / Cha</th>
                  <th style={{ padding: '14px 16px' }}>Slug Định Danh</th>
                  <th style={{ padding: '14px 16px' }}>Thứ Tự</th>
                  <th style={{ padding: '14px 16px' }}>Mô Tả</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right', width: '130px' }}>Thao Tác</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '13.5px' }}>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                      Không có mục danh mục nào.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((item) => (
                    <tr key={item.id || item.slug} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{getMaterialIcon(item.icon)}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                        {item.name}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {item.menuType === 'fixed_top' ? (
                          <span style={{ fontSize: '11px', backgroundColor: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
                            Fixed Top Badge
                          </span>
                        ) : item.parentSlug ? (
                          <span style={{ fontSize: '11px', backgroundColor: '#ecfdf5', color: '#047857', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
                            Con của: {item.parentSlug}
                          </span>
                        ) : (
                          <span style={{ fontSize: '11px', backgroundColor: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
                            Menu Cha (Parent)
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <code style={{ fontSize: '12px', fontFamily: 'monospace', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '2px 8px', borderRadius: '4px' }}>
                          {item.slug}
                        </code>
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: '#64748b' }}>
                        {item.orderIndex || 0}
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.description || '—'}
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            style={{ width: '50px', height: '32px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', color: '#374151', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            title="Chỉnh sửa"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            style={{ width: '50px', height: '32px', borderRadius: '8px', border: '1px solid #fecaca', backgroundColor: '#fff1f2', color: '#b91c1c', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            title="Xóa"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        /* TRASH TAB */
        <section style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e5e7eb', padding: '24px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ color: '#dc2626' }}>delete</span>
              <h2 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#374151', margin: 0 }}>
                Thùng rác ({trashItems.length})
              </h2>
            </div>
            {trashItems.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Xóa sạch tất cả các mục trong thùng rác?')) {
                    setTrashItems([]);
                    toast?.show?.('Đã dọn sạch thùng rác.', 'info');
                  }
                }}
                style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Dọn sạch thùng rác
              </button>
            )}
          </div>
          {trashItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '13.5px' }}>
              Thùng rác trống. Các mục bị xóa sẽ xuất hiện tại đây.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {trashItems.map((item) => (
                <div
                  key={item.slug}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#e2e8f0', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{getMaterialIcon(item.icon)}</span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{item.name}</h4>
                      <p style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace', margin: '2px 0 0 0' }}>/{item.slug}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleRestore(item)}
                      style={{ padding: '6px 14px', borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>restore</span> Khôi phục
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePermanentDelete(item)}
                      style={{ padding: '6px 14px', borderRadius: '8px', backgroundColor: '#fff1f2', color: '#b91c1c', border: '1px solid #fecaca', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete_forever</span> Xóa vĩnh viễn
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 4. CREATE / EDIT MODAL */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '620px',
              width: '100%',
              padding: '24px 28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              border: '1px solid #e2e8f0',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', marginBottom: '18px', borderBottom: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#081f13', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <span className="material-symbols-outlined" style={{ color: '#15766e', fontSize: '22px' }}>
                  {isEditing ? 'edit_note' : 'add_circle'}
                </span>
                <span>{isEditing ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}</span>
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', borderRadius: '6px' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>close</span>
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Tên Danh Mục */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
                  Tên Danh Mục <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Retreat Chữa Lành, Khám phá điểm đến..."
                  value={editingItem.name || ''}
                  onChange={(e) => handleNameChange(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Slug Định Danh */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
                  Slug Định Danh (URL & Category ID) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="chua-lanh"
                  value={editingItem.slug || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Vị Trí Menu & Menu Cha */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
                    Vị Trí Menu
                  </label>
                  <select
                    value={editingItem.menuType || 'mega_menu'}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        menuType: e.target.value,
                        parentSlug: e.target.value === 'fixed_top' ? null : editingItem.parentSlug
                      })
                    }
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
                  >
                    <option value="mega_menu">Hàng Dưới (Mega Menu)</option>
                    <option value="fixed_top">Hàng Trên (Fixed Top Badge)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
                    Menu Cha (Parent)
                  </label>
                  <select
                    disabled={editingItem.menuType === 'fixed_top'}
                    value={editingItem.parentSlug || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        parentSlug: e.target.value ? e.target.value : null
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13.5px',
                      backgroundColor: editingItem.menuType === 'fixed_top' ? '#f1f5f9' : '#ffffff',
                      color: editingItem.menuType === 'fixed_top' ? '#94a3b8' : '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">-- Là Menu Cha (Cột Kanban) --</option>
                    {potentialParents.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} ({p.slug})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Màu Sắc & Thứ Tự Sắp Xếp */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
                    Màu Sắc
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="color"
                      value={editingItem.color || '#059669'}
                      onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                      style={{ width: '38px', height: '38px', borderRadius: '8px', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
                    />
                    <input
                      type="text"
                      value={editingItem.color || '#059669'}
                      onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
                    Thứ Tự Sắp Xếp
                  </label>
                  <input
                    type="number"
                    value={editingItem.orderIndex ?? 1}
                    onChange={(e) => setEditingItem({ ...editingItem, orderIndex: parseInt(e.target.value, 10) || 1 })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* BẢNG CHỌN ICON TRỰC QUAN (VISUAL ICON PICKER) */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                    Icon Biểu Tượng <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIconPickerOpen(!iconPickerOpen)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#15766e',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                      {iconPickerOpen ? 'expand_less' : 'grid_view'}
                    </span>
                    <span>{iconPickerOpen ? 'Thu gọn bảng icon' : 'Xem toàn bộ icon'}</span>
                  </button>
                </div>

                {/* Current Selected Icon Preview Card */}
                {(() => {
                  const effectiveIconColor = editingItem.iconColor || editingItem.color || '#059669';
                  return (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 14px',
                          backgroundColor: (!editingItem.icon || editingItem.icon === 'none') ? '#f8fafc' : '#f0fdfa',
                          borderRadius: '12px',
                          border: (!editingItem.icon || editingItem.icon === 'none') ? '1px dashed #cbd5e1' : '1px solid #ccfbf1',
                          marginBottom: '10px'
                        }}
                      >
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '10px',
                            backgroundColor: '#ffffff',
                            border: (!editingItem.icon || editingItem.icon === 'none') ? '2px dashed #cbd5e1' : `2px solid ${effectiveIconColor}`,
                            color: (!editingItem.icon || editingItem.icon === 'none') ? '#94a3b8' : effectiveIconColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                          }}
                        >
                          {(!editingItem.icon || editingItem.icon === 'none') ? (
                            <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#94a3b8' }}>block</span>
                          ) : (
                            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: effectiveIconColor }}>
                              {getMaterialIcon(editingItem.icon)}
                            </span>
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>
                              {(!editingItem.icon || editingItem.icon === 'none')
                                ? '🚫 Không dùng icon'
                                : (selectedIconObj?.label || editingItem.icon)}
                            </strong>
                            <span style={{ fontSize: '11px', color: '#64748b', backgroundColor: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>
                              {(!editingItem.icon || editingItem.icon === 'none') ? 'Tùy chọn: Không icon' : editingItem.icon}
                            </span>
                          </div>
                          <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0 0' }}>
                            {(!editingItem.icon || editingItem.icon === 'none')
                              ? 'Mục này chỉ hiển thị chữ, không hiển thị biểu tượng icon'
                              : 'Hiển thị trực tiếp trên Header, Mega Menu & các thẻ liên quan'}
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {editingItem.icon && editingItem.icon !== 'none' && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItem({ ...editingItem, icon: 'none' });
                                toast?.show?.('Đã xóa icon (chọn không dùng icon)', 'info');
                              }}
                              style={{
                                backgroundColor: '#fff1f2',
                                color: '#b91c1c',
                                border: '1px solid #fecaca',
                                padding: '6px 10px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                              title="Xóa icon / Không dùng icon"
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>delete</span>
                              <span>Xóa icon</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setIconPickerOpen(!iconPickerOpen)}
                            style={{
                              backgroundColor: '#ffffff',
                              color: '#15766e',
                              border: '1px solid #ccfbf1',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {iconPickerOpen ? 'Đang mở' : 'Đổi icon'}
                          </button>
                        </div>
                      </div>

                      {/* TÙY CHỌN MÀU SẮC RIÊNG CHO BIỂU TƯỢNG (ICON COLOR) */}
                      {editingItem.icon && editingItem.icon !== 'none' && (
                        <div
                          style={{
                            padding: '10px 14px',
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '8px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#0d9488' }}>palette</span>
                            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>
                              Màu riêng cho Icon:
                            </span>
                            <span style={{ fontSize: '11px', color: '#64748b' }}>
                              {editingItem.iconColor ? `(${editingItem.iconColor})` : '(Mặc định: theo màu chữ)'}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            {[
                              { label: 'Vàng Gold', color: '#facc15' },
                              { label: 'Xanh Lục', color: '#10b981' },
                              { label: 'Xanh Ngọc', color: '#059669' },
                              { label: 'Xanh Dương', color: '#38bdf8' },
                              { label: 'Đỏ', color: '#ef4444' },
                              { label: 'Cam', color: '#f97316' },
                              { label: 'Hồng Tím', color: '#ec4899' },
                              { label: 'Trắng', color: '#ffffff' }
                            ].map((p) => {
                              const isSelectedColor = editingItem.iconColor === p.color;
                              return (
                                <button
                                  key={p.color}
                                  type="button"
                                  onClick={() => setEditingItem({ ...editingItem, iconColor: p.color })}
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: p.color,
                                    border: isSelectedColor ? '2px solid #0f172a' : '1px solid #cbd5e1',
                                    boxShadow: isSelectedColor ? '0 0 0 2px #38bdf8' : 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'transform 0.15s ease'
                                  }}
                                  title={p.label}
                                />
                              );
                            })}

                            {/* Color Picker HTML Input */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '4px' }}>
                              <input
                                type="color"
                                value={editingItem.iconColor || editingItem.color || '#facc15'}
                                onChange={(e) => setEditingItem({ ...editingItem, iconColor: e.target.value })}
                                style={{ width: '26px', height: '26px', padding: 0, border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
                                title="Tùy chọn mã màu bất kỳ"
                              />
                              {editingItem.iconColor && (
                                <button
                                  type="button"
                                  onClick={() => setEditingItem({ ...editingItem, iconColor: '' })}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#64748b',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    padding: '2px 4px',
                                    textDecoration: 'underline'
                                  }}
                                  title="Xóa màu riêng, quay về màu chữ"
                                >
                                  Mặc định
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}

                {/* Visual Icon Grid Section */}
                {iconPickerOpen && (
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '14px',
                      border: '1px solid #cbd5e1',
                      padding: '14px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    {/* Clear Icon Quick Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem({ ...editingItem, icon: 'none' });
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '9px 14px',
                        borderRadius: '10px',
                        border: (!editingItem.icon || editingItem.icon === 'none') ? '2px solid #ef4444' : '1px dashed #cbd5e1',
                        backgroundColor: (!editingItem.icon || editingItem.icon === 'none') ? '#fef2f2' : '#f8fafc',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        width: '100%'
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#ef4444' }}>block</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#b91c1c' }}>
                        🚫 Không dùng icon (Chỉ hiển thị tên chữ)
                      </span>
                      {(!editingItem.icon || editingItem.icon === 'none') && (
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#ef4444', marginLeft: 'auto' }}>check_circle</span>
                      )}
                    </button>

                    {/* Search Bar */}
                    <div style={{ position: 'relative' }}>
                      <span className="material-symbols-outlined" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '18px' }}>
                        search
                      </span>
                      <input
                        type="text"
                        placeholder="Tìm icon (ví dụ: lá, biển, quà, thiền, hot, địa điểm...)"
                        value={iconSearchQuery}
                        onChange={(e) => setIconSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    {/* Category Filter Pills */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {ICON_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setIconCategoryFilter(cat.id)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            backgroundColor: iconCategoryFilter === cat.id ? '#15766e' : '#f1f5f9',
                            color: iconCategoryFilter === cat.id ? '#ffffff' : '#475569',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Icons Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(115px, 1fr))',
                        gap: '8px',
                        maxHeight: '220px',
                        overflowY: 'auto',
                        padding: '4px'
                      }}
                      className="kanban-scroll"
                    >
                      {filteredIcons.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', color: '#94a3b8', fontSize: '12px' }}>
                          Không tìm thấy icon nào phù hợp với từ khóa "{iconSearchQuery}".
                        </div>
                      ) : (
                        filteredIcons.map((opt) => {
                          const isSelected = (editingItem.icon || 'eco') === opt.name;
                          return (
                            <button
                              key={opt.name}
                              type="button"
                              onClick={() => {
                                setEditingItem({ ...editingItem, icon: opt.name });
                              }}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '10px 6px',
                                borderRadius: '10px',
                                border: isSelected ? '2px solid #15766e' : '1px solid #e2e8f0',
                                backgroundColor: isSelected ? '#f0fdfa' : '#ffffff',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                position: 'relative'
                              }}
                              title={`${opt.label} (${opt.name})`}
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{
                                  fontSize: '24px',
                                  color: isSelected ? '#15766e' : '#334155'
                                }}
                              >
                                {opt.name}
                              </span>
                              <span
                                style={{
                                  fontSize: '11px',
                                  fontWeight: isSelected ? 700 : 500,
                                  color: isSelected ? '#0d5e58' : '#475569',
                                  textAlign: 'center',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  width: '100%'
                                }}
                              >
                                {opt.label.split('/')[0].trim()}
                              </span>
                              {isSelected && (
                                <span
                                  className="material-symbols-outlined"
                                  style={{
                                    position: 'absolute',
                                    top: '3px',
                                    right: '3px',
                                    fontSize: '14px',
                                    color: '#15766e'
                                  }}
                                >
                                  check_circle
                                </span>
                              )}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mô Tả */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
                  Mô Tả Phụ (Subtitle / Tooltip)
                </label>
                <textarea
                  rows={2}
                  placeholder="Mô tả ngắn gọn đặc điểm danh mục..."
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>

              {/* Cấu Hình Các Liên Kết Con Trong Mega Menu (Sub-links) */}
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#15766e' }}>format_list_bulleted</span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>Liên kết con (Sub-links)</span>
                    <span style={{ fontSize: '11px', backgroundColor: (editingItem.subItems || []).length > 0 ? '#ccfbf1' : '#f1f5f9', color: (editingItem.subItems || []).length > 0 ? '#0f766e' : '#64748b', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {(editingItem.subItems || []).length} đang chọn
                    </span>
                  </div>
                  {(editingItem.subItems || []).length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem({ ...editingItem, subItems: [] });
                        toast?.show?.('Đã xóa tất cả liên kết (Chuyển sang Link đơn)', 'info');
                      }}
                      style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', padding: '3px 6px', borderRadius: '6px', whiteSpace: 'nowrap' }}
                      title="Xóa hết để làm link đơn"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>delete_sweep</span>
                      <span>Bỏ chọn hết</span>
                    </button>
                  )}
                </div>
                <p style={{ fontSize: '11.5px', color: '#64748b', margin: '0 0 10px 0' }}>
                  Bấm chọn các mục bên dưới để thêm vào cột menu khi mở trên Header:
                </p>

                {/* KHU VỰC TÍCH CHỌN NHANH 1-CLICK */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Nhóm 1: Trạng Thái & Ưu Đãi */}
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>🔥 Nhóm Trạng thái & Ưu đãi:</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[
                        { label: 'Retreat Hot', slugSuffix: 'hot', badge: 'HOT', badgeColor: '#f97316' },
                        { label: 'Retreat Mới', slugSuffix: 'moi', badge: 'NEW', badgeColor: '#38bdf8' },
                        { label: 'Retreat Last Minute', slugSuffix: 'last-minute', badge: 'ƯU ĐÃI', badgeColor: '#facc15' },
                        { label: 'Retreat Độc Quyền', slugSuffix: 'doc-quyen', badge: 'VIP', badgeColor: '#ec4899' },
                      ].map((preset) => {
                        const current = editingItem.subItems || [];
                        const isChecked = current.some((s) => s.label.trim().toLowerCase() === preset.label.trim().toLowerCase());
                        const base = editingItem.parentSlug ? `/${editingItem.parentSlug}/${editingItem.slug}` : `/${editingItem.slug}`;
                        return (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => {
                              if (isChecked) {
                                setEditingItem({
                                  ...editingItem,
                                  subItems: current.filter((s) => s.label.trim().toLowerCase() !== preset.label.trim().toLowerCase())
                                });
                              } else {
                                setEditingItem({
                                  ...editingItem,
                                  subItems: [
                                    ...current,
                                    {
                                      label: preset.label,
                                      href: `${base}/${preset.slugSuffix}`,
                                      badge: preset.badge,
                                      badgeColor: preset.badgeColor
                                    }
                                  ]
                                });
                              }
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '7px 12px',
                              borderRadius: '10px',
                              border: isChecked ? '2px solid #15766e' : '1px solid #cbd5e1',
                              backgroundColor: isChecked ? '#f0fdfa' : '#ffffff',
                              color: isChecked ? '#0f766e' : '#334155',
                              fontSize: '12.5px',
                              fontWeight: isChecked ? 700 : 500,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              boxShadow: isChecked ? '0 2px 5px rgba(21,118,110,0.15)' : 'none'
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: isChecked ? '#15766e' : '#94a3b8' }}>
                              {isChecked ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            <span>{preset.label}</span>
                            {preset.badge && (
                              <span style={{ fontSize: '9.5px', fontWeight: 800, backgroundColor: isChecked ? '#15766e' : '#f1f5f9', color: isChecked ? '#ffffff' : '#64748b', padding: '1px 5px', borderRadius: '4px' }}>
                                {preset.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nhóm 2: Vùng Miền */}
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>📍 Nhóm Điểm đến & Vùng miền:</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[
                        { label: 'Miền Bắc', slugSuffix: 'bac' },
                        { label: 'Miền Trung', slugSuffix: 'trung' },
                        { label: 'Miền Nam', slugSuffix: 'nam' },
                      ].map((preset) => {
                        const current = editingItem.subItems || [];
                        const isChecked = current.some((s) => s.label.trim().toLowerCase() === preset.label.trim().toLowerCase());
                        const base = editingItem.parentSlug ? `/${editingItem.parentSlug}/${editingItem.slug}` : `/${editingItem.slug}`;
                        return (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => {
                              if (isChecked) {
                                setEditingItem({
                                  ...editingItem,
                                  subItems: current.filter((s) => s.label.trim().toLowerCase() !== preset.label.trim().toLowerCase())
                                });
                              } else {
                                setEditingItem({
                                  ...editingItem,
                                  subItems: [
                                    ...current,
                                    {
                                      label: preset.label,
                                      href: `${base}/${preset.slugSuffix}`
                                    }
                                  ]
                                });
                              }
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '7px 12px',
                              borderRadius: '10px',
                              border: isChecked ? '2px solid #0284c7' : '1px solid #cbd5e1',
                              backgroundColor: isChecked ? '#f0f9ff' : '#ffffff',
                              color: isChecked ? '#0369a1' : '#334155',
                              fontSize: '12.5px',
                              fontWeight: isChecked ? 700 : 500,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              boxShadow: isChecked ? '0 2px 5px rgba(2,132,199,0.15)' : 'none'
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: isChecked ? '#0284c7' : '#94a3b8' }}>
                              {isChecked ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            <span>{preset.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nhập thêm link tự do */}
                  <div style={{ paddingTop: '8px', borderTop: '1px dashed #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="+ Nhập tên link khác nếu muốn (vd: Tour 2N1Đ, Giảm giá 20%...)"
                      value={customLinkInput}
                      onChange={(e) => setCustomLinkInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (customLinkInput.trim()) {
                            const current = editingItem.subItems || [];
                            const base = editingItem.parentSlug ? `/${editingItem.parentSlug}/${editingItem.slug}` : `/${editingItem.slug}`;
                            const slugSuffix = customLinkInput.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').replace(/[^a-z0-9]/g, '-');
                            setEditingItem({
                              ...editingItem,
                              subItems: [...current, { label: customLinkInput.trim(), href: `${base}/${slugSuffix}` }]
                            });
                            setCustomLinkInput('');
                          }
                        }
                      }}
                      style={{ flex: 1, padding: '7px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px', outline: 'none', backgroundColor: '#f8fafc' }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customLinkInput.trim()) {
                          const current = editingItem.subItems || [];
                          const base = editingItem.parentSlug ? `/${editingItem.parentSlug}/${editingItem.slug}` : `/${editingItem.slug}`;
                          const slugSuffix = customLinkInput.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').replace(/[^a-z0-9]/g, '-');
                          setEditingItem({
                            ...editingItem,
                            subItems: [...current, { label: customLinkInput.trim(), href: `${base}/${slugSuffix}` }]
                          });
                          setCustomLinkInput('');
                        }
                      }}
                      style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#15766e', color: '#ffffff', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Thêm
                    </button>
                  </div>
                </div>

                {/* TÓM TẮT CÁC LINK ĐANG ĐƯỢC CHỌN */}
                <div style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#475569' }}>
                      {(!editingItem.subItems || editingItem.subItems.length === 0) ? (
                        '👉 Mục này hiện là: Link đơn trực tiếp (Không có menu con)'
                      ) : (
                        `👉 Menu con sẽ hiển thị ${editingItem.subItems.length} liên kết:`
                      )}
                    </span>
                    {(editingItem.subItems || []).length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowAdvancedSubItems(!showAdvancedSubItems)}
                        style={{ background: 'none', border: 'none', color: '#15766e', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>tune</span>
                        <span>{showAdvancedSubItems ? 'Ẩn cài đặt URL' : 'Tùy chỉnh URL / Badge'}</span>
                      </button>
                    )}
                  </div>

                  {/* Hiển thị danh sách tag đã chọn gọn gàng */}
                  {(editingItem.subItems && editingItem.subItems.length > 0) && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {editingItem.subItems.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #cbd5e1',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            color: '#334155',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                          }}
                        >
                          <span style={{ fontWeight: 600 }}>{sub.label}</span>
                          {sub.badge && (
                            <span style={{ fontSize: '9px', fontWeight: 800, backgroundColor: sub.badgeColor || '#f97316', color: '#ffffff', padding: '1px 4px', borderRadius: '3px' }}>
                              {sub.badge}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingItem.subItems || []).filter((_, idx) => idx !== sIdx);
                              setEditingItem({ ...editingItem, subItems: updated });
                            }}
                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0 2px', display: 'flex', alignItems: 'center', fontSize: '14px' }}
                            title="Xóa link này"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bảng Nâng Cao (chỉ mở khi người dùng muốn sửa URL hoặc Badge) */}
                  {showAdvancedSubItems && (editingItem.subItems || []).length > 0 && (
                    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px', backgroundColor: '#ffffff', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>
                        💡 Tùy chỉnh trực tiếp Tên hiển thị, Đường dẫn URL hoặc Nhãn Badge bên dưới:
                      </div>
                      {editingItem.subItems?.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '20px 1.2fr 1.6fr 80px 24px',
                            gap: '6px',
                            alignItems: 'center'
                          }}
                        >
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8' }}>#{sIdx + 1}</span>
                          <input
                            type="text"
                            value={sub.label}
                            onChange={(e) => {
                              const updated = [...(editingItem.subItems || [])];
                              updated[sIdx] = { ...updated[sIdx], label: e.target.value };
                              setEditingItem({ ...editingItem, subItems: updated });
                            }}
                            placeholder="Tên link"
                            style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' }}
                          />
                          <input
                            type="text"
                            value={sub.href}
                            onChange={(e) => {
                              const updated = [...(editingItem.subItems || [])];
                              updated[sIdx] = { ...updated[sIdx], href: e.target.value };
                              setEditingItem({ ...editingItem, subItems: updated });
                            }}
                            placeholder="URL"
                            style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' }}
                          />
                          <input
                            type="text"
                            value={sub.badge || ''}
                            onChange={(e) => {
                              const updated = [...(editingItem.subItems || [])];
                              const badge = e.target.value;
                              let badgeColor = sub.badgeColor || '#f97316';
                              if (badge.toUpperCase().includes('NEW')) badgeColor = '#38bdf8';
                              if (badge.toUpperCase().includes('ƯU ĐÃI') || badge.toUpperCase().includes('UU DAI')) badgeColor = '#facc15';
                              if (badge.toUpperCase().includes('VIP')) badgeColor = '#ec4899';
                              updated[sIdx] = { ...updated[sIdx], badge, badgeColor };
                              setEditingItem({ ...editingItem, subItems: updated });
                            }}
                            placeholder="Badge"
                            style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingItem.subItems || []).filter((_, idx) => idx !== sIdx);
                              setEditingItem({ ...editingItem, subItems: updated });
                            }}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Xóa link"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '8px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{ padding: '9px 18px', borderRadius: '10px', border: '1px solid #cbd5e1', color: '#475569', backgroundColor: '#ffffff', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 22px', borderRadius: '10px', border: 'none', backgroundColor: '#15766e', color: '#ffffff', fontSize: '13.5px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(21,118,110,0.25)' }}
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
