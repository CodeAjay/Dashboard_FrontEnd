import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Store/store";

function Dashboard() {

const [course , setCourses] = useState([])
const {token} = useContext(DataContext)
  useEffect(() => {
    const showCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/clerk/courses", {
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`  
          },
        });
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    showCourses();
  }, [ token]);


  return (
    <>
<div className="w-[100%]  pl-[100px] mx-auto  overflow-hidden transition-transform transform flex justify-start items-center flex-wrap gap-8">
  
{course.map((items,index)=>{

return (

  <div key={index} className="col-3 bg-white rounded-lg shadow-lg" >
  <div className="relative">
    <img className="w-full h-48 object-cover rounded-tl-[12px] rounded-tr-[7px]" src={items?.imageUrl} alt={items?.courseName} />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
    <h2 className="absolute bottom-4 left-4 text-white text-2xl font-bold">{items?.courseName}</h2>
  </div>
  
  <div className="p-6">
    <p className="text-gray-700 mt-2">
      <span className="font-semibold">Duration:</span> {items?.course_duration} Months
    </p>
    <p className="text-gray-700 mt-1">
      <span className="font-semibold">Enrolled Students:</span> {items?.studentsEnrolled}
    </p>
    <p className="text-gray-700 mt-1">
      <span className="font-semibold">Total Fee:</span> ₹{items?.totalFee}
    </p>
  </div>
  </div>


)



})}

 



</div>

</>

  )
}

export default Dashboard