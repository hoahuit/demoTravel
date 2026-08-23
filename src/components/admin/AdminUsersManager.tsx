import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Shield,
  Plus,
  RefreshCw,
  Edit2,
  Trash2,
  KeyRound,
  CheckCircle2,
  XCircle,
  Search,
  UserCheck,
  Lock,
  Mail,
  User as UserIcon,
  ShieldAlert,
  Clock,
  Eye,
  EyeOff,
  Key,
  ShieldCheck
} from 'lucide-react';
import {
  AuthUser,
  UserRole,
  ROLE_LABELS,
  fetchUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  changePasswordApi
} from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import EmptyState from '../ui/EmptyState';

interface AdminUsersManagerProps {
  toast: any;
}

export default function AdminUsersManager({ toast }: AdminUsersManagerProps) {
  const { user: currentUser } = useAuth();

  const [usersList, setUsersList] = useState<AuthUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AuthUser | null>(null);
  const [editNewPassword, setEditNewPassword] = useState('');
  const [resetPassUser, setResetPassUser] = useState<AuthUser | null>(null);
  const [isMyPasswordModalOpen, setIsMyPasswordModalOpen] = useState(false);

  // Form States for Create
  const [formUsername, setFormUsername] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formFullName, setFormFullName] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState<UserRole>('consultant');
  const [formIsActive, setFormIsActive] = useState(true);

  // Form States for Reset Pass
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  // Form States for My Password Change
  const [currentPassword, setCurrentPassword] = useState('');
  const [myNewPassword, setMyNewPassword] = useState('');
  const [myConfirmPassword, setMyConfirmPassword] = useState('');
  const [showMyPass, setShowMyPass] = useState(false);

  const loadUsers = async (showToast = false) => {
    setIsLoading(true);
    try {
      const data = await fetchUsersApi();
      if (Array.isArray(data)) {
        setUsersList(data);
        if (showToast) toast.success('Đã làm mới danh sách người dùng!');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Không thể tải danh sách người dùng.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Filtered list
  const filteredUsers = useMemo(() => {
    return usersList.filter((u) => {
      const matchSearch =
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRole = filterRole === 'all' || u.role === filterRole;
      return matchSearch && matchRole;
    });
  }, [usersList, searchQuery, filterRole]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: usersList.length,
      superadmin: usersList.filter((u) => u.role === 'superadmin').length,
      manager: usersList.filter((u) => u.role === 'manager').length,
      consultant: usersList.filter((u) => u.role === 'consultant').length,
      editor: usersList.filter((u) => u.role === 'editor').length,
    };
  }, [usersList]);

  // Handle Create Submit
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUsername.trim() || !formEmail.trim() || !formFullName.trim() || !formPassword) {
      toast.error('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    try {
      await createUserApi({
        username: formUsername.trim(),
        email: formEmail.trim(),
        fullName: formFullName.trim(),
        password: formPassword,
        role: formRole,
        isActive: formIsActive,
      });
      toast.success('Đã tạo tài khoản người dùng mới thành công!');
      setIsCreateOpen(false);
      // Reset form
      setFormUsername('');
      setFormEmail('');
      setFormFullName('');
      setFormPassword('');
      setFormRole('consultant');
      loadUsers();
    } catch (err: any) {
      toast.error(err?.message || 'Tạo người dùng thất bại.');
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const payload: any = {
        fullName: editingUser.fullName,
        email: editingUser.email,
        role: editingUser.role,
        isActive: editingUser.isActive,
      };

      if (editNewPassword.trim().length > 0) {
        if (editNewPassword.trim().length < 6) {
          toast.error('Mật khẩu mới phải có tối thiểu 6 ký tự.');
          return;
        }
        payload.password = editNewPassword.trim();
      }

      await updateUserApi(editingUser.id, payload);
      toast.success(
        editNewPassword.trim().length > 0
          ? 'Đã cập nhật thông tin và đổi mật khẩu thành công!'
          : 'Cập nhật thông tin người dùng thành công!'
      );
      setEditingUser(null);
      setEditNewPassword('');
      loadUsers();
    } catch (err: any) {
      toast.error(err?.message || 'Cập nhật thất bại.');
    }
  };

  // Handle Reset Password for any user
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPassUser) return;

    if (!newPassword || newPassword.length < 6) {
      toast.error('Mật khẩu mới phải có tối thiểu 6 ký tự.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.');
      return;
    }

    try {
      await updateUserApi(resetPassUser.id, { password: newPassword });
      toast.success(`Đã đổi mật khẩu cho tài khoản @${resetPassUser.username} thành công!`);
      setResetPassUser(null);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toast.error(err?.message || 'Đổi mật khẩu thất bại.');
    }
  };

  // Handle Change MY OWN Password
  const handleMyPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !myNewPassword) {
      toast.error('Vui lòng nhập đầy đủ mật khẩu hiện tại và mật khẩu mới.');
      return;
    }

    if (myNewPassword.length < 6) {
      toast.error('Mật khẩu mới phải có tối thiểu 6 ký tự.');
      return;
    }

    if (myNewPassword !== myConfirmPassword) {
      toast.error('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    try {
      await changePasswordApi(currentPassword, myNewPassword);
      toast.success('Đã đổi mật khẩu tài khoản của bạn thành công!');
      setIsMyPasswordModalOpen(false);
      setCurrentPassword('');
      setMyNewPassword('');
      setMyConfirmPassword('');
    } catch (err: any) {
      toast.error(err?.message || 'Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu hiện tại.');
    }
  };

  // Handle Delete
  const handleDelete = async (user: AuthUser) => {
    if (user.id === currentUser?.id) {
      toast.error('Bạn không thể tự xóa tài khoản của chính mình.');
      return;
    }

    if (!window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${user.username}" (${user.fullName}) không?`)) {
      return;
    }

    try {
      await deleteUserApi(user.id);
      toast.success('Đã xóa người dùng thành công!');
      loadUsers();
    } catch (err: any) {
      toast.error(err?.message || 'Xóa người dùng thất bại.');
    }
  };

  // Toggle active status
  const handleToggleStatus = async (user: AuthUser) => {
    if (user.id === currentUser?.id) {
      toast.error('Bạn không thể tự khóa tài khoản của chính mình.');
      return;
    }

    try {
      await updateUserApi(user.id, { isActive: !user.isActive });
      toast.success(`Đã ${!user.isActive ? 'kích hoạt' : 'tạm khóa'} tài khoản @${user.username}!`);
      loadUsers();
    } catch (err: any) {
      toast.error(err?.message || 'Thao tác thất bại.');
    }
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* ─────────────────────────────────────────────────────────────
          1. UNIFIED ENTERPRISE HEADER
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e2e8f0',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#0f766e',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              4U RETREAT • BẢO MẬT & PHÂN QUYỀN
            </span>
            <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', whiteSpace: 'nowrap' }}>
              Quản Trị Người Dùng & Mật Khẩu
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
              whiteSpace: 'nowrap',
            }}
          >
            Quản Lý Người Dùng & Phân Quyền ({filteredUsers.length})
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>
            Phân cấp vai trò quản trị, cấp phát tài khoản nhân sự và hỗ trợ đổi/đặt lại mật khẩu bảo mật.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'nowrap' }}>
          <button
            type="button"
            onClick={() => loadUsers(true)}
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
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
          >
            <RefreshCw size={14} color="#64748b" />
            <span>Làm Mới</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMyPasswordModalOpen(true)}
            style={{
              backgroundColor: '#f1f5f9',
              color: '#0f766e',
              border: '1px solid #99f6e4',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ccfbf1')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
          >
            <Key size={14} />
            <span>Đổi Mật Khẩu Của Tôi</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
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
              transition: 'all 0.15s ease',
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
          2. KPI STATS CARDS
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '16px 20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Tổng Nhân Sự</span>
            <Users size={16} color="#475569" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>{stats.total}</div>
          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '3px' }}>Tài khoản trong hệ thống</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '16px 20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#991b1b' }}>Super Admin</span>
            <Shield size={16} color="#991b1b" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#991b1b', lineHeight: 1.2 }}>{stats.superadmin}</div>
          <div style={{ fontSize: '11.5px', color: '#b91c1c', marginTop: '3px' }}>Toàn quyền hệ thống</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '16px 20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e40af' }}>Quản Lý Vận Hành</span>
            <UserCheck size={16} color="#1e40af" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#1e40af', lineHeight: 1.2 }}>{stats.manager}</div>
          <div style={{ fontSize: '11.5px', color: '#2563eb', marginTop: '3px' }}>Quản lý tour & sản phẩm</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '16px 20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#166534' }}>Chuyên Viên Tư Vấn</span>
            <Lock size={16} color="#166534" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#166534', lineHeight: 1.2 }}>{stats.consultant}</div>
          <div style={{ fontSize: '11.5px', color: '#15803d', marginTop: '3px' }}>CSKH & Lịch tư vấn</div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. FILTER & SEARCH BAR
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
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Tất cả vai trò' },
            { id: 'superadmin', label: 'Super Admin' },
            { id: 'manager', label: 'Quản lý' },
            { id: 'consultant', label: 'Tư vấn viên' },
            { id: 'editor', label: 'Biên tập viên' },
          ].map((tab) => {
            const isActive = filterRole === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterRole(tab.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: isActive ? '#0f172a' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#475569',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Tìm theo tên, username, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 12px 7px 32px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '13px',
              backgroundColor: '#f8fafc',
              color: '#0f172a',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. USERS DATA TABLE
      ───────────────────────────────────────────────────────────── */}
      {filteredUsers.length === 0 ? (
        <EmptyState
          title="Không tìm thấy người dùng phù hợp"
          description="Thử thay đổi bộ lọc vai trò hoặc tìm kiếm với từ khóa khác."
          actionLabel="Tạo Người Dùng Mới"
          onAction={() => setIsCreateOpen(true)}
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
            boxSizing: 'border-box',
          }}
        >
          <div style={{ width: '100%', overflowX: 'auto' }}>
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
                    letterSpacing: '0.05em',
                  }}
                >
                  <th style={{ padding: '12px 14px', width: '50px' }}>ID</th>
                  <th style={{ padding: '12px 14px' }}>Người Dùng / Nhân Sự</th>
                  <th style={{ padding: '12px 14px' }}>Email</th>
                  <th style={{ padding: '12px 14px', width: '150px' }}>Vai Trò (Role)</th>
                  <th style={{ padding: '12px 14px', width: '110px' }}>Trạng Thái</th>
                  <th style={{ padding: '12px 14px', width: '140px' }}>Đăng Nhập Gần Nhất</th>
                  <th style={{ padding: '12px 14px', width: '220px', textAlign: 'right' }}>Thao Tác Quản Trị</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const roleConfig = ROLE_LABELS[u.role] || ROLE_LABELS.consultant;
                  const isSelf = u.id === currentUser?.id;

                  return (
                    <tr
                      key={u.id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background-color 0.1s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '14px 14px', fontWeight: 600, color: '#64748b', fontFamily: 'monospace' }}>
                        #{u.id}
                      </td>

                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '8px',
                              backgroundColor: roleConfig.badgeBg,
                              color: roleConfig.badgeText,
                              border: `1px solid ${roleConfig.badgeBorder}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '13px',
                              flexShrink: 0,
                            }}
                          >
                            {u.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>{u.fullName}</span>
                              {isSelf && (
                                <span style={{ backgroundColor: '#ecfdf5', color: '#047857', fontSize: '10px', fontWeight: 700, padding: '1px 5px', borderRadius: '4px' }}>
                                  (Bạn)
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#64748b', fontFamily: 'monospace' }}>
                              @{u.username}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '14px 14px', color: '#475569', fontSize: '12.5px' }}>
                        {u.email}
                      </td>

                      <td style={{ padding: '14px 14px' }}>
                        <span
                          style={{
                            backgroundColor: roleConfig.badgeBg,
                            color: roleConfig.badgeText,
                            border: `1px solid ${roleConfig.badgeBorder}`,
                            padding: '3px 8px',
                            borderRadius: '5px',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            display: 'inline-block',
                          }}
                        >
                          {roleConfig.label}
                        </span>
                      </td>

                      <td style={{ padding: '14px 14px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(u)}
                          disabled={isSelf}
                          style={{
                            border: 'none',
                            background: 'none',
                            cursor: isSelf ? 'default' : 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: 0,
                          }}
                        >
                          {u.isActive ? (
                            <span style={{ color: '#166534', backgroundColor: '#dcfce7', padding: '2px 7px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              <CheckCircle2 size={11} /> Hoạt động
                            </span>
                          ) : (
                            <span style={{ color: '#991b1b', backgroundColor: '#fee2e2', padding: '2px 7px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              <XCircle size={11} /> Tạm khóa
                            </span>
                          )}
                        </button>
                      </td>

                      <td style={{ padding: '14px 14px', color: '#64748b', fontSize: '11.5px' }}>
                        {u.lastLoginAt ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={11} />
                            {new Date(u.lastLoginAt).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8' }}>Chưa đăng nhập</span>
                        )}
                      </td>

                      <td style={{ padding: '14px 14px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                          {/* Dedicated Đổi Mật Khẩu Button */}
                          <button
                            type="button"
                            title={`Đổi mật khẩu cho @${u.username}`}
                            onClick={() => {
                              setResetPassUser(u);
                              setNewPassword('');
                              setConfirmPassword('');
                            }}
                            style={{
                              backgroundColor: '#f0fdf4',
                              color: '#0f766e',
                              border: '1px solid #99f6e4',
                              borderRadius: '6px',
                              padding: '5px 9px',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ccfbf1')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f0fdf4')}
                          >
                            <KeyRound size={13} />
                            <span>Đổi MK</span>
                          </button>

                          <button
                            type="button"
                            title="Chỉnh sửa thông tin"
                            onClick={() => {
                              setEditingUser({ ...u });
                              setEditNewPassword('');
                            }}
                            style={{
                              width: '50px',
                              height: '32px',
                              backgroundColor: '#f1f5f9',
                              color: '#334155',
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

                          {/* Delete Button */}
                          {!isSelf && (
                            <button
                              type="button"
                              title="Xóa tài khoản"
                              onClick={() => handleDelete(u)}
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
                          )}
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
          5. MODAL: CREATE USER
      ───────────────────────────────────────────────────────────── */}
      {isCreateOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 16px 0', color: '#0f172a' }}>
              Tạo Tài Khoản Người Dùng Mới
            </h2>

            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Họ và tên nhân sự *
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formFullName}
                  onChange={(e) => setFormFullName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Tên đăng nhập (Username) *
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: nguyen_a"
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  required
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Email cơ quan *
                </label>
                <input
                  type="email"
                  placeholder="email@4utours.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Mật khẩu khởi tạo (tối thiểu 6 ký tự) *
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  required
                  minLength={6}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Phân quyền vai trò (Role) *
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as UserRole)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
                >
                  <option value="superadmin">🔴 Super Admin (Toàn quyền hệ thống)</option>
                  <option value="manager">🔵 Quản Lý Vận Hành (Tours, Shop, Categories, Blogs)</option>
                  <option value="consultant">🟢 Chuyên Viên Tư Vấn (Lịch hẹn tư vấn & Đơn hàng)</option>
                  <option value="editor">🟣 Biên Tập Viên (Bài viết, Điểm đến, FAQ)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  style={{ padding: '8px 16px', borderRadius: '7px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', borderRadius: '7px', border: 'none', background: '#0f766e', color: '#ffffff', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  Tạo Người Dùng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. MODAL: EDIT USER
      ───────────────────────────────────────────────────────────── */}
      {editingUser && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 16px 0', color: '#0f172a' }}>
              Chỉnh Sửa Thông Tin & Phân Quyền
            </h2>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  value={editingUser.username}
                  disabled
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', color: '#64748b', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Họ và tên *
                </label>
                <input
                  type="text"
                  value={editingUser.fullName}
                  onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                  required
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  required
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Vai trò (Role)
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
                >
                  <option value="superadmin">🔴 Super Admin (Toàn quyền)</option>
                  <option value="manager">🔵 Quản Lý Vận Hành</option>
                  <option value="consultant">🟢 Chuyên Viên Tư Vấn</option>
                  <option value="editor">🟣 Biên Tập Viên</option>
                </select>
              </div>

              {/* Optional Password Change during User Edit */}
              <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#0f766e', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                  <KeyRound size={13} />
                  <span>Đổi mật khẩu mới (Tùy chọn)</span>
                </label>
                <input
                  type="password"
                  placeholder="Để trống nếu không muốn đổi mật khẩu..."
                  value={editNewPassword}
                  onChange={(e) => setEditNewPassword(e.target.value)}
                  minLength={6}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '3px' }}>
                  Chỉ nhập khi muốn thiết lập lại mật khẩu cho tài khoản này.
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditingUser(null);
                    setEditNewPassword('');
                  }}
                  style={{ padding: '8px 16px', borderRadius: '7px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', borderRadius: '7px', border: 'none', background: '#0f766e', color: '#ffffff', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  Lưu Thay Đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. MODAL: RESET USER PASSWORD
      ───────────────────────────────────────────────────────────── */}
      {resetPassUser && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#0f766e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <KeyRound size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>
                  Đặt Lại Mật Khẩu
                </h2>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  Tài khoản: <strong>@{resetPassUser.username}</strong> ({resetPassUser.fullName})
                </div>
              </div>
            </div>

            <form onSubmit={handleResetPasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Mật khẩu mới *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Tối thiểu 6 ký tự..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    autoFocus
                    style={{ width: '100%', padding: '9px 36px 9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Xác nhận lại mật khẩu mới *
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu mới..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setResetPassUser(null);
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  style={{ padding: '8px 16px', borderRadius: '7px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', borderRadius: '7px', border: 'none', background: '#0f766e', color: '#ffffff', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <ShieldCheck size={15} />
                  <span>Xác Nhận Đổi Mật Khẩu</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. MODAL: CHANGE MY OWN PASSWORD
      ───────────────────────────────────────────────────────────── */}
      {isMyPasswordModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Key size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>
                  Đổi Mật Khẩu Tài Khoản Của Tôi
                </h2>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  Đang đăng nhập: <strong>@{currentUser?.username}</strong> ({currentUser?.fullName})
                </div>
              </div>
            </div>

            <form onSubmit={handleMyPasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Mật khẩu hiện tại *
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu đang dùng..."
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  autoFocus
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Mật khẩu mới (tối thiểu 6 ký tự) *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showMyPass ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu mới..."
                    value={myNewPassword}
                    onChange={(e) => setMyNewPassword(e.target.value)}
                    required
                    minLength={6}
                    style={{ width: '100%', padding: '9px 36px 9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowMyPass(!showMyPass)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                  >
                    {showMyPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Xác nhận lại mật khẩu mới *
                </label>
                <input
                  type={showMyPass ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu mới..."
                  value={myConfirmPassword}
                  onChange={(e) => setMyConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsMyPasswordModalOpen(false);
                    setCurrentPassword('');
                    setMyNewPassword('');
                    setMyConfirmPassword('');
                  }}
                  style={{ padding: '8px 16px', borderRadius: '7px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', borderRadius: '7px', border: 'none', background: '#0f766e', color: '#ffffff', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <ShieldCheck size={15} />
                  <span>Cập Nhật Mật Khẩu</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
