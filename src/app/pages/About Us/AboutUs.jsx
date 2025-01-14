import React from 'react'
import About1 from "../../assets/img/About1.png";

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      <div className="border bg-lime-400 flex flex-col justify-center px-36">
        <img src={About1}
          className="h-2/3  pt-9"
        />
        <div className="flex justify-center gap-x-32 py-10 text-[#2E3538]">
          <div className="max-w-96">
            <h1 className="text-3xl font-bold">Your journey to radiant skin starts here</h1>
            <p>At Glisten, we blend science, care, and expertise to bring out the best in your skin.</p>
          </div>
          <div className="max-w-52">
            <h1 className="text-3xl font-bold">10+</h1>
            <p>Years providing expert skincare solutions.</p>
          </div>
        </div>
      </div>
      <div className="px-36 py-20">
        <div className="flex flex-col justify-center px-24">
          <h1 className="text-3xl font-bold text-start px-40 pb-4">Who we are</h1>
          <p className="px-40">
            At Glisten, we’re passionate about helping you achieve your skin goals. Our team of skincare experts combines
            cutting-edge treatments with a personalized approach to deliver visible, lasting results. Whether you’re looking for
            hydration, rejuvenation, or a tailored solution to specific concerns, we’re here to guide you every step of the way.
          </p>
        </div>
      </div>
      <div>
        
      </div>

    </div>
  )
}
