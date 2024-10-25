import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Store/store";


function PendingFeesStudentsClerk() {
  const [studentPending, setStudentPending] = useState([]);

console.log(studentPending,"studentPending")

  const {token}=useContext(DataContext);

  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0"); // Ensure two digits

  const [penYear, setPenYear] = useState(`${currentYear}-${currentMonth}`);
  // Calculate min value (restrict future dates)
  const minYear = currentYear;
  const minMonth = currentMonth;
  const minDate = `${minYear}-${minMonth}`;

  // Fetch pending fees data
  const pending = async () => {
    try {
      const pendingFees = await fetch(
        `http://localhost:3000/clerk/fee-collection/payment-status/${penYear}`,{
          headers: {
            'Content-Type': 'application/json', // Set content type
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
        }
      );
      const resPending = await pendingFees.json();
      console.log(resPending, "resPending");
      setStudentPending(resPending || []); // Safeguard for no data
    } catch (error) {
      console.error("Error fetching pending fees:", error);
    }
  };

  useEffect(() => {
    pending();
  }, [penYear]);

  return (
    <>
      <input
        type="month"
        value={penYear}
        onChange={(e) => setPenYear(e.target.value)}
        max={minDate}
        placeholder={penYear}
      />
      <div className="flex flex-col">
        <div className="py-2 overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden align-middle shadow sm:rounded-lg border-b border-gray-200 ">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    NAME
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    INSTITUTION NAME
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    COURSE ENROLLED
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Fee Pending
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {studentPending.map((items, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={items.student.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {items.student.name}
                          </div>
                          <div className="text-sm leading-5 text-gray-500">
                            {items.student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-500">
                        {items.student.institute_id
                          ? items.student.institute_id.institute_name
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      <span className="bg-yellow-300 py-1 px-3 text-black text-sm font-bold rounded">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      {items.student.course_id ? items.student.course_id.courseName : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      {items.pendingFee ? items.pendingFee : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      <Link to={`/payment-details/${items?.student?._id}`} className="flex gap-3 items-center justify-center bg-[#4f46e5] text-white px-4 py-2 rounded-lg"> <GrView /> View Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default PendingFeesStudentsClerk;
