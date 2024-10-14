function Cart({ title , bgColor, icon ,descriptioin }) {

  return (
    <>
      <div className="max-w-sm p-6 border border-gray-200 rounded-lg shadow bg-white flex gap-5 items-center ">
      {/* <items.icon className={`text-white text-6xl bg-[${items.bgColor}] rounded-full p-2`} /> */}
<span className="text-white text-5xl rounded-full p-3" style={{background:bgColor}} >{icon}</span>
      
        <div className="">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
            {title}
          </h5>

          <p className="mb-3 font-normal text-black">{descriptioin}</p>
        </div>
      </div>
    </>
  );
}

export default Cart;
