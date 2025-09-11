// WhatsAppPlug.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
const WhatsAppPlug = ({
  phone = "919999999999",
  message = "Hello! I saw your website and need help.",
}) => {
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        zIndex: 1000,
        width: "50px",
        height: "50px",
        borderRadius: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#25D366",
        color: "#fff",
        boxShadow: "0 6px 18px rgba(0,0,0,0.9)",
        textDecoration: "none",
      }}
    >
      <FaWhatsapp size={30}/>
    </a>
  );
};

export default WhatsAppPlug;
