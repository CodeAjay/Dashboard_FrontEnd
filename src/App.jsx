import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Dashboard from "./Pages/Dashboard/Dashboard";
import Courses from "./Pages/Courses/Courses";
import { useState } from "react";
import Students from "./Pages/Students/Students";
import Announcement from "./Pages/Announcement/Announcement";
import Migration from "./Pages/Migration/Migration";
import Store from "./Store/store";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  const [isExpended, setisExpended] = useState(true);

  return (
    <>
    <Store>   
      <BrowserRouter>
        <div className=" w-full max-h-[100vh] overflow-hidden">
          <div className="row flex">
            <div
              className={
                isExpended
                  ? "lg:w-[15%] md:w-[15%] sm:w-[10%] duration-[1000ms] lg:block md:block sm:block hidden" 
                  : "lg:w-[5%] md:w-[5%] sm:w-[0%] w-[20%] duration-[500ms] lg:block md:block sm:block block"
              }
            >
              <Sidebar setisExpended={setisExpended} isExpended={isExpended} />
            </div>

            <div className={isExpended ? "w-[100%] " : "w-[100%]"}>
              <Header setisExpended={setisExpended} isExpended={isExpended} />
              <div className=" h-[90vh] overflow-x-hidden p-5 bg-[#e5e7eb]">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/announcement" element={<Announcement />} />
                  <Route path="/pendingfee" element={<Migration />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
      </Store>
    </>
  );
}

export default App;
