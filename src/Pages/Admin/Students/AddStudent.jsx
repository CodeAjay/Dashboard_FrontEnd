import { useContext, useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { AdminDataContext } from "../AdiminData";
import { DataContext } from "../../../Store/store";
import Loader from "../../../Components/Loader";

function AddStudent({ addStudent, addStudentHeading, setAddStudent }) {
  const { handleUpdate , loading } = useContext(AdminDataContext);
  const {token} = useContext(DataContext)

  // States for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(addStudent);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // Filtered students effect
  useEffect(() => {
    let students = [...addStudent];
    // Search by name
    if (searchTerm) {
      students = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    // Filter by institute
    if (selectedInstitute) {
      students = students.filter(
        (student) => student.institute_id.institute_name === selectedInstitute
      );
    }

    // Filter by course
    if (selectedCourse) {
      students = students.filter(
        (student) => student.course_id.courseName === selectedCourse
      );
    }

    setFilteredStudents(students);
  }, [searchTerm, selectedInstitute, selectedCourse, addStudent]);

  const handleDeleteBtn = async (id) => {
    const deleted = confirm("Are you sure you want to delete this student?");
    if (deleted) {
      try {
        await fetch(`http://localhost:3000/students/${id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json', // Set content type
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
        });
        const remainingStudents = addStudent.filter((item) => item._id !== id);
        setAddStudent(remainingStudents);
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // Get unique institutes and courses for filter dropdowns
  const institutes = [...new Set(addStudent.map((student) => student.institute_id.institute_name))];
  const courses = [...new Set(addStudent.map((student) => student.course_id.courseName))];


// Pagination logic 

const itemsPerPage = 10; 
const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const currentStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);





  return (
    <>
      {/* Search Bar and Filters */}
      <div className="flex gap-4 mb-4 w-[97.5%]">
        <input
          type="text"
          placeholder="Search by student name"
          className="border px-4 py-2 w-full rounded-[5px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-[5px]"
          value={selectedInstitute}
          onChange={(e) => setSelectedInstitute(e.target.value)}
        >
          <option value="">All Institutes</option>
          {institutes.map((institute, index) => (
            <option key={index} value={institute}>
              {institute}
            </option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded-[5px]"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">All Courses</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>



  {!loading ? 
  <>
  {filteredStudents && filteredStudents.length > 0 ? (
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
              {currentStudents.map(
                ({ _id, imageUrl, course_id, institute_id, email, name }, index) => {
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
                            onClick={() => handleUpdate(_id)}
                            type="button"
                            className="text-white bg-[#4f46e5] font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBtn(_id)}
                            className="text-[35px] text-[#e02424]"
                          >
                            <MdDelete />
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
      {totalPages > 1 && (

      <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="border px-4 py-2 rounded-lg bg-[#4f46e5] text-white disabled:opacity-50"
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="border px-4 py-2 rounded-lg bg-[#4f46e5] text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
    )}





    </div>
  ) : (
    <div></div>
  )}
</>:

<Loader/>








}

      




    </>
  );
}

export default AddStudent;
