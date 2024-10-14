import AddStudent from "./AddStudent"
import { useContext } from "react";
import { DataContext } from "../../Store/store";
import AddStudentButton from "./AddStudentButton";
function Students() {
  const { addStudentHeading ,addStudent, setAddStudent,setPopup} = useContext(DataContext);


  return (
  <>
  <div className="pl-[30px] container ">
  <div className="flex justify-end w-[97.5%] ">
  <AddStudentButton/>
  </div>
<AddStudent addStudent={addStudent}  addStudentHeading={addStudentHeading} setAddStudent={setAddStudent} setPopup={setPopup}/>
</div>
  </>
  )
}

export default Students