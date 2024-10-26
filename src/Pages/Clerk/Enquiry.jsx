import React, { useContext, useEffect, useRef, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { ClerkDataContext } from "./ClerkData";
import { DataContext } from "../../Store/store";
function Enquiry() {
  const { token } = useContext(DataContext);
  const { courses, institutes, addStudentHeading, clerkAddStudentData } =
    useContext(ClerkDataContext);
  const [popup, setPopup] = useState(false);
  const [clerkAddStudent, setClerkAddStudent] = useState([]);
  const [userProfile, setUserProfile] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [course, setCourse] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [fName, setFName] = useState("");
  const [fMob, setFMob] = useState("");
  const [address, setAddress] = useState("");
  const [disable, setDisable] = useState(false);
  const [userCloudProfile, setUserCloudProfile] = useState("");
  const [isUploading, setIsUploading] = useState(false); // State for upload status
  const fileInputRef = useRef(null);

  useEffect(() => {
    const enguiryStd = async () => {
      try {
        // Send POST request to the backend API
        const response = await fetch("http://localhost:3000/clerk/enquiry", {
          headers: {
            "Content-Type": "application/json", // Set content type
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (response.ok) {
          // Assuming the response contains the added student data
          const savedStudent = await response.json();
          // console.log(savedStudent, )

          // Update state with the newly added student
          setClerkAddStudent(savedStudent);

          // Clear the form
          setUserProfile("");
          setUserName("");
          setUserEmail("");
          setInstituteName("");
          setCourse("");
          setPopup(false);
        }
      } catch (error) {
        console.error("Error adding student:", error);
        alert("An error occurred. Please try again.");
      }
    };
    enguiryStd();
  }, []);

  console.log(clerkAddStudent, "clerkAddStudent");

  const addCloudinary = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "myCloud");
    data.append("cloud_name", "di3ca2pjm");

    setIsUploading(true); // Set uploading state to true
    setDisable(true);
    fetch("https://api.cloudinary.com/v1_1/di3ca2pjm/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserCloudProfile(data.secure_url); // Store the image URL
        setUserProfile(data.secure_url); // Store the image URL
        console.log(data.secure_url);
        setIsUploading(false); // Reset uploading state
        setDisable(false); // Reset uploading state
      })
      .catch((error) => {
        console.error("Error uploading to Cloudinary:", error);
        setIsUploading(false); // Reset uploading state on error
      });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleStudentAdded = async () => {
    // Check if any field is empty
    if (
      userProfile === "" ||
      userName === "" ||
      userEmail === "" ||
      instituteName === "" ||
      course === ""
    ) {
      return alert("All fields are required");
    }

    // Create the new student object
    const newStudent = {
      imageUrl: userProfile,
      course_id: course,
      institute_id: instituteName,
      email: userEmail,
      name: userName,
      DOB: dob,
      mobile: mobile,
      fathersName: fName,
      fmobile: fMob,
      address: address,
      enquiry_date: new Date(),
    };

    try {
      // Send POST request to the backend API
      const response = await fetch("http://localhost:3000/clerk/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        // Assuming the response contains the added student data
        const savedStudent = await response.json();
        // console.log(savedStudent, )

        // Update state with the newly added student
        setClerkAddStudent([savedStudent, ...clerkAddStudent]);
        alert("Student added successfully");
        console.log(savedStudent, "savedStudent");

        // Clear the form
        setUserProfile("");
        setUserName("");
        setUserEmail("");
        setInstituteName("");
        setCourse("");
        setPopup(false);
      } else if (response.status == 400) {
        alert("Email Already Exists!");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleAdmit = async (id) => {
    try {
      // Send POST request to the backend API
      const response = await fetch(
        `http://localhost:3000/clerk/enquiry/convert/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set content type
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (response.ok) {
        // Assuming the response contains the added student data
        const savedStudent = await response.json();
        // console.log(savedStudent, )

        // Update state with the newly added student

        alert(savedStudent.message);
        await clerkAddStudentData();
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="pl-[30px] container ">
        <div className="flex justify-end w-[97.5%] ">
          <button
            onClick={() => setPopup(true)}
            className="bg-[#4f46e5] mb-[20px] text-[#fff] font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <IoAddCircle />
            <span>Add Student</span>
          </button>
          <div className="" />
        </div>
        {clerkAddStudent.length > 0 ? (
          <div className="flex flex-col w-[97.5%] ">
            <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle  shadow sm:rounded-lg border-b border-gray-200 ">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      {addStudentHeading.map(({ headline }, index) => {
                        return (
                          <th
                            key={index}
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                          >
                            {headline}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {clerkAddStudent.map(
                      (
                        { _id, imageUrl, course_id, institute_id, email, name },
                        index
                      ) => {
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                  <img
                                    className="w-10 h-10 rounded-full"
                                    src={imageUrl}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium leading-5 text-gray-900">
                                    {name}
                                  </div>
                                  <div className="text-sm leading-5 text-gray-500">
                                    {email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-900"></div>
                              <div className="text-sm leading-5 text-gray-500">
                                {institute_id.institute_name}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                              {course_id.courseName}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                              <div className="flex justify-end items-start gap-2">
                                {/* Pass the _id instead of index */}
                                <button
                                  onClick={() => handleAdmit(_id)}
                                  type="button"
                                  className="text-white bg-[#4f46e5] font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                >
                                  Admit
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          "No Students Enquiries found"
        )}
      </div>

      {/* popup setting  */}

      <div
        onClick={() => setPopup(false)}
        className={`${
          popup
            ? "absolute py-[100px] pt-28 overflow-auto  flex justify-center items-baseline bg-[#00000087] m-h-[100vh] w-[100%] top-0 bottom-0 right-0 left-0"
            : "hidden "
        } `}
      >
        <div className="w-full max-w-[40%] ">
          <form
            onClick={(e) => e.stopPropagation()}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="flex  gap-3">
              {/* cloud  */}

              <div className="flex flex-col flex-wrap items-center relative">
                {isUploading ? (
                  <div className="border-dashed border-2 border-gray-400 w-32 h-32 flex items-center justify-center mb-4">
                    <span className="text-gray-500">Uploading...</span>
                  </div>
                ) : userCloudProfile ? (
                  <img
                    src={userCloudProfile}
                    alt="Uploaded Profile"
                    className=" object-cover mb-4 cursor-pointer text-center max-w-[100px] max-h-[100px] rounded-full text-[14px]"
                    onClick={handleImageClick}
                  />
                ) : userProfile ? (
                  <>
                    <img
                      src={userProfile}
                      alt="Uploaded Profile"
                      className=" object-cover mb-4 cursor-pointer text-center max-w-[100px] max-h-[100px] rounded-full text-[14px]"
                      onClick={handleImageClick}
                    />
                    <div
                      onClick={handleImageClick}
                      className="absolute  cursor-pointer top-0 bottom-0 bg-black bg-opacity-70 w-full h-[85%] rounded-full flex justify-center items-center text-white text-2xl "
                    >
                      <CiCamera />
                    </div>
                  </>
                ) : (
                  <div
                    className="border-dashed border-2 text-center w-[100px] h-[100px] rounded-full text-[14px] border-gray-400  flex items-center justify-center mb-4 cursor-pointer"
                    onClick={handleImageClick}
                  >
                    <span className="text-gray-500">Upload your profile</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  className="hidden"
                  onChange={addCloudinary}
                  type="file"
                  accept="image/*"
                />
              </div>

              {/* end  */}

              <div className="mb-4 w-[100%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="mb-4 w-[48%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Useremail
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail}
                  placeholder="Useremail"
                />
              </div>

              {/* DOB  */}
              <div className="mb-4 w-[48%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  D.O.B
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  onChange={(e) => setDob(e.target.value)}
                  value={dob}
                  placeholder="D.O.B"
                />
              </div>

              {/* Mobile  */}

              <div className="mb-4 w-[48%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Mobile
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="phone"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                  placeholder="Mobile"
                />
              </div>

              {/* Father Name  */}

              <div className="mb-4 w-[48%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Father's Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => setFName(e.target.value)}
                  value={fName}
                  placeholder="Father's Name"
                />
              </div>

              {/* Father MOb  */}

              <div className="mb-4 w-[48%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Father's Mobile
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => setFMob(e.target.value)}
                  value={fMob}
                  placeholder="Father's Mobile"
                />
              </div>

              {/* Address  */}

              <div className="mb-4 w-[48%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  placeholder="Address"
                />
              </div>

              <div className="mb-4 w-[100%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  InstituteName
                </label>

                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setInstituteName(e.target.value)}
                  value={instituteName}
                  form="carform"
                  placeholder="Select your OPtion"
                >
                  <option value="">Select your option</option>
                  {institutes.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.institute_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Course
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setCourse(e.target.value)}
                value={course}
              >
                <option value="">Select your option</option>
                {courses?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.courseName}{" "}
                    {/* Adjust this based on your course model */}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleStudentAdded}
                className={` ${
                  disable ? "bg-slate-500" : "bg-blue-500  hover:bg-blue-700"
                }    text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="button"
                disabled={disable}
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Enquiry;
