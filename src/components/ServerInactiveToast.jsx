
export default function ServerInactiveToast() {
  return (
    <>
      <div className="w-[700vh] h-[200vh] bg-[#0000004e]  fixed top-0 overflow-hidden"></div>
      <div className="bg-[#ffffff17] lg:w-1/2 w-full h-1/2 fixed lg:left-0  lg:top-0 lg:rounded-br-full animate-ping"></div>
      <div className="bg-yellow-100 lg:w-1/2 h-1/2 fixed lg:left-0 bottom-0 lg:top-0 lg:rounded-br-full rounded-tl-full lg:rounded-tl-none rounded-tr-full lg:rounded-tr-none z-10 flex flex-col items-start justify-center px-10">
        <p className="border lg:mr-10">
          <span className="text-red-700 font-Noto font-bold text-2xl">
            Please be patient !
          </span>
          <br />
          <span className="text-xl text-blue-600 font-Noto">
            {" "}
            Free web service may pause after inactivity .{" "}
          </span>
          <span className="text-xl">
            Which can delay requests by 50 seconds or more.
          </span>
        </p>
      </div>
    </>
  );
}
