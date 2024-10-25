import { createContext, useContext, useEffect, useState } from "react";
import { DataContext } from "../../Store/store";
export const ClerkDataContext = createContext();




export function ClerkData({children}) {

// Add Student button handle

const [popup, setPopup] = useState(false);

const [btn, setBtn] = useState(false);

const {token} = useContext(DataContext)
const [courses, setCourses]=useState();

const [institutes, setInstitutes] = useState([]);

    const [clerkAddStudent, setClerkAddStudent] = useState([]);
// course page Api Data
const [Button, setButton] = useState(false);
const [courseImage, setCourseImage] = useState("");
const [courseName, setCourseName] = useState("");
const [courseInstitute, setCourseInstitute] = useState({});
const [coursePopup, setCoursePopup] = useState(false);
const [updateCourseData, setUpdateCourseData] = useState(null);

// Fetch courses on component mount
useEffect(() => {
  const showCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/clerk/courses", {
        headers: {
          'Content-Type': 'application/json', // Set content type
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
      });
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  showCourses();
}, [clerkAddStudent, token]);

// Open popup for adding/updating course
const handleCoursePopup = () => {
  setCoursePopup(true);
  setButton(false);
  setCourseImage("");
  setCourseName("");
  setCourseInstitute(""); 
  setUpdateCourseData(null);
};

// Close popup
const removeCoursePopup = () => {
  setCoursePopup(false);
};

const contentCoursePopup = (e) => {
  e.stopPropagation();
};



// Handle deleting a course
const deleteCourseItem = async (id) => {

console.log("delete",courses)

  const deleted = confirm("Are you sure you want to delete this course?");
console.log(id)
  if (deleted) {
    try {
      await fetch(`http://localhost:3000/clerk/courses/${id}`, {
       method: "DELETE",
       headers: {
           'Content-Type': 'application/json', // Set content type
           'Authorization': `Bearer ${token}` // Include the token in the Authorization header
         },
      
      });
      const remainingCourses = courses.filter((item) => item._id !== id);
      setCourses(remainingCourses);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }
};

const editCourseData = (index) => {
  setCoursePopup(true);
  const courseToEdit = courses[index];
  
  setCourseImage(courseToEdit.imageUrl || ""); // Set course image
  setCourseName(courseToEdit.courseName); // Set course name
  setCourseInstitute(courseToEdit.institute_id._id); 
  setUpdateCourseData(courseToEdit);
  
  console.log(courseToEdit, "course to edit");
  console.log(courseInstitute, "courseInstitute");
  
  setButton(true);
};


// Handle updating a course
const handleCourseUpdate = async () => {
  if (courseImage === "" || courseName === "") {
    return alert("All fields are required");
  }

  try {
    const response = await fetch(`http://localhost:3000/clerk/courses/${updateCourseData._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json', // Set content type
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      },
      body: JSON.stringify({
        courseName: courseName,
        imageUrl:courseImage,
        institute_id: courseInstitute
        // studentsEnrolled: studentsEnrolled,
        // totalFee: fee,
      }),
    });

    const updatedCourse = await response.json();
    setCourses((prev) =>
      prev.map((course) => (course._id === updatedCourse.updatedCourse._id ? updatedCourse.updatedCourse : course))
    );

    setCoursePopup(false);
    setCourseImage("");
    setCourseName("");
    setCourseInstitute(""); 
  } catch (error) {
    console.error("Error updating course:", error);
  }
};

const handleOnclick = () => {
  setUpdateData("");
  setBtn(false);
  setPopup(true);
};
const removeOnclick = () => {
  setPopup(false);
};

// Edit Student
const [updateData, setUpdateData] = useState([]);

const handleUpdate = (id) => {
  setBtn(true);
  setPopup(true);
  const updateData = clerkAddStudent.find(student => student._id === id);
  setUpdateData(updateData);
};

const handleContentClick = (e) => {
  e.stopPropagation();
};


const addStudentHeading = [
    {
      headline: "NAME",
    },
    {
      headline: "INSTITUTION NAME",
    },
    {
      headline: "COURSE ENROLLED",
    },
    {
      headline: "",
    },
  ];
 
 



    // AddStudent  clerk API Data
    const clerkAddStudentData = async () => {
     const listedStudent = await fetch("http://localhost:3000/clerk/students", {
       headers: {
         'Content-Type': 'application/json', // Set content type
         'Authorization': `Bearer ${token}` // Include the token in the Authorization header
       },
     });
     const data = await listedStudent.json();
     setClerkAddStudent(data);
 
     console.log(data, "addStudent")
   };
   useEffect(() => {
     clerkAddStudentData();
   }, [token]);




 const fetchInstitutes = async () => {
   try {
     const result = await fetch("http://localhost:3000/clerk/institutes", {
       headers: {
         'Content-Type': 'application/json', // Set content type
         'Authorization': `Bearer ${token}` // Include the token in the Authorization header
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

 useEffect(() => {
   fetchInstitutes();
 }, [token]);




  return (
   
        
   <ClerkDataContext.Provider value={{clerkAddStudent,setClerkAddStudent,handleOnclick,
    removeOnclick,
    popup,
    handleContentClick,
    addStudentHeading,
    setPopup,
    handleUpdate,
    updateData,
    setUpdateData,
    btn,
        setBtn,
        courses,
        setCourses,
        coursePopup,
        setCoursePopup,
        handleCoursePopup,
        removeCoursePopup,
        contentCoursePopup,
        courseImage,
        setCourseImage,
        courseName,
        setCourseName,
        courseInstitute, setCourseInstitute,
        // handleAddCourse,
        deleteCourseItem,
        editCourseData,
        Button,
        setButton,
        handleCourseUpdate,institutes,setInstitutes,
    setBtn,}}> {children} </ClerkDataContext.Provider> 
  )
}

export default ClerkData