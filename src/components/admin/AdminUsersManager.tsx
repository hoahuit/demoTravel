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
import './AdminUsersManager.css';

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
    <div className="admin-users-root">
      {/* 1. UNIFIED ENTERPRISE HEADER */}
      <div className="admin-users-header">
        <div>
          <div className="admin-users-meta-row">
            <span className="admin-users-tag">
              4U RETREAT • BẢO MẬT & PHÂN QUYỀN
            </span>
            <span className="admin-users-dot" />
            <span className="admin-users-subtag">
              Quản Trị Người Dùng & Mật Khẩu
            </span>
          </div>
          <h1 className="admin-users-title">
            Quản Lý Người Dùng & Phân Quyền ({filteredUsers.length})
          </h1>
          <p className="admin-users-desc">
            Phân cấp vai trò quản trị, cấp phát tài khoản nhân sự và hỗ trợ đổi/đặt lại mật khẩu bảo mật.
          </p>
        </div>

        <div className="admin-users-btn-group">
          <button
            type="button"
            onClick={() => loadUsers(true)}
            className="admin-users-refresh-btn"
          >
            <RefreshCw size={14} color="#64748b" />
            <span>Làm Mới</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMyPasswordModalOpen(true)}
            className="admin-users-my-pass-btn"
          >
            <Key size={14} />
            <span>Đổi Mật Khẩu Của Tôi</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="admin-users-add-btn"
          >
            <Plus size={15} />
            <span>Thêm Mới</span>
          </button>
        </div>
      </div>

      {/* 2. KPI STATS CARDS */}
      <div className="admin-users-stats-grid">
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-header">
            <span className="admin-users-stat-label">Tổng Nhân Sự</span>
            <Users size={16} color="#475569" />
          </div>
          <div className="admin-users-stat-val">{stats.total}</div>
          <div className="admin-users-stat-sub">Tài khoản trong hệ thống</div>
        </div>

        <div className="admin-users-stat-card">
          <div className="admin-users-stat-header">
            <span className="admin-users-stat-label superadmin">Super Admin</span>
            <Shield size={16} color="#991b1b" />
          </div>
          <div className="admin-users-stat-val superadmin">{stats.superadmin}</div>
          <div className="admin-users-stat-sub superadmin">Toàn quyền hệ thống</div>
        </div>

        <div className="admin-users-stat-card">
          <div className="admin-users-stat-header">
            <span className="admin-users-stat-label manager">Quản Lý Vận Hành</span>
            <UserCheck size={16} color="#1e40af" />
          </div>
          <div className="admin-users-stat-val manager">{stats.manager}</div>
          <div className="admin-users-stat-sub manager">Quản lý tour & sản phẩm</div>
        </div>

        <div className="admin-users-stat-card">
          <div className="admin-users-stat-header">
            <span className="admin-users-stat-label consultant">Chuyên Viên Tư Vấn</span>
            <Lock size={16} color="#166534" />
          </div>
          <div className="admin-users-stat-val consultant">{stats.consultant}</div>
          <div className="admin-users-stat-sub consultant">CSKH & Lịch tư vấn</div>
        </div>
      </div>

      {/* 3. FILTER & SEARCH BAR */}
      <div className="admin-users-filter-bar">
        <div className="admin-users-roles-tabs">
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
                className={`admin-users-role-tab-btn ${isActive ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="admin-users-search-wrap">
          <Search size={14} color="#94a3b8" className="admin-users-search-icon" />
          <input
            type="text"
            placeholder="Tìm theo tên, username, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-users-search-input"
          />
        </div>
      </div>

      {/* 4. USERS DATA TABLE */}
      {filteredUsers.length === 0 ? (
        <EmptyState
          title="Không tìm thấy người dùng phù hợp"
          description="Thử thay đổi bộ lọc vai trò hoặc tìm kiếm với từ khóa khác."
          actionLabel="Tạo Người Dùng Mới"
          onAction={() => setIsCreateOpen(true)}
          transparent={true}
        />
      ) : (
        <div className="admin-users-table-card">
          <div className="admin-users-table-scroll">
            <table className="admin-users-table">
              <thead>
                <tr className="admin-users-th-row">
                  <th className="admin-users-th" style={{ width: '50px' }}>ID</th>
                  <th className="admin-users-th">Người Dùng / Nhân Sự</th>
                  <th className="admin-users-th">Email</th>
                  <th className="admin-users-th" style={{ width: '150px' }}>Vai Trò (Role)</th>
                  <th className="admin-users-th" style={{ width: '110px' }}>Trạng Thái</th>
                  <th className="admin-users-th" style={{ width: '140px' }}>Đăng Nhập Gần Nhất</th>
                  <th className="admin-users-th" style={{ width: '220px', textAlign: 'right' }}>Thao Tác Quản Trị</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const roleConfig = ROLE_LABELS[u.role] || ROLE_LABELS.consultant;
                  const isSelf = u.id === currentUser?.id;

                  return (
                    <tr key={u.id} className="admin-users-tr">
                      <td className="admin-users-td admin-users-id-text">
                        #{u.id}
                      </td>

                      <td className="admin-users-td">
                        <div className="admin-users-user-cell">
                          <div className={`admin-users-avatar admin-users-role-${u.role}`}>
                            {u.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="admin-users-fullname-row">
                              <span>{u.fullName}</span>
                              {isSelf && (
                                <span className="admin-users-you-badge">
                                  (Bạn)
                                </span>
                              )}
                            </div>
                            <div className="admin-users-username-text">
                              @{u.username}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="admin-users-td admin-users-email-text">
                        {u.email}
                      </td>

                      <td className="admin-users-td">
                        <span className={`admin-users-role-badge-pill admin-users-role-${u.role}`}>
                          {roleConfig.label}
                        </span>
                      </td>

                      <td className="admin-users-td">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(u)}
                          disabled={isSelf}
                          className={`admin-users-status-btn ${isSelf ? 'disabled' : ''}`}
                        >
                          {u.isActive ? (
                            <span className="admin-users-badge-active">
                              <CheckCircle2 size={11} /> Hoạt động
                            </span>
                          ) : (
                            <span className="admin-users-badge-inactive">
                              <XCircle size={11} /> Tạm khóa
                            </span>
                          )}
                        </button>
                      </td>

                      <td className="admin-users-td admin-users-login-time">
                        {u.lastLoginAt ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={11} />
                            {new Date(u.lastLoginAt).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        ) : (
                          <span className="admin-users-login-never">Chưa đăng nhập</span>
                        )}
                      </td>

                      <td className="admin-users-td" style={{ textAlign: 'right' }}>
                        <div className="admin-users-actions-group">
                          <button
                            type="button"
                            title={`Đổi mật khẩu cho @${u.username}`}
                            onClick={() => {
                              setResetPassUser(u);
                              setNewPassword('');
                              setConfirmPassword('');
                            }}
                            className="admin-users-btn-reset-pass"
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
                            className="admin-users-btn-edit"
                          >
                            <Edit2 size={13} />
                          </button>

                          {!isSelf && (
                            <button
                              type="button"
                              title="Xóa tài khoản"
                              onClick={() => handleDelete(u)}
                              className="admin-users-btn-delete"
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

      {/* 5. MODAL: CREATE USER */}
      {isCreateOpen && (
        <div className="admin-users-modal-backdrop">
          <div className="admin-users-modal-box">
            <h2 className="admin-users-modal-title">
              Tạo Tài Khoản Người Dùng Mới
            </h2>

            <form onSubmit={handleCreateSubmit} className="admin-users-modal-form">
              <div>
                <label className="admin-users-modal-label">
                  Họ và tên nhân sự *
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formFullName}
                  onChange={(e) => setFormFullName(e.target.value)}
                  required
                  className="admin-users-modal-input"
                />
              </div>

              <div>
                <label className="admin-users-modal-label">
                  Tên đăng nhập (Username) *
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: nguyen_a"
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  required
                  className="admin-users-modal-input"
                />
              </div>

              <div>
                <label className="admin-users-modal-label">
                  Email cơ quan *
                </label>
                <input
                  type="email"
                  placeholder="email@4utours.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                  className="admin-users-modal-input"
                />
              </div>

              <div>
                <label className="admin-users-modal-label">
                  Mật khẩu khởi tạo (tối thiểu 6 ký tự) *
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  required
                  minLength={6}
                  className="admin-users-modal-input"
                />
              </div>

              <div>
                <label className="admin-users-modal-label">
                  Phân quyền vai trò (Role) *
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as UserRole)}
                  className="admin-users-modal-select"
                >
                  <option value="superadmin">🔴 Super Admin (Toàn quyền hệ thống)</option>
                  <option value="manager">🔵 Quản Lý Vận Hành (Tours, Shop, Categories, Blogs)</option>
                  <option value="consultant">🟢 Chuyên Viên Tư Vấn (Lịch hẹn tư vấn & Đơn hàng)</option>
                  <option value="editor">🟣 Biên Tập Viên (Bài viết, Điểm đến, FAQ)</option>
                </select>
              </div>

              <div className="admin-users-modal-footer">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="admin-users-modal-dismiss-btn"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="admin-users-modal-submit-btn"
                >
                  Tạo Người Dùng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL: EDIT USER */}
      {editingUser && (
        <div className="admin-users-modal-backdrop">
          <div className="admin-users-modal-box">
            <h2 className="admin-users-modal-title">
              Chỉnh Sửa Thông Tin & Phân Quyền
            </h2>

            <form onSubmit={handleEditSubmit} className="admin-users-modal-form">
              <div>
                <label className="admin-users-modal-label">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  value={editingUser.username}
                  disabled
                  className="admin-users-modal-input"
                />
              </div>

              <div>
                <label className="admin-users-modal-label">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  value={editingUser.fullName}
                  onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                  required
                  className="admin-users-modal-input"
                />
              </div>

              <div>
                <label className="admin-users-modal-label">
                  Email *
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  required
                  className="admin-users-modal-input"
                />
              </div>

              <div>
                <label className="admin-users-modal-label">
                  Vai trò (Role)
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                  className="admin-users-modal-select"
                >
                  <option value="superadmin">🔴 Super Admin (Toàn quyền)</option>
                  <option value="manager">🔵 Quản Lý Vận Hành</option>
                  <option value="consultant">🟢 Chuyên Viên Tư Vấn</option>
                  <option value="editor">🟣 Biên Tập Viên</option>
                </select>
              </div>

              {/* Optional Password Change during User Edit */}
              <div className="admin-users-modal-divider">
                <label className="admin-users-modal-label" style={{ color: '#0f766e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <KeyRound size={13} />
                  <span>Đổi mật khẩu mới (Tùy chọn)</span>
                </label>
                <input
                  type="password"
                  placeholder="Để trống nếu không muốn đổi mật khẩu..."
                  value={editNewPassword}
                  onChange={(e) => setEditNewPassword(e.target.value)}
                  minLength={6}
                  className="admin-users-modal-input"
                />
                <span className="admin-users-modal-helper-text">
                  Chỉ nhập khi muốn thiết lập lại mật khẩu cho tài khoản này.
                </span>
              </div>

              <div className="admin-users-modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    setEditingUser(null);
                    setEditNewPassword('');
                  }}
                  className="admin-users-modal-dismiss-btn"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="admin-users-modal-submit-btn"
                >
                  Lưu Thay Đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL: RESET USER PASSWORD */}
      {resetPassUser && (
        <div className="admin-users-modal-backdrop">
          <div className="admin-users-modal-box compact">
            <div className="admin-users-modal-header-row">
              <div className="admin-users-modal-icon-wrap green">
                <KeyRound size={20} />
              </div>
              <div>
                <h2 className="admin-users-modal-title compact">
                  Đặt Lại Mật Khẩu
                </h2>
                <div className="admin-users-modal-subtitle">
                  Tài khoản: <strong>@{resetPassUser.username}</strong> ({resetPassUser.fullName})
                </div>
              </div>
            </div>

            <form onSubmit={handleResetPasswordSubmit} className="admin-users-modal-form mt-16">
              <div>
                <label className="admin-users-modal-label">
                  Mật khẩu mới *
                </label>
                <div className="admin-users-input-wrapper">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Tối thiểu 6 ký tự..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    autoFocus
                    className="admin-users-modal-input with-toggle"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="admin-users-pass-toggle-btn"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="admin-users-modal-label">
                  Xác nhận lại mật khẩu mới *
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu mới..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="admin-users-modal-input"
                />
              </div>

              <div className="admin-users-modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    setResetPassUser(null);
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="admin-users-modal-dismiss-btn"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="admin-users-modal-submit-btn"
                >
                  <ShieldCheck size={15} />
                  <span>Xác Nhận Đổi Mật Khẩu</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. MODAL: CHANGE MY OWN PASSWORD */}
      {isMyPasswordModalOpen && (
        <div className="admin-users-modal-backdrop">
          <div className="admin-users-modal-box compact">
            <div className="admin-users-modal-header-row">
              <div className="admin-users-modal-icon-wrap blue">
                <Key size={20} />
              </div>
              <div>
                <h2 className="admin-users-modal-title compact">
                  Đổi Mật Khẩu Tài Khoản Của Tôi
                </h2>
                <div className="admin-users-modal-subtitle">
                  Đang đăng nhập: <strong>@{currentUser?.username}</strong> ({currentUser?.fullName})
                </div>
              </div>
            </div>

            <form onSubmit={handleMyPasswordSubmit} className="admin-users-modal-form mt-16">
              <div>
                <label className="admin-users-modal-label">
                  Mật khẩu hiện tại *
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu đang dùng..."
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  autoFocus
                  className="admin-users-modal-input"
                />
              </div>

              <div>
                <label className="admin-users-modal-label">
                  Mật khẩu mới (tối thiểu 6 ký tự) *
                </label>
                <div className="admin-users-input-wrapper">
                  <input
                    type={showMyPass ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu mới..."
                    value={myNewPassword}
                    onChange={(e) => setMyNewPassword(e.target.value)}
                    required
                    minLength={6}
                    className="admin-users-modal-input with-toggle"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMyPass(!showMyPass)}
                    className="admin-users-pass-toggle-btn"
                  >
                    {showMyPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="admin-users-modal-label">
                  Xác nhận lại mật khẩu mới *
                </label>
                <input
                  type={showMyPass ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu mới..."
                  value={myConfirmPassword}
                  onChange={(e) => setMyConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="admin-users-modal-input"
                />
              </div>

              <div className="admin-users-modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    setIsMyPasswordModalOpen(false);
                    setCurrentPassword('');
                    setMyNewPassword('');
                    setMyConfirmPassword('');
                  }}
                  className="admin-users-modal-dismiss-btn"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="admin-users-modal-submit-btn"
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
