import React from "react";
import backgroundVideo from "/images/aboutus/Bg.mp4";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  const paragraphs = [
    "Welcome to EcoBliss, where nature’s tranquility meets the convenience of online shopping. Founded with a passion for bringing the calming essence of greenery into everyday spaces, EcoBliss is your go-to destination for a wide range of plants, from vibrant flowers to medicinal herbs, all delivered right to your doorstep.",
    "At EcoBliss, we believe that nurturing plants shouldn’t just be a task—it should be a delightful and serene experience. Our thoughtfully designed, easy-to-navigate platform allows you to explore our curated plant collection with ease. Each plant is selected for its unique ability to bring beauty, freshness, and a sense of peace into your home.",
    "Our goal is to make the process of greening your surroundings simple, enjoyable, and stress-free, encouraging our customers to return for a rejuvenating experience every time. At EcoBliss, we’re dedicated to fostering a love for nature, one plant at a time. Let us help you create your own slice of paradise, right at home.",
  ];
  return (
    <div className={styles.videoBackground}>
      <video autoPlay loop muted className={styles.vdeo}>
        <source src={backgroundVideo} type="video/mp4"></source>
      </video>
      <div className={styles.videooverlay}></div>
      <div className={styles.content}>
        <h2 className="marcellus text-4xl text-center mb-4">About Us</h2>
        {paragraphs.map((item) => (
          <p className="text-grey petrona text-xl text-justify mb-4">{item}</p>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
