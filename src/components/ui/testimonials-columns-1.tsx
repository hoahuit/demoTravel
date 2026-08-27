import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import './testimonials-columns-1.css';

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
    <div className={`testimonials-column-wrapper ${props.className || ''}`}>
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
        className="testimonials-motion-list"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div key={i} className="testimonial-quote-card">
                  {/* 5-Star Rating */}
                  <div className="testimonial-quote-stars">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} size={15} color="#e5c158" fill="#e5c158" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="testimonial-quote-text">
                    “{text}”
                  </p>

                  {/* Author Info */}
                  <div className="testimonial-author-row">
                    <img
                      src={image}
                      alt={name}
                      className="testimonial-author-avatar"
                    />
                    <div className="testimonial-author-meta">
                      <div className="testimonial-author-name">
                        {name}
                        <CheckCircle2 size={14} color="#2d5a36" className="testimonial-author-name-icon" />
                      </div>
                      <div className="testimonial-author-role">
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
