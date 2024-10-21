import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { DataContext } from '../../Store/store';

function StAnnouncement() {

const { token } = useContext(DataContext);
const [announceData , setAnnounceData ] = useState([])
const [anEye , setAnEye] = useState(false);
const [announced, setAnnounced ] =  useState({})

const openPopup = (id) => {
    setAnEye(true)
    setAnnounced(id)


}
const removePopup = () => {
    setAnEye(false)
}
const removeContent = (e) => {
    e.stopPropagation()
}


useEffect(()=>{

    const Announcement = async ()=>{

        const  announce = await fetch("http://localhost:3000/api/student/announcements",{
          headers: {
            'Content-Type': 'application/json', // Set content type
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
        });
        const annData = await announce.json();
        setAnnounceData(annData)
        }
        Announcement()


},[]) 


  return (
   <>
   
   
   <div className="flex flex-col w-[90.5%] m-[auto] ">
  <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
    <div className="inline-block min-w-full overflow-hidden align-middle  shadow sm:rounded-lg border-b border-gray-200 ">
      <table className=" min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              TITLE
            </th>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              DESCRIPTION
            </th>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              DATE
            </th>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50" />
          </tr>
        </thead>
        <tbody className="bg-white">

        {announceData.map((items,index) => {

        return (
            <>
            <tr key={index} className="border-b-2">
            <td className="px-6 py-4 whitespace-no-wrap  border-b border-gray-200">
              <span className="flex items-center">
                <span className="ml-0">
                  <span className="text-[15px] font-medium leading-5 text-gray-900">
                    {items.title}
                  </span>
                </span>
              </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <span className="text-sm leading-5 text-gray-900">{items.description}</span>
              <span className="text-sm leading-5 text-gray-500" />
            </td>
            <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
            {items.date}
            </td>
            <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
              <span className="flex justify-end items-start gap-2 cursor-pointer">
              <FaEye onClick={()=>openPopup(items)}/>

                
              </span>
            </td>
          </tr>


          <span onClick={removePopup} className={anEye?" z-10 absolute flex justify-center items-center bg-[#0000002f] h-[100%] w-[100%] top-0 bottom-0 right-0 left-0":"hidden"}>

          <span onClick={removeContent}  className="bg-white w-[600px] p-[30px] rounded-sm">

                <h1 className="font-bold text-2xl mb-2" >{announced.title}</h1>
                <p>{announced.description}</p>


          </span>

            
            </span>
            </>
        )

           


       



        })} 
         
        


        </tbody>
      </table>
    </div>
  </div>
</div>

   
   </>
  )
}

export default StAnnouncement