import React, { useState } from "react";
import "./FAQSection.css";

const faqs = [
  {
    id: 1,
    question: "What makes Pixelpen different from typical freelancers or agencies?",
    answer:"We’re the fix when creators & brands outgrow average editors."

  },  {
    id: 2,
    question: "What’s Pixelpen’s unfair advantage?"
,
    answer: "We think like marketers, edit like filmmakers, and deliver like clockwork."
  },


  {
    id: 3,
    question: "How do I get started?",
    answer: "Simple. Reach out, tell us what you need, and we’ll take it from there. No forms. No waiting games."
  },
  {
    id: 4,
    question: "Can you make us go viral?",
    answer: "We don’t do lottery tickets. We do consistency that wins."
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
        <p className="subheading" style={{marginBottom:"0"}}>We figured you’d ask.</p>
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