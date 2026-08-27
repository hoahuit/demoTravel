import React, { useState, useEffect, useMemo } from 'react';
import ScrollReveal from './ScrollReveal';
import './KollectionShopPage.css';
import {
  fetchProductsApi,
  createShopOrderApi,
  getImageUrl,
  KollectionProduct
} from '../services/apiService';
import {
  ShoppingBag,
  Sparkles,
  Search,
  Check,
  Star,
  ArrowRight,
  ShieldCheck,
  Truck,
  Gift,
  Feather,
  Heart,
  X,
  Phone,
  User,
  MapPin,
  MessageSquare,
  CheckCircle2,
  RefreshCw,
  Eye,
  Plus,
  Minus,
  ShoppingCart,
  QrCode,
  CreditCard,
  Copy
} from 'lucide-react';
import { useToast } from './ui/Toast';

interface KollectionShopPageProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const FEATURED_CATEGORIES = [
  {
    id: 'souvenirs',
    name: 'Quà lưu niệm',
    subtitle: 'Chế tác thủ công',
    categoryKey: 'Quà lưu niệm',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVR3VFpWr8SwWK1opXwuR34WlEa_pEUzTOZOz8bEvmPcmZ6tN8x6eAPxZJIyzTd4d_EMB3NGcdNfosZigQb9e5wsoWCOgklW0ZHZwU2WXFyN814powhrVfOdI0ADpb7YphPJvid6U8YHEkrRCnN9U4rh7JOx8E3ZtPpppulAo3fYK83rAvN9ZLCJ85yh_iGf31IukX-u_afPkbmdz-jTKk12fLzicU97kTtyXtsep-XZw1vLA6TWIr',
    fallbackImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'gear',
    name: 'Trang bị',
    subtitle: 'Bền bỉ theo thời gian',
    categoryKey: 'Trang bị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlyoRRMDdrEh1tEdYk_hR089ATUbOba9k2ZLY4EEOt7vStwznpSaiyIxKVKJPaLLya2UilfXbxnjGpi3yvXvBjeMczyjijEQ3PPzRZlxNWPoJlS3FhCQwy5_dACe_mP_T60HyDUUQvhJX_zQ8OwwJhx4vuZQunPrrw4HoVWGq6U1Nz3l55gqrSDP8QZWu6xaHPvIJHqNxGuG4SOYKVnHBRpnPuwBd_zcicEI79s2MGlZl4FfJmLNNy',
    fallbackImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'essentials',
    name: 'Thiết yếu',
    subtitle: 'Sắp xếp thông minh',
    categoryKey: 'Thiết yếu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDJ0PU48_kCS6k5M3Prgxt4d5x50qXJ1a9hPQkJVal5RC1jJ5cPR3DsbHqEJPfXS9Nqqwq7tJtdSpy3mAF-CIskaJdHGCEccCV5NQd_Fd15TBUWVzYvK7D1ghj99nXai-dtp-STJu6puKX2qjzosr8Hgj62eZXSHS-eB3lVxvzRiJBHKwQolKXV_VP5Zhlvi85VNgHetbGwlhJ7nACik0SI2Y-IUzpBLKjSXzj2JhmC-syN4CMbiun',
    fallbackImage: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&w=1200&q=85'
  }
];

export const DEFAULT_NOMAD_PRODUCTS: KollectionProduct[] = [
  {
    id: 1,
    slug: 'binh-giu-nhiet-alpine',
    title: 'Bình giữ nhiệt Alpine',
    name: 'Bình giữ nhiệt Alpine',
    subtitle: 'Giữ nhiệt hoàn hảo trên mọi chặng đường',
    category: 'Phụ kiện du lịch',
    price: 850000,
    originalPrice: 1000000,
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAjTRcfdF6_yplK4VT-RChhxc_dz4gKf_iF0t-dDv6SZypoAbltGUIxc3lRHFKv4nZMF8Tsgu9Ba9S-MWfpU_W1_iDsxBoKe7dTpT1ogIu35me-nmxxS1IuybSM54_lEQKNizMTQX-K7xK8F-BBqBu6VbChNnNZNrY7fEoNsFJ75b1abxFjuX1yoWrrAdSUPEtpWd6tu5Wz8ul1E4qEvYXYbASQwPiWN4yvaxn9oLlfQZdQjR7y9O2',
    isBestSeller: true,
    isFeatured: true,
    isExclusive: true,
    description: 'Thép không gỉ 304 cao cấp 2 lớp cách nhiệt chân không màu xanh rêu Alpine, giữ nóng 12h và giữ lạnh 24h, kèm quai xách công thái học chắc chắn.'
  },
  {
    id: 2,
    slug: 'dung-cu-da-nang-explorer',
    title: 'Dụng cụ đa năng Explorer',
    name: 'Dụng cụ đa năng Explorer',
    subtitle: 'Tiện ích tối đa trong thiết kế nhỏ gọn',
    category: 'Trang bị',
    price: 1200000,
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl2RytbicQSz-WIZdQH-PivcpvDy2Awo_yBLeSkqUrh-Pk8fThJJFSNjrqEdKPEZzjJk2FyOXoQZnHffSjs-MybP0WsMRPyua9rr3KYevhuE80GhbDQqNj26IdKplnl0fqBnBig3L_s8rL5ppSreTiWolguuT0VVj8oLfEJT2018Tf7zB8mg7A_RMmv2EYUf66AvUcRN0PRV63NUHmHkRKYm574-XAcX5mOHyNkds6e_qGRtxMtRho',
    isNewArrival: true,
    isExclusive: true,
    description: 'Bộ công cụ đa năng 18 trong 1 tích hợp kìm lực, dao thép không gỉ, cưa gỗ, mở nắp và vít đa cạnh chuyên dụng cho dã ngoại khám phá.'
  },
  {
    id: 3,
    slug: 'set-tui-phan-loai-hanh-ly',
    title: 'Set túi phân loại hành lý',
    name: 'Set túi phân loại hành lý',
    subtitle: 'Ngăn nắp và khoa học cho mọi chuyến đi',
    category: 'Thiết yếu',
    price: 680000,
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2KcU5rhNDPLymv81SVNzvhlWhBkB6-B-EJcP40aT9gTUcsZ62E73wO_GdxI6PZlG6jPv4cJqquEUFRZZI3pnRUdpBsitzoyhPUpioKYxUUFE58LnPHzQTDY8I0BT0O4G39IJcaxZKjBZpektsdVRT410YvQCOfpupbH3Fzl2jQN4smIUosHWVWNVA-B3rFK6kEo_fqzlS7P5Hw-26FFqxElBWlZHQ_S0hmseFhJTrwOm6F3zaNsd9',
    isNewArrival: true,
    description: 'Bộ 5 túi nén hành lý chống thấm nước siêu nhẹ, giúp tiết kiệm 60% không gian vali và giữ quần áo luôn phẳng phiu, khô thoáng.'
  },
  {
    id: 4,
    slug: 'balo-canvas-sap-ong-alpine',
    title: 'Balo Canvas Sáp Ong Alpine',
    name: 'Balo Canvas Sáp Ong Alpine',
    subtitle: 'Bền bỉ vượt thời gian, chống nước tự nhiên',
    category: 'Trang bị',
    price: 1850000,
    originalPrice: 2200000,
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlyoRRMDdrEh1tEdYk_hR089ATUbOba9k2ZLY4EEOt7vStwznpSaiyIxKVKJPaLLya2UilfXbxnjGpi3yvXvBjeMczyjijEQ3PPzRZlxNWPoJlS3FhCQwy5_dACe_mP_T60HyDUUQvhJX_zQ8OwwJhx4vuZQunPrrw4HoVWGq6U1Nz3l55gqrSDP8QZWu6xaHPvIJHqNxGuG4SOYKVnHBRpnPuwBd_zcicEI79s2MGlZl4FfJmLNNy',
    isBestSeller: true,
    isExclusive: true,
    description: 'Vải canvas phủ sáp ong tự nhiên kết hợp da bò thuộc thảo mộc mộc mạc, sức chứa 28L tối ưu cho chuyến đi 2-4 ngày.'
  },
  {
    id: 5,
    slug: 'so-da-du-ky-thu-cong-vintage',
    title: 'Sổ Da Du Ký Thủ Công Vintage',
    name: 'Sổ Da Du Ký Thủ Công Vintage',
    subtitle: 'Lưu giữ những khoảnh khắc khám phá vô giá',
    category: 'Quà lưu niệm',
    price: 450000,
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVR3VFpWr8SwWK1opXwuR34WlEa_pEUzTOZOz8bEvmPcmZ6tN8x6eAPxZJIyzTd4d_EMB3NGcdNfosZigQb9e5wsoWCOgklW0ZHZwU2WXFyN814powhrVfOdI0ADpb7YphPJvid6U8YHEkrRCnN9U4rh7JOx8E3ZtPpppulAo3fYK83rAvN9ZLCJ85yh_iGf31IukX-u_afPkbmdz-jTKk12fLzicU97kTtyXtsep-XZw1vLA6TWIr',
    isFeatured: true,
    description: 'Gia công thủ công tỉ mỉ từ bìa da bò nguyên tấm và 200 trang giấy mỹ thuật mộc mạc không axit.'
  },
  {
    id: 6,
    slug: 'tra-shan-tuyet-co-thu-suoi-giang',
    title: 'Trà Búp Cổ Thụ Shan Tuyết Suối Giàng',
    name: 'Trà Búp Cổ Thụ Shan Tuyết Suối Giàng',
    subtitle: 'Búp trà phủ lông tơ bạc từ cây chè 300 năm tuổi',
    category: 'Quà lưu niệm',
    price: 1450000,
    originalPrice: 1800000,
    heroImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85',
    isFeatured: true,
    isBestSeller: true,
    isExclusive: true,
    description: 'Búp trà 1 tôm 2 lá thu hái từ những cây chè cổ thụ trên 300 năm tuổi ở độ cao 2.200m quanh năm mây phủ.'
  },
  {
    id: 7,
    slug: 'nen-thom-hoang-dan-tram-huong',
    title: 'Nến Thơm Hoàng Đàn & Trầm Hương',
    name: 'Nến Thơm Hoàng Đàn & Trầm Hương',
    subtitle: 'Sáp đậu nành thiên nhiên hòa quyện tinh dầu trầm',
    category: 'Thiết yếu',
    price: 890000,
    originalPrice: 1100000,
    heroImage: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85',
    isBestSeller: true,
    isExclusive: true,
    description: 'Sáp đậu nành thiên nhiên hòa quyện cùng tinh dầu hoàng đàn Lạng Sơn và trầm hương nguyên chất, giúp thanh lọc không gian và an định tinh thần.'
  },
  {
    id: 8,
    slug: 'bo-thien-phuc-linen-tu-nhien',
    title: 'Bộ Thiền Phục Linen Tự Nhiên',
    name: 'Bộ Thiền Phục Linen Tự Nhiên',
    subtitle: 'Chất liệu sợi lanh hữu cơ mềm mại thoáng khí',
    category: 'Trang bị',
    price: 1850000,
    originalPrice: 2200000,
    heroImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85',
    isBestSeller: true,
    isExclusive: true,
    description: 'Chất liệu sợi lanh hữu cơ tự nhiên thoáng mát, đường may thủ công tối giản mang lại sự nhẹ nhàng, thanh thoát tối đa khi thiền định hay dạo mát.'
  }
];

export default function KollectionShopPage({ currentPath = '/kollection-4u', onNavigate }: KollectionShopPageProps) {
  const toast = useToast();
  const [products, setProducts] = useState<KollectionProduct[]>(DEFAULT_NOMAD_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'featured'>('newest');

  // Cart State
  const [cartItems, setCartItems] = useState<{ product: KollectionProduct; quantity: number }[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  // Selected Product for Detail Lightbox Modal
  const [activeProduct, setActiveProduct] = useState<KollectionProduct | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [detailQuantity, setDetailQuantity] = useState<number>(1);

  // Checkout Modal State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'FORM' | 'UPSELL' | 'SUCCESS'>('FORM');
  const [orderSubmitting, setOrderSubmitting] = useState<boolean>(false);
  const [hasTransferred, setHasTransferred] = useState<boolean>(false);
  const [upsellSelectedMap, setUpsellSelectedMap] = useState<Record<string, number>>({});
  const [lastOrderCode, setLastOrderCode] = useState<string>('');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<{
    orderCode: string;
    items: { product: KollectionProduct; quantity: number }[];
    totalAmount: number;
    customerName: string;
    customerPhone: string;
    shippingAddress: string;
    paymentMethod: string;
  } | null>(null);
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const getMerchandiseImage = (product: KollectionProduct): string => {
    const title = (product.title || (product as any).name || '').toLowerCase();
    const cat = (product.category || '').toLowerCase();
    const rawImg = product.heroImage || (product as any).image || '';

    // Check if rawImg is a known travel landscape image (e.g. photo-1426604966848 or mountain views)
    const isLandscapePhoto =
      rawImg.includes('photo-1426604966848') ||
      rawImg.includes('photo-1544735716') ||
      rawImg.includes('photo-1506744038136') ||
      rawImg.includes('photo-1508746829417');

    if (rawImg && !isLandscapePhoto) {
      return getImageUrl(rawImg);
    }

    // Specific product mapping by keywords
    if (title.includes('bình') || title.includes('nhiệt') || title.includes('thermos')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAjTRcfdF6_yplK4VT-RChhxc_dz4gKf_iF0t-dDv6SZypoAbltGUIxc3lRHFKv4nZMF8Tsgu9Ba9S-MWfpU_W1_iDsxBoKe7dTpT1ogIu35me-nmxxS1IuybSM54_lEQKNizMTQX-K7xK8F-BBqBu6VbChNnNZNrY7fEoNsFJ75b1abxFjuX1yoWrrAdSUPEtpWd6tu5Wz8ul1E4qEvYXYbASQwPiWN4yvaxn9oLlfQZdQjR7y9O2';
    }
    if (title.includes('dụng cụ') || title.includes('đa năng') || title.includes('explorer') || title.includes('kìm') || title.includes('dao')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl2RytbicQSz-WIZdQH-PivcpvDy2Awo_yBLeSkqUrh-Pk8fThJJFSNjrqEdKPEZzjJk2FyOXoQZnHffSjs-MybP0WsMRPyua9rr3KYevhuE80GhbDQqNj26IdKplnl0fqBnBig3L_s8rL5ppSreTiWolguuT0VVj8oLfEJT2018Tf7zB8mg7A_RMmv2EYUf66AvUcRN0PRV63NUHmHkRKYm574-XAcX5mOHyNkds6e_qGRtxMtRho';
    }
    if (title.includes('hành lý') || title.includes('phân loại') || title.includes('set túi') || title.includes('packing')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2KcU5rhNDPLymv81SVNzvhlWhBkB6-B-EJcP40aT9gTUcsZ62E73wO_GdxI6PZlG6jPv4cJqquEUFRZZI3pnRUdpBsitzoyhPUpioKYxUUFE58LnPHzQTDY8I0BT0O4G39IJcaxZKjBZpektsdVRT410YvQCOfpupbH3Fzl2jQN4smIUosHWVWNVA-B3rFK6kEo_fqzlS7P5Hw-26FFqxElBWlZHQ_S0hmseFhJTrwOm6F3zaNsd9';
    }
    if (title.includes('balo') || title.includes('ba lô') || title.includes('canvas') || title.includes('sáp ong')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlyoRRMDdrEh1tEdYk_hR089ATUbOba9k2ZLY4EEOt7vStwznpSaiyIxKVKJPaLLya2UilfXbxnjGpi3yvXvBjeMczyjijEQ3PPzRZlxNWPoJlS3FhCQwy5_dACe_mP_T60HyDUUQvhJX_zQ8OwwJhx4vuZQunPrrw4HoVWGq6U1Nz3l55gqrSDP8QZWu6xaHPvIJHqNxGuG4SOYKVnHBRpnPuwBd_zcicEI79s2MGlZl4FfJmLNNy';
    }
    if (title.includes('sổ') || title.includes('du ký') || title.includes('vintage') || title.includes('journal')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVR3VFpWr8SwWK1opXwuR34WlEa_pEUzTOZOz8bEvmPcmZ6tN8x6eAPxZJIyzTd4d_EMB3NGcdNfosZigQb9e5wsoWCOgklW0ZHZwU2WXFyN814powhrVfOdI0ADpb7YphPJvid6U8YHEkrRCnN9U4rh7JOx8E3ZtPpppulAo3fYK83rAvN9ZLCJ85yh_iGf31IukX-u_afPkbmdz-jTKk12fLzicU97kTtyXtsep-XZw1vLA6TWIr';
    }
    if (title.includes('trà') || cat.includes('trà')) {
      return 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85';
    }
    if (title.includes('nến') || title.includes('tinh dầu') || cat.includes('nến') || cat.includes('tinh dầu')) {
      return 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85';
    }
    if (title.includes('thiền') || title.includes('linen') || title.includes('phục') || cat.includes('trang phục')) {
      return 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85';
    }

    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAjTRcfdF6_yplK4VT-RChhxc_dz4gKf_iF0t-dDv6SZypoAbltGUIxc3lRHFKv4nZMF8Tsgu9Ba9S-MWfpU_W1_iDsxBoKe7dTpT1ogIu35me-nmxxS1IuybSM54_lEQKNizMTQX-K7xK8F-BBqBu6VbChNnNZNrY7fEoNsFJ75b1abxFjuX1yoWrrAdSUPEtpWd6tu5Wz8ul1E4qEvYXYbASQwPiWN4yvaxn9oLlfQZdQjR7y9O2';
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProductsApi();
      if (Array.isArray(data) && data.length > 0) {
        // Map products so every item has clean title and merchandise image
        const normalized: KollectionProduct[] = data.map((item, idx) => {
          const resolvedTitle = item.title || item.name || DEFAULT_NOMAD_PRODUCTS[idx % DEFAULT_NOMAD_PRODUCTS.length].title;
          const resolvedHero = getMerchandiseImage(item);
          const isItemExclusive = item.isExclusive !== undefined ? item.isExclusive : DEFAULT_NOMAD_PRODUCTS.some(dp => dp.slug === item.slug && dp.isExclusive);

          return {
            ...item,
            title: resolvedTitle,
            name: resolvedTitle,
            heroImage: resolvedHero,
            isExclusive: isItemExclusive
          };
        });

        // Ensure we always have full product collection
        DEFAULT_NOMAD_PRODUCTS.forEach(dp => {
          if (!normalized.some(p => (p.slug && p.slug === dp.slug) || (p.title && p.title === dp.title))) {
            normalized.push(dp);
          }
        });
        setProducts(normalized);
      } else {
        setProducts(DEFAULT_NOMAD_PRODUCTS);
      }
    } catch (err: any) {
      setProducts(DEFAULT_NOMAD_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // 1. Category Filter
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'doc-quyen') {
        list = list.filter(p => p.isExclusive === true || (p as any).badge === 'Độc Quyền' || (p as any).badge === 'Đặc Tuyển');
      } else {
        const catQuery = selectedCategory.toLowerCase();
        list = list.filter(p => (p.category || '').toLowerCase().includes(catQuery));
      }
    }

    // 2. Price Range Filter
    if (selectedPriceRange === 'under-500k') {
      list = list.filter(p => (p.price || 0) < 500000);
    } else if (selectedPriceRange === '500k-2m') {
      list = list.filter(p => (p.price || 0) >= 500000 && (p.price || 0) <= 2000000);
    } else if (selectedPriceRange === 'above-2m') {
      list = list.filter(p => (p.price || 0) > 2000000);
    }

    // 3. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        (p.title || (p as any).name || '').toLowerCase().includes(q) ||
        (p.subtitle || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      );
    }

    // 4. Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        list.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'featured':
        list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'newest':
      default:
        list.sort((a, b) => (b.id as number || 0) - (a.id as number || 0));
        break;
    }

    return list;
  }, [products, selectedCategory, selectedPriceRange, searchQuery, sortBy]);

  // Cart Operations
  const handleAddToCart = (product: KollectionProduct, qty = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const productName = product.title || (product as any).name || 'Sản phẩm';
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id || item.product.slug === product.slug);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id || item.product.slug === product.slug
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    toast?.show?.(`Đã thêm "${productName}" vào giỏ hàng!`, 'success');
  };

  const handleUpdateCartQty = (productId: number | string | undefined, slug: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.product.id === productId || item.product.slug === slug) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: KollectionProduct; quantity: number }[]
    );
  };

  const cartTotalItems = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  const cartTotalPrice = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  }, [cartItems]);

  const formatVnd = (val?: number) => {
    if (!val) return '0 ₫';
    return `${val.toLocaleString('vi-VN')} ₫`;
  };

  const scrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCheckout = () => {
    if (cartItems.length === 0) {
      toast?.show?.('Giỏ hàng trống! Vui lòng chọn sản phẩm trước khi thanh toán.', 'warning');
      return;
    }
    setCartOpen(false);
    setCheckoutStep('FORM');
    setUpsellSelectedMap({});
    setCheckoutModalOpen(true);
  };

  const recommendedUpsellProducts = useMemo(() => {
    if (!cartItems.length) return products.slice(0, 4);
    const cartIds = new Set(cartItems.map(i => String(i.product.id || i.product.slug)));
    const cartCategories = new Set(
      cartItems.map(i => (i.product.category || '').toLowerCase()).filter(Boolean)
    );

    // 1. First priority: Same category items not yet in cart
    const sameCategory = products.filter(p => {
      const pId = String(p.id || p.slug);
      const pCat = (p.category || '').toLowerCase();
      return !cartIds.has(pId) && cartCategories.has(pCat);
    });

    // 2. Second priority: Other popular items in shop
    const otherItems = products.filter(p => {
      const pId = String(p.id || p.slug);
      return !cartIds.has(pId) && !sameCategory.some(sc => String(sc.id || sc.slug) === pId);
    });

    return [...sameCategory, ...otherItems].slice(0, 4);
  }, [cartItems, products]);

  const activeUpsellItems = useMemo(() => {
    return Object.entries(upsellSelectedMap)
      .map(([idOrSlug, qty]) => {
        if (qty <= 0) return null;
        const prod = products.find(p => String(p.id) === idOrSlug || String(p.slug) === idOrSlug);
        if (!prod) return null;
        return { product: prod, quantity: qty };
      })
      .filter(Boolean) as { product: KollectionProduct; quantity: number }[];
  }, [upsellSelectedMap, products]);

  const upsellTotalPrice = useMemo(() => {
    return activeUpsellItems.reduce((acc, curr) => acc + (curr.product.price || 0) * curr.quantity, 0);
  }, [activeUpsellItems]);

  const finalCombinedTotalPrice = useMemo(() => {
    return cartTotalPrice + upsellTotalPrice;
  }, [cartTotalPrice, upsellTotalPrice]);

  const finalCombinedTotalItems = useMemo(() => {
    const upsellQty = activeUpsellItems.reduce((acc, curr) => acc + curr.quantity, 0);
    return cartTotalItems + upsellQty;
  }, [cartTotalItems, activeUpsellItems]);

  const handleToggleUpsellItem = (product: KollectionProduct, delta: number) => {
    const key = String(product.id || product.slug);
    setUpsellSelectedMap(prev => {
      const currentQty = prev[key] || 0;
      const nextQty = Math.max(0, currentQty + delta);
      if (nextQty === 0) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: nextQty };
    });
  };

  const handleProceedToUpsell = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.fullName.trim() || !orderForm.phone.trim()) {
      toast?.show?.('Vui lòng điền Họ tên và Số điện thoại nhận hàng.', 'warning');
      return;
    }
    // Proceed to Step 2: UPSELL
    setCheckoutStep('UPSELL');
  };

  const handleConfirmFinalOrder = async (includeUpsell = true) => {
    setOrderSubmitting(true);
    try {
      const generatedOrderCode = `ORD-${Date.now().toString().slice(-6)}`;
      const finalItemsList = includeUpsell
        ? [...cartItems, ...activeUpsellItems]
        : [...cartItems];

      const finalTotal = includeUpsell ? finalCombinedTotalPrice : cartTotalPrice;

      const orderItemsData = finalItemsList.map(i => ({
        productId: Number(i.product.id) || undefined,
        productTitle: String(i.product.title || (i.product as any).name || 'Sản phẩm 4U'),
        productSku: i.product.sku || '',
        price: Number(i.product.price) || 0,
        quantity: Number(i.quantity) || 1,
        subtotal: Number(i.product.price * i.quantity) || 0,
        heroImage: i.product.heroImage || ''
      }));

      const paymentMethodStr = hasTransferred ? 'Chuyển khoản QR (Đã quét)' : 'COD / Thanh toán khi nhận hàng';

      await createShopOrderApi({
        orderCode: generatedOrderCode,
        customerName: orderForm.fullName.trim(),
        customerPhone: orderForm.phone.trim(),
        customerEmail: orderForm.email.trim() || undefined,
        shippingAddress: orderForm.address.trim() || 'Chưa cung cấp',
        paymentMethod: paymentMethodStr,
        orderNotes: orderForm.notes.trim() || undefined,
        totalAmount: finalTotal,
        shippingFee: 0,
        status: hasTransferred ? 'Đã thanh toán (Chờ giao)' : 'Chờ xác nhận',
        createdAt: new Date().toISOString(),
        items: orderItemsData
      });

      setLastOrderCode(generatedOrderCode);
      setLastPlacedOrder({
        orderCode: generatedOrderCode,
        items: finalItemsList,
        totalAmount: finalTotal,
        customerName: orderForm.fullName.trim(),
        customerPhone: orderForm.phone.trim(),
        shippingAddress: orderForm.address.trim() || 'Chưa cung cấp',
        paymentMethod: paymentMethodStr
      });

      setCheckoutStep('SUCCESS');
      setCartItems([]);
      setUpsellSelectedMap({});
      toast?.show?.('Đặt hàng thành công! Đội ngũ 4U sẽ liên hệ xác nhận đơn hàng.', 'success');
    } catch (err: any) {
      toast?.show?.('Gửi đơn hàng thất bại: ' + (err?.message || err), 'error');
    } finally {
      setOrderSubmitting(false);
    }
  };

  const getProductGallery = (product: KollectionProduct): string[] => {
    if (product.gallery && Array.isArray(product.gallery) && product.gallery.length > 0) {
      return product.gallery;
    }
    return [getMerchandiseImage(product)];
  };

  return (
    <div className="kshop-page-root">
      {/* ══════════════════════════════════════════════════════════════
          1. FLOATING SHOPPING CART BUTTON (BOTTOM-LEFT / FREE OF OVERLAPS)
      ══════════════════════════════════════════════════════════════ */}
      <button
        onClick={() => setCartOpen(true)}
        aria-label="Xem giỏ hàng"
        className="kshop-floating-cart-btn"
      >
        <ShoppingCart size={19} />
        <span>Giỏ hàng</span>
        {cartTotalItems > 0 && (
          <span className="kshop-cart-badge">
            {cartTotalItems}
          </span>
        )}
      </button>

      {/* ══════════════════════════════════════════════════════════════
          2. HERO BANNER (ALPINE EXPLORER CINEMATIC SUNRISE)
      ══════════════════════════════════════════════════════════════ */}
      <header className="kshop-hero-header">
        <div className="kshop-hero-bg-wrap">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcszqcldVLF0EfwlO2-_4xCGXnH3xjDxiNGdwigmieC2iBThbIkf5XXjSd63-QuD0tXb4b58-CntnZYwIsIJb-2difqWQpGBLQ9xksr0LFrNpqmrHRv2H0fHSvtaQ5BNR3E1ZG2IVcduNmSlRO-ZsoJ-QSH9nwR56Oev4xvsOTMpOfpLXWWnPvbhpWdkMamQbu_hJaY5x9cZjF9HGXjIqrWUfsIZ3tptTPkzGTSXqL6CwbiDEnnBF_"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85';
            }}
            alt="Alpine Explorer Mountain Sunrise"
            className="kshop-hero-img"
          />
          <div className="kshop-hero-overlay" />
        </div>

        <ScrollReveal>
          <div className="kshop-hero-content">
            <h1 className="font-headline kshop-hero-title">
              Trang bị cho chuyến phiêu lưu tiếp theo
            </h1>

            <p className="kshop-hero-desc">
              Các sản phẩm du lịch được tuyển chọn kỹ lưỡng, quà lưu niệm thủ công và những vật dụng thiết yếu được thiết kế cho người khám phá hiện đại.
            </p>

            <button
              onClick={() => scrollToSection('product-catalog')}
              className="kshop-hero-btn"
            >
              <span>Khám phá Bộ sưu tập</span>
            </button>
          </div>
        </ScrollReveal>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          3. MAIN CONTENT (FULL WIDTH EDGE-TO-EDGE)
      ══════════════════════════════════════════════════════════════ */}
      <main className="kshop-main-content">

        {/* ──────────────────────────────────────────────────────────────
            3.1 CATEGORY SELECTION (BENTO GRID 3-COLUMN)
        ────────────────────────────────────────────────────────────── */}
        <section className="kollection-full-padding">
          <div className="kshop-featured-header-row">
            <h2 className="font-headline kshop-featured-title">
              Danh mục nổi bật
            </h2>

            <button
              onClick={() => {
                setSelectedCategory('All');
                scrollToSection('product-catalog');
              }}
              className="kshop-featured-all-btn"
            >
              <span>Xem tất cả</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 3 Bento Cards */}
          <div className="kshop-bento-grid">
            {FEATURED_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.categoryKey);
                  scrollToSection('product-catalog');
                }}
                className="group kshop-bento-card"
              >
                <img
                  src={cat.image}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = cat.fallbackImage;
                  }}
                  alt={cat.name}
                  className="kshop-bento-img"
                />
                <div className="kshop-bento-gradient" />
                <div className="kshop-bento-info">
                  <h3 className="font-headline kshop-bento-card-title">
                    {cat.name}
                  </h3>
                  <p className="kshop-bento-card-sub">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────
            3.2 MAIN PRODUCT AREA (FULL WIDTH 2-COLUMN GRID)
        ────────────────────────────────────────────────────────────── */}
        <div
          id="product-catalog"
          className="kollection-full-padding"
        >
          {/* Top Filters Bar */}
          <div className="kshop-filter-bar">
            {/* Filter Selects */}
            <div className="kshop-filters-left">
              <span className="font-headline kshop-filter-label">
                Bộ lọc:
              </span>

              {/* Category Filter with Exclusive Option */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="kshop-select"
              >
                <option value="All">Danh mục: Tất cả</option>
                <option value="doc-quyen">✨ Sản phẩm Độc quyền</option>
                <option value="Phụ kiện du lịch">Phụ kiện du lịch</option>
                <option value="Trang bị">Trang bị</option>
                <option value="Thiết yếu">Thiết yếu</option>
                <option value="Quà lưu niệm">Quà lưu niệm</option>
              </select>

              {/* Price Filter */}
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="kshop-select"
              >
                <option value="All">Giá: Tất cả</option>
                <option value="under-500k">Dưới 500.000 ₫</option>
                <option value="500k-2m">500.000 ₫ - 2.000.000 ₫</option>
                <option value="above-2m">Trên 2.000.000 ₫</option>
              </select>
            </div>

            {/* Counter & Sort */}
            <div className="kshop-filters-right">
              <p className="kshop-count-text">
                Hiển thị <strong className="kshop-count-highlight">{filteredProducts.length}</strong> sản phẩm tinh tuyển
              </p>

              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="kshop-select"
              >
                <option value="newest">Mới nhất</option>
                <option value="featured">Bán chạy nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          {/* Product Grid (2 columns full width) */}
          {loading ? (
            <div className="kshop-loading-box">
              <RefreshCw size={36} className="spin kshop-loading-spinner" />
              <p className="kshop-count-text">Đang nạp danh mục sản phẩm...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="kshop-empty-box">
              <ShoppingBag size={44} className="kshop-empty-icon" />
              <h3 className="font-headline kshop-empty-title">
                Không tìm thấy sản phẩm phù hợp
              </h3>
              <p className="kshop-empty-desc">
                Hãy thử chọn mức giá hoặc danh mục khác.
              </p>
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedPriceRange('All'); setSearchQuery(''); }}
                className="kshop-empty-btn"
              >
                Xem tất cả sản phẩm
              </button>
            </div>
          ) : (
            <div className="kshop-product-grid">
              {filteredProducts.map((product, pIdx) => {
                const discountPercent = product.originalPrice && product.originalPrice > product.price
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

                const displayTitle = product.title || (product as any).name || 'Sản phẩm Kollection 4U';
                const displayImage = getMerchandiseImage(product);

                return (
                  <ScrollReveal key={product.id || product.slug || pIdx} delay={(pIdx % 2) * 80}>
                    <div
                      className="nomad-card"
                      onClick={() => setActiveProduct({ ...product, title: displayTitle, heroImage: displayImage })}
                    >
                      <div>
                        {/* Image Frame */}
                        <div className="kshop-card-img-box">
                          {/* Top Left Badges */}
                          <div className="kshop-card-badges-top-left">
                            {product.isExclusive && (
                              <span className="kshop-badge-exclusive">
                                <Sparkles size={12} /> Độc quyền
                              </span>
                            )}
                            {discountPercent > 0 && (
                              <span className="kshop-badge-discount">
                                -{discountPercent}%
                              </span>
                            )}
                            {product.isBestSeller && (
                              <span className="kshop-badge-bestseller">
                                Bán chạy
                              </span>
                            )}
                            {product.isNewArrival && (
                              <span className="kshop-badge-new">
                                Mới
                              </span>
                            )}
                          </div>

                          {/* Top Right Category Pill */}
                          <div className="kshop-card-category-pill">
                            <span className="kshop-category-pill-tag">
                              {product.category || 'Retreat'}
                            </span>
                          </div>

                          {/* Product Image with Zoom */}
                          <img
                            className="nomad-img-zoom"
                            src={displayImage}
                            alt={displayTitle}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=85';
                            }}
                          />
                        </div>

                        {/* Card Content Body */}
                        <div className="kshop-card-body">
                          <span className="kshop-card-eyebrow">
                            KOLLECTION 4U • {product.category || 'Thủ Công Tinh Tuyển'}
                          </span>

                          <h3 className="zannier-title-italic kshop-card-title">
                            {displayTitle}
                          </h3>

                          <p className="kshop-card-desc">
                            {product.subtitle || product.description}
                          </p>
                        </div>
                      </div>

                      {/* Price and Cart Button Action Row */}
                      <div className="kshop-card-action-bar">
                        <div>
                          <span className="kshop-price-label">
                            Giá niêm yết
                          </span>
                          <div className="kshop-price-box">
                            <strong className="kshop-price-current">
                              {formatVnd(product.price)}
                            </strong>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="kshop-price-orig">
                                {formatVnd(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveProduct({ ...product, title: displayTitle, heroImage: displayImage });
                            }}
                            className="kshop-btn-detail"
                          >
                            Chi tiết
                          </button>
                          <button
                            aria-label="Thêm vào giỏ hàng"
                            onClick={(e) => handleAddToCart({ ...product, title: displayTitle, heroImage: displayImage }, 1, e)}
                            className="kshop-btn-buy"
                          >
                            <ShoppingCart size={16} />
                            <span>Chọn mua</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ══════════════════════════════════════════════════════════════
          4. SLIDE-OVER SHOPPING CART DRAWER
      ══════════════════════════════════════════════════════════════ */}
      {cartOpen && (
        <div className="kshop-cart-backdrop">
          <div className="kshop-cart-drawer">
            {/* Drawer Header */}
            <div className="kshop-cart-header">
              <div className="kshop-cart-title">
                <ShoppingCart size={20} color="#065f46" /> Giỏ hàng của bạn ({cartTotalItems})
              </div>
              <button onClick={() => setCartOpen(false)} className="kshop-cart-close">
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="kshop-cart-list">
              {cartItems.length === 0 ? (
                <div className="kshop-cart-empty">
                  <ShoppingBag size={40} className="kshop-empty-icon" />
                  <p style={{ fontSize: '15px', margin: 0 }}>Chưa có sản phẩm nào trong giỏ hàng</p>
                </div>
              ) : (
                cartItems.map(({ product, quantity }) => (
                  <div key={product.id || product.slug} className="kshop-cart-item">
                    <img src={getMerchandiseImage(product)} alt="" className="kshop-cart-item-img" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#191c1d', lineHeight: 1.3 }}>{product.title || (product as any).name}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#004532', marginTop: '3px' }}>{formatVnd(product.price)}</div>
                    </div>
                    <div className="kshop-cart-qty-ctrl">
                      <button onClick={() => handleUpdateCartQty(product.id, product.slug, -1)} className="kshop-cart-qty-btn"><Minus size={12} /></button>
                      <span className="kshop-cart-qty-val">{quantity}</span>
                      <button onClick={() => handleUpdateCartQty(product.id, product.slug, 1)} className="kshop-cart-qty-btn"><Plus size={12} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout */}
            {cartItems.length > 0 && (
              <div className="kshop-cart-footer">
                <div className="kshop-cart-total-row">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="kshop-cart-total-val">{formatVnd(cartTotalPrice)}</span>
                </div>
                <button
                  onClick={handleOpenCheckout}
                  className="kshop-cart-checkout-btn"
                >
                  <ShoppingBag size={18} /> Tiến hành đặt hàng
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          5. PRODUCT DETAIL LIGHTBOX MODAL
      ══════════════════════════════════════════════════════════════ */}
      {activeProduct && !checkoutModalOpen && (
        <div className="kshop-detail-backdrop">
          <div className="kshop-detail-card">
            <button
              onClick={() => setActiveProduct(null)}
              className="kshop-detail-close"
            >
              <X size={18} />
            </button>

            <div className="kshop-detail-left">
              <div className="kshop-detail-main-img-box">
                <img src={getMerchandiseImage(activeProduct)} alt="" className="kshop-detail-main-img" />
              </div>
              {getProductGallery(activeProduct).length > 1 && (
                <div className="kshop-detail-gallery-row">
                  {getProductGallery(activeProduct).map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`kshop-detail-gallery-thumb ${activeImageIndex === idx ? 'active' : ''}`}
                    >
                      <img src={getImageUrl(img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="kshop-detail-right">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="kshop-detail-category-badge">
                    {activeProduct.category}
                  </span>
                  {activeProduct.isExclusive && (
                    <span className="kshop-detail-exclusive-tag">
                      <Sparkles size={10} /> Độc quyền
                    </span>
                  )}
                </div>
                <h2 className="font-headline kshop-detail-title">
                  {activeProduct.title || (activeProduct as any).name}
                </h2>
                <div className="kshop-detail-price">
                  {formatVnd(activeProduct.price)}
                  {activeProduct.originalPrice && activeProduct.originalPrice > activeProduct.price && (
                    <span className="kshop-detail-price-orig">
                      {formatVnd(activeProduct.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="kshop-detail-desc">
                  {activeProduct.description || activeProduct.subtitle}
                </p>
              </div>

              <div>
                <div className="kshop-detail-qty-box">
                  <div className="kshop-cart-qty-ctrl">
                    <button onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))} className="kshop-cart-qty-btn"><Minus size={14} /></button>
                    <span className="kshop-cart-qty-val">{detailQuantity}</span>
                    <button onClick={() => setDetailQuantity(detailQuantity + 1)} className="kshop-cart-qty-btn"><Plus size={14} /></button>
                  </div>
                  <button
                    onClick={() => {
                      handleAddToCart(activeProduct, detailQuantity);
                      setActiveProduct(null);
                    }}
                    className="kshop-detail-add-btn"
                  >
                    <ShoppingCart size={16} /> Thêm vào giỏ hàng
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          6. FAST CHECKOUT & UPSELL MODAL (MULTI-STEP FLOW)
      ══════════════════════════════════════════════════════════════ */}
      {checkoutModalOpen && (
        <div className="kshop-checkout-backdrop">
          <div className={`kshop-checkout-card ${checkoutStep === 'UPSELL' ? 'upsell-mode' : ''}`}>
            <button
              onClick={() => {
                setCheckoutModalOpen(false);
                setCheckoutStep('FORM');
                setUpsellSelectedMap({});
              }}
              className="kshop-checkout-close"
            >
              <X size={18} />
            </button>

            {/* ──────────────────────────────────────────────────────────
                STEP 1: CUSTOMER INFORMATION FORM
            ────────────────────────────────────────────────────────── */}
            {checkoutStep === 'FORM' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="kshop-checkout-badge">
                    BƯỚC 1/2 • THÔNG TIN ĐẶT HÀNG
                  </span>
                </div>
                <h2 className="font-headline kshop-checkout-title">
                  Xác nhận đơn hàng
                </h2>
                <p className="kshop-checkout-subtitle">
                  Vui lòng cung cấp thông tin để 4U chuẩn bị và đóng gói giao hàng tận nơi.
                </p>

                <form onSubmit={handleProceedToUpsell} className="kshop-checkout-form">
                  {/* 2-Column Responsive Inputs: Họ tên + Số điện thoại */}
                  <div className="kshop-checkout-grid2">
                    <div>
                      <label className="kshop-checkout-label">Họ và tên *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={orderForm.fullName}
                        onChange={e => setOrderForm({ ...orderForm, fullName: e.target.value })}
                        className="kshop-checkout-input"
                      />
                    </div>

                    <div>
                      <label className="kshop-checkout-label">Số điện thoại nhận hàng *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0987 654 321"
                        value={orderForm.phone}
                        onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })}
                        className="kshop-checkout-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="kshop-checkout-label">Địa chỉ nhận hàng chi tiết</label>
                    <input
                      type="text"
                      placeholder="Số nhà, Tên đường, Phường/Xã, Tỉnh/Thành"
                      value={orderForm.address}
                      onChange={e => setOrderForm({ ...orderForm, address: e.target.value })}
                      className="kshop-checkout-input"
                    />
                  </div>

                  <div>
                    <label className="kshop-checkout-label">Ghi chú đơn hàng</label>
                    <textarea
                      rows={2}
                      placeholder="Ghi chú thêm về thời gian nhận hàng hoặc đóng gói quà..."
                      value={orderForm.notes}
                      onChange={e => setOrderForm({ ...orderForm, notes: e.target.value })}
                      className="kshop-checkout-textarea"
                    />
                  </div>

                  {/* Cart Summary Card */}
                  <div className="kshop-checkout-summary-box">
                    <div className="kshop-summary-row">
                      <span>Số lượng hiện tại:</span>
                      <strong>{cartTotalItems} sản phẩm</strong>
                    </div>
                    <div className="kshop-summary-total-row">
                      <span>Tổng tiền hàng:</span>
                      <span>{formatVnd(cartTotalPrice)}</span>
                    </div>
                  </div>

                  {/* QR PAYMENT OPTION PREVIEW */}
                  <div className="kshop-checkout-qr-box">
                    <div className="kshop-qr-head-row">
                      <div className="kshop-qr-title-box">
                        <QrCode size={18} color="#065f46" />
                        <span className="kshop-qr-title">
                          Quét Mã QR Chuyển Khoản Nhanh
                        </span>
                      </div>
                      <span className="kshop-qr-badge">
                        VietQR 24/7
                      </span>
                    </div>

                    <div className="kshop-qr-content-row">
                      <div className="kshop-checkout-qr-img-box">
                        <img
                          src={`https://api.vietqr.io/image/970422-0987654321-compact.png?amount=${cartTotalPrice}&addInfo=${encodeURIComponent('4U ' + (orderForm.phone ? orderForm.phone.replace(/\s+/g, '') : 'KOLLECTION'))}&accountName=4U%20WELLNESS%20RETREAT`}
                          alt="Mã QR Chuyển Khoản"
                          className="kshop-qr-img"
                        />
                      </div>

                      <div className="kshop-qr-info-col">
                        <div><span className="kshop-qr-label">Ngân hàng:</span> <strong style={{ color: '#081f13' }}>MB Bank</strong></div>
                        <div><span className="kshop-qr-label">Số tài khoản:</span> <strong className="kshop-qr-acc-num">0987 654 321</strong></div>
                        <div><span className="kshop-qr-label">Chủ tài khoản:</span> <strong style={{ color: '#081f13' }}>4U WELLNESS & RETREAT</strong></div>
                        <div><span className="kshop-qr-label">Số tiền:</span> <strong className="kshop-qr-amount">{formatVnd(cartTotalPrice)}</strong></div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const nextState = !hasTransferred;
                        setHasTransferred(nextState);
                        const transferTag = `[ĐÃ CHUYỂN KHOẢN QR ${formatVnd(cartTotalPrice)}]`;
                        if (nextState) {
                          if (!orderForm.notes.includes(transferTag)) {
                            setOrderForm(prev => ({
                              ...prev,
                              notes: prev.notes ? `${prev.notes} - ${transferTag}` : transferTag
                            }));
                          }
                          toast?.show?.('Đã ghi nhận: Bạn chọn thanh toán chuyển khoản QR!', 'success');
                        } else {
                          setOrderForm(prev => ({
                            ...prev,
                            notes: prev.notes.replace(` - ${transferTag}`, '').replace(transferTag, '').trim()
                          }));
                        }
                      }}
                      className={`kshop-qr-confirm-btn ${hasTransferred ? 'active' : ''}`}
                    >
                      {hasTransferred ? <CheckCircle2 size={16} color="#059669" /> : <CreditCard size={16} />}
                      {hasTransferred ? '✓ Tôi Đã Chuyển Khoản QR Thành Công' : '👉 Bấm vào đây nếu bạn muốn Chuyển Khoản QR ngay'}
                    </button>
                  </div>

                  {/* Submit Button to go to Step 2 UPSELL */}
                  <button
                    type="submit"
                    className="kshop-checkout-submit-btn"
                  >
                    <span>Tiếp tục • Hoàn tất đặt hàng</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────
                STEP 2: UPSELL & CROSS-SELL POPUP MODAL (DYNAMIC PRICING)
            ────────────────────────────────────────────────────────── */}
            {checkoutStep === 'UPSELL' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="kshop-checkout-badge-upsell">
                    BƯỚC 2/2 • GỢI Ý MUA KÈM ƯU ĐÃI
                  </span>
                  <span className="kshop-checkout-badge-freeship">
                    ⚡ Miễn Phí Giao Chung Đơn
                  </span>
                </div>

                <h2 className="font-headline kshop-checkout-title">
                  Mua Kèm Ưu Đãi Đặc Quyền
                </h2>
                <p className="kshop-checkout-subtitle">
                  Chọn thêm các sản phẩm yêu thích cùng bộ sưu tập dưới đây để nhận ưu đãi freeship và quà đóng gói cao cấp.
                </p>

                {/* Upsell Products Cards Grid */}
                <div className="kshop-upsell-grid">
                  {recommendedUpsellProducts.map((recProd) => {
                    const key = String(recProd.id || recProd.slug);
                    const isSelectedQty = upsellSelectedMap[key] || 0;

                    return (
                      <div
                        key={key}
                        className={`kshop-upsell-card ${isSelectedQty > 0 ? 'selected' : ''}`}
                      >
                        <div>
                          <div className="kshop-upsell-img-box">
                            <img
                              src={getMerchandiseImage(recProd)}
                              alt={recProd.title}
                              className="kshop-upsell-img"
                            />
                            <span className="kshop-upsell-badge-cat">
                              {recProd.category || 'Tĩnh Dưỡng'}
                            </span>
                            {isSelectedQty > 0 && (
                              <span className="kshop-upsell-badge-qty">
                                Đã chọn x{isSelectedQty}
                              </span>
                            )}
                          </div>
                          <h4 className="kshop-upsell-title">
                            {recProd.title || (recProd as any).name}
                          </h4>
                          <div className="kshop-upsell-price">
                            {formatVnd(recProd.price)}
                          </div>
                        </div>

                        {isSelectedQty === 0 ? (
                          <button
                            type="button"
                            onClick={() => handleToggleUpsellItem(recProd, 1)}
                            className="kshop-upsell-btn-add"
                          >
                            <Plus size={14} />
                            <span>+ Thêm mua kèm (+{formatVnd(recProd.price)})</span>
                          </button>
                        ) : (
                          <div className="kshop-upsell-qty-ctrl">
                            <button
                              type="button"
                              onClick={() => handleToggleUpsellItem(recProd, -1)}
                              className="kshop-upsell-qty-btn-minus"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="kshop-upsell-qty-val">
                              {isSelectedQty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleToggleUpsellItem(recProd, 1)}
                              className="kshop-upsell-qty-btn-plus"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* DYNAMIC REAL-TIME PRICE CALCULATION SUMMARY */}
                <div className="kshop-upsell-summary-box">
                  <div className="kshop-summary-row">
                    <span>Đơn hàng ban đầu ({cartTotalItems} món):</span>
                    <span style={{ fontWeight: 600 }}>{formatVnd(cartTotalPrice)}</span>
                  </div>

                  {activeUpsellItems.length > 0 && (
                    <div className="kshop-summary-row" style={{ color: '#059669' }}>
                      <span>Sản phẩm mua kèm thêm (+{activeUpsellItems.reduce((a,c) => a + c.quantity, 0)} món):</span>
                      <strong style={{ color: '#059669' }}>+ {formatVnd(upsellTotalPrice)}</strong>
                    </div>
                  )}

                  {activeUpsellItems.length > 0 && (
                    <div style={{ fontSize: '11.5px', color: '#065f46', marginBottom: '6px', paddingLeft: '8px', borderLeft: '2px solid #34d399' }}>
                      {activeUpsellItems.map(item => `${item.product.title} (x${item.quantity})`).join(', ')}
                    </div>
                  )}

                  <div className="kshop-summary-row">
                    <span>Phí vận chuyển:</span>
                    <span style={{ color: '#059669', fontWeight: 700 }}>0 ₫ (Miễn phí toàn quốc)</span>
                  </div>

                  <div className="kshop-receipt-divider" />

                  <div className="kshop-receipt-total-row">
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#081f13', display: 'block' }}>
                        TỔNG THANH TOÁN MỚI:
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        ({finalCombinedTotalItems} sản phẩm sau khi mua kèm)
                      </span>
                    </div>
                    <span style={{ fontSize: 'clamp(18px, 2.4vh, 22px)', fontWeight: 800, color: '#004532' }}>
                      {formatVnd(finalCombinedTotalPrice)}
                    </span>
                  </div>
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    type="button"
                    disabled={orderSubmitting}
                    onClick={() => handleConfirmFinalOrder(true)}
                    className="kshop-checkout-submit-btn"
                  >
                    {orderSubmitting ? <RefreshCw size={18} className="spin" /> : <ShieldCheck size={18} />}
                    <span>
                      {orderSubmitting
                        ? 'Đang lưu đơn hàng...'
                        : `Xác Nhận Đặt Hàng (${formatVnd(finalCombinedTotalPrice)})`}
                    </span>
                  </button>

                  {activeUpsellItems.length > 0 ? (
                    <button
                      type="button"
                      disabled={orderSubmitting}
                      onClick={() => handleConfirmFinalOrder(false)}
                      className="kshop-upsell-skip-btn"
                    >
                      Bỏ qua mua kèm, chỉ đặt đơn ban đầu ({formatVnd(cartTotalPrice)})
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('FORM')}
                      className="kshop-upsell-back-btn"
                    >
                      ← Quay lại chỉnh sửa thông tin giao hàng
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────
                STEP 3: ORDER CONFIRMED & SUCCESS SCREEN
            ────────────────────────────────────────────────────────── */}
            {checkoutStep === 'SUCCESS' && (
              <div style={{ padding: 'clamp(6px, 1vh, 12px) 0' }}>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(14px, 2vh, 20px)' }}>
                  <div className="kshop-success-icon-wrap">
                    <CheckCircle2 size={32} />
                  </div>
                  <span className="kshop-success-badge">
                    {lastOrderCode ? `Mã Đơn: ${lastOrderCode}` : 'Đặt Hàng Thành Công'}
                  </span>
                  <h3 className="font-headline kshop-success-title">
                    Cảm Ơn Bạn Đã Tin Chọn Kollection 4U!
                  </h3>
                  <p className="kshop-success-desc">
                    Đội ngũ chuyên viên 4U sẽ liên hệ số điện thoại <strong>{lastPlacedOrder?.customerPhone || orderForm.phone || 'của bạn'}</strong> trong vòng 15-30 phút để xác nhận và đóng gói giao hàng tận nơi.
                  </p>
                </div>

                {/* Ordered Items Receipt Box */}
                <div className="kshop-success-receipt">
                  <div className="kshop-receipt-title">
                    Chi tiết đơn hàng ({lastPlacedOrder?.items?.length || 0} mục):
                  </div>

                  <div className="kshop-receipt-list">
                    {lastPlacedOrder?.items?.map((item: any, idx: number) => (
                      <div key={idx} className="kshop-receipt-item">
                        <div className="kshop-receipt-item-title-box">
                          <span className="kshop-receipt-item-qty">{item.quantity}x</span>
                          <span className="kshop-receipt-item-name">
                            {item.product?.title || (item.product as any)?.name || 'Sản phẩm 4U'}
                          </span>
                        </div>
                        <span style={{ fontWeight: 600, color: '#334155', marginLeft: '12px', whiteSpace: 'nowrap' }}>
                          {formatVnd((item.product?.price || 0) * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '8px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>Tổng số tiền thanh toán:</span>
                    <strong style={{ fontSize: '17px', color: '#004532' }}>
                      {formatVnd(lastPlacedOrder?.totalAmount || finalCombinedTotalPrice)}
                    </strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      setCheckoutStep('FORM');
                      setUpsellSelectedMap({});
                    }}
                    className="kshop-success-done-btn"
                  >
                    Hoàn tất & Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
