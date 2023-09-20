import React from 'react';
import "./Profile.css";

function ContactUs() {
  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <p>If you have any questions or inquiries, please feel free to reach out to us:</p>
      <ul>
        <li>
          WhatsApp Number: <a href="https://wa.me/1234567890">1234567890</a>
        </li>
        <li>
          Contact Number: <a href="tel:+1122334455">+1122334455</a>
        </li>
        <li>
          Email: <a href="mailto:contact@example.com">contact@example.com</a>
        </li>
      </ul>
    </div>
  );
}

export default ContactUs;
