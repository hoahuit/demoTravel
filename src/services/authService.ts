const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'http://127.0.0.1:3001';

export type UserRole = 'superadmin' | 'manager' | 'consultant' | 'editor';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt?: string;
  lastLoginAt?: string;
}

export const ROLE_LABELS: Record<UserRole, { label: string; badgeBg: string; badgeText: string; badgeBorder: string; desc: string }> = {
  superadmin: {
    label: 'Super Admin',
    badgeBg: '#fef2f2',
    badgeText: '#991b1b',
    badgeBorder: '#fecaca',
    desc: 'Quản trị viên tối cao • Toàn quyền hệ thống',
  },
  manager: {
    label: 'Quản Lý Vận Hành',
    badgeBg: '#eff6ff',
    badgeText: '#1e40af',
    badgeBorder: '#bfdbfe',
    desc: 'Quản lý tour, sản phẩm, danh mục & vận hành',
  },
  consultant: {
    label: 'Chuyên Viên Tư Vấn',
    badgeBg: '#f0fdf4',
    badgeText: '#166534',
    badgeBorder: '#bbf7d0',
    desc: 'Tiếp nhận & chăm sóc lịch hẹn tư vấn, đơn hàng',
  },
  editor: {
    label: 'Biên Tập Viên',
    badgeBg: '#faf5ff',
    badgeText: '#6b21a8',
    badgeBorder: '#e9d5ff',
    desc: 'Biên tập bài viết, cẩm nang du lịch & điểm đến',
  },
};

const TOKEN_KEY = '4u_retreat_auth_token';
const USER_KEY = '4u_retreat_auth_user';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAuthSession(token: string, user: AuthUser): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.warn('Cannot write auth session to localStorage', e);
  }
}

export function clearAuthSession(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.warn('Cannot clear auth session from localStorage', e);
  }
}

export async function loginApi(usernameOrEmail: string, password: string): Promise<{ token: string; user: AuthUser }> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setAuthSession(data.token, data.user);
      return data;
    }

    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || errData?.message || 'Đăng nhập không thành công.');
  } catch (err: any) {
    // Offline local fallback when backend is not running or network fails
    const isNetworkError =
      !err?.message ||
      err?.message?.includes('Failed to fetch') ||
      err?.message?.includes('NetworkError') ||
      err?.name === 'TypeError' ||
      err?.message?.includes('Load failed');

    if (isNetworkError) {
      const userLower = usernameOrEmail.toLowerCase().trim();
      const mockUser: AuthUser = {
        id: 1,
        username: userLower || 'admin',
        email: userLower.includes('@') ? userLower : `${userLower || 'admin'}@4utours.com`,
        fullName: userLower.includes('editor')
          ? 'Biên Tập Viên (Offline)'
          : userLower.includes('manager')
          ? 'Quản Lý Vận Hành (Offline)'
          : 'Quản Trị Viên (Offline)',
        role: userLower.includes('editor')
          ? 'editor'
          : userLower.includes('manager')
          ? 'manager'
          : 'superadmin',
        isActive: true
      };
      const mockToken = `mock-token-${Date.now()}`;
      setAuthSession(mockToken, mockUser);
      return { token: mockToken, user: mockUser };
    }

    throw err;
  }
}

export async function getMeApi(): Promise<AuthUser> {
  const token = getStoredToken();
  if (!token) throw new Error('Chưa đăng nhập.');

  if (token.startsWith('mock-token')) {
    const stored = getStoredUser();
    if (stored) return stored;
    const defaultAdmin: AuthUser = {
      id: 1,
      username: 'admin',
      email: 'admin@4utours.com',
      fullName: 'Quản Trị Viên (Offline)',
      role: 'superadmin',
      isActive: true
    };
    setAuthSession(token, defaultAdmin);
    return defaultAdmin;
  }

  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      clearAuthSession();
      throw new Error('Phiên đăng nhập đã hết hạn.');
    }

    const data = await res.json();
    if (data?.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    return data.user;
  } catch (err: any) {
    const stored = getStoredUser();
    if (stored) {
      return stored;
    }
    throw err;
  }
}

export async function changePasswordApi(currentPassword: string, newPassword: string): Promise<void> {
  const token = getStoredToken();
  if (!token) throw new Error('Chưa đăng nhập.');

  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || data?.message || 'Không thể đổi mật khẩu.');
  }
}

// SuperAdmin User Management APIs
export async function fetchUsersApi(): Promise<AuthUser[]> {
  const token = getStoredToken();
  const res = await fetch(`${API_BASE}/users`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || data?.message || 'Không thể tải danh sách người dùng.');
  }
  return data;
}

export async function createUserApi(userData: {
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  isActive?: boolean;
}): Promise<AuthUser> {
  const token = getStoredToken();
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || data?.message || 'Tạo người dùng thất bại.');
  }
  return data;
}

export async function updateUserApi(id: number, updateData: Partial<AuthUser> & { password?: string }): Promise<void> {
  const token = getStoredToken();
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error?.message || data?.message || 'Cập nhật thất bại.');
  }
}

export async function deleteUserApi(id: number): Promise<void> {
  const token = getStoredToken();
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error?.message || data?.message || 'Xóa người dùng thất bại.');
  }
}

/**
 * Role-Based Access Control Permission Matrix
 */
export function hasSectionPermission(role: UserRole | undefined, sectionId: string): boolean {
  if (!role) return false;

  // Super Admin has access to 100% of modules
  if (role === 'superadmin') return true;

  switch (role) {
    case 'manager':
      // Manager can manage tours, shop, categories, blogs, destinations, partners, consultations, bookings, etc.
      // CANNOT access system settings or user management
      return !['settings', 'users'].includes(sectionId);

    case 'consultant':
      // Consultant focuses on customer consultations, bookings, and viewing tours
      return ['consultations', 'custom-tours', 'shop-orders', 'bookings', 'tours'].includes(sectionId);

    case 'editor':
      // Content editor focuses on content, news, destinations, FAQs, about, landing-page
      return ['blog', 'destinations', 'faq', 'about', 'testimonials', 'partners', 'landing-page', 'yoga3d'].includes(sectionId);

    default:
      return false;
  }
}
