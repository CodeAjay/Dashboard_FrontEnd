import { createContext, useEffect, useState } from "react";


export const DataContext = createContext();

function Store({ children }) {
  const [user, setUser] = useState(localStorage.getItem('user') || "");
  const [token, setToken] = useState(localStorage.getItem('token') || "");

 

  const [clerkAddStudent, setClerkAddStudent] = useState([]);
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
 

    
 
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:3000/login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user); // Assuming backend sends user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        return true; // Indicate success
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      return false; // Indicate failure
    }
  };


 
 
 

  // const [studentId, setStudentId] = useState("");

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };


  const studentId=user._id;


  return (
    <DataContext.Provider
      value={{
        studentId,
        user, setUser, token, login, logout,
        // to, setTo,
        // from, setFrom,minDate,
        // feeCollection,
        // studentsList,
        // studentHeading,
        // addStudentHeading,
        // addStudent,
        clerkAddStudent,setClerkAddStudent,
        // handleOnclick,
        // removeOnclick,
        // popup,
        // handleContentClick,
        // setAddStudent,
        // setPopup,
        // handleUpdate,
        // updateData,
        // setUpdateData,
        // btn,
        // setBtn,
        // courses,
        // setCourses,
        // coursePopup,
        // setCoursePopup,
        // handleCoursePopup,
        // removeCoursePopup,
        // contentCoursePopup,
        // courseImage,
        // setCourseImage,
        // courseName,
        // setCourseName,
        // courseInstitute, setCourseInstitute,
        // // handleAddCourse,
        // deleteCourseItem,
        // editCourseData,
        // Button,
        // setButton,
        // handleCourseUpdate,
        // announce,setAnnounce,
        // handleAnnouncementPopup,
        // announcPopup,
        // setAnnouncePopup,
        // removeAnnouncementPopup,
        // handleAnnouncmentContent,
        // anTitle, setAnTitle,
        // anDes, setAnDes,
        // handleAnFun,
        // handleAnnEdit, 
        // setAnbtn, anbtn, 
        // updateAnFun, 
        // editAnData, 
        // editAnData
        // updateAnData, setupdateAnData
        // institutes, setInstitutes, fetchInstitutes,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default Store;
