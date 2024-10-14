import { useContext, useState } from "react";
import { DataContext } from "../../Store/store";

function AnnouncementForm() {
    const {handleAnnouncmentContent,anTitle, anDes, anbtn,setAnTitle, setAnDes,announce, setAnnounce,updateAnFun, setAnnouncePopup} = useContext(DataContext)

    // const [title, setTitle]=useState("")
    // const [description, setDescription]=useState("")

    const addAnnouncement=async ()=>{
      const response = await fetch("http://localhost:3000/announcements", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title:anTitle, description:anDes }),
      }
    )
    if(response.status == 201){
      const an = await response.json();
      setAnnouncePopup(false)
      setAnnounce([an, ...announce]);
      console.log(an)

    }
    }



  return <>
     <div className="w-[400px]" onClick={handleAnnouncmentContent} >
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        AddTitle
      </label>
      <input
      value={anTitle}
     onChange={(e)=>setAnTitle(e.target.value)}
      
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="AddTitle"
      />
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        Description
      </label>
      <input
      value={anDes}
      onChange={(e)=>setAnDes(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Description"
      />
    </div>
  
    <div className="flex items-center justify-between">
      <button
     onClick={anbtn?updateAnFun:addAnnouncement}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
    {anbtn?"Update Announcement":"Add Announcement"}
      </button>
      
    </div>
  </form>
  
</div>
  
  
  
  
  </>;
}

export default AnnouncementForm;
