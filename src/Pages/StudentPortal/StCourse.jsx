import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Store/store';
import { NavLink } from 'react-router-dom';

function StCourse() {
  const [course, setCourse] = useState({});
  const { studentId, token } = useContext(DataContext);
console.log(studentId)
  useEffect(() => {
    const courseEnrolled = async () => {
      const courseDetail = await fetch(`http://localhost:3000/api/student/${studentId}/course-details`, {
        headers: {
          'Content-Type': 'application/json', // Set content type
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
      });
      const detailData = await courseDetail.json();
      setCourse(detailData);
    };

    courseEnrolled();
  }, [studentId]);

 console.log(course, "course")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); 
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Course: {course.courseName}</h1>
          <p className="text-gray-600 text-sm">Your Course Details</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Enrollment Date</h2>
            <p className="text-gray-700">{formatDate(course.enrollmentDate)}</p>
          </div>
          <div className="flex justify-between bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Course End Date</h2>
            <p className="text-gray-700">{formatDate(course.courseEndDate)}</p>
          </div>
          <div className="flex justify-between bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Total Fee</h2>
            <p className="text-gray-700">₹ {course.totalFee}</p>
          </div>
          <div className="flex justify-between bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Paid Fee</h2>
            <p className="text-gray-700">₹ {course.paidFee}</p>
          </div>
          <div className="flex justify-between bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Pending Fee</h2>
            <p className="text-red-600">₹ {course.pendingFee}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition">
            <NavLink to={"/payfees"}>Pay Now</NavLink>
          </button>

          <button className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition">
            <NavLink to={"/past-fees"}>View Payments</NavLink>
          </button>
        </div>
      </div>
    </>
  );
}

export default StCourse;
