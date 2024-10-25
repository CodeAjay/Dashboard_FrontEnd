import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Store/store";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";

function ClerkFeePayment() {
  // const navigate = useNavigate(); // React Router v6 hook for navigation

  const [amount, setAmount] = useState("");
  const [payDate, setPayDate] = useState("");
//   const [payDateCurrent, setPayDateCurrent] = useState("");
// const payment_date = new Date()
  const [pendingMonth, setPendinMonth] = useState([]);
  const [payMethod, setPayMethod] = useState()

  
  console.log(payDate, "payDate");

  const [popup, setPoppup] = useState(false);
  const [feePayment, setFeePAyment] = useState([]);
  const [stdFeeDetails, setStdFeeDetails] = useState({});
  const [loading, setloading] = useState(false);
  //   const [max, setMax]=useState();
  const { token } = useContext(DataContext);









  useEffect(() => {
    const clerkStudentFees = async () => {
      const feeData = await fetch("http://localhost:3000/clerk/students", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const finalFeeData = await feeData.json();
      setFeePAyment(finalFeeData);
    };

    clerkStudentFees();
  }, []);

  const StPayFees = (id) => {
    setPoppup(true);
    setloading(true);
setAmount("")
setPayMethod("")

    setStdFeeDetails("");
    const clerkStudentFeeDetails = async () => {
      const feeData = await fetch(
        `http://localhost:3000/clerk/fee-collection/${id}`,
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

    if (!amount &&  !payMethod ) {
      return alert("All Fieids are required")
      
      
      
      
      
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
      const payFees = await fetch("http://localhost:3000/clerk/fee-collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(fessData),
      });
  
      const data = await payFees.json();
      console.log(data, "data");
      setPoppup(false)
      setAmount("")
      setPayDate("")
      setPayMethod("")
  
      if (data.success) {
        alert(data.message); // Alert error messages from backend
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing the payment.");
    }
  };
  














//   const enrollmentDate = stdFeeDetails?.student?.enrollment_date
//     ? new Date(stdFeeDetails.student.enrollment_date)
//     : null;
//   const courseDuration = stdFeeDetails?.student?.course_id?.course_duration;
//   let maxDate = null;

//   if (enrollmentDate && courseDuration) {
//     maxDate = new Date(enrollmentDate);
//     maxDate.setMonth(maxDate.getMonth() + courseDuration);
//   }

//   // Check if dates are valid before formatting
//   const minDate = enrollmentDate
//     ? enrollmentDate.toISOString().split("T")[0]
//     : "";
//   const maxDateStr = maxDate ? maxDate.toISOString().split("T")[0] : "";

  const removePopup = () => {
    setPoppup(false);
  };
  const stopContent = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="pl-[30px] container ">
        <div className="flex flex-col w-[97.5%] ">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
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
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50" >
                      Fee Payment
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50" >
                      Payment Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {feePayment.map((list, index) => {
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
                          <Link to={`/payment-details/${list?._id}`} className="flex gap-3 items-center justify-center bg-[#4f46e5] text-white px-4 py-2 rounded-lg"> <GrView /> View Details</Link>
                          </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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




        {pendingMonth.length>0? (
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






<label htmlFor="payFor" className="block text-sm font-medium text-gray-700 mb-2">
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



<label htmlFor="payFor" className="block text-sm font-medium text-gray-700 mb-2">
  Payment Method
</label>
<select 
  value={payMethod}
  onChange={(e) => setPayMethod(e.target.value)}
  className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-blue-500 mb-[20px]"
>
<option  value="">
      Select your Option
    </option>
    <option  value="online">
      Online
    </option>
    <option  value="cash">
      Cash
    </option>

</select>

                <button onClick={feesPayment} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition duration-200">
                  Pay Now
                </button>





              </div>




</>    )  :

<h1>No Pending Payments....</h1>
        
        
        }

              





            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ClerkFeePayment;
