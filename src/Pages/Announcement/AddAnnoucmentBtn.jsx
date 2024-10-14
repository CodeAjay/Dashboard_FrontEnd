import { useContext } from "react";
import { IoAddCircle } from "react-icons/io5";
import { DataContext } from "../../Store/store";
import AnnouncementForm from "./AnnouncementForm";

function AddAnnoucmentBtn() {

const {handleAnnouncementPopup ,announcPopup , removeAnnouncementPopup } = useContext(DataContext)

  return (
    <>
      <button onClick={handleAnnouncementPopup}  className="bg-[#4f46e5] mb-[20px] text-[#fff] font-bold py-2 px-4 rounded inline-flex items-center">
        <IoAddCircle />
        <span>Add Announcement</span>
      </button>

      <div onClick={removeAnnouncementPopup} className={announcPopup ?" z-10 absolute flex justify-center items-center bg-[#00000087] h-[100%] w-[100%] top-0 bottom-0 right-0 left-0":""}>

     {announcPopup? <AnnouncementForm/>  :""} 
      </div>
    </>
  );
}

export default AddAnnoucmentBtn;
