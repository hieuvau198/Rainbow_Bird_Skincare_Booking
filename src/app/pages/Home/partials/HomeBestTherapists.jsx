import React from 'react';

export default function HomeBestTherapists() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Meet Our Best Therapists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Therapist 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="https://media.istockphoto.com/id/1603361100/vi/anh/ch%C3%A2n-dung-ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-da-%C4%91en-trong-hi%E1%BB%87u-thu%E1%BB%91c-v%E1%BB%9Bi-m%C3%A1y-t%C3%ADnh-b%E1%BA%A3ng-n%E1%BB%A5-c%C6%B0%E1%BB%9Di-v%C3%A0-danh-s%C3%A1ch-ki%E1%BB%83m-k%C3%AA.jpg?s=612x612&w=0&k=20&c=4RY9cET-WW2tb20sI0-ycGEArZvQ2uvHJ5dTwcvFD6A="
              alt="Therapist 1"
              className="w-32 h-32 rounded-full mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">John Doe</h3>
            <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
              Book Now
            </button>
          </div>

          {/* Therapist 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="https://thumb.photo-ac.com/e1/e1202a04a929e3c76a66f23e64fa565d_t.jpeg"
              alt="Therapist 2"
              className="w-32 h-32 rounded-full mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Jane Smith</h3>
            <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
              Book Now
            </button>
          </div>

          {/* Therapist 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="https://watermark.lovepik.com/photo/20211204/large/lovepik-middle-aged-male-doctor-portrait-picture_501507626.jpg"
              alt="Therapist 3"
              className="w-32 h-32 rounded-full mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Emily Clark</h3>
            <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
