import React, { useState, useEffect } from 'react';
import './SectionLandingPage.css';
import {
    ArrowRight,
    PlayCircle,
    CheckCircle2,
    Plus,
    X,
    User,
    Frown,
    Moon,
    Activity,
    BatteryCharging,
    Sparkles,
    Wind,
    Sun,
    Heart,
    Zap,
    Brain,
    ShieldCheck,
    Check
} from 'lucide-react';
import {
    getLandingSectionTemplateById,
    LandingSectionData
} from '../data/landingSectionData';
import { getLandingSectionTemplateByIdApi } from '../services/apiService';

export interface SectionLandingPageProps {
    onOpenBooking?: () => void;
    retreatTitle?: string;
    templateId?: string;
    templateData?: LandingSectionData;
}

export default function SectionLandingPage({
    onOpenBooking,
    retreatTitle,
    templateId,
    templateData
}: SectionLandingPageProps) {
    const [data, setData] = useState<LandingSectionData>(() => {
        if (templateData) return templateData;
        return getLandingSectionTemplateById(templateId).data;
    });

    const [activeFaq, setActiveFaq] = useState<number | null>(0);

    useEffect(() => {
        if (templateData) {
            setData(templateData);
            return;
        }

        let isMounted = true;
        // 1. Fast local resolution
        const localTemplate = getLandingSectionTemplateById(templateId);
        if (localTemplate?.data) {
            setData(localTemplate.data);
        }

        // 2. Fetch live from backend API
        const targetId = templateId || 'van-dong-co-vai-gay';
        getLandingSectionTemplateByIdApi(targetId)
            .then((liveTemplate) => {
                if (isMounted && liveTemplate?.data) {
                    setData(liveTemplate.data);
                }
            })
            .catch(() => { });

        return () => {
            isMounted = false;
        };
    }, [templateId, templateData]);

    const toggleFaq = (idx: number) => {
        setActiveFaq(activeFaq === idx ? null : idx);
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id) || document.querySelector(`[id*="${id}"]`);
        if (element) {
            const headerOffset = 90;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: 'smooth'
            });
        }
    };

    const { hero, signals, about, method, benefits, trust, steps, faq } = data;

    // High quality Figma Concept assets
    const HERO_BG_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTcydIZrE8ufSGkdRS2E-bnN97g3qeDhqaz6ehh36pUofa0zokMKvgkM9G-GDVP9Ah9gWrP_iKhPNFWDJdE9G3zfcUBSW0A26PBhQEmVb9RO8r14seo75JCpyzepwPlO60zVhseqJFhMy14VKpagKzHT3PfqrKQF2t7vHnpyh_EDK1ou1rXSnh_En7kYlHr1JvMcYnZVp6mupr-C3HRrJf_RODHklr1rsSnuSxeWgne6usM0FbOZ6M';
    const ABOUT_IMG = about.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCugcyFbQTVlM8o720zc8FSyMRmNEAxlQL9nGYt69uUjZMLJJ5W9ohqxiIg2wKUN_a1c3qG0df0X-rOlykE6j_ATlcu6BY1XoDwPIsniF4TS7jpnpDezoTGoGKxsAX0ayi4YspWBzbkct8MbGIdC4fRb-VUt-1wRx2tWcbQKUetl3l08xXSW5-URAM3XcpJwuL2y0e35PjVKlo6QFP7ILGxDYFfY1nFmGICBqmWQPTwQXUngMj1vEbq';
    const EXPERT_IMG = trust.teacher.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiExjxiVWNasHsG7LcpWyLE27qaLpzuRJfa9v53eT143AyOnE1neNwY4iv5563rN5p2hTKuTfouR14V46H7LDE6lTjF4Rp3k3Oh4uEZpjuRi7-ROTbGf67LsvVcCi7U6JtD6TvN2n5Tg2AGsAdx8xW6IYD0UdpenFRtD0Wfs_UtxPUBAF8tlowm-p31ncG99UOt-CoL_UOf4aDyuZ2BP0HH9rpw1nhyHptJGCQ7incu8EHkbo1aSs5';

    // Pain point background / color mapping
    const getPainIconColor = (idx: number) => {
        if (idx === 0) return { bg: '#ffdad6', color: '#93000a', icon: <Frown size={32} /> };
        if (idx === 1) return { bg: '#d9e5e1', color: '#5b6764', icon: <Moon size={32} /> };
        if (idx === 2) return { bg: '#ffdad6', color: '#93000a', icon: <Activity size={32} /> };
        return { bg: '#182723', color: '#7e8f89', icon: <BatteryCharging size={32} /> };
    };

    // Benefit icons mapping
    const getBenefitIcon = (idx: number) => {
        if (idx === 0) return <Moon size={28} />;
        if (idx === 1) return <Activity size={28} />;
        if (idx === 2) return <Sun size={28} />;
        if (idx === 3) return <Zap size={28} />;
        if (idx === 4) return <Brain size={28} />;
        return <ShieldCheck size={28} />;
    };

    const toSentenceCase = (str?: string, fallback = '') => {
        const text = str || fallback;
        if (!text) return '';
        const clean = text.trim().replace(/^["“”']+|["“”']+$/g, '');
        return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
    };

    return (
        <div className="zen-root">

            <main>
                {/* ── 1. Hero Section (Majestic Centered Full-Width Moss Green Design) ── */}
                <section className="zen-hero zen-hero-clean">
                    <div className="zen-hero-ambient-glow"></div>
                    <div className="zen-container">
                        <div className="zen-hero-content zen-hero-content-centered">
                            <div className="zen-badge-pill">
                                <Sparkles size={16} className="zen-badge-sparkle" />
                                <span>{hero.badge ? toSentenceCase(hero.badge) : 'Chương trình thực hành 3Đ 21 ngày liên tục'}</span>
                            </div>

                            <h1 className="zen-hero-title-zannier">
                                <span className="zen-zannier-line1">
                                    {toSentenceCase(hero.title, 'Thể dục đúng')}
                                </span>
                                <span className="zen-hero-title-divider">
                                    <span className="zen-divider-line"></span>
                                    <span className="zen-divider-leaf">✦</span>
                                    <span className="zen-divider-line"></span>
                                </span>
                                <span className="zen-zannier-line2">
                                    {toSentenceCase(hero.titleItalic, 'Chia tay đau cổ, vai, gáy')}
                                </span>
                            </h1>

                            <p className="zen-body-lg zen-hero-desc zen-hero-desc-centered">
                                {hero.description || 'Phương pháp phục hồi dựa trên nền tảng y học cổ truyền Sivananda, tập trung vào sự cân bằng giữa cơ thể và tâm trí. Không cần thuốc, không xâm lấn.'}
                            </p>

                            <div className="zen-hero-actions zen-hero-actions-centered">
                                <button
                                    onClick={() => onOpenBooking ? onOpenBooking() : undefined}
                                    className="zen-btn-primary zen-btn-primary-moss"
                                >
                                    <span>{hero.ctaText || 'Tham gia Info Session'}</span>
                                    <ArrowRight size={20} />
                                </button>

                                <a
                                    href="#about-3d"
                                    onClick={(e) => scrollToSection(e, 'about-3d')}
                                    className="zen-btn-secondary zen-btn-secondary-moss"
                                >
                                    <PlayCircle size={20} />
                                    <span>Xem giới thiệu</span>
                                </a>
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
                                    {hero.subInfo || '+5,000 học viên đã phục hồi thành công'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Vì sao cần? Section (Pain Points / Signals) ── */}
                <section id="signals" className="zen-section">
                    <div className="zen-container">
                        <div className="zen-section-header">
                            <h2 className="zen-headline-lg">
                                {signals.heading || 'Cơ thể đang gửi Tín hiệu - Ta có đang sống chung với Đau?'}
                            </h2>
                            <p className="zen-body-lg">
                                {signals.description || 'Nếu bạn đang gặp phải một trong những triệu chứng sau, cơ thể bạn đang kêu cứu và cần được phục hồi đúng cách.'}
                            </p>
                        </div>

                        <div className="zen-pain-grid">
                            {signals.items.map((item, idx) => {
                                const styleInfo = getPainIconColor(idx);
                                const cleanTitle = item.title.replace(/^"|"$/g, '');
                                return (
                                    <div key={idx} className="zen-pain-card">
                                        <div
                                            className="zen-pain-icon"
                                            style={{ backgroundColor: styleInfo.bg, color: styleInfo.color }}
                                        >
                                            {styleInfo.icon}
                                        </div>
                                        <h3 className="zen-headline-md zen-font-serif">
                                            {cleanTitle}
                                        </h3>
                                        <p className="zen-body-md" style={{ margin: 0 }}>
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── 3. Lợi ích Section (21-Day Transformation) ── */}
                <section id="benefits" className="zen-section">
                    <div className="zen-container">
                        <div className="zen-section-header">
                            <h2 className="zen-headline-lg">
                                {benefits.heading || '21 ngày liên tục sẽ thay đổi điều gì?'}
                            </h2>
                            <p className="zen-body-lg">
                                {benefits.description || 'Đồng hành cùng chúng tôi trong 21 ngày để cảm nhận sự chuyển hóa rõ rệt từ bên trong.'}
                            </p>
                        </div>

                        <div className="zen-benefits-grid">
                            {benefits.items.map((item, idx) => (
                                <div key={idx} className="zen-benefit-card">
                                    <div className="zen-benefit-icon">
                                        {getBenefitIcon(idx)}
                                    </div>
                                    <div>
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 4. Phương pháp Section (What is 3Đ?, 3 Pillars, Expert & 4 Steps) ── */}
                <section id="method" className="zen-section">
                    <div className="zen-container">
                        {/* 4.1. Solution Introduction (What is 3Đ?) */}
                        <div id="about-3d" className="zen-about-grid" style={{ marginBottom: '60px' }}>
                            <div className="zen-about-col">
                                <img
                                    src={ABOUT_IMG}
                                    alt="Zen garden & restorative wellness"
                                    className="zen-about-img"
                                    loading="lazy"
                                />
                            </div>

                            <div className="zen-about-col">
                                <span className="zen-eyebrow">
                                    {about.eyebrow || 'Giải Pháp Tự Nhiên'}
                                </span>
                                <h2 className="zen-headline-lg" style={{ marginBottom: '20px' }}>
                                    {about.heading || 'Phương Pháp 3Đ Là Gì?'}
                                </h2>
                                <p className="zen-body-lg" style={{ marginBottom: '20px' }}>
                                    {about.para1 || 'Dựa trên nền tảng triết lý Sivananda với hơn 5,000 năm lịch sử, phương pháp 3Đ tập trung vào việc khôi phục khả năng tự chữa lành của cơ thể thông qua ba trụ cột cốt lõi.'}
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

                        {/* 4.2. Three Golden Pillars */}
                        <div className="zen-section-header" style={{ marginBottom: '40px' }}>
                            <h2 className="zen-headline-lg">
                                {method.heading || '3 Trụ Cột Vàng Cho Sức Khỏe'}
                            </h2>
                            <p className="zen-body-lg">
                                {method.description || 'Khám phá chi tiết cách mỗi trụ cột hoạt động để tái tạo lại sự cân bằng hoàn hảo cho cơ thể bạn.'}
                            </p>
                        </div>

                        <div className="zen-pillars-grid">
                            {/* Pillar 1: Thể Dục ĐÚNG */}
                            <div className="zen-pillar-card zen-pillar-card-clean">
                                <div className="zen-pillar-body">
                                    <div className="zen-pillar-top">
                                        <span className="zen-pillar-number">01</span>
                                        <span className="zen-pillar-tag">Thể Dục ĐÚNG</span>
                                    </div>
                                    <h3 className="zen-headline-md">
                                        {method.items[0]?.title || 'Thể Dục ĐÚNG'}
                                    </h3>
                                    <p className="zen-body-md" style={{ margin: 0 }}>
                                        {method.items[0]?.description || 'Các tư thế vận động kéo giãn và giải tỏa áp lực đĩa đệm, giải phóng tắc nghẽn vùng cổ vai gáy và cột sống nhẹ nhàng.'}
                                    </p>
                                </div>
                            </div>

                            {/* Pillar 2: Hơi Thở ĐÚNG */}
                            <div className="zen-pillar-card zen-pillar-card-clean">
                                <div className="zen-pillar-body">
                                    <div className="zen-pillar-top">
                                        <span className="zen-pillar-number">02</span>
                                        <span className="zen-pillar-tag">Hơi Thở ĐÚNG</span>
                                    </div>
                                    <h3 className="zen-headline-md">
                                        {method.items[1]?.title || 'Hơi Thở ĐÚNG'}
                                    </h3>
                                    <p className="zen-body-md" style={{ margin: 0 }}>
                                        {method.items[1]?.description || 'Kỹ thuật Hơi thở sử dụng tối đa dung tích Phổi, cung cấp đủ Oxy, giảm Stress trong vài phút, tăng Tập trung và cải thiện Giấc ngủ ngay tuần đầu.'}
                                    </p>
                                </div>
                            </div>

                            {/* Pillar 3: Thư Giãn ĐÚNG */}
                            <div className="zen-pillar-card zen-pillar-card-clean">
                                <div className="zen-pillar-body">
                                    <div className="zen-pillar-top">
                                        <span className="zen-pillar-number">03</span>
                                        <span className="zen-pillar-tag">Thư Giãn ĐÚNG</span>
                                    </div>
                                    <h3 className="zen-headline-md">
                                        {method.items[2]?.title || 'Thư Giãn ĐÚNG'}
                                    </h3>
                                    <p className="zen-body-md" style={{ margin: 0 }}>
                                        {method.items[2]?.description || 'Kỹ thuật Thư giãn sâu giải toả Căng thẳng tích tụ, chữa lành tổn thương Thể chất và Tinh thần, cảm nhận sự Tĩnh lặng và Kết nối với Bản thân.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4.3. Trust & Numbers / Expert Section ── */}
                <section id="ve-chung-toi" className="zen-section">
                    <div className="zen-container">
                        <div className="zen-trust-container-full">
                            <div className="zen-section-header" style={{ marginBottom: '40px' }}>
                                <h2 className="zen-headline-lg">
                                    {trust.teacher.title ? trust.teacher.title.toUpperCase() : 'CHUYÊN GIA HƯỚNG DẪN'}
                                </h2>
                            </div>

                            <div className="zen-expert-row-centered">
                                <img
                                    src={EXPERT_IMG}
                                    alt="Chuyên gia hướng dẫn Sivananda"
                                    className="zen-expert-avatar"
                                    loading="lazy"
                                />
                                <div className="zen-expert-info">
                                    <h3 className="zen-headline-md" style={{ marginBottom: '8px' }}>
                                        {trust.teacher.title || 'Chuyên gia hướng dẫn'}
                                    </h3>
                                    <p className="zen-body-md" style={{ marginBottom: '14px', width: '100%', fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.7 }}>
                                        {trust.teacher.bio || 'Được đào tạo và truyền thừa trực tiếp từ Hệ phái Sivananda, chuyên sâu về Vận động Asana, Hít thở Pranayama và Thư giãn Savasana. Hơn 10 năm Kinh nghiệm hướng dẫn Học viên Văn phòng và Người có Bệnh nền tại Việt Nam.'}
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

                {/* ── 4.4. Process Section (4 Steps) ── */}
                <section id="lich-trinh" className="zen-section">
                    <div className="zen-container">
                        <div className="zen-section-header">
                            <h2 className="zen-headline-lg">
                                {steps.heading || 'Hành Trình Bắt Đầu Đơn Giản'}
                            </h2>
                            <p className="zen-body-lg">
                                Chỉ với 4 bước đơn giản để bước vào hành trình 21 ngày chuyển hóa sức khỏe.
                            </p>
                        </div>

                        <div className="zen-steps-container">
                            <div className="zen-steps-line"></div>

                            {/* Step 1 */}
                            <div className="zen-step-col">
                                <div className="zen-step-circle">1</div>
                                <h4>{steps.items[0]?.title ? steps.items[0].title.replace(/^Bước \d+\s*·\s*/, '') : 'Đăng Ký'}</h4>
                                <p>{steps.items[0]?.description || 'Để lại thông tin tham gia Info Session miễn phí.'}</p>
                            </div>

                            {/* Step 2 */}
                            <div className="zen-step-col">
                                <div className="zen-step-circle">2</div>
                                <h4>{steps.items[1]?.title ? steps.items[1].title.replace(/^Bước \d+\s*·\s*/, '') : 'Tham Gia'}</h4>
                                <p>{steps.items[1]?.description || 'Dự buổi tư vấn để hiểu rõ phương pháp 3Đ.'}</p>
                            </div>

                            {/* Step 3 */}
                            <div className="zen-step-col">
                                <div className="zen-step-circle">3</div>
                                <h4>{steps.items[2]?.title ? steps.items[2].title.replace(/^Bước \d+\s*·\s*/, '') : 'Nhận Lịch'}</h4>
                                <p>{steps.items[2]?.description || 'Chọn khung giờ và hình thức học phù hợp.'}</p>
                            </div>

                            {/* Step 4 */}
                            <div className="zen-step-col">
                                <div className="zen-step-circle">4</div>
                                <h4>{steps.items[3]?.title ? steps.items[3].title.replace(/^Bước \d+\s*·\s*/, '') : 'Bắt Đầu'}</h4>
                                <p>{steps.items[3]?.description || 'Chính thức bắt đầu hành trình 21 ngày phục hồi.'}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 5. Hỏi · Đáp Section (FAQ) ── */}
                <section id="faq" className="zen-section">
                    <div className="zen-container">
                        <div className="zen-section-header">
                            <h2 className="zen-headline-lg">
                                {faq.heading || 'Giải đáp thắc mắc'}
                            </h2>
                            <p className="zen-body-lg">
                                Những câu hỏi thường gặp về chương trình 21 ngày Zen.
                            </p>
                        </div>

                        <div className="zen-faq-wrap">
                            {faq.items.map((faqItem, idx) => (
                                <div key={idx} className="zen-faq-row">
                                    <button
                                        type="button"
                                        className="zen-faq-btn"
                                        onClick={() => toggleFaq(idx)}
                                    >
                                        <span>{faqItem.question}</span>
                                        <Plus
                                            className={`zen-faq-icon ${activeFaq === idx ? 'open' : ''}`}
                                        />
                                    </button>
                                    {activeFaq === idx && (
                                        <div className="zen-faq-ans">
                                            {faqItem.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
