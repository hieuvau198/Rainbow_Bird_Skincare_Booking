import React from "react";
import { Link } from "react-router-dom";
import { AiTwotonePhone, AiTwotoneMail, AiTwotoneEnvironment } from "react-icons/ai";

export default function Footer() {
  const handleNavigate = () => {
    window.location.href = "/quiz"; // Chuyển hướng đến trang quiz và tải lại trang
  };

  return (
    <footer className="relative bg-gradient-to-l from-lime-200 via-sky-100 to-green-200 dark:bg-slate-600 text-gray-800 py-1 px-6 sm:px-12 lg:px-24">
      {/* Header Section with Image */}
      <div className="relative w-full h-80 mb-4">
        <img
          src="https://media.istockphoto.com/id/698126364/vi/anh/b%C3%A9-g%C3%A1i-%C4%91ang-%C4%91i%E1%BB%81u-tr%E1%BB%8B-x%C6%B0%C6%A1ng-h%C3%A0m.jpg?s=612x612&w=0&k=20&c=70eydRO11LoYsroufOlQqi2Ix2-vDLgg6jYgf9r5Sdk="
          alt="Therapist Session"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-6">
          <h2 className="text-3xl font-bold">Your Path to Mental Wellness</h2>
          <p className="mt-2 max-w-2xl text-lg">
            Struggling with stress, anxiety, or personal challenges? WellnessTherapy connects 
            you with <strong>certified therapists</strong> to provide professional support, anytime, anywhere.
            Book your session today and take the first step towards a <strong>healthier, happier you</strong>.
          </p>
          <button
            onClick={handleNavigate} // Gọi hàm điều hướng & cuộn lên đầu trang
            className="mt-4 px-6 py-3 border border-lime-200 text-white rounded-md hover:bg-lime-300 hover:text-black transition"
          >
            CONTINUE QUIZ
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-black flex items-center justify-center md:justify-start">
            🌿 <span className="ml-2">Prestine Care</span>
          </h3>
          <p className="text-gray-700 leading-relaxed">
            At WellnessTherapy, we connect you with expert therapists to support your mental well-being. 
            Whether you're facing stress, anxiety, or seeking personal growth, our platform makes it easy to find the right care.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Take the first step towards a healthier, happier mind today.
          </p>
        </div>

        {/* Services & Resources */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-black">SERVICES & RESOURCES</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="hover:text-gray-500">Home</Link></li>
            <li><Link to="/about" target="_top" className="hover:text-gray-500">About Us</Link></li>
            <li><Link to="/news" target="_top" className="hover:text-gray-500">News</Link></li>
            <li><Link to="/therapists" target="_top" className="hover:text-gray-500">Our Therapists</Link></li>
            <li><Link to="#" target="_top" className="hover:text-gray-500">Community Support</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-black">CONTACT</h3>
          <div className="space-y-3 text-gray-800">
            <p className="flex items-center justify-center md:justify-start">
              <AiTwotoneEnvironment className="mr-2 text-lg text-green-600" /> 
              <span> <strong>Address:</strong> Tân Lập, Đông Hoà, Dĩ An, Bình Dương</span>
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <AiTwotoneMail className="mr-2 text-lg text-blue-600" /> 
              <span> <strong>Email:</strong> <a href="mailto:hoanthes@gmail.com" className="text-blue-500 hover:underline">hoanthes@gmail.com</a></span>
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <AiTwotonePhone className="mr-2 text-lg text-red-600" /> 
              <span> <strong>Phone:</strong> <a href="tel:0987682972" className="text-red-500 hover:underline">0987682972</a></span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-4 py-3 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PrestineCare. All rights reserved.
      </div>
    </footer>
  );
}
