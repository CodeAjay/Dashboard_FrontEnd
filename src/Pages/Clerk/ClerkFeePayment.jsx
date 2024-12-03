import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Store/store";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import Loader from "../../Components/Loader";

function ClerkFeePayment() {
  // const navigate = useNavigate(); // React Router v6 hook for navigation

  const [amount, setAmount] = useState("");
  const [payDate, setPayDate] = useState("");
  //   const [payDateCurrent, setPayDateCurrent] = useState("");
  // const payment_date = new Date()
  const [pendingMonth, setPendinMonth] = useState([]);
  const [payMethod, setPayMethod] = useState();
  const [courses, setCourses] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [popup, setPoppup] = useState(false);
  const [feePayment, setFeePAyment] = useState([]);
  const [stdFeeDetails, setStdFeeDetails] = useState({});
  const [loading, setloading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  //   const [max, setMax]=useState();
  const { token } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const clerkStudentFees = async () => {
      setSpinner(true);
      const feeData = await fetch(`${import.meta.env.VITE_BASE_URL}/clerk/students`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const finalFeeData = await feeData.json();
      setFeePAyment(finalFeeData);
      setSpinner(false);
    };
    const fetchInstitutes = async () => {
      try {
        const result = await fetch(`${import.meta.env.VITE_BASE_URL}/clerk/institutes`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (result.status === 200) {
          const data = await result.json(); // Convert response to JSON
          setInstitutes(data); // Update state with the JSON data
        } else {
          console.error("Failed to fetch institutes:", result.statusText);
        }
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    };
    const showCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clerk/courses`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    showCourses();
    clerkStudentFees();
    fetchInstitutes();
  }, []);

  const StPayFees = (id) => {
    setPoppup(true);
    setloading(true);
    setAmount("");
    setPayMethod("");

    setStdFeeDetails("");
    const clerkStudentFeeDetails = async () => {
      const feeData = await fetch(
        `${import.meta.env.VITE_BASE_URL}/clerk/fee-collection/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const finalFeeData = await feeData.json();
      setloading(false);
      setStdFeeDetails(finalFeeData);
      setPendinMonth(
        finalFeeData.feeDetails.filter((item) => item.feePaid == false)
      );
    };

    clerkStudentFeeDetails();
  };

  const feesPayment = async () => {
    if (!amount && !payMethod) {
      return alert("All Fieids are required");
    }

    const payment_date = new Date().toISOString().slice(0, 10); // Format as YYYY-MM-DD
    const fessData = {
      student_id: stdFeeDetails?.student?._id,
      course_id: stdFeeDetails?.student?.course_id?._id,
      amount_paid: amount,
      payment_date: payment_date,
      payment_method: payMethod,
    };

    console.log(fessData, "feesdata");

    try {
      const payFees = await fetch(
        `${import.meta.env.VITE_BASE_URL}/clerk/fee-collection`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(fessData),
        }
      );

      const data = await payFees.json();
      console.log(data, "data");
      setPoppup(false);
      setAmount("");
      setPayDate("");
      setPayMethod("");

      if (data.success) {
        alert(data.message); // Alert error messages from backend
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing the payment.");
    }
  };

  const removePopup = () => {
    setPoppup(false);
  };
  const stopContent = (e) => {
    e.stopPropagation();
  };

  const [currentPage, setCurrentPage] = useState(1);
  // Filtered students effect
  useEffect(() => {
    // Search by name
    setCurrentPage(1);
    let students = feePayment.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    if (searchTerm) {
      students = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    if (selectedInstitute) {
      students = students.filter(
        (student) => student.institute_id.institute_name === selectedInstitute
      );
    }

    if (selectedCourse) {
      students = students.filter(
        (student) => student.course_id.courseName === selectedCourse
      );
    }

    setFilteredStudents(students);
  }, [searchTerm, selectedInstitute, selectedCourse, feePayment]);

  // Pagination logic

  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="pl-[30px] container ">
        <div className="flex flex-col w-[97.5%] ">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex gap-4 mb-4 w-[97.5%]">
              <input
                className="border px-4 py-2 w-full rounded-[5px]"
                type="text"
                placeholder="Search by student name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="border px-4 py-2 rounded-[5px]"
                value={selectedInstitute}
                onChange={(e) => setSelectedInstitute(e.target.value)}
              >
                <option value="">All Institutes</option>
                {institutes && institutes.length > 0 ? (
                  institutes.map((institute, index) => (
                    <option key={index} value={institute.institute_name}>
                      {institute.institute_name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading Institutes...</option>
                )}
              </select>

              <select
                className="border px-4 py-2 rounded-[5px]"
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                }}
              >
                <option value="">All Courses</option>
                {/* Render options with proper handling of course object */}
                {courses && courses.length > 0 ? (
                  courses.map((course, index) => (
                    <option key={index} value={course.courseName}>
                      {course.courseName}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading courses...</option>
                )}
              </select>
            </div>

            {!spinner ? (
              <>
                <div className="inline-block min-w-full overflow-hidden align-middle  shadow sm:rounded-lg border-b border-gray-200 ">
                  <table className=" min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          NAME
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          INSTITUTION NAME
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          COURSE ENROLLED
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Fee Payment
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Payment Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {currentStudents.map((list, index) => {
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                  <img
                                    className="w-10 h-10 rounded-full"
                                    src={list.imageUrl}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium leading-5 text-gray-900">
                                    {list.name}
                                  </div>
                                  <div className="text-sm leading-5 text-gray-500">
                                    {list.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-900" />
                              <div className="text-sm leading-5 text-gray-500">
                                {list.institute_id.institute_name}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                              {list.course_id.courseName}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                              <div className="flex justify-end items-start gap-2">
                                <button
                                  onClick={() => StPayFees(list._id)}
                                  type="button"
                                  className=" text-white bg-[#4f46e5]  font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                >
                                  Pay Now
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                              <Link
                                to={`/payment-details/${list?._id}`}
                                className="flex gap-3 items-center justify-center bg-[#4f46e5] text-white px-4 py-2 rounded-lg"
                              >
                                {" "}
                                <GrView /> View Details
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="border px-4 py-2 rounded-lg bg-[#4f46e5] text-white disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="border px-4 py-2 rounded-lg bg-[#4f46e5] text-white disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Loader />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Popup Content  */}

      <div
        onClick={removePopup}
        className={
          popup
            ? "fixed inset-0 flex justify-center items-center bg-black bg-opacity-70"
            : "hidden"
        }
      >
        <div
          onClick={stopContent}
          className="bg-white p-8 w-[90%] md:w-[500px] rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          {loading ? (
            <h1 className="text-center text-xl font-semibold text-blue-600">
              Loading...
            </h1>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-4">
                <img
                  src={stdFeeDetails?.student?.imageUrl}
                  alt="Student"
                  className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-lg mr-4"
                />
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold text-gray-800">
                    Name: {stdFeeDetails?.student?.name}
                  </h1>
                  <p className="text-md text-gray-700">
                    <span className="font-semibold">Email:</span>{" "}
                    {stdFeeDetails?.student?.email}
                  </p>
                  <p className="text-md text-gray-700">
                    <span className="font-semibold">Institute:</span>{" "}
                    {stdFeeDetails?.student?.institute_id?.institute_name}
                  </p>
                  <p className="text-md text-gray-700">
                    <span className="font-semibold">Course:</span>{" "}
                    {stdFeeDetails?.student?.course_id?.courseName}
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-inner w-full mb-4">
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Total Fees:</span> ₹
                  {stdFeeDetails?.student?.course_id?.totalFee}
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Fees Paid:</span> ₹
                  {stdFeeDetails?.student?.fee}
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Pending Fees:</span> ₹
                  {stdFeeDetails?.totalPending}
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Enrollment Date:</span>{" "}
                  {stdFeeDetails?.student?.enrollment_date}
                </p>
              </div>

              {pendingMonth.length > 0 ? (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Payment Details
                  </h2>

                  <div className="mt-4 w-full">
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      type="number"
                      placeholder="Enter Amount"
                      className="border border-gray-300 p-2 w-full rounded-lg mb-4 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    {/* <input
                  min={minDate}
                  max={maxDateStr}
                  value={payDateCurrent}
                  onChange={(e) => setPayDateCurrent(e.target.value)}
                  type="date"
                  className="border border-gray-300 p-2 w-full rounded-lg mb-4 focus:outline-none focus:ring focus:ring-blue-500"
                /> */}

                    <label
                      htmlFor="payFor"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pay For
                    </label>
                    <select
                      value={payDate}
                      onChange={(e) => setPayDate(e.target.value)}
                      id="payFor"
                      className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-blue-500 mb-[20px]"
                    >
                      {pendingMonth.map((item, index) => (
                        <option key={index} value={item.month}>
                          {item.month}
                        </option>
                      ))}
                    </select>

                    <label
                      htmlFor="payFor"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Payment Method
                    </label>
                    <select
                      value={payMethod}
                      onChange={(e) => setPayMethod(e.target.value)}
                      className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-blue-500 mb-[20px]"
                    >
                      <option value="">Select your Option</option>
                      <option value="online">Online</option>
                      <option value="cash">Cash</option>
                    </select>

                    <button
                      onClick={feesPayment}
                      className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition duration-200"
                    >
                      Pay Now
                    </button>
                  </div>
                </>
              ) : (
                <h1>No Pending Payments....</h1>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ClerkFeePayment;
