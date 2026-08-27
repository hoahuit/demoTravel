import React, { useState, useEffect } from 'react';
import { FAQ_DATA, syncFaqDataFromApi, FAQItem } from '../data/faqData';
import { fetchSectionItemsApi } from '../services/apiService';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import './FAQPage.css';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>(FAQ_DATA);

  useEffect(() => {
    fetchSectionItemsApi('faq').then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncFaqDataFromApi(data);
        setFaqs([...data]);
      }
    });
  }, []);

  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaqs = faqs.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="faq-page-root">
      {/* Hero */}
      <section className="faq-hero">
        <img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=2560&auto=format&fit=crop"
          alt="FAQ"
          className="faq-hero-img"
        />
        <div className="faq-hero-overlay" />
        <div className="faq-hero-content">
          <span className="faq-badge">
            SUPPORT & FAQ • GIẢI ĐÁP THẮC MẮC
          </span>
          <h1 className="faq-headline">
            Câu Hỏi Thường Gặp
          </h1>
          <p className="faq-subheadline">
            Giải đáp 100% thắc mắc về thủ tục Visa, quy trình đặt tour, bảo hiểm & chính sách hủy tour
          </p>
        </div>
      </section>

      {/* FAQ Search & Accordion */}
      <div className="faq-container">
        <div className="faq-search-wrap">
          <Search size={20} className="faq-search-icon" />
          <input
            type="text"
            placeholder="Nhập từ khóa tìm kiếm (Ví dụ: Visa, Hoàn tiền, Khách sạn...)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="faq-search-input"
          />
        </div>

        <div className="faq-list">
          {filteredFaqs.map(faq => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="faq-card">
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="faq-toggle-btn"
                >
                  <span className="faq-question-label">
                    <HelpCircle size={20} className="faq-question-icon" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`faq-chevron ${isOpen ? 'open' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="faq-answer-body">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
