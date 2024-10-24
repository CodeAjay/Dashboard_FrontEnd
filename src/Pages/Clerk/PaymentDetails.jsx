import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Store/store';

function PaymentDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state
  const {token} = useContext(DataContext); // Replace with actual token or fetch it from state/context

  useEffect(() => {
    const fetchFeeDetails = async () => {
      setLoading(true);
      try {
        const feeData = await fetch(
          `http://localhost:3000/clerk/fee-collection/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Ensure you have a valid token
            },
          }
        );
        const finalFeeData = await feeData.json();
        setDetails(finalFeeData || []); // Safeguard against empty response
      } catch (error) {
        console.error('Error fetching fee details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeDetails();

    console.log(details, "details")
  }, [id, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto mt-10">
  {/* Student Details */}
  <div className="mb-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Student Details</h2>
    <div className="flex items-center mb-4">
      <img
        src={details?.student?.imageUrl}
        alt="Student Avatar"
        className="w-20 h-20 rounded-full mr-4"
      />
      <div>
        <p className="text-lg font-medium text-gray-900">Name: {details?.student?.name}</p>
        <p className="text-gray-600">Email: {details?.student?.email}</p>
        <p className="text-gray-600">Institute: {details?.student?.institute_id?.institute_name}</p>
        <p className="text-gray-600">Course: {details?.student?.course_id?.courseName}</p>
        <p className="text-gray-600">Enrollment Date: {details?.student?.enrollment_date}</p>
      </div>
    </div>
  </div>

  {/* Fee Details */}
  <div>
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fee Details</h2>
    {details?.feeDetails?.length > 0 ? (
      details.feeDetails.map((item, index) => (
        <div
          key={index}
          className={`p-4 mb-4 border-l-4 rounded-lg ${
            item.feePaid ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'
          }`}
        >
          <p className="text-lg font-semibold">
            Month: <span className="font-normal">{item.month}</span>
          </p>
          <p className="text-lg">
            Status:{' '}
            <span className={`font-semibold ${item.feePaid ? 'text-green-600' : 'text-red-600'}`}>
              {item.feePaid ? 'Paid' : 'Not Paid'}
            </span>
          </p>
          <p className="text-lg">
            Amount Paid: <span className="font-semibold text-gray-800">₹{item.amountPaid}</span>
          </p>
          <p className="text-lg">
            Pending Fee: <span className="font-semibold text-gray-800">₹{item.pendingFee}</span>
          </p>
        </div>
      ))
    ) : (
      <p className="text-lg text-gray-600">No payment details found.</p>
    )}
  </div>
</div>

  );
}

export default PaymentDetails;
