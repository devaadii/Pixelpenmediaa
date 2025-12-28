import React, { useState } from "react";
import "./FAQSection.css";

const faqs = [
  {
    id: 1,
    question: "What makes Pixelpen different from typical freelancers or agencies?",
    answer:"PixelPen Media doesn’t edit videos—we engineer attention. Freelancers follow briefs. We build brands. No fluff. No templates. Just content that hits different."

  },  {
    id: 2,
    question: "What’s Pixelpen’s unfair advantage?"
,
    answer: "We speak both languages—creative and strategy. We don’t just “make things look good”—we make them work in the wild."
  },


  {
    id: 3,
    question: "How do I get started?",
    answer: "Simple. Book a call—no forms, no fluff—just the right questions, the right plan, and scroll-stopping content from your raw idea."
  },
  {
    id: 4,
    question: "Can you make us go viral?",
    answer: "We don’t chase trends; we create content worth watching. Virality isn’t magic—it’s precision, timing, and taste. We bring all three."
  },


];

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
      <h2 className="heading">Faq's</h2>
        <p className="subheading" style={{marginBottom:"0"}}>We’ve Got Answers</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="faq-item" onClick={() => toggle(faq.id)}>
       <div className="faq-question">
  <span className="faq-index">Q{index + 1}</span>

  <div className="faq-content">
    <span className="faq">{faq.question}</span>
    {openId === faq.id && (
      <div className="faq-answer">{faq.answer}</div>
    )}
  </div>

  <span className="faq-icon">{openId === faq.id ? "−" : "+"}</span>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}