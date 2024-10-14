import { IoAddCircle } from "react-icons/io5";
import StudentDetailsForm from "./StudentDetailsForm";
import { useContext } from "react";
import { DataContext } from "../../Store/store";

function AddStudentButton() {

const {popup, handleOnclick ,removeOnclick } = useContext(DataContext)
  return (
    <>
      <button
        onClick={handleOnclick}
        className="bg-[#4f46e5] mb-[20px] text-[#fff] font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <IoAddCircle />
        <span>Add Student</span>
      </button>

{/* Popup content */}

<div onClick={removeOnclick} className={popup? "absolute flex justify-center items-center bg-[#00000087] h-[100%] w-[100%] top-0 bottom-0 right-0 left-0": ""}>
{popup?<StudentDetailsForm/>:""}





</div>



    </>
  );
}

export default AddStudentButton;
