import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { DataContext } from "../../Store/store";

function AddStudent({addStudent , addStudentHeading , setAddStudent }) {

const {handleUpdate} = useContext(DataContext)






const handleDeleteBtn = (id) => {

const isConfirmed = confirm("Are you sure you want to delete the user?");
    if (isConfirmed) {
        const removeItem = addStudent.filter((item) => item.id !== id);
        setAddStudent(removeItem);
    }
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
                      { id,
                        avatar,
                        course,
                        description,
                        email,
                        name,
                        title,
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
                                  src={avatar}
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
                              {title}
                            </div>
                            <div className="text-sm leading-5 text-gray-500">
                              {description}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            {course}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                            
                            <div className="flex justify-end items-start gap-2">
                            <button  onClick={()=>handleUpdate(index)} type="button" className=" text-white bg-[#4f46e5]  font-medium rounded-lg text-sm px-5 py-2.5 mb-2">Edit</button>
                            <button onClick={()=>handleDeleteBtn(id)} className="text-[35px] text-[#e02424]"><MdDelete /></button>
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
