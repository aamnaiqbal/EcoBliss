import React from "react";
import Logo from "/images/Logo.png"
const Footer = () => {
  return (
    <footer className="footer bg-bgSky petrona py-10 max-w-screen-2xl container mx-auto lg:px-16 font-medium sm:text-md text-lg px-4">
      <aside>
        <p className="marcellus text-lg">
        <img src={Logo} alt="EcoBliss" className="md:h-20 h-16"/>
          {/* <br /> */}
          <span className="petrona sm:text-sm text-md italic">Your favourite online nursery since 1992</span>
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">FAQ</a>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
