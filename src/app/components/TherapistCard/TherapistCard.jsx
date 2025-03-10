import React from 'react';
import { Link } from 'react-router-dom';

export default function TherapistCard(therapist) {
    return(
    <Link to={`/therapists/${therapist.id}`} key={therapist.id}>
        <div className="bg-sky-50 shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition">
            <img
                src={therapist.profileImage}
                alt={therapist.fullName}
                className="w-full h-52 object-cover object-top rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-700">{therapist.name}</h2>
            <p className="text-sm text-gray-500">Specialization: {therapist.specialization}</p>
            <p className="text-sm text-gray-500">Experience: {therapist.experience}</p>
            <p className="text-sm text-yellow-500 font-medium">Rating: {therapist.rating}</p>
        </div>
    </Link>)
};