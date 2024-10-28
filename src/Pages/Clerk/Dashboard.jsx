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

console.log(course)

  return (
<div class="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform ">
  <div class="relative">
    <img class="w-full h-48 object-cover" src={course[0]?.imageUrl} alt={course[0]?.courseName} />
    <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
    <h2 class="absolute bottom-4 left-4 text-white text-2xl font-bold">{course[0]?.courseName}</h2>
  </div>
  
  <div class="p-6">
    <p class="text-gray-700 mt-2">
      <span class="font-semibold">Duration:</span> {course[0]?.course_duration} Months
    </p>
    <p class="text-gray-700 mt-1">
      <span class="font-semibold">Enrolled Students:</span> {course[0]?.studentsEnrolled}
    </p>
    <p class="text-gray-700 mt-1">
      <span class="font-semibold">Total Fee:</span> ₹{course[0]?.totalFee}
    </p>
  </div>
</div>



  )
}

export default Dashboard