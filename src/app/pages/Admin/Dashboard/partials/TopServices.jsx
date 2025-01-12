import React from "react";

export default function TopServices() {
    const services = [
        { id: 1, name: "Facial Treatment", popularity: 85 },
        { id: 2, name: "Acne Removal", popularity: 75 },
        { id: 3, name: "Anti-Aging", popularity: 65 },
        { id: 4, name: "Skin Whitening", popularity: 50 },
        { id: 5, name: "Laser Therapy", popularity: 45 },
    ];

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-bold mb-4">Top Services</h3>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-left p-2 border-b w-12">#</th>
                        <th className="text-left p-2 border-b w-1/4">Service</th>
                        <th className="text-left p-2 border-b w-3/4">Popularity</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td className="p-2 border-b">{service.id}</td>
                            <td className="p-2 border-b truncate">{service.name}</td>
                            <td className="p-2 border-b">
                                <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2 relative mr-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full absolute"
                                            style={{ width: `${service.popularity}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-gray-600">{service.popularity}%</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}