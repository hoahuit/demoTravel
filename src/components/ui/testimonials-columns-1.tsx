import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export interface TestimonialsColumnProps {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}

export const TestimonialsColumn: React.FC<TestimonialsColumnProps> = (props) => {
  return (
    <div className={props.className} style={{ width: '100%', minWidth: 0 }}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 16,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          paddingBottom: '24px',
          width: '100%'
        }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  key={i}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(74, 124, 89, 0.2)',
                    borderRadius: '24px',
                    padding: '28px 24px',
                    boxShadow: '0 10px 30px rgba(22, 48, 29, 0.05)',
                    width: '100%',
                    boxSizing: 'border-box',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  {/* 5-Star Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} size={15} color="#e5c158" fill="#e5c158" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p style={{
                    fontSize: '0.96rem',
                    lineHeight: '1.65',
                    color: '#142619',
                    fontWeight: '400',
                    margin: '0 0 20px 0'
                  }}>
                    “{text}”
                  </p>

                  {/* Author Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(74, 124, 89, 0.12)'
                  }}>
                    <img
                      src={image}
                      alt={name}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1.5px solid #2d5a36',
                        flexShrink: 0
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.92rem',
                        fontWeight: '700',
                        color: '#142619',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {name}
                        <CheckCircle2 size={14} color="#2d5a36" style={{ flexShrink: 0 }} />
                      </div>
                      <div style={{
                        fontSize: '0.78rem',
                        color: '#527059',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
