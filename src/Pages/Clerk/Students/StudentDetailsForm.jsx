import { useContext, useRef, useState } from "react"
import  { ClerkDataContext } from "../ClerkData"
import { DataContext } from "../../../Store/store"
import { CiCamera } from "react-icons/ci";

function StudentDetailsForm() {

const {token}=useContext(DataContext)
  const {handleContentClick , clerkAddStudent, setClerkAddStudent, courses , setPopup ,updateData, btn, institutes} = useContext(ClerkDataContext)


console.log(courses,"courses", institutes, "institutes")


const [userProfile, setUserProfile] = useState(updateData?updateData.imageUrl:"")
const [userName, setUserName] = useState(updateData?updateData.name:"")
const [userEmail, setUserEmail] = useState(updateData?updateData.email:"")
const [instituteName, setInstituteName] = useState(updateData?updateData.institute_id._id:"")
const [course, setCourse] = useState(updateData?updateData.course_id._id:"")  
const [dob, setDob] = useState(updateData?updateData.DOB:"")  
const [mobile, setMobile] = useState(updateData?updateData.mobile:"")  
const [fName, setFName] = useState(updateData?updateData.fathersName:"")  
const [fMob, setFMob] = useState(updateData?updateData.fmobile:"")  
const [address, setAddress] = useState(updateData?updateData.address:"")  



const handleStudentAdded = async () => {
  // Check if any field is empty
  if (userProfile === "" || userName === "" || userEmail === "" || instituteName === "" || course === "") {
    return alert("All fields are required");
  }

  // Create the new student object
  const newStudent = {
    imageUrl: userProfile,
    course_id: course,
    institute_id: instituteName,
    email: userEmail,
    name: userName,
    DOB : dob,
    mobile:mobile,
    fathersName:fName,
    fmobile:fMob,
    address:address,
  };

  try {
    // Send POST request to the backend API
    const response = await fetch('http://localhost:3000/clerk/students', {
      method: 'POST',
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
      console.log(savedStudent, "savedStudent")
      
      // Clear the form
      setUserProfile("");
      setUserName("");
      setUserEmail("");
      setInstituteName("");
      setCourse("");
      setPopup(false);
    
    } else  if (response.status==400){
      
      
      alert("Email Already Exists!");
    }
  } catch (error) {
    console.error("Error adding student:", error);
    alert("An error occurred. Please try again.");
  }
};


const handleStudentUpdate = async () => {
  // Check if any field is empty
  if (userProfile === "" || userName === "" || userEmail === "" || instituteName === "" || course === "") {
    return alert("All fields are required");
  }

  // Create the updated student object
  const updatedStudent = {
    imageUrl: userProfile,
    course_id: course,
    institute_id: instituteName,
    email: userEmail,
    name: userName,
  };

  console.log("update data inside update", updateData)

  try {
    // Send PUT or PATCH request to the backend API
    const response = await fetch(`http://localhost:3000/clerk/students/${updateData._id}`, {
      method: 'PUT', // Or 'PATCH' if your API uses that for updates
      headers: {
        "Content-Type": "application/json", // Set content type
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(updatedStudent),
    });
    
    if (response.ok) {
      const newStudent = await response.json();
      // Update the student in the local state
      setClerkAddStudent((prevAddStudent) => {
        const studentIndex = prevAddStudent.findIndex((student) => student._id === updateData._id);
        
        if (studentIndex !== -1) {
          // Update the specific student
          prevAddStudent[studentIndex] = { ...prevAddStudent[studentIndex], ...newStudent };
        }
        
        return [...prevAddStudent]; // Return a new array with the updated student
      });

      alert("Student updated successfully");

      // Clear the form
      setUserProfile("");
      setUserName("");
      setUserEmail("");
      setInstituteName("");
      setCourse("");
      setPopup(false);
    } else {
      alert("Failed to update student. Please try again.");
    }
  } catch (error) {
    console.error("Error updating student:", error);
    alert("An error occurred. Please try again.");
  }
};

const [disable, setDisable ] =useState(false)


const [userCloudProfile, setUserCloudProfile] = useState("");
  const [isUploading, setIsUploading] = useState(false); // State for upload status
  const fileInputRef = useRef(null);

  const addCloudinary = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "myCloud");
    data.append("cloud_name", "di3ca2pjm");

    setIsUploading(true); // Set uploading state to true
    setDisable(true)
    fetch("https://api.cloudinary.com/v1_1/di3ca2pjm/image/upload", {
      method: "POST",
      body: data,
    })
    .then((res) => res.json())
    .then((data) => {
      setUserCloudProfile(data.secure_url); // Store the image URL
      setUserProfile(data.secure_url); // Store the image URL
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








  return (
    <div className="w-full max-w-[40%]" onClick={handleContentClick}>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex gap-3">
      {/* <div className="mb-4 w-[100%]">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          User Profile 
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          
          onChange={(e)=> setUserProfile(e.target.value)}
          value={userProfile}
          type="text"
          placeholder="User Profile Url"
        />
      </div> */}
{/* cloud  */}


<div className="flex flex-col items-center relative">
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
      ) : (
        userProfile?(
          <>
          
        <img 
          src={userProfile} 
          alt="Uploaded Profile" 
          className=" object-cover mb-4 cursor-pointer text-center max-w-[100px] max-h-[100px] rounded-full text-[14px]" 
          onClick={handleImageClick} 
        />
      <div onClick={handleImageClick} className="absolute  cursor-pointer top-0 bottom-0 bg-black bg-opacity-70 w-full h-[85%] rounded-full flex justify-center items-center text-white text-2xl "><CiCamera /></div>

        </>
        
        ):
        (
        <div 
          className="border-dashed border-2 text-center w-[100px] h-[100px] rounded-full text-[14px] border-gray-400  flex items-center justify-center mb-4 cursor-pointer" 
          onClick={handleImageClick} 
        >
          <span className="text-gray-500">Upload your profile</span>
        </div>
      )
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
          onChange={(e)=> setUserName(e.target.value)}
          value={userName}
          placeholder="Username"
        />
      </div>
      </div>
      <div className="flex gap-3">
      <div className="mb-4 w-[100%]">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Useremail 
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={(e)=> setUserEmail(e.target.value)}
          value={userEmail}
          placeholder="Useremail"
        />
      </div>


      


{/* DOB  */}
      <div className="mb-4 w-[100%]">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          D.O.B 
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
          onChange={(e)=> setDob(e.target.value)}
          value={dob}
          placeholder="D.O.B"
        />
      </div>

  

{/* Mobile  */}

      <div className="mb-4 w-[100%]">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Mobile 
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="phone"
          onChange={(e)=> setMobile(e.target.value)}
          value={mobile}
          placeholder="Mobile"
        />
      </div>



{/* Father Name  */}


      <div className="mb-4 w-[100%]">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Father's Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={(e)=> setFName(e.target.value)}
          value={fName}
          placeholder="Father's Name"
        />
      </div>


{/* Father MOb  */}

      <div className="mb-4 w-[100%]">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Father's Mobile 
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={(e)=> setFMob(e.target.value)}
          value={fMob}
          placeholder="Father's Mobile"
        />
      </div>


{/* Address  */}

      <div className="mb-4 w-[100%]">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Address 
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={(e)=> setAddress(e.target.value)}
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
        
<select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=> setInstituteName(e.target.value)}
          value={instituteName} form="carform" placeholder="Select your OPtion">
      <option value="">Select your option</option>
      {institutes.map((item) => (
        <option key={item._id} value={item._id}>{item.institute_name}</option>
      ))}
</select>





      </div>
      </div>
      <div className="mb-4">
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
              {courses.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.courseName} {/* Adjust this based on your course model */}
                </option>
              ))}
            </select>
      </div>
    

  <div className="flex items-center justify-between">
        <button onClick={btn?handleStudentUpdate:handleStudentAdded}
          className={ ` ${disable ? "bg-slate-500" :"bg-blue-500  hover:bg-blue-700"}    text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          type="button" disabled={disable} 
        >


          {btn?"Update Student":"Add Student"}
          
        </button>
        
        
        
      </div>
    </form>
    
  </div>
  
  )
}

export default StudentDetailsForm