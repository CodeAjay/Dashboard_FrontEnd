import React from "react";
import { FaHome } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { CiFolderOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { IoDocuments } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

function Sidebar({ setisExpended, isExpended }) {
  const Links = [
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
      name: "Migration",
      icon: <IoDocuments />,
      path: "/migration",
    },
  ];
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
