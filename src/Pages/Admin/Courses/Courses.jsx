import { useContext } from "react";
import Card from "./Card";
import AddCourseBtn from "./AddCourseBtn";
import { AdminDataContext } from "../AdiminData";

function Courses() {
  const { courses } = useContext(AdminDataContext);

  // console.log(courses)

  return (
    <>
      <div className="flex container gap-6 py-[25px] flex-wrap justify-left px-[25px]">
      <div className="flex justify-end w-[97.5%] ">
    <AddCourseBtn/>
  </div>

      <div className="flex flex-wrap gap-6">
        {courses.map((courseItems, index) => {
          return <Card key={index}   index={index} courseItems={courseItems} />;
        })}
        </div>
      </div>
    </>
  );
}

export default Courses;
