import React from 'react';
import TherapistCard from '../../../components/TherapistCard';
import mockTherapists from '../../Customer/ViewTherapist/mock_therapist.json';

export default function HomeBestTherapists() {
  return (
    <div className="p-6 lg:p-24 md:p-16 bg-green-100/70 min-h-screen flex items-center justify-center">
      {/* Container bao quanh phần Our Therapists và danh sách therapists */}
      <div className="p-10 border-2 border-green-200 bg-green-200 rounded-md shadow-lg md:p-10 w-full lg:border-4 max-w-[1250px]">
        {/* Tiêu đề được làm nổi bật với kích cỡ chữ lớn và border dưới */}
        <h1 className="text-3xl text-center font-bold font-Arial mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">
          OUR THERAPISTS
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTherapists.slice(0, 4).map((therapist, index) => (
            <div
              key={therapist.id}
              className="transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fadeIn"
              style={{ animationDelay: `${index * 200}ms` }} // Tạo hiệu ứng stagger cho các thẻ
            >
              <TherapistCard {...therapist} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
