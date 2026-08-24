import React, { useState, useEffect, useMemo } from 'react';
import ScrollReveal from './ScrollReveal';
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
  const [orderSubmitting, setOrderSubmitting] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [hasTransferred, setHasTransferred] = useState<boolean>(false);
  const [lastPurchasedProducts, setLastPurchasedProducts] = useState<KollectionProduct[]>([]);
  const [lastOrderCode, setLastOrderCode] = useState<string>('');
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
    setCheckoutModalOpen(true);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.fullName.trim() || !orderForm.phone.trim()) {
      toast?.show?.('Vui lòng điền Họ tên và Số điện thoại nhận hàng.', 'warning');
      return;
    }

    setOrderSubmitting(true);
    try {
      const generatedOrderCode = `ORD-${Date.now().toString().slice(-6)}`;
      const purchasedProds = cartItems.map(i => i.product);
      setLastPurchasedProducts(purchasedProds);
      setLastOrderCode(generatedOrderCode);

      const orderItemsData = cartItems.map(i => ({
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
        totalAmount: cartTotalPrice,
        shippingFee: 0,
        status: hasTransferred ? 'Đã thanh toán (Chờ giao)' : 'Chờ xác nhận',
        createdAt: new Date().toISOString(),
        items: orderItemsData
      });

      setOrderSuccess(true);
      setCartItems([]);
      setHasTransferred(false);
      toast?.show?.('Đặt hàng thành công! Đội ngũ 4U sẽ liên hệ xác nhận đơn hàng.', 'success');
    } catch (err: any) {
      toast?.show?.('Gửi đơn hàng thất bại: ' + (err?.message || err), 'error');
    } finally {
      setOrderSubmitting(false);
    }
  };

  const recommendedUpsellProducts = useMemo(() => {
    if (!lastPurchasedProducts.length) return products.slice(0, 3);
    const purchasedIds = new Set(lastPurchasedProducts.map(p => String(p.id || p.slug)));
    const purchasedCategories = new Set(
      lastPurchasedProducts.map(p => (p.category || '').toLowerCase()).filter(Boolean)
    );

    // 1. First priority: Same category items not yet purchased in this order
    const sameCategory = products.filter(p => {
      const pId = String(p.id || p.slug);
      const pCat = (p.category || '').toLowerCase();
      return !purchasedIds.has(pId) && purchasedCategories.has(pCat);
    });

    // 2. Second priority: Other popular items in shop
    const otherItems = products.filter(p => {
      const pId = String(p.id || p.slug);
      return !purchasedIds.has(pId) && !sameCategory.some(sc => String(sc.id || sc.slug) === pId);
    });

    return [...sameCategory, ...otherItems].slice(0, 3);
  }, [lastPurchasedProducts, products]);

  const getProductGallery = (product: KollectionProduct): string[] => {
    if (product.gallery && Array.isArray(product.gallery) && product.gallery.length > 0) {
      return product.gallery;
    }
    return [getMerchandiseImage(product)];
  };

  return (
    <div
      style={{
        backgroundColor: '#f8f9fa',
        color: '#191c1d',
        fontFamily: "'Plus Jakarta Sans', 'Be Vietnam Pro', sans-serif",
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap');

        .font-headline {
          font-family: 'Be Vietnam Pro', sans-serif;
        }

        .zannier-title-italic {
          font-family: 'Libre Caslon Text', 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 400;
        }

        .nomad-card {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .nomad-card:hover {
          background: transparent !important;
          box-shadow: none !important;
        }

        .nomad-img-zoom {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
        }
        .nomad-card:hover .nomad-img-zoom {
          transform: scale(1.05);
        }

        .kollection-grid-2col {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 64px 48px;
          width: 100%;
        }

        @media (max-width: 992px) {
          .kollection-grid-2col {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .kollection-full-padding {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          1. FLOATING SHOPPING CART BUTTON (BOTTOM-LEFT / FREE OF OVERLAPS)
      ══════════════════════════════════════════════════════════════ */}
      <button
        onClick={() => setCartOpen(true)}
        aria-label="Xem giỏ hàng"
        style={{
          position: 'fixed',
          bottom: '28px',
          left: '28px',
          zIndex: 9990,
          backgroundColor: '#065f46',
          color: '#ffffff',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '9999px',
          padding: '13px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 30px rgba(6, 95, 70, 0.45), 0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 700,
          transition: 'all 0.25s cubic-bezier(.22,.61,.36,1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)';
          e.currentTarget.style.backgroundColor = '#044e39';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.backgroundColor = '#065f46';
        }}
      >
        <ShoppingCart size={19} />
        <span>Giỏ hàng</span>
        {cartTotalItems > 0 && (
          <span style={{
            backgroundColor: '#ffffff',
            color: '#065f46',
            fontSize: '12px',
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: '9999px',
            marginLeft: '2px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            {cartTotalItems}
          </span>
        )}
      </button>

      {/* ══════════════════════════════════════════════════════════════
          2. HERO BANNER (ALPINE EXPLORER CINEMATIC SUNRISE)
      ══════════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '614px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '140px 20px 80px 20px',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcszqcldVLF0EfwlO2-_4xCGXnH3xjDxiNGdwigmieC2iBThbIkf5XXjSd63-QuD0tXb4b58-CntnZYwIsIJb-2difqWQpGBLQ9xksr0LFrNpqmrHRv2H0fHSvtaQ5BNR3E1ZG2IVcduNmSlRO-ZsoJ-QSH9nwR56Oev4xvsOTMpOfpLXWWnPvbhpWdkMamQbu_hJaY5x9cZjF9HGXjIqrWUfsIZ3tptTPkzGTSXqL6CwbiDEnnBF_"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85';
            }}
            alt="Alpine Explorer Mountain Sunrise"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.85)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.42)'
            }}
          />
        </div>

        <ScrollReveal>
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              maxWidth: '820px',
              margin: '0 auto',
              padding: '0 20px'
            }}
          >
            <h1
              className="font-headline"
              style={{
                fontSize: 'clamp(34px, 4.5vw, 48px)',
                lineHeight: '56px',
                letterSpacing: '-0.02em',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '24px',
                textShadow: '0 3px 20px rgba(0,0,0,0.6)'
              }}
            >
              Trang bị cho chuyến phiêu lưu tiếp theo
            </h1>

            <p
              style={{
                fontSize: 'clamp(16px, 1.6vw, 18px)',
                lineHeight: '28px',
                color: 'rgba(255, 255, 255, 0.92)',
                marginBottom: '48px',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                maxWidth: '680px',
                margin: '0 auto 36px auto'
              }}
            >
              Các sản phẩm du lịch được tuyển chọn kỹ lưỡng, quà lưu niệm thủ công và những vật dụng thiết yếu được thiết kế cho người khám phá hiện đại.
            </p>

            <button
              onClick={() => scrollToSection('product-catalog')}
              style={{
                backgroundColor: '#065f46',
                color: '#ffffff',
                padding: '14px 36px',
                borderRadius: '0.25rem',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.01em',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(6, 95, 70, 0.45)',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span>Khám phá Bộ sưu tập</span>
            </button>
          </div>
        </ScrollReveal>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          3. MAIN CONTENT (FULL WIDTH EDGE-TO-EDGE)
      ══════════════════════════════════════════════════════════════ */}
      <main style={{ width: '100%', padding: '48px 0 80px 0' }}>

        {/* ──────────────────────────────────────────────────────────────
            3.1 CATEGORY SELECTION (BENTO GRID 3-COLUMN)
        ────────────────────────────────────────────────────────────── */}
        <section
          className="kollection-full-padding"
          style={{
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto 48px auto',
            padding: '0 48px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <h2
              className="font-headline"
              style={{
                fontSize: '32px',
                lineHeight: '40px',
                fontWeight: 700,
                color: '#191c1d',
                margin: 0
              }}
            >
              Danh mục nổi bật
            </h2>

            <button
              onClick={() => {
                setSelectedCategory('All');
                scrollToSection('product-catalog');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#004532',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Xem tất cả</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 3 Bento Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', minHeight: '300px' }}>
            {FEATURED_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.categoryKey);
                  scrollToSection('product-catalog');
                }}
                className="group"
                style={{
                  position: 'relative',
                  height: '300px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                }}
              >
                <img
                  src={cat.image}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = cat.fallbackImage;
                  }}
                  alt={cat.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.7s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                    pointerEvents: 'none'
                  }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '24px', zIndex: 2 }}>
                  <h3
                    className="font-headline"
                    style={{
                      fontSize: '24px',
                      lineHeight: '32px',
                      fontWeight: 600,
                      color: '#ffffff',
                      margin: '0 0 2px 0'
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
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
          style={{
            width: '100%',
            maxWidth: '100%',
            padding: '0 48px 120px',
            boxSizing: 'border-box'
          }}
        >
          {/* Top Filters Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '16px 24px',
              borderRadius: '20px',
              border: '1px solid rgba(190, 201, 194, 0.3)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '40px'
            }}
          >
            {/* Filter Selects */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
              <span className="font-headline" style={{ fontSize: '16px', fontWeight: 700, color: '#191c1d' }}>
                Bộ lọc:
              </span>

              {/* Category Filter with Exclusive Option */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  borderRadius: '999px',
                  border: '1px solid rgba(16, 32, 27, 0.15)',
                  backgroundColor: '#ffffff',
                  fontSize: '14px',
                  color: '#191c1d',
                  padding: '9px 18px',
                  outline: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}
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
                style={{
                  borderRadius: '999px',
                  border: '1px solid rgba(16, 32, 27, 0.15)',
                  backgroundColor: '#ffffff',
                  fontSize: '14px',
                  color: '#191c1d',
                  padding: '9px 18px',
                  outline: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}
              >
                <option value="All">Giá: Tất cả</option>
                <option value="under-500k">Dưới 500.000 ₫</option>
                <option value="500k-2m">500.000 ₫ - 2.000.000 ₫</option>
                <option value="above-2m">Trên 2.000.000 ₫</option>
              </select>
            </div>

            {/* Counter & Sort */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
              <p style={{ fontSize: '14px', color: '#555f6d', margin: 0 }}>
                Hiển thị <strong style={{ color: '#006d36' }}>{filteredProducts.length}</strong> sản phẩm tinh tuyển
              </p>

              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                style={{
                  borderRadius: '999px',
                  border: '1px solid rgba(16, 32, 27, 0.15)',
                  backgroundColor: '#ffffff',
                  fontSize: '14px',
                  color: '#191c1d',
                  padding: '9px 18px',
                  outline: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}
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
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <RefreshCw size={36} className="spin" style={{ color: '#065f46', margin: '0 auto 16px auto' }} />
              <p style={{ fontSize: '16px', color: '#555f6d' }}>Đang nạp danh mục sản phẩm...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid rgba(190, 201, 194, 0.3)' }}>
              <ShoppingBag size={44} style={{ color: '#555f6d', opacity: 0.5, margin: '0 auto 14px auto' }} />
              <h3 className="font-headline" style={{ fontSize: '20px', fontWeight: 600, color: '#191c1d', margin: '0 0 6px 0' }}>
                Không tìm thấy sản phẩm phù hợp
              </h3>
              <p style={{ color: '#555f6d', fontSize: '14px', margin: '0 0 16px 0' }}>
                Hãy thử chọn mức giá hoặc danh mục khác.
              </p>
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedPriceRange('All'); setSearchQuery(''); }}
                style={{ padding: '10px 24px', borderRadius: '999px', backgroundColor: '#065f46', color: '#ffffff', fontWeight: 600, border: 'none', cursor: 'pointer' }}
              >
                Xem tất cả sản phẩm
              </button>
            </div>
          ) : (
            <div className="kollection-grid-2col">
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
                      style={{
                        background: 'transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        {/* Image Frame: Full-bleed clamp(440px, 52vh, 580px) */}
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: 'clamp(440px, 52vh, 580px)',
                            backgroundColor: '#f3f4f5',
                            overflow: 'hidden',
                            borderRadius: '24px',
                            marginBottom: '26px',
                            boxShadow: '0 20px 50px rgba(16, 32, 27, 0.12)'
                          }}
                        >
                          {/* Top Left Badges: Exclusive / Sale / Best Seller / New */}
                          <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {product.isExclusive && (
                              <span
                                style={{
                                  backgroundColor: '#004532',
                                  color: '#a6f2d1',
                                  border: '1px solid rgba(166, 242, 209, 0.4)',
                                  padding: '6px 14px',
                                  borderRadius: '999px',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  boxShadow: '0 2px 8px rgba(0, 69, 50, 0.4)'
                                }}
                              >
                                <Sparkles size={12} /> Độc quyền
                              </span>
                            )}
                            {discountPercent > 0 && (
                              <span style={{ backgroundColor: '#ba1a1a', color: '#ffffff', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
                                -{discountPercent}%
                              </span>
                            )}
                            {product.isBestSeller && (
                              <span style={{ backgroundColor: '#065f46', color: '#ffffff', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>
                                Bán chạy
                              </span>
                            )}
                            {product.isNewArrival && (
                              <span style={{ backgroundColor: '#ffb960', color: '#563400', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
                                Mới
                              </span>
                            )}
                          </div>

                          {/* Top Right Category Pill */}
                          <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, display: 'flex', gap: '6px' }}>
                            <span
                              style={{
                                backgroundColor: 'rgba(248, 249, 250, 0.92)',
                                color: '#191c1d',
                                backdropFilter: 'blur(8px)',
                                padding: '6px 16px',
                                borderRadius: '9999px',
                                fontSize: '12px',
                                fontWeight: 700,
                                border: '1px solid rgba(190, 201, 194, 0.3)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                              }}
                            >
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
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>

                        {/* Card Content Body */}
                        <div style={{ padding: '0 4px' }}>
                          <span
                            style={{
                              display: 'block',
                              fontSize: '12px',
                              fontWeight: 700,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: '#527059',
                              marginBottom: '8px'
                            }}
                          >
                            KOLLECTION 4U • {product.category || 'Thủ Công Tinh Tuyển'}
                          </span>

                          <h3
                            className="zannier-title-italic"
                            style={{
                              fontSize: 'clamp(26px, 2.6vw, 36px)',
                              color: '#10201B',
                              margin: '0 0 10px 0',
                              lineHeight: 1.25
                            }}
                          >
                            {displayTitle}
                          </h3>

                          <p
                            style={{
                              fontSize: '15.5px',
                              lineHeight: 1.75,
                              color: '#405246',
                              margin: '0 0 18px 0',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {product.subtitle || product.description}
                          </p>
                        </div>
                      </div>

                      {/* Price and Cart Button Action Row */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '16px',
                          borderTop: '1px solid rgba(16, 32, 27, 0.1)',
                          marginTop: '12px'
                        }}
                      >
                        <div>
                          <span style={{ fontSize: '11px', color: '#527059', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Giá niêm yết
                          </span>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <strong style={{ fontSize: '22px', fontWeight: 800, color: '#006d36' }}>
                              {formatVnd(product.price)}
                            </strong>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span style={{ fontSize: '14px', color: '#88988e', textDecoration: 'line-through' }}>
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
                            style={{
                              background: 'transparent',
                              border: '1px solid rgba(16, 32, 27, 0.2)',
                              color: '#10201B',
                              padding: '10px 20px',
                              borderRadius: '999px',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            Chi tiết
                          </button>
                          <button
                            aria-label="Thêm vào giỏ hàng"
                            onClick={(e) => handleAddToCart({ ...product, title: displayTitle, heroImage: displayImage }, 1, e)}
                            style={{
                              backgroundColor: '#006d36',
                              color: '#ffffff',
                              padding: '10px 22px',
                              borderRadius: '999px',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '13px',
                              fontWeight: 700,
                              boxShadow: '0 4px 14px rgba(0, 109, 54, 0.25)',
                              transition: 'transform 0.2s ease'
                            }}
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
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 10000,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: '#ffffff',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
            padding: '28px',
            boxSizing: 'border-box'
          }}>
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 700, color: '#191c1d' }}>
                <ShoppingCart size={20} style={{ color: '#065f46' }} /> Giỏ hàng của bạn ({cartTotalItems})
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555f6d' }}>
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#555f6d' }}>
                  <ShoppingBag size={40} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
                  <p style={{ fontSize: '15px', margin: 0 }}>Chưa có sản phẩm nào trong giỏ hàng</p>
                </div>
              ) : (
                cartItems.map(({ product, quantity }) => (
                  <div key={product.id || product.slug} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '0.375rem', border: '1px solid #edeeef' }}>
                    <img src={getMerchandiseImage(product)} alt="" style={{ width: '60px', height: '60px', borderRadius: '0.25rem', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#191c1d', lineHeight: 1.3 }}>{product.title || (product as any).name}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#004532', marginTop: '3px' }}>{formatVnd(product.price)}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #bec9c2', borderRadius: '0.25rem', overflow: 'hidden' }}>
                      <button onClick={() => handleUpdateCartQty(product.id, product.slug, -1)} style={{ padding: '4px 8px', background: '#ffffff', border: 'none', cursor: 'pointer' }}><Minus size={12} /></button>
                      <span style={{ padding: '0 8px', fontSize: '12px', fontWeight: 700 }}>{quantity}</span>
                      <button onClick={() => handleUpdateCartQty(product.id, product.slug, 1)} style={{ padding: '4px 8px', background: '#ffffff', border: 'none', cursor: 'pointer' }}><Plus size={12} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout */}
            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid #edeeef', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 600, marginBottom: '14px' }}>
                  <span>Tổng tiền thanh toán:</span>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#004532' }}>{formatVnd(cartTotalPrice)}</span>
                </div>
                <button
                  onClick={handleOpenCheckout}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '0.25rem',
                    backgroundColor: '#065f46',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(6, 95, 70, 0.3)'
                  }}
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
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '0.5rem',
            width: '100%',
            maxWidth: '860px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.3fr',
            position: 'relative'
          }}>
            <button
              onClick={() => setActiveProduct(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: '#f3f4f5', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
            >
              <X size={18} />
            </button>

            <div style={{ padding: '24px', backgroundColor: '#f8f9fa', borderRight: '1px solid #edeeef' }}>
              <div style={{ width: '100%', height: '340px', borderRadius: '0.25rem', overflow: 'hidden', marginBottom: '12px', backgroundColor: '#ffffff' }}>
                <img src={getMerchandiseImage(activeProduct)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {getProductGallery(activeProduct).length > 1 && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  {getProductGallery(activeProduct).map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{ width: '56px', height: '56px', borderRadius: '0.25rem', overflow: 'hidden', cursor: 'pointer', border: activeImageIndex === idx ? '2px solid #065f46' : '1px solid #bec9c2' }}
                    >
                      <img src={getImageUrl(img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {activeProduct.category}
                  </span>
                  {activeProduct.isExclusive && (
                    <span style={{ backgroundColor: '#004532', color: '#a6f2d1', padding: '2px 8px', borderRadius: '0.25rem', fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <Sparkles size={10} /> Độc quyền
                    </span>
                  )}
                </div>
                <h2 className="font-headline" style={{ fontSize: '26px', fontWeight: 700, color: '#191c1d', margin: '4px 0 12px 0', lineHeight: 1.25 }}>
                  {activeProduct.title || (activeProduct as any).name}
                </h2>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#004532', marginBottom: '16px' }}>
                  {formatVnd(activeProduct.price)}
                  {activeProduct.originalPrice && activeProduct.originalPrice > activeProduct.price && (
                    <span style={{ fontSize: '15px', color: '#555f6d', textDecoration: 'line-through', marginLeft: '10px' }}>
                      {formatVnd(activeProduct.originalPrice)}
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '15px', color: '#555f6d', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                  {activeProduct.description || activeProduct.subtitle}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #bec9c2', borderRadius: '0.25rem', overflow: 'hidden' }}>
                    <button onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))} style={{ padding: '8px 14px', background: '#ffffff', border: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                    <span style={{ padding: '0 12px', fontSize: '14px', fontWeight: 700 }}>{detailQuantity}</span>
                    <button onClick={() => setDetailQuantity(detailQuantity + 1)} style={{ padding: '8px 14px', background: '#ffffff', border: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                  </div>
                  <button
                    onClick={() => {
                      handleAddToCart(activeProduct, detailQuantity);
                      setActiveProduct(null);
                    }}
                    style={{
                      flex: 1,
                      padding: '12px 24px',
                      borderRadius: '0.25rem',
                      backgroundColor: '#065f46',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(6, 95, 70, 0.35)'
                    }}
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
          6. FAST CHECKOUT MODAL
      ══════════════════════════════════════════════════════════════ */}
      {checkoutModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: 'clamp(10px, 2vh, 20px)',
          boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '96vh',
            overflowY: 'auto',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.35)',
            padding: 'clamp(20px, 3vh, 32px) clamp(18px, 3vw, 30px)',
            position: 'relative',
            boxSizing: 'border-box',
            fontFamily: "'Work Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
          }}>
            <button
              onClick={() => { setCheckoutModalOpen(false); setOrderSuccess(false); }}
              style={{
                position: 'absolute',
                top: 'clamp(14px, 2vh, 20px)',
                right: 'clamp(14px, 2vw, 20px)',
                background: '#f3f4f5',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#4b5563',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>

            {orderSuccess ? (
              <div style={{ padding: 'clamp(10px, 1.5vh, 16px) 0' }}>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(16px, 2.5vh, 24px)' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                    boxShadow: '0 4px 14px rgba(5, 150, 105, 0.2)'
                  }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: '#dcfce7', padding: '3px 10px', borderRadius: '999px' }}>
                    {lastOrderCode ? `Mã Đơn: ${lastOrderCode}` : 'Đặt Hàng Thành Công'}
                  </span>
                  <h3 className="font-headline" style={{ fontSize: 'clamp(20px, 2.5vh, 24px)', fontWeight: 800, color: '#111827', margin: '8px 0 6px 0' }}>
                    Cảm Ơn Bạn Đã Tin Chọn Kollection 4U!
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, margin: 0, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
                    Đội ngũ chuyên viên 4U sẽ liên hệ số điện thoại <strong>{orderForm.phone || 'của bạn'}</strong> trong vòng 15-30 phút để xác nhận và đóng gói giao hàng tận nơi.
                  </p>
                </div>

                {/* UPSELL / CROSS-SELL SAME-CATEGORY RECOMMENDATION SECTION */}
                {recommendedUpsellProducts.length > 0 && (
                  <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '14px',
                    padding: 'clamp(14px, 2vh, 18px)',
                    border: '1px solid #e2e8f0',
                    marginBottom: 'clamp(16px, 2vh, 22px)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Gift size={18} color="#059669" />
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#081f13', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                          Gợi Ý Mua Kèm • Cùng Bộ Sưu Tập
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '6px', border: '1px solid #fde68a' }}>
                        ⚡ Miễn Phí Giao Chung Đơn
                      </span>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                      gap: '12px'
                    }}>
                      {recommendedUpsellProducts.map((recProd) => (
                        <div
                          key={recProd.id || recProd.slug}
                          style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '10px',
                            border: '1px solid #e2e8f0',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                          }}
                        >
                          <div>
                            <div style={{
                              width: '100%',
                              height: '110px',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              backgroundColor: '#f1f5f9',
                              marginBottom: '8px',
                              position: 'relative'
                            }}>
                              <img
                                src={getMerchandiseImage(recProd)}
                                alt={recProd.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              <span style={{
                                position: 'absolute',
                                top: '6px',
                                left: '6px',
                                fontSize: '10px',
                                fontWeight: 700,
                                backgroundColor: 'rgba(5, 150, 105, 0.9)',
                                color: '#ffffff',
                                padding: '2px 6px',
                                borderRadius: '4px'
                              }}>
                                {recProd.category || 'Tĩnh Dưỡng'}
                              </span>
                            </div>
                            <h4 style={{
                              fontSize: '13px',
                              fontWeight: 700,
                              color: '#111827',
                              margin: '0 0 4px 0',
                              lineHeight: 1.3,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {recProd.title || (recProd as any).name}
                            </h4>
                            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#059669', marginBottom: '8px' }}>
                              {formatVnd(recProd.price)}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              handleAddToCart(recProd, 1, e);
                            }}
                            style={{
                              width: '100%',
                              padding: '7px 10px',
                              borderRadius: '6px',
                              backgroundColor: '#ecfdf5',
                              border: '1px solid #a7f3d0',
                              color: '#065f46',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <Plus size={13} />
                            <span>Thêm mua kèm</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <button
                    onClick={() => { setCheckoutModalOpen(false); setOrderSuccess(false); }}
                    style={{
                      padding: '11px 28px',
                      borderRadius: '8px',
                      backgroundColor: '#004532',
                      color: '#ffffff',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      boxShadow: '0 4px 12px rgba(0,69,50,0.2)'
                    }}
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="font-headline" style={{ fontSize: 'clamp(20px, 2.6vh, 24px)', fontWeight: 800, color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.01em' }}>
                  Xác nhận đơn hàng
                </h2>
                <p style={{ fontSize: 'clamp(12px, 1.5vh, 13.5px)', color: '#64748b', margin: '0 0 clamp(10px, 1.6vh, 16px) 0', lineHeight: 1.4 }}>
                  Vui lòng cung cấp thông tin để 4U giao hàng tận nơi cho bạn.
                </p>

                <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.4vh, 14px)' }}>
                  {/* 2-Column Responsive Inputs: Họ tên + Số điện thoại */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'clamp(8px, 1.2vh, 14px)' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>Họ và tên *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={orderForm.fullName}
                        onChange={e => setOrderForm({ ...orderForm, fullName: e.target.value })}
                        style={{ width: '100%', padding: 'clamp(8px, 1.2vh, 11px) 12px', borderRadius: '6px', border: '1px solid #bec9c2', fontSize: '13.5px', boxSizing: 'border-box', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>Số điện thoại nhận hàng *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0987 654 321"
                        value={orderForm.phone}
                        onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })}
                        style={{ width: '100%', padding: 'clamp(8px, 1.2vh, 11px) 12px', borderRadius: '6px', border: '1px solid #bec9c2', fontSize: '13.5px', boxSizing: 'border-box', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>Địa chỉ nhận hàng chi tiết</label>
                    <input
                      type="text"
                      placeholder="Số nhà, Tên đường, Phường/Xã, Tỉnh/Thành"
                      value={orderForm.address}
                      onChange={e => setOrderForm({ ...orderForm, address: e.target.value })}
                      style={{ width: '100%', padding: 'clamp(8px, 1.2vh, 11px) 12px', borderRadius: '6px', border: '1px solid #bec9c2', fontSize: '13.5px', boxSizing: 'border-box', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>Ghi chú đơn hàng</label>
                    <textarea
                      rows={2}
                      placeholder="Ghi chú thêm về thời gian nhận hàng hoặc đóng gói..."
                      value={orderForm.notes}
                      onChange={e => setOrderForm({ ...orderForm, notes: e.target.value })}
                      style={{ width: '100%', padding: 'clamp(7px, 1vh, 10px) 12px', borderRadius: '6px', border: '1px solid #bec9c2', fontSize: '13.5px', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ backgroundColor: '#f8f9fa', padding: 'clamp(10px, 1.5vh, 14px) 16px', borderRadius: '6px', border: '1px solid #edeeef' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: '#555f6d', marginBottom: '3px' }}>
                      <span>Tổng số lượng:</span>
                      <strong>{cartTotalItems} sản phẩm</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(15px, 2vh, 17px)', fontWeight: 700, color: '#004532' }}>
                      <span>Tổng thanh toán:</span>
                      <span>{formatVnd(cartTotalPrice)}</span>
                    </div>
                  </div>

                  {/* QR PAYMENT SECTION */}
                  <div style={{
                    backgroundColor: '#f4f7f5',
                    border: '1px solid #cce3d4',
                    borderRadius: '12px',
                    padding: 'clamp(10px, 1.5vh, 14px) 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(6px, 1vh, 10px)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <QrCode size={18} style={{ color: '#065f46' }} />
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#081f13', textTransform: 'uppercase' }}>
                          Quét Mã QR Chuyển Khoản Nhanh
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '999px', border: '1px solid #bbf7d0' }}>
                        VietQR 24/7
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                      {/* QR Image */}
                      <div style={{
                        width: 'clamp(100px, 13vh, 120px)',
                        height: 'clamp(100px, 13vh, 120px)',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        flexShrink: 0
                      }}>
                        <img
                          src={`https://api.vietqr.io/image/970422-0987654321-compact.png?amount=${cartTotalPrice}&addInfo=${encodeURIComponent('4U ' + (orderForm.phone ? orderForm.phone.replace(/\s+/g, '') : 'KOLLECTION'))}&accountName=4U%20WELLNESS%20RETREAT`}
                          alt="Mã QR Chuyển Khoản"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>

                      {/* Bank Transfer Info */}
                      <div style={{ flex: 1, minWidth: '170px', fontSize: '12px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <div>
                          <span style={{ color: '#64748b' }}>Ngân hàng:</span>{' '}
                          <strong style={{ color: '#081f13' }}>MB Bank (Quân Đội)</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Số tài khoản:</span>{' '}
                          <strong style={{ color: '#065f46', fontFamily: 'monospace', fontSize: '13px' }}>0987 654 321</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Chủ tài khoản:</span>{' '}
                          <strong style={{ color: '#081f13' }}>4U WELLNESS & RETREAT</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Số tiền:</span>{' '}
                          <strong style={{ color: '#065f46', fontSize: '13px' }}>{formatVnd(cartTotalPrice)}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Nội dung CK:</span>{' '}
                          <code style={{ backgroundColor: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontWeight: 700, color: '#081f13' }}>
                            4U {orderForm.phone ? orderForm.phone.replace(/\s+/g, '') : 'KOLLECTION'}
                          </code>
                        </div>
                      </div>
                    </div>

                    {/* Button to confirm transfer */}
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
                          toast?.show?.('Đã ghi nhận: Bạn đã chuyển tiền thành công!', 'success');
                        } else {
                          setOrderForm(prev => ({
                            ...prev,
                            notes: prev.notes.replace(` - ${transferTag}`, '').replace(transferTag, '').trim()
                          }));
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: 'clamp(7px, 1.1vh, 10px) 12px',
                        borderRadius: '8px',
                        border: hasTransferred ? '2px solid #059669' : '1px solid #94a3b8',
                        backgroundColor: hasTransferred ? '#ecfdf5' : '#ffffff',
                        color: hasTransferred ? '#065f46' : '#1e293b',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                        marginTop: '2px',
                        boxShadow: hasTransferred ? '0 0 0 2px rgba(5, 150, 105, 0.2)' : 'none'
                      }}
                    >
                      {hasTransferred ? <CheckCircle2 size={16} color="#059669" /> : <CreditCard size={16} />}
                      {hasTransferred ? '✓ Tôi Đã Chuyển Tiền Thành Công (Đã lưu vào đơn hàng)' : '👉 Bấm vào đây sau khi bạn ĐÃ CHUYỂN TIỀN'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={orderSubmitting}
                    style={{
                      width: '100%',
                      padding: 'clamp(11px, 1.6vh, 14px) 20px',
                      borderRadius: '8px',
                      backgroundColor: '#004532',
                      color: '#ffffff',
                      fontSize: 'clamp(13.5px, 1.6vh, 15px)',
                      fontWeight: 700,
                      border: 'none',
                      cursor: orderSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 14px rgba(0, 69, 50, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {orderSubmitting ? <RefreshCw size={18} className="spin" /> : <ShieldCheck size={18} />}
                    {orderSubmitting ? 'Đang xử lý...' : 'Hoàn tất đặt hàng'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
