import React, { useContext } from "react";
import { FaHome, FaInfo } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { CiDollar, CiFolderOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { IoDocuments } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { DataContext } from "../Store/store";
import { FaGooglePay } from "react-icons/fa6";

function Sidebar({ setisExpended, isExpended }) {
  
  const {user} = useContext(DataContext);

  const Links = user.role === "admin" 
        ? [
            {
                name: "Dashboard",
                icon: <FaHome />,
                path: "/",
            },
            {
                name: "Students",
                icon: <FiUsers />,
                path: "/students",
            },
            {
                name: "Courses",
                icon: <CiFolderOn />,
                path: "/courses",
            },
            {
                name: "Announcement",
                icon: <CiCalendar />,
                path: "/announcement",
            },
            {
                name: "Pending Fee",
                icon: <IoDocuments />,
                path: "/pendingfee",
            },
            {
                name: "Fee Approval",
                icon: <CiDollar />,
                path: "/fee-approval",
            },
        ]
        : user.role === "student"
        ? [
            {
                name: "Course Details",
                icon: <CiFolderOn />,
                path: "/",
            },
            {
                name: "Announcement",
                icon: <CiCalendar />,
                path: "/announcement",
            },
            {
                name: "Past Payments",
                icon: <IoDocuments />,
                path: "/past-fees",
            },
            {
                name: "Pay Fees",
                icon: <FaGooglePay />,
                path: "/payfees",
            },
        ]
        : user.role === "clerk"
        ? [
            {
                name: "Dashboard",
                icon: <CiFolderOn />,
                path: "/",
            },
            {
                name: "Students",
                icon: <CiCalendar />,
                path: "/students",
            },
            {
                name: "Pending Fee",
                icon: <IoDocuments />,
                path: "/fee-collection",
            },
            {
                name: "Fee Payment",
                icon: <FaGooglePay />,
                path: "/payfees",
            },
            {
                name: "Enquiry",
                icon: <FaInfo />,
                path: "/enquiry",
            },
        ]:[]; 


  return (
    <>
      <div className="container">
        <div className="bg-[#4f46e5]  h-screen p-5  ">
          <div
            className={
              isExpended
                ? "logo flex justify-between items-center mb-10"
                : "justify-center logo flex items-center  mb-10"
            }
          >
            {!isExpended ? (
              ""
            ) : (
              <img
                className="w-10"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=white"
                alt=""
              />
            )}

            <MdKeyboardArrowRight
              onClick={() => setisExpended(!isExpended)}
              className="bg-white rounded-full cursor-pointer text-[24px]"
            />
          </div>

          <div className="navigation">
            <ul>
              {Links.map((list, index) => {
                return (
                  <NavLink
                    to={list?.path}
                    key={index}
                    className="flex items-center gap-2 cursor-pointer	hover:bg-black hover:bg-opacity-20 text-white py-2 px-2 my-1 rounded text-[17px]  bg-opacity-15	"
                  >
                    {!isExpended ? (
                     <span className="text-[24px]"> {list.icon }</span>
                    ) : (
                      <>
                        <span className="text-[20px]">{list.icon} </span>{list.name}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
