import { useContext, useState } from "react"
import { AdminDataContext } from "../AdiminData"
import { DataContext } from "../../../Store/store"

function StudentDetailsForm() {

  const {handleContentClick , addStudent, setAddStudent, courses, setPopup ,updateData, btn, institutes} = useContext(AdminDataContext)
const {token} = useContext(DataContext)




const [userProfile, setUserProfile] = useState(updateData?updateData.imageUrl:"")
const [userName, setUserName] = useState(updateData?updateData.name:"")
const [userEmail, setUserEmail] = useState(updateData?updateData.email:"")
const [instituteName, setInstituteName] = useState(updateData?updateData.institute_id._id:"")
const [course, setCourse] = useState(updateData?updateData.course_id._id:"")  



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
  };

  try {
    // Send POST request to the backend API
    const response = await fetch('http://localhost:3000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set content type
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      },
      body: JSON.stringify(newStudent),
    });

    if (response.ok) {
      // Assuming the response contains the added student data
      const savedStudent = await response.json();
      // console.log(savedStudent, )

      // Update state with the newly added student
      setAddStudent([savedStudent, ...addStudent]);
      alert("Student added successfully");
      console.log(savedStudent, "savedStudent")
      
      // Clear the form
      setUserProfile("");
      setUserName("");
      setUserEmail("");
      setInstituteName("");
      setCourse("");
      setPopup(false);
    } else {
      alert("Failed to add student. Please try again.");
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
    const response = await fetch(`http://localhost:3000/students/${updateData._id}`, {
      method: 'PUT', // Or 'PATCH' if your API uses that for updates
      headers: {
        'Content-Type': 'application/json', // Set content type
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      },
      body: JSON.stringify(updatedStudent),
    });
    
    if (response.ok) {
      const newStudent = await response.json();
      // Update the student in the local state
      setAddStudent((prevAddStudent) => {
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



  return (
    <div className="w-full max-w-[40%]" onClick={handleContentClick}>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex gap-3">
      <div className="mb-4 w-[100%]">
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
      </div>
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          {btn?"Update Student":"Add Student"}
          
        </button>
        
        
        
      </div>
    </form>
    
  </div>
  
  )
}

export default StudentDetailsForm