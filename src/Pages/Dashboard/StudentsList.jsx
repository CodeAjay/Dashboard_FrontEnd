import { useContext } from "react";
import { DataContext } from "../../Store/store";

function StudentsList() {
  const { studentsList, studentHeading } = useContext(DataContext);
  console.log(studentHeading, "studentHeading");

  return (
    <>
      {studentsList && studentsList.length > 0 ? (
        <div className="flex flex-col w-[97.5%] ">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle  shadow sm:rounded-lg border-b border-gray-200 ">
              <table className=" min-w-full">
                <thead>
                  <tr>
                    {studentHeading.map(({ headline }, index) => {
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
                  {studentsList.map(
                    (
                      {
                        avatar,
                        course,
                        description,
                        email,
                        name,
                        status,
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
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                              {status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            {course}
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

export default StudentsList;
