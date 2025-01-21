import React from 'react'
import About1 from "../../assets/img/About1.png";
import About2 from "../../assets/img/About2.png";
import About3 from "../../assets/img/About3.png";
import therapist1 from "../../assets/img/therapist1.png";
import therapist2 from "../../assets/img/therapist2.png";
import therapist3 from "../../assets/img/therapist3.png";

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      <div className="border bg-lime-400 flex flex-col justify-center px-36">
        <img src={About1}
          className="h-2/3 pt-9"
        />
        <div className="flex justify-center gap-x-32 py-10 text-[#2E3538]">
          <div className="max-w-96">
            <h1 className="text-3xl font-bold">Your journey to radiant skin starts here</h1>
            <p className='text-justify'>At Glisten, we blend science, care, and expertise to bring out the best in your skin.</p>
          </div>
          <div className="max-w-52">
            <h1 className="text-3xl font-bold">10+</h1>
            <p>Years providing expert skincare solutions.</p>
          </div>
        </div>
      </div>
      <div className="px-36 py-14">
        <div className="flex flex-col justify-center px-24">
          <h1 className="text-2xl font-bold text-start px-40 pb-4">Who we are</h1>
          <p className="px-40 text-justify">
            At Glisten, we’re passionate about helping you achieve your skin goals. Our team of skincare experts combines
            cutting-edge treatments with a personalized approach to deliver visible, lasting results. Whether you’re looking for
            hydration, rejuvenation, or a tailored solution to specific concerns, we’re here to guide you every step of the way.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 justify-center px-32 py-12 mx-28 gap-x-10">
        <div className="flex flex-col justify-center pl-40 col-span-6">
          <h1 className="text-2xl font-bold text-start pb-4">Our mission: your confidence</h1>
          <p className="pb-4 text-justify">We believe that great skin is the foundation of self-confidence. </p>
          <p className="pb-4 text-justify">Our mission is to empower you with the knowledge, tools, and treatments you need to feel your best inside and out.</p>
        </div>
        <div className="col-span-6">
          <img src={About2}
            className="object-cover w-2/3" />
        </div>
      </div>
      <div className="grid grid-cols-12 justify-center px-32 py-14 mx-24">
        <div className="col-span-6 pl-44">
          <img src={About3}
            className="object-cover w-[90%]"/>
        </div>
        <div className="flex flex-col justify-center col-span-6 max-w-[350px]">
          <h1 className="text-2xl font-bold text-start pb-4">Our mission: your confidence</h1>
          <p className="pb-4 text-justify">We believe that great skin is the foundation of self-confidence. </p>
          <p className="pb-4 text-justify">Our mission is to empower you with the knowledge, tools, and treatments you need to feel your best inside and out.</p>
        </div>
      </div>
      <div className="grid justify-center px-32 mx-24">
        <h1 className="text-2xl font-bold text-start pb-4">Our skincare experts</h1>
        <div className="grid grid-cols-3">
          <img src={therapist1} className=""/>
          <img src={therapist2}/>
          <img src={therapist3}/>
        </div>
        <button className="">meet our team</button>
      </div>

    </div>
  )
}
