import React from "react";

const therapists = [
  {
    id: 1,
    name: "Jane Doe",
    specialization: "Facial Treatments",
    experience: "5 years",
    rating: 4.8,
    profileImage:
      "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "John Smith",
    specialization: "Massage Therapy",
    experience: "8 years",
    rating: 4.9,
    profileImage:
      "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Emily Davis",
    specialization: "Acne Treatment",
    experience: "3 years",
    rating: 4.7,
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScNWHfi73lAts8OLrsNtM6dmmscx6cSWbLkA&s",
  },
  {
    id: 4,
    name: "Michael Johnson",
    specialization: "Skin Whitening",
    experience: "6 years",
    rating: 4.6,
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScNWHfi73lAts8OLrsNtM6dmmscx6cSWbLkA&s",
  },
  {
    id: 5,
    name: "Sarah Williams",
    specialization: "Anti-Aging Therapy",
    experience: "4 years",
    rating: 4.5,
    profileImage:
      "https://via.placeholder.com/100",
  },
];

export default function ViewTherapist() {
  return (
    <div className="p-6 lg:p-24 md:p-16 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Our Therapists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {therapists.map((therapist) => (
          <div
            key={therapist.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={therapist.profileImage}
              alt={therapist.name}
              className="object-cover min-h-52 rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-700">
              {therapist.name}
            </h2>
            <p className="text-sm text-gray-500">
              Specialization: {therapist.specialization}
            </p>
            <p className="text-sm text-gray-500">
              Experience: {therapist.experience}
            </p>
            <p className="text-sm text-yellow-500 font-medium">
              Rating: {therapist.rating}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}