import React, { useEffect, useState } from "react";
import getBestTherapists from "../../../../modules/Admin/Dashboard/getBestTherapists";
import Loading from "../../../../components/Loading/index";

export default function BestTherapists() {
    const [Therapists, setTherapists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBestTherapists();
                const topTherapists = data
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5); 
                setTherapists(topTherapists);
            } catch (error) {
                setError("Failed to load Top Therapists. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (loading) {
        return <><Loading /></>;
    }

    return (
        <div className="p-4 bg-white rounded-2xl shadow-md">
            <h3 className="font-bold mb-4">Top Rated Therapists</h3>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-left p-2 border-b">#</th>
                        <th className="text-left p-2 border-b">Name</th>
                        <th className="text-left p-2 border-b">Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {Therapists.map((therapist, index) => (
                        <tr key={therapist.therapistId}>
                            <td className="p-2 border-b">{index + 1}</td>
                            <td className="p-2 border-b">{therapist.user.fullName}</td>
                            <td className="p-2 border-b">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm">
                                    {therapist.rating} ★
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
