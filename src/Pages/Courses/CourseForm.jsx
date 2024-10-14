import { useContext, useState } from "react"
import { DataContext } from "../../Store/store"

function CourseForm() {
const {contentCoursePopup,courseImage,setCourses, courses, setCourseImage, courseName, setCourseName, setCoursePopup , Button , handleCourseUpdate} = useContext(DataContext)    

// const [title, setTitle]=useState("")

const addCourse=async ()=>{
const data = {title:courseName} 
  try{
    const response = await fetch("http://localhost:3000/courses", {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
  )
  if(response.status == 201){
    console.log(response)
    setCourses([data ,...courses])


    setCoursePopup(false)
  }
  }catch(error){

  }
}


  return (
    <>
    <div className="w-[400px]" onClick={contentCoursePopup}>
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
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