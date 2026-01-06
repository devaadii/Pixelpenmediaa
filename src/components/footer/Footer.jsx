import React from 'react';
import './Footer.css';
import logo from "../../assets/pixelpen logo bw-cropped.svg"

import { FaTwitter, FaFacebookF, FaInstagram,FaLinkedin, } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Get Started</h4>
            <ul>
              <li>Plans & Pricing</li>
              <li>Book a Call</li>
              <li>Request a Custom Quote</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li style={{color:"white",fontStyle:"bold"}}>Work with Us</li>
              <li 
  onClick={() => {
    window.location.href = "mailto:info@pixelpen.in?subject=Video Editing Inquiry – Pixelpen Media&body=Hi Pixelpen Media team,";
  }}
  style={{ cursor: 'pointer' }}
>
  Contact Us
</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li>Blogs / Insights</li>
              <li>FAQ</li>
             
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
               <a style={{textDecoration:"none"}} href='https://docs.google.com/document/d/1YpoOrvIp8g4RjUpOg7vJ25KNSycRcZ-Fg-Xa2Q31pjM/edit?tab=t.0#heading=h.81j7ctahqlmo'>
              <li>Terms & Conditions*</li></a>
              <a style={{textDecoration:"none"}} href='https://docs.google.com/document/d/1McgvKduaXe0BBJmv752i3JC0icPvxT_ftIvLMlCgw0s/edit?tab=t.0#heading=h.lxq7gd2poa2f'>
              <li>Privacy Policy</li></a>
              <a style={{textDecoration:"none"}} href='https://docs.google.com/document/d/1k4G8E08qQh5mNZkSiTlVg0XQj0KSOhQ-zZrs69dhvto/edit?tab=t.0#heading=h.mvm4x2ret5bz'>
              <li>Refund & Cancelation Policy</li></a>
            </ul>
          </div>

          <a
  href="https://x.com/PixelpenMedia?t=t0avYlK-5KmlgLNItkvghQ&s=09"
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration: 'none', color: 'inherit' }}
>
          <div className="footer-tweet">
            <div className="tweet-header">
              <div className="tweet-avatar"><img src={logo} /></div>
              <div className="tweet-user">
                <strong>Pixelpen Media</strong>
                <span>@PixelpenMedia</span>
              </div>
              <div className="tweet-icon">
                <FaTwitter />
              </div>
            </div>
            <p className="tweet-text">
            Pixel perfect isn’t a style. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br/>It’s our standard.
            </p>
          </div></a>
        </div>

        <div className="footer-bottom">
          <div id='copyright'style={{color:"white"}}>
          ©️ 2024 PixelPen Media. All rights reserved.
          </div>
          <div className="footer-socials">
            <div className="social-icon">
              <a href='https://www.instagram.com/pixelpen.in?igsh=MTM2MW9paGp5MnltbA==' style={{ textDecoration : 'none', color:'inherit'}}>
              <FaInstagram /></a>
            </div>
            <div className="social-icon">
  
              <FaLinkedin />
            </div>
            <div className="social-icon">
            <a href='https://x.com/PixelpenMedia?t=t0avYlK-5KmlgLNItkvghQ&s=09'  style={{ textDecoration: 'none', color: 'inherit' }}>
           <FaXTwitter /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;