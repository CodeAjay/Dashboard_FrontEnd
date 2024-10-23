import { useContext, useEffect, useState } from "react"
import { AdminDataContext } from "../AdiminData";
import { DataContext } from "../../../Store/store";

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
      <input
      
      value={courseImage}
      onChange={(e)=>setCourseImage(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="CourseImage Url"
      />
    </div>
    
    <div className="flex items-center justify-between">
      <button
      onClick={Button? handleCourseUpdate :addCourse}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
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