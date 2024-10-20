import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import { useContext, useState } from "react";
import Students from "./Pages/Admin/Students/Students";
import Announcement from "./Pages/Admin/Announcement/Announcement";
import Migration from "./Pages/Admin/Migration/Migration";
import Courses from "./Pages/Admin/Courses/Courses";
import { DataContext } from "./Store/store";
import StAnnouncement from "./Pages/StudentPortal/StAnnouncement";
import StCourse from "./Pages/StudentPortal/StCourse";
import StPastPayments from "./Pages/StudentPortal/StPastPayments";
import StPayFees from "./Pages/StudentPortal/StPayFees";


function App() {
const {user} = useContext(DataContext)

  // console.log(user);

  const [isExpended, setisExpended] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="w-full max-h-[100vh] overflow-hidden">
          <div className="row flex">
            <div className={isExpended ? "lg:w-[15%] md:w-[15%] sm:w-[10%] duration-[1000ms] lg:block md:block sm:block hidden" : "lg:w-[5%] md:w-[5%] sm:w-[0%] w-[20%] duration-[500ms] lg:block md:block sm:block block"}>
              <Sidebar setisExpended={setisExpended} isExpended={isExpended} />
            </div>
            <div className="w-[100%]">
              <Header setisExpended={setisExpended} isExpended={isExpended} />
              <div className="h-[90vh] overflow-x-hidden p-5 bg-[#e5e7eb]">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      ),
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/students", element: <Students /> },
        { path: "/courses", element: <Courses /> },
        { path: "/announcement", element: <Announcement /> },
        { path: "/pendingfee", element: <Migration /> },
      ],
    },
  ]);

  const studentRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="w-full max-h-[100vh] overflow-hidden">
          <div className="row flex">
            <div className={isExpended ? "lg:w-[15%] md:w-[15%] sm:w-[10%] duration-[1000ms] lg:block md:block sm:block hidden" : "lg:w-[5%] md:w-[5%] sm:w-[0%] w-[20%] duration-[500ms] lg:block md:block sm:block block"}>
              <Sidebar setisExpended={setisExpended} isExpended={isExpended} />
            </div>
            <div className="w-[100%]">
              <Header setisExpended={setisExpended} isExpended={isExpended} />
              <div className="h-[90vh] overflow-x-hidden p-5 bg-[#e5e7eb]">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      ),
      children: [
        { path: "/", element: <StCourse/> },
        { path: "/announcement", element: <StAnnouncement /> },
        { path: "/past-fees", element: <StPastPayments /> },
        { path: "/payfees", element: <StPayFees /> },
      ],
    },
  ]);

  return (
  
      <RouterProvider router={user === "admin" ? router : user === "student" ? studentRouter : router} />
   
  );
}

export default App;
