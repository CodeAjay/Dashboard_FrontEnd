import { createContext } from "react";
export const StudentDataContext = createContext();
export function StudentData({children}) {




    
  return (
   
   <StudentDataContext.Provider value={{}}> {children} </StudentDataContext.Provider> 
  )
}

export default StudentData