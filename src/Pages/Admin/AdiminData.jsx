import React, { createContext, useContext, useEffect, useState } from "react";
import { FaUser, FaBookReader } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { DataContext } from "../../Store/store";

export const AdminDataContext = createContext();

export function AdminDataProvider({ children }) {
  const [anTitle, setAnTitle] = useState("");
  const [anDes, setAnDes] = useState("");
  const [courses, setCourses] = useState([]);
  const { token } = useContext(DataContext);
  const [addStudent, setAddStudent] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  // Fees collection

  const [feeCollection, setFeeCollection] = useState({
    totalFeeCollected: "",
    monthlyCollections: "",
  });
  const [from, setFrom] = useState(`${currentYear - 1}-${currentMonth}`);
  const [to, setTo] = useState(`${currentYear}-${currentMonth}`);

  const minYear = currentYear;
  const minMonth = currentMonth;
  const minDate = `${minYear}-${minMonth}`;

  const feee = async () => {
    try {
      const feeColl = await fetch("http://localhost:3000/fee-collection/fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ from, to }),
      });

      if (feeColl.status === 200) {
        const ss = await feeColl.json(); // Use feeColl.json() to parse the response
        setFeeCollection(ss); // Set the feeCollection state with the parsed data
        console.log(ss, "feeCollection"); // Log the parsed data, not the state variable
      }
    } catch (error) {
      console.error("Error fetching fee collection:", error);
    }
  };

  useEffect(() => {
    feee();
  }, [from, to, token]);

  // Dashboard Card Data
  const cardDAta = [
    {
      icon: <BiRupee />,
      bgColor: "#7b74ec",
      title: feeCollection.totalFeeCollected,
      descriptioin: "Fees Collection",
    },
    {
      icon: <FaUser />,
      bgColor: "#ea580cbf",
      title: addStudent.length,
      descriptioin: "Total Students",
    },
    {
      icon: <FaBookReader />,
      bgColor: "#e45d99",
      title: courses.length,
      descriptioin: "Available Courses",
    },
  ];

  // Add Student button handle

  const [popup, setPopup] = useState(false);

  const [btn, setBtn] = useState(false);

  const handleOnclick = () => {
    setUpdateData("");
    setAnDes("");
    setAnTitle("");
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
    const updateData = addStudent.find((student) => student._id === id);
    console.log(updateData);
    setUpdateData(updateData);
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  // Add Student

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

  // Add Student API Data
  const addStudentData = async () => {
    const listedStudent = await fetch("http://localhost:3000/students", {
      headers: {
        "Content-Type": "application/json", // Set content type
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    const data = await listedStudent.json();
    setAddStudent(data);
  };
  useEffect(() => {
    addStudentData();
  }, [token]);

  // Dashboard StudenList Headings

  const studentHeading = [
    {
      headline: "NAME",
    },
    {
      headline: "TITLE",
    },
    {
      headline: "STATUS",
    },
    {
      headline: "COURSE",
    },
  ];

  // Dashboard StudentList
  const [studentsList, setStudentList] = useState([]);
  const studentList = async () => {
    setLoading(true);

    const studentListData = await fetch("http://localhost:3000/students", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    const studentData = await studentListData.json();
    setStudentList(studentData);
    setLoading(false);
  };
  useEffect(() => {
    studentList();
  }, [token]);

  // course page Api Data
  const [Button, setButton] = useState(false);
  const [courseImage, setCourseImage] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [courseInstitute, setCourseInstitute] = useState({});
  const [coursePopup, setCoursePopup] = useState(false);
  const [updateCourseData, setUpdateCourseData] = useState(null);
  const [admissionfee, setAdmissionfee] = useState("");

  // Fetch courses on component mount
  useEffect(() => {
    const showCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/courses", {
          headers: {
            "Content-Type": "application/json", // Set content type
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    showCourses();
  }, [addStudent, token]);

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
    console.log("delete", courses);

    const deleted = confirm("Are you sure you want to delete this course?");
    console.log(id);
    if (deleted) {
      try {
        await fetch(`http://localhost:3000/courses/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Set content type
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
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
    setCourseFee(courseToEdit.totalFee || ""); // Set course image
    setAdmissionfee(courseToEdit.admissionfee)
    setCourseDuration(courseToEdit.course_duration || ""); // Set course image
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
      const response = await fetch(
        `http://localhost:3000/courses/${updateCourseData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Set content type
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify({
            courseName: courseName,
            imageUrl: courseImage,
            institute_id: courseInstitute,
            course_duration: courseDuration,
            totalFee: courseFee,
            admision_fee: admissionfee
          }),
        }
      );

      const updatedCourse = await response.json();
      setCourses((prev) =>
        prev.map((course) =>
          course._id === updatedCourse.updatedCourse._id
            ? updatedCourse.updatedCourse
            : course
        )
      );

      setCoursePopup(false);
      setCourseImage("");
      setCourseName("");
      setCourseInstitute("");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Announcement page

  const [anbtn, setAnbtn] = useState(false);
  const [announce, setAnnounce] = useState([]);
  const [updateAnData, setupdateAnData] = useState(null);
  const [announcPopup, setAnnouncePopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch announcements on component mount
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/announcements", {
          headers: {
            "Content-Type": "application/json", // Set content type
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        const data = await response.json();
        setAnnounce(data);
        setLoading(false);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, [token]);

  // Open popup for new announcement
  const handleAnnouncementPopup = () => {
    setAnnouncePopup(true);
    setAnDes("");
    setAnTitle("");
  };

  // Close popup and reset fields
  const removeAnnouncementPopup = () => {
    setAnnouncePopup(false);
    setAnbtn(false);
    setAnDes("");
    setAnTitle("");
  };

  // Handle editing of an announcement
  const handleAnnEdit = (id) => {
    setAnnouncePopup(true);
    setAnbtn(true);
    const updateAn = announce[id];
    console.log(updateAn);
    setupdateAnData(updateAn);
    setAnTitle(updateAn.title);
    setAnDes(updateAn.description);
  };

  // Handle form submission for updating an announcement
  const updateAnFun = async () => {
    if (anTitle === "" || anDes === "") {
      return alert("All fields are required");
    }

    // console.log("updateAnData inside edit announcement", updateAnData)
    try {
      // Send updated announcement to the backend
      const response = await fetch(
        `http://localhost:3000/announcements/${updateAnData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Set content type
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify({ title: anTitle, description: anDes }),
        }
      );

      const updatedAnnouncement = await response.json();
      console.log(updatedAnnouncement.updatedAnnouncement._id);
      // Update state with the edited announcement
      setAnnounce((prev) =>
        prev.map((an) =>
          an._id === updatedAnnouncement.updatedAnnouncement._id
            ? updatedAnnouncement.updatedAnnouncement
            : an
        )
      );

      // Close popup and reset fields
      setAnnouncePopup(false);
      setAnbtn(false);
      setAnTitle("");
      setAnDes("");
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const handleAnnouncmentContent = (e) => {
    e.stopPropagation();
  };

  const [institutes, setInstitutes] = useState([]);

  const fetchInstitutes = async () => {
    try {
      const result = await fetch("http://localhost:3000/institutes", {
        headers: {
          "Content-Type": "application/json", // Set content type
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
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
    <AdminDataContext.Provider
      value={{
        loading,
        setLoading,
        cardDAta,
        to,
        setTo,
        from,
        setFrom,
        minDate,
        addStudent,
        setAddStudent,
        courseDuration,
        setCourseDuration,
        setCourseFee,
        courseFee,

        // to, setTo,
        // from, setFrom,minDate,
        feeCollection,
        studentsList,
        studentHeading,
        addStudentHeading,
        // addStudent,
        // clerkAddStudent,setClerkAddStudent,
        handleOnclick,
        removeOnclick,
        popup,
        handleContentClick,
        // setAddStudent,
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
        courseInstitute,
        setCourseInstitute,
        // handleAddCourse,
        deleteCourseItem,
        editCourseData,
        Button,
        setButton,
        handleCourseUpdate,
        announce,
        setAnnounce,
        handleAnnouncementPopup,
        announcPopup,
        setAnnouncePopup,
        removeAnnouncementPopup,
        handleAnnouncmentContent,
        anTitle,
        setAnTitle,
        anDes,
        setAnDes,
        // handleAnFun,
        handleAnnEdit,
        setAnbtn,
        anbtn,
        updateAnFun,
        // editAnData,
        // editAnData
        // updateAnData, setupdateAnData
        institutes,
        setInstitutes,
        fetchInstitutes,
        admissionfee,
        setAdmissionfee
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export default AdminDataProvider;
