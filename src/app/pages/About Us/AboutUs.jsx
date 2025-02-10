import React from 'react';
import About1 from "../../assets/img/About1.png";
import About2 from "../../assets/img/About2.png";
import About3 from "../../assets/img/About3.png";
import therapist1 from "../../assets/img/therapist1.png";
import therapist2 from "../../assets/img/therapist2.png";
import therapist3 from "../../assets/img/therapist3.png";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5eb] to-[#f0e4d7] text-gray-800">
      {/* Hero Section */}
      <div className="flex flex-col items-center bg-[#f9f5eb] py-16 px-8 shadow-sm">
        <img src={About1} alt="About" className="w-full max-w-4xl rounded-lg mb-8" />
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your journey to radiant skin starts here</h1>
          <p className="text-lg text-gray-700">At Glisten, we blend science, care, and expertise to bring out the best in your skin.</p>
        </div>
        <div className="flex justify-center gap-20 mt-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-600">10+</h2>
            <p className="text-gray-700">Years providing expert skincare solutions</p>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="py-16 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
          <p className="text-lg text-gray-700">
            At Glisten, we’re passionate about helping you achieve your skin goals. Our team of skincare experts combines
            cutting-edge treatments with a personalized approach to deliver visible, lasting results.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 px-8 bg-[#f4ede4]">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our mission: your confidence</h2>
          <p className="text-lg text-gray-700 mb-4">
            We believe that great skin is the foundation of self-confidence. Our mission is to empower you with the knowledge,
            tools, and treatments you need to feel your best inside and out.
          </p>
        </div>
        <div>
          <img src={About2} alt="Mission" className="rounded-lg shadow-md" />
        </div>
      </div>

      {/* Second Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 px-8">
        <div>
          <img src={About3} alt="Our Vision" className="rounded-lg shadow-md" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700 mb-4">
            We are dedicated to providing personalized skincare solutions to help you achieve your healthiest, most radiant skin.
          </p>
        </div>
      </div>

      {/* Skincare Experts Section */}
      <div className="py-16 px-8 bg-[#f9f5eb]">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Skincare Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img src={therapist1} alt="Therapist 1" className="rounded-full w-48 h-48 mb-4 shadow-md" />
            <h3 className="text-xl font-semibold text-gray-800">Therapist 1</h3>
            <p className="text-gray-700 text-center">Expert in facial treatments and skincare routines.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={therapist2} alt="Therapist 2" className="rounded-full w-48 h-48 mb-4 shadow-md" />
            <h3 className="text-xl font-semibold text-gray-800">Therapist 2</h3>
            <p className="text-gray-700 text-center">Specialist in acne treatment and skin rejuvenation.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={therapist3} alt="Therapist 3" className="rounded-full w-48 h-48 mb-4 shadow-md" />
            <h3 className="text-xl font-semibold text-gray-800">Therapist 3</h3>
            <p className="text-gray-700 text-center">Professional in anti-aging treatments and skincare advice.</p>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button className="bg-transparent text-black px-8 py-2 rounded-full border border-green-700 hover:bg-[#e9f6ed] transition">
            Meet Our Team
          </button>
        </div>
      </div>
    </div>
  );
}
