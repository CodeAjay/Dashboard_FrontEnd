import React, { useContext } from "react";
import Cart from "./Cart";
import { DataContext } from "../../Store/store";
import StudentsList from "./StudentsList";


function Dashboard() {
  const { cardDAta } = useContext(DataContext);
  return (
    <>
      <div className="grid-cols-12">
        <div className="container px-5">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          {/* card data */}

          <div className="grid-cols-12 flex flex-wrap py-5 pb-3">
            {cardDAta.map((items, index) => {
              return (
                <div key={index} className="w-[33.333%] mb-7">
                  <Cart
                    title={items.title}
                    descriptioin={items.descriptioin}
                    bgColor={items.bgColor}
                    icon={items.icon}
                  />
                </div>
              );
            })}
          </div>

          {/* Student  Data */}
        <StudentsList/>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
