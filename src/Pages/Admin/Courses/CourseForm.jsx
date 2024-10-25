import { useContext, useEffect, useRef, useState } from "react"
import { AdminDataContext } from "../AdiminData";
import { DataContext } from "../../../Store/store";
import { CiCamera } from "react-icons/ci";

function CourseForm() {
const {contentCoursePopup,courseImage,setCourses,courseInstitute, setCourseInstitute, courses, setCourseImage, institutes,courseName, setCourseName, setCoursePopup , Button, setButton, handleCourseUpdate} = useContext(AdminDataContext)    
const {token} = useContext(DataContext)
const addCourse = async () => {
  // Prepare the data for the new course
  const data = {
    courseName: courseName,
    imageUrl: courseImage,
    institute_id: courseInstitute, // Ensure this is correctly set from your select input
    studentsEnrolled: 0, // Set initial value
    totalFee: 0 // Set initial value
  };

  try {
    const response = await fetch("http://localhost:3000/courses", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Set content type
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      },
      body: JSON.stringify(data)
    });

    if (response.status === 201) {
      const addedCourse = await response.json();
      console.log(addedCourse, "addedCourse"); // Log the newly added course

      // Update the courses state with the new course
      setCourses([addedCourse, ...courses]); // Ensure you access the correct property

      // Clear input fields and close the popup
      setCourseImage("");
      setCourseName("");
      setCourseInstitute(""); 
      setCoursePopup(false);
      setButton(false);
    }
  } catch (error) {
    console.error("Error adding course:", error);
  }
};


useEffect(() => {
  if (Button && courseInstitute && courseInstitute._id) {
    // Set the institute ID when editing
    setCourseInstitute(courseInstitute._id);
  }
}, [Button, courseInstitute]);

const handleInstituteChange = (e) => {
  const selectedInstituteId = e.target.value; // Get the selected institute's ID

  // Find the selected institute from the `institutes` array
  const foundInstitute = institutes.find(
    (institute) => institute._id === selectedInstituteId
  );

  if (foundInstitute) {
    // Update both institute_id and institute_name in the course state
    setCourseInstitute(foundInstitute._id);
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
      setCourseImage(data.secure_url); // Store the image URL
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
    <>
    <div className="w-[400px]" onClick={contentCoursePopup}>
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">

    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        CourseName
      </label>
      <input
      value={courseName}
      onChange={(e)=>setCourseName(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="CourseName"
      />
    </div>
  
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        Institute
      </label>
      
      <select className="shadow appearance-none border mb-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInstituteChange} value={courseInstitute}>
            <option value="">Select an institute</option>
            {institutes.map((institute) => (
              <option key={institute._id} value={institute._id}>
                {institute.institute_name}
              </option>
            ))}
          </select>



  <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        CourseImage
      </label>
      {/* <input
      
      value={courseImage}
      onChange={(e)=>setCourseImage(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="CourseImage Url"
      /> */}

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
          className=" object-cover mb-4 cursor-pointer text-center  text-[14px]" 
          onClick={handleImageClick} 
        />
      ) : (
        courseImage?(
          <>
          
        <img 
          src={courseImage} 
          alt="Uploaded Profile" 
          className=" object-cover mb-4 cursor-pointer text-center   text-[14px]" 
          onClick={handleImageClick} 
        />
      <div onClick={handleImageClick} className="absolute  cursor-pointer top-0 bottom-0 bg-black bg-opacity-70 w-full h-[93%]  flex justify-center items-center text-white text-2xl "><CiCamera /></div>

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








    </div>
    
    <div className="flex items-center justify-between">
      <button
      onClick={Button? handleCourseUpdate :addCourse}
        className={`${disable ? "bg-slate-500" :"bg-blue-500  hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        type="button" disabled={disable}
      >
      {Button? "Update Course ":"Add Course" } 
      </button>
      
    </div>
  </form>
  
</div>

    
    
    </>
  )
}

export default CourseForm