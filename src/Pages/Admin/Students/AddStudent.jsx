import { useContext, useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { AdminDataContext } from "../AdiminData";
import { DataContext } from "../../../Store/store";
import Loader from "../../../Components/Loader";

function AddStudent({ addStudent, addStudentHeading, setAddStudent }) {
  const { handleUpdate, loading } = useContext(AdminDataContext);
  const { token } = useContext(DataContext);
  const { courses, institutes } = useContext(AdminDataContext);

  // States for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(addStudent);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter students based on search and filters
  useEffect(() => {
    setCurrentPage(1); // Reset pagination on filter change

    let students = [...addStudent];

    if (searchTerm) {
      students = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    if (selectedInstitute) {
      students = students.filter(
        (student) => student.institute_id.institute_name === selectedInstitute
      );
    }

    if (selectedCourse) {
      students = students.filter(
        (student) => student.course_id.courseName === selectedCourse
      );
    }
    setFilteredStudents(students);
  }, [searchTerm, selectedInstitute, selectedCourse, addStudent]);

  // Delete student
  const handleDeleteBtn = async (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await fetch(`${import.meta.env.VITE_BASE_URL}/students/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const remainingStudents = addStudent.filter((item) => item._id !== id);
        setAddStudent(remainingStudents);
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Please try again.");
      }
    }
  };

  // Get unique institutes and courses for filter dropdowns
  // const institutes = useMemo(
  //   () => [...new Set(addStudent.map((student) => student.institute_id.institute_name))],
  //   [addStudent]
  // );

  // Pagination logic
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          {institutes && institutes.length > 0 ? (
            institutes.map((institute, index) => (
              <option key={index} value={institute.institute_name}>
                {institute.institute_name}
              </option>
            ))
          ) : (
            <option disabled>Loading Institutes...</option>
          )}
        </select>

        <select
          className="border px-4 py-2 rounded-[5px]"
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
          }}
        >
          <option value="">All Courses</option>
          {/* Render options with proper handling of course object */}
          {courses && courses.length > 0 ? (
            courses.map((course, index) => (
              <option key={index} value={course.courseName}>
                {course.courseName}
              </option>
            ))
          ) : (
            <option disabled>Loading courses...</option>
          )}
        </select>
      </div>

      {/* Students Table */}
      {!loading ? (
        <>
          {filteredStudents.length > 0 ? (
            <div className="flex flex-col w-[97.5%]">
              <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle shadow sm:rounded-lg border-b border-gray-200">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        {addStudentHeading.map(({ headline }, index) => (
                          <th
                            key={index}
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                          >
                            {headline}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {currentStudents.map(
                        (
                          {
                            _id,
                            imageUrl,
                            course_id,
                            institute_id,
                            email,
                            name,
                          },
                          index
                        ) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="flex items-center">
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src={imageUrl}
                                  alt=""
                                />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {institute_id.institute_name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 border-b border-gray-200">
                              {course_id.courseName}
                            </td>
                            <td className="px-6 py-4 text-right whitespace-no-wrap border-b border-gray-200">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleUpdate(_id)}
                                  className="text-white bg-[#4f46e5] font-medium rounded-lg text-sm px-5 py-2.5"
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
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="border px-4 py-2 rounded-lg bg-[#4f46e5] text-white disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="border px-4 py-2 rounded-lg bg-[#4f46e5] text-white disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500">No students found.</div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default AddStudent;
