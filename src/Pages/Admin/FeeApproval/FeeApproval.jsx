import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../Store/store';

const FeeApproval = () => {
    const [feeCollections, setFeeCollections] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'payment_date', direction: 'asc' });
    const [selectedIds, setSelectedIds] = useState([]);
    const { token } = useContext(DataContext);

    // Fetch all pending fee collections from the backend
    const fetchPendingFeeCollections = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/fee-collection/pending/fee`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFeeCollections(data.pendingFeeCollections);
            console.log(data, "data")
        } catch (error) {
            console.error("Error fetching fee collections:", error);
            alert("Could not fetch fee collections. Please try again.");
        }
    };

    useEffect(() => {
        fetchPendingFeeCollections();
    }, []);

    // Approve selected fee collections
    const approveSelectedFeeCollections = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/fee-collection/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ feeCollectionIds: selectedIds }),
            });

            if (!response.ok) {
                throw new Error("Failed to approve fee collections");
            }

            alert("Selected fee collections approved successfully.");
            fetchPendingFeeCollections(); // Refresh the list
            setSelectedIds([]); // Reset selection
        } catch (error) {
            console.error("Error approving fee collections:", error);
            alert("Failed to approve selected fee collections.");
        }
    };

    // Toggle selection of a fee collection by ID
    const toggleSelection = (id) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((itemId) => itemId !== id)
                : [...prevSelectedIds, id]
        );
    };

    // Sort the fee collections
    const sortFeeCollections = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedData = [...feeCollections].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFeeCollections(sortedData);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Pending Fee Collections</h1>
            <button
                className={`bg-blue-600 text-white font-bold py-2 px-4 rounded ${selectedIds.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                onClick={approveSelectedFeeCollections}
                disabled={selectedIds.length === 0}
            >
                Approve Selected
            </button>
            <table className="min-w-full bg-white mt-4 border border-gray-200 rounded-lg">
                <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="py-2 px-4 border-b">Select</th>
                        <th className="py-2 px-4 border-b cursor-pointer" onClick={() => sortFeeCollections('student_id')}>Student</th>
                        <th className="py-2 px-4 border-b cursor-pointer" onClick={() => sortFeeCollections('course_id')}>Course</th>
                        <th className="py-2 px-4 border-b cursor-pointer" onClick={() => sortFeeCollections('amount_paid')}>Amount Paid</th>
                        <th className="py-2 px-4 border-b cursor-pointer" onClick={() => sortFeeCollections('payment_date')}>Payment Date</th>
                        <th className="py-2 px-4 border-b">Payment Method</th>
                        <th className="py-2 px-4 border-b">Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {feeCollections.map((fee) => (
                        <tr key={fee._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(fee?._id)}
                                    onChange={() => toggleSelection(fee?._id)}
                                />
                            </td>
                            <td className="py-2 px-4 border-b">{fee?.student_id?.name} </td>
                            <td className="py-2 px-4 border-b">{fee?.course_id?.courseName}</td>
                            <td className="py-2 px-4 border-b">{fee?.amount_paid}</td>
                            <td className="py-2 px-4 border-b">{new Date(fee?.payment_date).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{fee?.payment_method}</td>
                            <td className="py-2 px-4 border-b">{fee?.payment_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeeApproval;
