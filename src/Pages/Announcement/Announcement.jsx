import React from 'react'
import AnnouncementList from './AnnouncementList'
import AddAnnoucmentBtn from './AddAnnoucmentBtn'

function Announcement() {
  return (
   <>
   <div className="flex items-end justify-end w-[97.5%]">

   <AddAnnoucmentBtn/>
   </div>
   <AnnouncementList/>
   
   
   </>
  )
}

export default Announcement