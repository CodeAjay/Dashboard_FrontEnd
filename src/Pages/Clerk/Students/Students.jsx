import AddStudent from "./AddStudent"
import { useContext } from "react";
import AddStudentButton from "./AddStudentButton";
import  { ClerkDataContext } from "../ClerkData";
function Students() {
  const { addStudentHeading ,clerkAddStudent, setClerkAddStudent,setPopup} = useContext(ClerkDataContext);


  return (
  <>
  <div className="pl-[30px] container ">
  <div className="flex justify-end w-[97.5%] ">
  <AddStudentButton/>
  </div>
<AddStudent clerkAddStudent={clerkAddStudent}  addStudentHeading={addStudentHeading} setClerkAddStudent={setClerkAddStudent} setPopup={setPopup}/>
</div>
  </>
  )
}

export default Students