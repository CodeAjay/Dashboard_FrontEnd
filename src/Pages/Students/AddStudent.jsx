import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { DataContext } from "../../Store/store";

function AddStudent({addStudent , addStudentHeading , setAddStudent }) {

const {handleUpdate} = useContext(DataContext)






const handleDeleteBtn = async (id) => {
      const deleted = confirm("Are you sure you want to delete this course?");

    if (deleted) {
      try {
        await fetch(`http://localhost:3000/students/${id}`, {
          method: "DELETE",
        });
        const remainingStudents = addStudent.filter((item) => item._id !== id);
        setAddStudent(remainingStudents);
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
        // const removeItem = addStudent.filter((item) => item.id !== id);
        // setAddStudent(removeItem);
}



  return (
    <>
      {addStudent && addStudent.length > 0 ? (
        <div className="flex flex-col w-[97.5%] ">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle  shadow sm:rounded-lg border-b border-gray-200 ">
              <table className=" min-w-full">
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
                  {addStudent.map(
                    (
                      { _id,
                        imageUrl,
                        course,
                        institute,
                        email,
                        name,
                      },
                      index
                    ) => {
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
                            <div className="text-sm leading-5 text-gray-900">
                              {}
                            </div>
                            <div className="text-sm leading-5 text-gray-500">
                              {institute}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            {course}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                            
                            <div className="flex justify-end items-start gap-2">
                            <button  onClick={()=>handleUpdate(index)} type="button" className=" text-white bg-[#4f46e5]  font-medium rounded-lg text-sm px-5 py-2.5 mb-2">Edit</button>
                            <button onClick={()=>handleDeleteBtn(_id)} className="text-[35px] text-[#e02424]"><MdDelete /></button>
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
        ""
      )}
    </>
  );
}

export default AddStudent;
