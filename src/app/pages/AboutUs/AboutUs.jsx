import React from 'react';
import About1 from "../../assets/img/About1.png";
import About2 from "../../assets/img/About2.png";
import About3 from "../../assets/img/About3.png";
import therapist1 from "../../assets/img/therapist1.png";
import therapist2 from "../../assets/img/therapist2.png";
import therapist3 from "../../assets/img/therapist3.png";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#f9f5eb] text-gray-800">
      {/* Navigation Bar */}
      <div className="flex items-center text-gray-600 text-sm px-8 pt-6">
        <Link to="/" className="flex items-center gap-1 text-lime-300 hover:text-lime-500">
          <AiOutlineHome className="text-lg" /> Home
        </Link>
        <span className="mx-2 text-gray-400"> / </span>
        <span className="font-semibold text-gray-900">About Us</span>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center bg-[#f9f5eb] py-16 px-8 shadow-sm">
        <div className="max-w-6xl mx-auto"> {/* Added a container for better responsiveness */}
          <img src={About1} alt="About" className="w-full rounded-lg mb-8 object-cover"  style={{maxHeight:"500px"}}/> {/* Added object-cover and max-height for image control */}
          <div className="text-center"> {/* Removed max-w-2xl for full width text */}
            <h1 className="text-5xl font-bold text-gray-900 mb-8 mt-10">Your journey to radiant skin starts here</h1> {/* Changed title to "About Us" */}
            <p className="text-lg text-gray-700 leading-relaxed"> {/* Added leading-relaxed for better readability */}
            Your journey to radiant skin starts here. At Glisten, we blend science, care, and expertise to bring out the best in your skin.  We are dedicated to providing personalized skincare solutions tailored to your unique needs.  Our team of experienced therapists is committed to helping you achieve your skincare goals.  We believe in a holistic approach, combining advanced techniques with a focus on your overall well-being.
            </p>
          </div>
          <div className="flex justify-center gap-20 mt-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-green-600">10+</h2>
              <p className="text-gray-700">Years providing expert skincare solutions</p>
            </div>
            {/* Add more statistics or information here as needed */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-green-600">500+</h2>
              <p className="text-gray-700">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="py-16 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 italic font-serif">Maybe you...</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left text-lg text-gray-700">
            <ul className="list-disc list-inside space-y-4">
              <li>Want to get away from working with insurance companies</li>
              <li>Have an old website that you made yourself, but you’re embarrassed to send people to it</li>
              <li>Don’t get enough clients in your areas of expertise</li>
            </ul>
            <ul className="list-disc list-inside space-y-4">
              <li>Have to see more patients than is comfortable, in order to pay the bills</li>
              <li>Want to start offering online counseling or coaching</li>
              <li>Feel like your practice just isn’t where you want it to be</li>
            </ul>
          </div>

          <div className="py-16 px-8">
            <div className="max-w-6xl mx-auto text-center">
              <h3 className="text-3xl font-serif italic text-gray-800 mb-8">
                But here’s the good news...
              </h3>
              <p className="text-3xl font-light text-gray-800 mb-8">
                Done right, your therapist website can be an{" "}
                <span className="font-bold italic">incredibly</span> powerful tool.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                A well-designed, strategic website is like an awesome office assistant,
                a lead generation tool, and a practice-ambassador all rolled into one!
                Your website can attract the right people, tell them all about how
                awesome you are and how you can help them, and even start the process
                of turning them into real clients, all while you are running your
                business, seeing other clients or even{" "}
                <span className="italic">out enjoying your life!</span>
              </p>
              {/* <button className="bg-transparent text-black px-8 py-2 mt-10 rounded-full border border-green-700 hover:bg-[#e9f6ed] transition">
                Schedule your FREE 30 min call →
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="flex items-center justify-center py-16 px-8 bg-[#f9f5eb]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl items-center">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-handwriting italic text-gray-900 mb-6">
              I’m glad you’re here.
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              I help therapists connect with more people and have a bigger impact on the world through beautiful websites and strategic design.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              I specialize in working with therapists because I know they are good people doing good things, and I can always feel proud of helping their visions come to life.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              I’m a busy mom of four (translation: I multi-task like a BOSS), a nature lover, and a huge fan of The Big Bang Theory. I live in the Washington, DC metro area with my kids, two cats, and an Australian Shepherd who never listens to anything I say.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              I’d love to chat with you! Schedule a <a href="#" className="text-blue-600 underline">discovery call</a> with me so that we can start a conversation.
            </p>
            <button 
              onClick={() => window.location.href = "/services"}
              className="bg-transparent text-black px-8 py-2 mt-10 rounded-full border border-green-700 hover:bg-[#e9f6ed] transition"
            >
              Learn About My Services
              <span className="ml-2">➔</span>
            </button>
          </div>

          {/* Image Content */}
          <div className="relative flex justify-center items-center">
            <div className="absolute top-4 left-4 bg-purple-200 w-full h-full rounded-lg -z-10"></div>
            <img
              src={About2}
              alt="Profile"
              className="rounded-lg shadow-lg w-full max-w-md h-auto"
            />
          </div>
        </div>
      </div>

      {/* Skincare Experts Section */}
      <div className="py-16 px-8 bg-neutral-50">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Our Skincare Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center bg-neutral-50 p-6 rounded-sm">
            <img src={therapist1} alt="Therapist 1" className="rounded-full w-48 h-48 mb-4 shadow-md" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Therapist 1</h3>
            <p className="text-gray-700 text-center mb-4">
              Expert in facial treatments and skincare routines. Passionate about helping clients achieve glowing, healthy skin.
            </p>
            <p className="text-sm text-gray-600 text-center italic">
              "Your skin is unique, and it deserves a personalized approach. I'm here to help you find the perfect skincare solution."
            </p>
          </div>

          <div className="flex flex-col items-center bg-neutral-50 p-6 rounded-lg">
            <img src={therapist2} alt="Therapist 2" className="rounded-full w-48 h-48 mb-4 shadow-md" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Therapist 2</h3>
            <p className="text-gray-700 text-center mb-4">
              Specialist in acne treatment and skin rejuvenation. Known for creating customized skincare plans with real results.
            </p>
            <p className="text-sm text-gray-600 text-center italic">
              "I believe clear skin is achievable for everyone with the right guidance and care."
            </p>
          </div>

          <div className="flex flex-col items-center bg-neutral-50 p-6 rounded-lg">
            <img src={therapist3} alt="Therapist 3" className="rounded-full w-48 h-48 mb-4 shadow-md" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Therapist 3</h3>
            <p className="text-gray-700 text-center mb-4">
              Professional in anti-aging treatments and skincare advice. Helping clients maintain youthful, radiant skin.
            </p>
            <p className="text-sm text-gray-600 text-center italic">
              "Aging is a beautiful process, and I'm here to help you embrace it while looking your best."
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
        <button 
          onClick={() => window.location.href = "/therapists"}
          className="bg-transparent text-black px-8 py-2 mt-10 rounded-full border border-green-700 hover:bg-[#e9f6ed] transition"
        >
          Meet Our Team
        </button>
        </div>
      </div>
    </div>
  );
}
