import { useContext, useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { ClerkDataContext } from "../ClerkData";
import { DataContext } from "../../../Store/store";

function AddStudent({ clerkAddStudent, addStudentHeading, setClerkAddStudent }) {
  const { handleUpdate } = useContext(ClerkDataContext);
  const {token} = useContext(DataContext)

  // States for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(clerkAddStudent);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // Filtered students effect
  useEffect(() => {
    let students = [...clerkAddStudent];

    // Search by name
    if (searchTerm) {
      students = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [searchTerm, selectedInstitute, selectedCourse, clerkAddStudent]);

  const handleDeleteBtn = async (id) => {
    const deleted = confirm("Are you sure you want to delete this student?");
    if (deleted) {
      try {
        await fetch(`http://localhost:3000/clerk/students/${id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json', // Set content type
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
        });
        const remainingStudents = clerkAddStudent.filter((item) => item._id !== id);
        setClerkAddStudent(remainingStudents);
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // Get unique institutes and courses for filter dropdowns
  const institutes = [...new Set(clerkAddStudent.map((student) => student.institute_id.institute_name))];
  const courses = [...new Set(clerkAddStudent.map((student) => student.course_id.courseName))];

  return (
    <>
      {/* Search Bar and Filters */}
      <div className="flex gap-4 mb-4 w-[97.5%]">
        <input
          type="text"
          placeholder="Search by student name"
          className="border px-4 py-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border px-4 py-2"
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
          className="border px-4 py-2"
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
                  {filteredStudents.map(
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
        </div>
      ) : (
        <div>No students found</div>
      )}
    </>
  );
}

export default AddStudent;
