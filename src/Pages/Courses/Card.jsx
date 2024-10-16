import { useContext } from "react";
import { ImUsers } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { DataContext } from "../../Store/store";
function Card({ courseItems , index}) {
  const {_id,   imageUrl, student, courseName, studentsEnrolled, institute_id } = courseItems;
  // console.log(courseItems)

  const{deleteCourseItem , editCourseData} = useContext(DataContext)
  return (
    <>
      <div   className="relative flex flex-col mb-2 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
        <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
          <img
            src={imageUrl}
            alt="card-image"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <h6 className="text-slate-800 text-xl font-semibold">
              {courseName}
            </h6>
            <div className="flex items-center  ml-auto ">
              <p className="text-1xl pr-4">Students: {studentsEnrolled} </p>
              <ImUsers className="text-[20px]" />

              <span className="text-slate-600 mr-[10px]">{student}</span>
            </div>
          </div>
          <div className="flex justify-between items-start gap-2 mt-[15px]">
            <div className="flex items-center justify-center">
            <button onClick={()=>editCourseData(index)}
              type="button"
              className=" text-white bg-[#4f46e5]  font-medium rounded-lg text-[14px] px-5
                             py-1.5"
            >
              Edit
            </button>
            <button onClick={()=>deleteCourseItem(_id)} className="text-[30px] text-[#e02424]">
              <MdDelete />
            </button>
            </div>
            <p className="text-1xl font-bold">{institute_id?"Institute: "+institute_id.institute_name:""}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
