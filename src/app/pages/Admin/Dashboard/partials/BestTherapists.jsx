import React from "react";

export default function BestTherapists() {
    const therapists = [
        { id: 1, name: "Anna Johnson", rating: "4.9", reviews: 120 },
        { id: 2, name: "John Doe", rating: "4.8", reviews: 100 },
        { id: 3, name: "Maria Lopez", rating: "4.7", reviews: 90 },
        { id: 4, name: "Emily Davis", rating: "4.6", reviews: 80 },
        { id: 5, name: "Michael Brown", rating: "4.5", reviews: 70 },
    ];

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-bold mb-4">Best Therapists</h3>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-left p-2 border-b">#</th>
                        <th className="text-left p-2 border-b">Name</th>
                        <th className="text-left p-2 border-b">Rating</th>
                        <th className="text-left p-2 border-b">Reviews</th>
                    </tr>
                </thead>
                <tbody>
                    {therapists.map((therapist) => (
                        <tr key={therapist.id}>
                            <td className="p-2 border-b">{therapist.id}</td>
                            <td className="p-2 border-b">{therapist.name}</td>
                            <td className="p-2 border-b">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm">
                                    {therapist.rating} ★
                                </span>
                            </td>
                            <td className="p-2 border-b">{therapist.reviews} reviews</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}