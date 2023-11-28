import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar({ showSideBar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    {
      title: "Home",
      path: "/home",
    },
    {
      title: "Posted",
      path: "/posted",
    },
    {
      title: "Add News",
      path: "/add",
    },
    // {
    //   title: "Profile",
    //   path: "/profile",
    // },
    {
      title: "Log Out",
      path: "/logout",
    },
  ];

  const logout = () => {
    localStorage.removeItem("xcitesporty-user");
    navigate("/");
  };
  return (
    <>
      <div
        className={` transition-all duration-300 bg-primary h-screen flex flex-col overflow-hidden ${
          showSideBar ? "w-52" : "w-0"
        } `}
      >
        <div className="">
          <h1 className="text-3xl font-bold text-amber-400 text-center mt-10">
            Xcite Sporty
          </h1>
        </div>

        <div className="flex flex-col  mt-10 text-center">
          {menuItems.map((item) => {
            return item.title !== "Log Out" ? (
              <Link
                to={`${item.path}`}
                className={`px-5 py-5 text-white hover:bg-teal-800 hover:text-red-700 text-sm ${
                  location.pathname.includes(item.path) &&
                  "bg-[#5678] text-yellow-600 "
                }`}
              >
                {item.title}
              </Link>
            ) : (
              <div className="px-5 py-5 text-white hover:bg-teal-800 hover:text-red-700 text-sm cursor-pointer">
                <button onClick={logout}>LogOut</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
