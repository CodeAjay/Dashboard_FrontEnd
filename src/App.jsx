import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import { useContext, useState } from "react";
import Students from "./Pages/Admin/Students/Students";
import Announcement from "./Pages/Admin/Announcement/Announcement";
import Courses from "./Pages/Admin/Courses/Courses";
import { DataContext } from "./Store/store";
import StAnnouncement from "./Pages/StudentPortal/StAnnouncement";
import StCourse from "./Pages/StudentPortal/StCourse";
import StPastPayments from "./Pages/StudentPortal/StPastPayments";
import StPayFees from "./Pages/StudentPortal/StPayFees";
import PendingFeesStudents from "./Pages/Admin/Migration/PendingFeeStudents";
import LoginPage from "./Pages/Login";
import FeeCollection from "./Pages/Clerk/FeeCollection";
import Student from "./Pages/Clerk/Students/Students"
import ClerkDashboard from "./Pages/Clerk/Dashboard"
import AdminDataProvider from "./Pages/Admin/AdiminData";



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
        { path: "/login", element: <LoginPage /> },
        { path: "/students", element: <Students /> },
        { path: "/courses", element: <Courses /> },
        { path: "/announcement", element: <Announcement /> },
        { path: "/pendingfee", element: <PendingFeesStudents /> },
        // { path:"*", element:<NotFound /> }
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
        { path: "/login", element: <LoginPage /> },
        { path: "/announcement", element: <StAnnouncement /> },
        { path: "/past-fees", element: <StPastPayments /> },
        { path: "/payfees", element: <StPayFees /> },
        // { path:"*", element:<NotFound /> }
      ],
    },
  ]);


  const clerkRouter = createBrowserRouter([
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
        { path: "/", element: <ClerkDashboard /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/announcement", element: <StAnnouncement /> },
        { path: "/fee-collection", element: <FeeCollection /> },
        { path: "/students", element: <Student /> },
        { path: "/payfees", element: <Student /> },
      ],
    },
  ]);

  
  const loginRouter = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
  ]);

 // TODO: Fix the routing errors

// Conditionally choose the router based on user role 
//   const selectedRouter = user.role === "admin" ? <AdminDataProvider>{router}</AdminDataProvider> : user.role === "student" ? studentRouter : user.role === "clerk" ? clerkRouter : loginRouter;

//   return (
//     // <ErrorBoundary>
//       <RouterProvider router={selectedRouter} />

//   );
// }



let selectedRouter;

  switch (user.role) {
    case "admin":
      selectedRouter = (
        <AdminDataProvider>
          <RouterProvider router={router} />
        </AdminDataProvider>
      );
      break;
    case "student":
      selectedRouter = <RouterProvider router={studentRouter} />;
      break;
    case "clerk":
      selectedRouter = <RouterProvider router={clerkRouter} />;
      break;
    default:
      selectedRouter = <RouterProvider router={loginRouter} />;
  }

  return selectedRouter;
}

export default App;
