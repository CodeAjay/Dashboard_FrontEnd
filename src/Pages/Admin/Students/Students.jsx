import AddStudent from "./AddStudent";
import { useContext } from "react";
import AddStudentButton from "./AddStudentButton";
import { AdminDataContext } from "../AdiminData";
function Students() {
  const { addStudentHeading, addStudent, setAddStudent, setPopup, courses } =
    useContext(AdminDataContext);

  return (
    <>
      <div className="pl-[30px] container ">
        <div className="flex justify-end w-[97.5%] ">
          <AddStudentButton />
        </div>
        <AddStudent
          addStudent={addStudent}
          addStudentHeading={addStudentHeading}
          setAddStudent={setAddStudent}
          setPopup={setPopup}
          courses={courses}
        />
      </div>
    </>
  );
}

export default Students;
