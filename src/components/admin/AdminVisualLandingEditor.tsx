import React, { useState } from 'react';
import '../SectionLandingPage.css';
import {
    ArrowRight,
    PlayCircle,
    CheckCircle2,
    Plus,
    X,
    Trash2,
    User,
    Frown,
    Moon,
    Activity,
    BatteryCharging,
    Sparkles,
    Sun,
    Zap,
    Brain,
    ShieldCheck,
    Camera,
    PlusCircle
} from 'lucide-react';
import { LandingSectionData } from '../../data/landingSectionData';

interface AdminVisualLandingEditorProps {
    templateData: LandingSectionData;
    retreatTitle?: string;
    onChange: (newData: LandingSectionData) => void;
}

export default function AdminVisualLandingEditor({
    templateData,
    retreatTitle,
    onChange
}: AdminVisualLandingEditorProps) {
    const [data, setData] = useState<LandingSectionData>(templateData);
    const [activeFaq, setActiveFaq] = useState<number | null>(0);

    React.useEffect(() => {
        setData(templateData);
    }, [templateData]);

    const toggleFaq = (idx: number) => {
        setActiveFaq(activeFaq === idx ? null : idx);
    };

    // Hero Update
    const updateHeroField = (field: keyof LandingSectionData['hero'], val: string) => {
        const next = { ...data, hero: { ...data.hero, [field]: val } };
        setData(next);
        onChange(next);
    };

    // Signals (Pain points)
    const updateSignalsField = (field: 'heading' | 'description', val: string) => {
        const next = { ...data, signals: { ...data.signals, [field]: val } };
        setData(next);
        onChange(next);
    };

    const updateSignalItem = (idx: number, field: 'title' | 'description', val: string) => {
        const newItems = [...data.signals.items];
        newItems[idx] = { ...newItems[idx], [field]: val };
        const next = { ...data, signals: { ...data.signals, items: newItems } };
        setData(next);
        onChange(next);
    };

    const addSignalItem = () => {
        const newItems = [
            ...data.signals.items,
            {
                title: 'Triệu chứng hoặc cơn đau mới',
                description: 'Mô tả chi tiết cảm giác khó chịu hoặc tín hiệu cảnh báo từ cơ thể...',
                quote: ''
            }
        ];
        const next = { ...data, signals: { ...data.signals, items: newItems } };
        setData(next);
        onChange(next);
    };

    const removeSignalItem = (idx: number) => {
        if (data.signals.items.length <= 1) return;
        const newItems = data.signals.items.filter((_, i) => i !== idx);
        const next = { ...data, signals: { ...data.signals, items: newItems } };
        setData(next);
        onChange(next);
    };

    // Benefits (21 Days)
    const updateBenefitsField = (field: 'heading' | 'description', val: string) => {
        const next = { ...data, benefits: { ...data.benefits, [field]: val } };
        setData(next);
        onChange(next);
    };

    const updateBenefitItem = (idx: number, field: 'title' | 'description', val: string) => {
        const newItems = [...data.benefits.items];
        newItems[idx] = { ...newItems[idx], [field]: val };
        const next = { ...data, benefits: { ...data.benefits, items: newItems } };
        setData(next);
        onChange(next);
    };

    const addBenefitItem = () => {
        const newItems = [
            ...data.benefits.items,
            {
                title: 'Lợi ích chuyển hóa mới',
                description: 'Mô tả chi tiết kết quả tích cực mà học viên sẽ đạt được...'
            }
        ];
        const next = { ...data, benefits: { ...data.benefits, items: newItems } };
        setData(next);
        onChange(next);
    };

    const removeBenefitItem = (idx: number) => {
        if (data.benefits.items.length <= 1) return;
        const newItems = data.benefits.items.filter((_, i) => i !== idx);
        const next = { ...data, benefits: { ...data.benefits, items: newItems } };
        setData(next);
        onChange(next);
    };

    // About
    const updateAboutField = (field: keyof LandingSectionData['about'], val: string) => {
        const next = { ...data, about: { ...data.about, [field]: val } };
        setData(next);
        onChange(next);
    };

    // Method (3 Pillars)
    const updateMethodField = (field: 'heading' | 'description', val: string) => {
        const next = { ...data, method: { ...data.method, [field]: val } };
        setData(next);
        onChange(next);
    };

    const updateMethodItem = (idx: number, field: 'title' | 'description', val: string) => {
        const newItems = [...data.method.items];
        newItems[idx] = { ...newItems[idx], [field]: val };
        const next = { ...data, method: { ...data.method, items: newItems } };
        setData(next);
        onChange(next);
    };

    const addMethodItem = () => {
        const num = data.method.items.length + 1;
        const newItems = [
            ...data.method.items,
            {
                point: `0${num}`,
                title: `Trụ cột ${num}`,
                sanskrit: '',
                description: 'Mô tả chi tiết về nguyên lý và cách thực hành của trụ cột này...'
            }
        ];
        const next = { ...data, method: { ...data.method, items: newItems } };
        setData(next);
        onChange(next);
    };

    const removeMethodItem = (idx: number) => {
        if (data.method.items.length <= 1) return;
        const newItems = data.method.items.filter((_, i) => i !== idx);
        const next = { ...data, method: { ...data.method, items: newItems } };
        setData(next);
        onChange(next);
    };

    // Teacher
    const updateTeacherField = (field: 'title' | 'bio' | 'image', val: string) => {
        const next = {
            ...data,
            trust: { ...data.trust, teacher: { ...data.trust.teacher, [field]: val } }
        };
        setData(next);
        onChange(next);
    };

    // Steps (4 Steps Process)
    const updateStepsField = (field: 'heading', val: string) => {
        const next = { ...data, steps: { ...data.steps, [field]: val } };
        setData(next);
        onChange(next);
    };

    const updateStepItem = (idx: number, field: 'title' | 'description', val: string) => {
        const newItems = [...data.steps.items];
        newItems[idx] = { ...newItems[idx], [field]: val };
        const next = { ...data, steps: { ...data.steps, items: newItems } };
        setData(next);
        onChange(next);
    };

    const addStepItem = () => {
        const stepNumber = data.steps.items.length + 1;
        const newItems = [
            ...data.steps.items,
            {
                step: `Bước ${stepNumber}`,
                title: `Bước ${stepNumber}`,
                description: 'Mô tả hành động của bước này...'
            }
        ];
        const next = { ...data, steps: { ...data.steps, items: newItems } };
        setData(next);
        onChange(next);
    };

    const removeStepItem = (idx: number) => {
        if (data.steps.items.length <= 1) return;
        const newItems = data.steps.items.filter((_, i) => i !== idx);
        const next = { ...data, steps: { ...data.steps, items: newItems } };
        setData(next);
        onChange(next);
    };

    // FAQ
    const updateFaqField = (field: 'heading', val: string) => {
        const next = { ...data, faq: { ...data.faq, [field]: val } };
        setData(next);
        onChange(next);
    };

    const updateFaqItem = (idx: number, field: 'question' | 'answer', val: string) => {
        const newItems = [...data.faq.items];
        newItems[idx] = { ...newItems[idx], [field]: val };
        const next = { ...data, faq: { ...data.faq, items: newItems } };
        setData(next);
        onChange(next);
    };

    const addFaqItem = () => {
        const newItems = [
            ...data.faq.items,
            {
                question: 'Câu hỏi thắc mắc mới vừa thêm?',
                answer: 'Nhấp vào đây để gõ câu trả lời giải đáp chi tiết...'
            }
        ];
        const next = { ...data, faq: { ...data.faq, items: newItems } };
        setData(next);
        setActiveFaq(newItems.length - 1);
        onChange(next);
    };

    const removeFaqItem = (idx: number) => {
        if (data.faq.items.length <= 1) return;
        const newItems = data.faq.items.filter((_, i) => i !== idx);
        const next = { ...data, faq: { ...data.faq, items: newItems } };
        setData(next);
        onChange(next);
    };

    // Reusable Inline Editable Component
    const EditableText = ({
        value,
        onSave,
        as: Component = 'span',
        className = '',
        style,
        placeholder = 'Nhấp để nhập chữ...',
        children
    }: {
        value?: string;
        onSave: (val: string) => void;
        as?: any;
        className?: string;
        style?: React.CSSProperties;
        placeholder?: string;
        children?: React.ReactNode;
    }) => {
        return (
            <Component
                contentEditable
                suppressContentEditableWarning
                className={`admin-inline-editable ${className}`}
                style={{
                    ...style,
                    outline: 'none',
                    minWidth: '20px',
                    display: style?.display || (Component === 'span' ? 'inline-block' : undefined),
                    borderRadius: '4px',
                    transition: 'all 0.15s ease',
                    cursor: 'text'
                }}
                onBlur={(e: React.FocusEvent<HTMLElement>) => {
                    const newText = e.currentTarget.innerText.trim();
                    if (newText !== (value || '')) {
                        onSave(newText);
                    }
                }}
                title="✨ Nhấp để sửa chữ trực tiếp"
            >
                {children || value || placeholder}
            </Component>
        );
    };

    const { hero, signals, about, method, benefits, trust, steps, faq } = data;

    const HERO_BG_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTcydIZrE8ufSGkdRS2E-bnN97g3qeDhqaz6ehh36pUofa0zokMKvgkM9G-GDVP9Ah9gWrP_iKhPNFWDJdE9G3zfcUBSW0A26PBhQEmVb9RO8r14seo75JCpyzepwPlO60zVhseqJFhMy14VKpagKzHT3PfqrKQF2t7vHnpyh_EDK1ou1rXSnh_En7kYlHr1JvMcYnZVp6mupr-C3HRrJf_RODHklr1rsSnuSxeWgne6usM0FbOZ6M';
    const ABOUT_IMG = about.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCugcyFbQTVlM8o720zc8FSyMRmNEAxlQL9nGYt69uUjZMLJJ5W9ohqxiIg2wKUN_a1c3qG0df0X-rOlykE6j_ATlcu6BY1XoDwPIsniF4TS7jpnpDezoTGoGKxsAX0ayi4YspWBzbkct8MbGIdC4fRb-VUt-1wRx2tWcbQKUetl3l08xXSW5-URAM3XcpJwuL2y0e35PjVKlo6QFP7ILGxDYFfY1nFmGICBqmWQPTwQXUngMj1vEbq';
    const EXPERT_IMG = trust.teacher.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiExjxiVWNasHsG7LcpWyLE27qaLpzuRJfa9v53eT143AyOnE1neNwY4iv5563rN5p2hTKuTfouR14V46H7LDE6lTjF4Rp3k3Oh4uEZpjuRi7-ROTbGf67LsvVcCi7U6JtD6TvN2n5Tg2AGsAdx8xW6IYD0UdpenFRtD0Wfs_UtxPUBAF8tlowm-p31ncG99UOt-CoL_UOf4aDyuZ2BP0HH9rpw1nhyHptJGCQ7incu8EHkbo1aSs5';

    const getPainIconColor = (idx: number) => {
        if (idx === 0) return { bg: '#ffdad6', color: '#93000a', icon: <Frown size={32} /> };
        if (idx === 1) return { bg: '#d9e5e1', color: '#5b6764', icon: <Moon size={32} /> };
        if (idx === 2) return { bg: '#ffdad6', color: '#93000a', icon: <Activity size={32} /> };
        return { bg: '#182723', color: '#7e8f89', icon: <BatteryCharging size={32} /> };
    };

    const getBenefitIcon = (idx: number) => {
        const icons = [<Moon size={28} />, <Activity size={28} />, <Sun size={28} />, <Zap size={28} />, <Brain size={28} />, <ShieldCheck size={28} />];
        return icons[idx % icons.length];
    };

    const getPillarSpanStyle = (idx: number, total: number): string => {
        if (total === 1) return 'span 6';
        if (total === 2) return 'span 3';
        if (total === 3) return 'span 2'; // 3 thẻ hàng 1 (mỗi thẻ 1/3)
        if (total === 4) return 'span 3'; // 2 thẻ hàng 1, 2 thẻ hàng 2 (mỗi thẻ 1/2)
        if (total === 5) {
            // Hàng 1: 3 thẻ (span 2 mỗi thẻ = 100%)
            // Hàng 2: 2 thẻ (span 3 mỗi thẻ = 100% -> CO GIÃN TO RA FULL BẰNG WIDTH 3 THẺ TRÊN!)
            return idx < 3 ? 'span 2' : 'span 3';
        }
        if (total === 6) return 'span 2'; // 3 trên, 3 dưới
        if (total === 7) {
            if (idx < 3) return 'span 2';
            return 'span 3';
        }
        if (total === 8) {
            if (idx < 6) return 'span 2';
            return 'span 3';
        }
        return 'span 2';
    };

    const getBenefitSpanStyle = (idx: number, total: number): string => {
        if (total === 1) return 'span 6';
        if (total === 2) return 'span 3';
        if (total === 3) return 'span 2';
        if (total === 4) return 'span 3'; // 2 2 layout (2 to x 2 rows)
        if (total === 5) return idx < 2 ? 'span 3' : 'span 2'; // 2 to, 3 nhỏ (2 3 layout)
        if (total === 6) return 'span 2'; // 3 3 layout (3 nhỏ x 2 rows)
        if (total === 7) {
            // 2 to (span 3) + 3 nhỏ (span 2) + 2 to (span 3) => 2 3 2 layout
            if (idx < 2) return 'span 3';
            if (idx < 5) return 'span 2';
            return 'span 3';
        }
        if (total === 8) return idx < 2 ? 'span 3' : 'span 2'; // 2 3 3 layout
        return 'span 2';
    };

    const getBenefitSpanClass = (idx: number, total: number) => {
        if (total === 1) return 'zen-span-6';
        if (total === 2) return 'zen-span-3';
        if (total === 3) return 'zen-span-2';
        if (total === 4) return 'zen-span-3'; // 2 2 layout (2 to x 2 rows)
        if (total === 5) return idx < 2 ? 'zen-span-3' : 'zen-span-2'; // 2 to, 3 nhỏ (2 3 layout)
        if (total === 6) return 'zen-span-2'; // 3 3 layout (3 nhỏ x 2 rows)
        if (total === 7) {
            // 2 to (span 3) + 3 nhỏ (span 2) + 2 to (span 3) => 2 3 2 layout
            if (idx < 2) return 'zen-span-3';
            if (idx < 5) return 'zen-span-2';
            return 'zen-span-3';
        }
        if (total === 8) return idx < 2 ? 'zen-span-3' : 'zen-span-2'; // 2 3 3 layout
        return 'zen-span-2';
    };

    return (
        <div className="zen-root admin-visual-editor-root" style={{ width: '100%', maxWidth: '100%', margin: 0, position: 'relative' }}>
            <style>{`
                .admin-inline-editable:hover {
                    outline: 2px dashed #006d36 !important;
                    background-color: rgba(0, 109, 54, 0.08) !important;
                    box-shadow: 0 0 0 2px rgba(0, 109, 54, 0.15);
                }
                .admin-inline-editable:focus {
                    outline: 2px solid #006d36 !important;
                    background-color: #ffffff !important;
                    color: #0f172a !important;
                    box-shadow: 0 4px 16px rgba(0, 109, 54, 0.2);
                    padding: 2px 6px;
                }
                .admin-card-container {
                    position: relative;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .admin-card-delete-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: #fee2e2;
                    border: 1px solid #fca5a5;
                    color: #dc2626;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    opacity: 0;
                    transition: opacity 0.2s ease, transform 0.15s ease, background-color 0.15s ease;
                    z-index: 10;
                }
                .admin-card-container:hover .admin-card-delete-btn {
                    opacity: 1;
                }
                .admin-card-delete-btn:hover {
                    background: #dc2626;
                    color: #ffffff;
                    transform: scale(1.1);
                }
                .admin-add-item-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 28px 20px;
                    border-radius: 20px;
                    border: 2px dashed #86efac;
                    background-color: rgba(0, 109, 54, 0.03);
                    color: #006d36;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 700;
                    transition: all 0.2s ease;
                    min-height: 140px;
                }
                .admin-add-item-card:hover {
                    background-color: rgba(0, 109, 54, 0.08);
                    border-color: #006d36;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 109, 54, 0.1);
                }
                .admin-img-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                    border-radius: inherit;
                    cursor: pointer;
                }
                .admin-img-wrap:hover .admin-img-overlay {
                    opacity: 1;
                }
            `}</style>

            <main>
                {/* ── 1. Hero Section ── */}
                <section className="zen-hero zen-hero-clean">
                    <div className="zen-hero-ambient-glow"></div>
                    <div className="zen-container">
                        <div className="zen-hero-content zen-hero-content-centered">
                            <div className="zen-badge-pill">
                                <Sparkles size={16} className="zen-badge-sparkle" />
                                <EditableText
                                    value={hero.badge || 'Chương trình thực hành 3Đ 21 ngày liên tục'}
                                    onSave={(val) => updateHeroField('badge', val)}
                                    placeholder="Huy hiệu Hero..."
                                />
                            </div>

                            <h1 className="zen-hero-title-zannier">
                                <span className="zen-zannier-line1">
                                    <EditableText
                                        value={hero.title || 'Thể dục đúng'}
                                        onSave={(val) => updateHeroField('title', val)}
                                        placeholder="Dòng tiêu đề 1..."
                                    />
                                </span>
                                <span className="zen-hero-title-divider">
                                    <span className="zen-divider-line"></span>
                                    <span className="zen-divider-leaf">✦</span>
                                    <span className="zen-divider-line"></span>
                                </span>
                                <span className="zen-zannier-line2">
                                    <EditableText
                                        value={hero.titleItalic || 'Chia tay đau cổ, vai, gáy'}
                                        onSave={(val) => updateHeroField('titleItalic', val)}
                                        placeholder="Dòng tiêu đề 2..."
                                    />
                                </span>
                            </h1>

                            <p className="zen-body-lg zen-hero-desc zen-hero-desc-centered">
                                <EditableText
                                    value={hero.description || 'Phương pháp phục hồi dựa trên nền tảng y học cổ truyền Sivananda, tập trung vào sự cân bằng giữa cơ thể và tâm trí. Không cần thuốc, không xâm lấn.'}
                                    onSave={(val) => updateHeroField('description', val)}
                                    placeholder="Mô tả Hero..."
                                />
                            </p>

                            <div className="zen-hero-actions zen-hero-actions-centered">
                                <button type="button" className="zen-btn-primary zen-btn-primary-moss">
                                    <EditableText
                                        value={hero.ctaText || 'Tham gia Info Session'}
                                        onSave={(val) => updateHeroField('ctaText', val)}
                                    />
                                    <ArrowRight size={20} />
                                </button>

                                <button type="button" className="zen-btn-secondary zen-btn-secondary-moss">
                                    <PlayCircle size={20} />
                                    <span>Xem giới thiệu</span>
                                </button>
                            </div>

                            <div className="zen-hero-social-proof zen-hero-social-proof-centered">
                                <div className="zen-avatar-cluster">
                                    <div className="zen-avatar-circle" style={{ backgroundColor: '#dcebe2' }}>
                                        <User size={18} />
                                    </div>
                                    <div className="zen-avatar-circle" style={{ backgroundColor: '#cbe0d3' }}>
                                        <User size={18} />
                                    </div>
                                    <div className="zen-avatar-circle" style={{ backgroundColor: '#b7d4c2' }}>
                                        <User size={18} />
                                    </div>
                                </div>
                                <p className="zen-label-sm zen-hero-proof-text">
                                    <EditableText
                                        value={hero.subInfo || '+5,000 học viên đã phục hồi thành công'}
                                        onSave={(val) => updateHeroField('subInfo', val)}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Signals (Pain Points) ── */}
                <section id="signals" className="zen-section">
                    <div className="zen-container">
                        <div className="zen-section-header">
                            <h2 className="zen-headline-lg">
                                <EditableText
                                    value={signals.heading || 'Cơ thể đang gửi Tín hiệu - Ta có đang sống chung với Đau?'}
                                    onSave={(val) => updateSignalsField('heading', val)}
                                />
                            </h2>
                            <p className="zen-body-lg">
                                <EditableText
                                    value={signals.description || 'Nếu bạn đang gặp phải một trong những triệu chứng sau, cơ thể bạn đang kêu cứu và cần được phục hồi đúng cách.'}
                                    onSave={(val) => updateSignalsField('description', val)}
                                />
                            </p>
                        </div>

                        <div className="zen-pain-grid">
                            {signals.items.map((item, idx) => {
                                const styleInfo = getPainIconColor(idx);
                                const cleanTitle = item.title.replace(/^"|"$/g, '');
                                return (
                                    <div key={idx} className="zen-pain-card admin-card-container">
                                        <button
                                            type="button"
                                            className="admin-card-delete-btn"
                                            onClick={() => removeSignalItem(idx)}
                                            title="Xóa thẻ tín hiệu này"
                                        >
                                            <X size={15} />
                                        </button>
                                        <div
                                            className="zen-pain-icon"
                                            style={{ backgroundColor: styleInfo.bg, color: styleInfo.color }}
                                        >
                                            {styleInfo.icon}
                                        </div>
                                        <h3 className="zen-headline-md zen-font-serif">
                                            <EditableText
                                                value={cleanTitle}
                                                onSave={(val) => updateSignalItem(idx, 'title', val)}
                                            />
                                        </h3>
                                        <p className="zen-body-md" style={{ margin: 0 }}>
                                            <EditableText
                                                value={item.description}
                                                onSave={(val) => updateSignalItem(idx, 'description', val)}
                                            />
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Add Pain Point Button Outside Grid */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <button
                                type="button"
                                onClick={addSignalItem}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '999px',
                                    border: '1.5px dashed #006d36',
                                    backgroundColor: '#e8f5e9',
                                    color: '#006d36',
                                    fontSize: '13.5px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <PlusCircle size={18} />
                                <span>+ Thêm Tín Hiệu Cơ Thể</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── 3. Benefits (21 Days Transformation) ── */}
                <section id="benefits" className="zen-section">
                    <div className="zen-container">
                        <div className="zen-section-header">
                            <h2 className="zen-headline-lg">
                                <EditableText
                                    value={benefits.heading || '21 ngày liên tục sẽ thay đổi điều gì?'}
                                    onSave={(val) => updateBenefitsField('heading', val)}
                                />
                            </h2>
                            <p className="zen-body-lg">
                                <EditableText
                                    value={benefits.description || 'Đồng hành cùng chúng tôi trong 21 ngày để cảm nhận sự chuyển hóa rõ rệt từ bên trong.'}
                                    onSave={(val) => updateBenefitsField('description', val)}
                                />
                            </p>
                        </div>

                        <div className="zen-benefits-grid">
                            {benefits.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`zen-benefit-card admin-card-container ${getBenefitSpanClass(idx, benefits.items.length)}`}
                                    style={{ gridColumn: getBenefitSpanStyle(idx, benefits.items.length) }}
                                >
                                    <button
                                        type="button"
                                        className="admin-card-delete-btn"
                                        onClick={() => removeBenefitItem(idx)}
                                        title="Xóa lợi ích này"
                                    >
                                        <X size={15} />
                                    </button>
                                    <div className="zen-benefit-icon">
                                        {getBenefitIcon(idx)}
                                    </div>
                                    <div>
                                        <h4>
                                            <EditableText
                                                value={item.title}
                                                onSave={(val) => updateBenefitItem(idx, 'title', val)}
                                            />
                                        </h4>
                                        <p>
                                            <EditableText
                                                value={item.description}
                                                onSave={(val) => updateBenefitItem(idx, 'description', val)}
                                            />
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Benefit Button Outside Grid */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <button
                                type="button"
                                onClick={addBenefitItem}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '999px',
                                    border: '1.5px dashed #006d36',
                                    backgroundColor: '#e8f5e9',
                                    color: '#006d36',
                                    fontSize: '13.5px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <PlusCircle size={18} />
                                <span>+ Thêm Lợi Ích 21 Ngày</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── 4. Method (3 Pillars) ── */}
                <section id="method" className="zen-section">
                    <div className="zen-container">
                        <div id="about-3d" className="zen-about-grid" style={{ marginBottom: '60px' }}>
                            <div className="zen-about-col admin-img-wrap" style={{ position: 'relative' }}>
                                <img
                                    src={ABOUT_IMG}
                                    alt="Zen garden & restorative wellness"
                                    className="zen-about-img"
                                    loading="lazy"
                                />
                                <div
                                    className="admin-img-overlay"
                                    onClick={() => {
                                        const newUrl = window.prompt('Nhập đường dẫn ảnh Giới thiệu mới:', ABOUT_IMG);
                                        if (newUrl && newUrl.trim()) updateAboutField('image', newUrl.trim());
                                    }}
                                >
                                    <button type="button" style={{ background: '#006d36', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                        <Camera size={16} />
                                        <span>Đổi ảnh Giới thiệu</span>
                                    </button>
                                </div>
                            </div>

                            <div className="zen-about-col">
                                <span className="zen-eyebrow">
                                    <EditableText
                                        value={about.eyebrow || 'Giải Pháp Tự Nhiên'}
                                        onSave={(val) => updateAboutField('eyebrow', val)}
                                    />
                                </span>
                                <h2 className="zen-headline-lg" style={{ marginBottom: '20px' }}>
                                    <EditableText
                                        value={about.heading || 'Phương Pháp 3Đ Là Gì?'}
                                        onSave={(val) => updateAboutField('heading', val)}
                                    />
                                </h2>
                                <p className="zen-body-lg" style={{ marginBottom: '20px' }}>
                                    <EditableText
                                        value={about.para1 || 'Dựa trên nền tảng triết lý Sivananda với hơn 5,000 năm lịch sử, phương pháp 3Đ tập trung vào việc khôi phục khả năng tự chữa lành của cơ thể thông qua ba trụ cột cốt lõi.'}
                                        onSave={(val) => updateAboutField('para1', val)}
                                    />
                                </p>

                                <ul className="zen-checklist">
                                    <li className="zen-checklist-item">
                                        <CheckCircle2 size={22} className="zen-check-icon" />
                                        <span>
                                            <strong>Thể Dục ĐÚNG:</strong> Các tư thế vận động kéo giãn và giải tỏa áp lực đĩa đệm, giải phóng tắc nghẽn vùng cổ vai gáy và cột sống nhẹ nhàng.
                                        </span>
                                    </li>
                                    <li className="zen-checklist-item">
                                        <CheckCircle2 size={22} className="zen-check-icon" />
                                        <span>
                                            <strong>Hơi Thở ĐÚNG:</strong> Kỹ thuật Hơi thở sử dụng tối đa dung tích Phổi, cung cấp đủ Oxy, giảm Stress trong vài phút, tăng Tập trung và cải thiện Giấc ngủ ngay tuần đầu.
                                        </span>
                                    </li>
                                    <li className="zen-checklist-item">
                                        <CheckCircle2 size={22} className="zen-check-icon" />
                                        <span>
                                            <strong>Thư Giãn ĐÚNG:</strong> Kỹ thuật Thư giãn sâu giải toả Căng thẳng tích tụ, chữa lành tổn thương Thể chất và Tinh thần, cảm nhận sự Tĩnh lặng và Kết nối với Bản thân.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="zen-section-header" style={{ marginBottom: '40px' }}>
                            <h2 className="zen-headline-lg">
                                <EditableText
                                    value={method.heading || '3 Trụ Cột Vàng Cho Sức Khỏe'}
                                    onSave={(val) => updateMethodField('heading', val)}
                                />
                            </h2>
                            <p className="zen-body-lg">
                                <EditableText
                                    value={method.description || 'Khám phá chi tiết cách mỗi trụ cột hoạt động để tái tạo lại sự cân bằng hoàn hảo cho cơ thể bạn.'}
                                    onSave={(val) => updateMethodField('description', val)}
                                />
                            </p>
                        </div>

                        <div className="zen-pillars-grid">
                            {method.items.map((mItem, idx) => (
                                <div
                                    key={idx}
                                    className="zen-pillar-card zen-pillar-card-clean admin-card-container"
                                    style={{ gridColumn: getPillarSpanStyle(idx, method.items.length) }}
                                >
                                    <button
                                        type="button"
                                        className="admin-card-delete-btn"
                                        onClick={() => removeMethodItem(idx)}
                                        title="Xóa trụ cột này"
                                    >
                                        <X size={15} />
                                    </button>
                                    <div className="zen-pillar-body">
                                        <div className="zen-pillar-top">
                                            <span className="zen-pillar-number">{mItem.point || `0${idx + 1}`}</span>
                                            <span className="zen-pillar-tag">
                                                <EditableText
                                                    value={mItem.title}
                                                    onSave={(val) => updateMethodItem(idx, 'title', val)}
                                                />
                                            </span>
                                        </div>
                                        <h3 className="zen-headline-md">
                                            <EditableText
                                                value={mItem.title}
                                                onSave={(val) => updateMethodItem(idx, 'title', val)}
                                            />
                                        </h3>
                                        <p className="zen-body-md" style={{ margin: 0 }}>
                                            <EditableText
                                                value={mItem.description}
                                                onSave={(val) => updateMethodItem(idx, 'description', val)}
                                            />
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Pillar Button Outside Grid */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <button
                                type="button"
                                onClick={addMethodItem}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '999px',
                                    border: '1.5px dashed #006d36',
                                    backgroundColor: '#e8f5e9',
                                    color: '#006d36',
                                    fontSize: '13.5px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <PlusCircle size={18} />
                                <span>+ Thêm Trụ Cột Phương Pháp</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── 5. Trust & Numbers / Expert ── */}
                <section id="ve-chung-toi" className="zen-section">
                    <div className="zen-container">
                        <div className="zen-trust-container-full">
                            <div className="zen-section-header" style={{ marginBottom: '40px' }}>
                                <h2 className="zen-headline-lg">
                                    <EditableText
                                        value={trust.teacher.title ? trust.teacher.title.toUpperCase() : 'CHUYÊN GIA HƯỚNG DẪN'}
                                        onSave={(val) => updateTeacherField('title', val)}
                                    />
                                </h2>
                            </div>

                            <div className="zen-expert-row-centered">
                                <div className="admin-img-wrap" style={{ position: 'relative', display: 'inline-block' }}>
                                    <img
                                        src={EXPERT_IMG}
                                        alt="Chuyên gia hướng dẫn Sivananda"
                                        className="zen-expert-avatar"
                                        loading="lazy"
                                    />
                                    <div
                                        className="admin-img-overlay"
                                        onClick={() => {
                                            const newUrl = window.prompt('Nhập đường dẫn avatar chuyên gia:', EXPERT_IMG);
                                            if (newUrl && newUrl.trim()) updateTeacherField('image', newUrl.trim());
                                        }}
                                    >
                                        <button type="button" style={{ background: '#006d36', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                            <Camera size={14} />
                                            <span>Đổi ảnh</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="zen-expert-info">
                                    <h3 className="zen-headline-md" style={{ marginBottom: '8px' }}>
                                        <EditableText
                                            value={trust.teacher.title || 'Chuyên gia hướng dẫn'}
                                            onSave={(val) => updateTeacherField('title', val)}
                                        />
                                    </h3>
                                    <p className="zen-body-md" style={{ marginBottom: '14px', width: '100%', fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.7 }}>
                                        <EditableText
                                            value={trust.teacher.bio || 'Được đào tạo và truyền thừa trực tiếp từ Hệ phái Sivananda, chuyên sâu về Vận động Asana, Hít thở Pranayama và Thư giãn Savasana. Hơn 10 năm Kinh nghiệm hướng dẫn Học viên Văn phòng và Người có Bệnh nền tại Việt Nam.'}
                                            onSave={(val) => updateTeacherField('bio', val)}
                                        />
                                    </p>
                                    <div className="zen-expert-tag">
                                        <span style={{ fontFamily: 'var(--zen-font-serif)', fontWeight: 700, color: 'var(--zen-primary)' }}>
                                            4U Wellness
                                        </span>
                                        <span style={{ fontSize: '11px', backgroundColor: 'rgba(35, 79, 47, 0.12)', padding: '2px 8px', borderRadius: '4px', color: 'var(--zen-moss-darkest)', fontWeight: 600 }}>
                                            Non-profit
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="zen-stats-4col">
                                <div className="zen-stat-tile">
                                    <div className="zen-stat-num">21</div>
                                    <div className="zen-stat-lbl">Ngày Chuyển Hóa</div>
                                </div>
                                <div className="zen-stat-tile">
                                    <div className="zen-stat-num">60</div>
                                    <div className="zen-stat-lbl">Phút Mỗi Ngày</div>
                                </div>
                                <div className="zen-stat-tile">
                                    <div className="zen-stat-num">80+</div>
                                    <div className="zen-stat-lbl">Quốc Gia Áp Dụng</div>
                                </div>
                                <div className="zen-stat-tile">
                                    <div className="zen-stat-num">100+</div>
                                    <div className="zen-stat-lbl">Năm Kế Thừa</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 6. Steps (Roadmap) ── */}
                <section id="lich-trinh" className="zen-section">
                    <div className="zen-container">
                        <div className="zen-section-header">
                            <h2 className="zen-headline-lg">
                                <EditableText
                                    value={steps.heading || 'Hành Trình Bắt Đầu Đơn Giản'}
                                    onSave={(val) => updateStepsField('heading', val)}
                                />
                            </h2>
                            <p className="zen-body-lg">
                                Chỉ với các bước đơn giản để bước vào hành trình 21 ngày chuyển hóa sức khỏe.
                            </p>
                        </div>

                        <div className="zen-steps-container" style={{ flexWrap: 'wrap', gap: '20px' }}>
                            <div className="zen-steps-line"></div>

                            {steps.items.map((stepItem, idx) => (
                                <div key={idx} className="zen-step-col admin-card-container">
                                    <button
                                        type="button"
                                        className="admin-card-delete-btn"
                                        onClick={() => removeStepItem(idx)}
                                        title="Xóa bước này"
                                    >
                                        <X size={15} />
                                    </button>
                                    <div className="zen-step-circle">{idx + 1}</div>
                                    <h4>
                                        <EditableText
                                            value={stepItem.title ? stepItem.title.replace(/^Bước \d+\s*·\s*/, '') : `Bước ${idx + 1}`}
                                            onSave={(val) => updateStepItem(idx, 'title', val)}
                                        />
                                    </h4>
                                    <p>
                                        <EditableText
                                            value={stepItem.description || 'Mô tả chi tiết bước này...'}
                                            onSave={(val) => updateStepItem(idx, 'description', val)}
                                        />
                                    </p>
                                </div>
                            ))}

                            {/* Add Step Button */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '16px' }}>
                                <button
                                    type="button"
                                    onClick={addStepItem}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '999px',
                                        border: '1.5px dashed #006d36',
                                        backgroundColor: '#e8f5e9',
                                        color: '#006d36',
                                        fontSize: '13.5px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <PlusCircle size={18} />
                                    <span>+ Thêm Bước Mới Vào Lộ Trình</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 7. FAQ (Questions & Answers) ── */}
                <section id="faq" className="zen-section">
                    <div className="zen-container">
                        <div className="zen-section-header">
                            <h2 className="zen-headline-lg">
                                <EditableText
                                    value={faq.heading || 'Giải đáp thắc mắc'}
                                    onSave={(val) => updateFaqField('heading', val)}
                                />
                            </h2>
                            <p className="zen-body-lg">
                                Những câu hỏi thường gặp về chương trình 21 ngày Zen.
                            </p>
                        </div>

                        <div className="zen-faq-wrap">
                            {faq.items.map((faqItem, idx) => (
                                <div key={idx} className="zen-faq-row admin-card-container">
                                    <button
                                        type="button"
                                        className="admin-card-delete-btn"
                                        style={{ top: '16px', right: '48px' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFaqItem(idx);
                                        }}
                                        title="Xóa câu hỏi này"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <button
                                        type="button"
                                        className="zen-faq-btn"
                                        onClick={() => toggleFaq(idx)}
                                    >
                                        <EditableText
                                            value={faqItem.question}
                                            onSave={(val) => updateFaqItem(idx, 'question', val)}
                                        />
                                        <Plus
                                            className={`zen-faq-icon ${activeFaq === idx ? 'open' : ''}`}
                                        />
                                    </button>
                                    {(activeFaq === idx) && (
                                        <div className="zen-faq-ans">
                                            <EditableText
                                                value={faqItem.answer}
                                                onSave={(val) => updateFaqItem(idx, 'answer', val)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Add FAQ Button */}
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <button
                                    type="button"
                                    onClick={addFaqItem}
                                    style={{
                                        padding: '12px 28px',
                                        borderRadius: '12px',
                                        border: '2px dashed #006d36',
                                        backgroundColor: 'rgba(0, 109, 54, 0.04)',
                                        color: '#006d36',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.15s ease'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 109, 54, 0.1)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 109, 54, 0.04)')}
                                >
                                    <PlusCircle size={18} />
                                    <span>+ Thêm Câu Hỏi & Trả Lời FAQ Mới</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
