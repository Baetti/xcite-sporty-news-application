import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // login
  const login = async () => {
    setLoading(true);
    try {
      const payload = {
        email,
        password,
      };
      const result = await axios.post("/api/users/userlogin", payload);
      console.log(result.data);
      toast.success("Login Successfull", {
        position: toast.POSITION.TOP_CENTER,
      });
      localStorage.setItem("xcitesporty-user", JSON.stringify(result.data));
      navigate("/home");
      setLoading(false);
    } catch (error) {
      toast.error("Enter Valid Input", {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
    }
  };

  // register

  const register = async () => {
    setLoading(true);
    try {
      const payload = {
        name,
        email,
        password,
      };
      await axios.post("/api/users/userregister", payload);
      toast.success("Registeration Successfull!!! Please Login", {
        position: toast.POSITION.TOP_CENTER,
      });
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setShowRegisterForm(false);
      setShowLoginForm(true);
    } catch (error) {
      toast.error(`Enter Valid inputs or User Exists...`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("xcitesporty-user")) {
      navigate("/home");
    }
  });

  return (
    <>
      <div className="h-screen flex items-center">
        {loading && <Spinner />}
        <div className="w-1/2 px-10 space-y-5 ">
          <h1>
            <span className="text-7xl text-amber-400">XCITE</span>{" "}
            <span className="text-7xl text-yellow-950"> NEWS</span>
          </h1>
          <p className="text-3xl">
            Stay ahead of the <span className="text-teal-600">GA</span>
            <span className="text-sky-700">ME</span>
          </p>
          <div className="space-x-5">
            <button
              className="bg-teal-600 px-10 py-3 rounded text-white"
              onClick={() => {
                setShowRegisterForm(false);
                setShowLoginForm(true);
              }}
            >
              LOG IN
            </button>
            <button
              className=" px-10 py-3 bg-sky-700 rounded text-white"
              onClick={() => {
                setShowLoginForm(false);
                setShowRegisterForm(true);
              }}
            >
              REGISTER
            </button>
          </div>
        </div>

        <div className="w-1/2 p-5 ">
          {!showLoginForm && !showRegisterForm && (
            <lottie-player
              src="https://lottie.host/61bbd53b-2448-4246-9240-f4bbec0009a2/Is0y2pisIV.json"
              background="#fff"
              speed="1"
              // style={{ width: "300px", height: "300px" }}
              loop
              autoplay
              direction="1"
              mode="normal"
            ></lottie-player>
          )}
          {/* login form */}
          {showLoginForm && (
            <div className=" ml-20">
              <div className="flex flex-col h-screen justify-center items-center px-20 space-y-5">
                <h1 className="text-4xl text-teal-600 text-center w-full font-semibold my-5">
                  LOGIN
                </h1>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="w-full h-10 border-2 rounded border-sky-600 px-2 bg-transparent"
                  placeholder="Enter Your Email "
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full h-10 border-2 rounded border-sky-600 px-2 bg-transparent"
                  placeholder="Enter Your Password "
                />
                <div className="flex justify-center w-full">
                  <button
                    className=" px-10 py-3 bg-teal-600 rounded text-white"
                    onClick={login}
                  >
                    LOGIN
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* registration form */}
          {showRegisterForm && (
            <div className="ml-20">
              <div className="flex flex-col h-screen justify-center items-center px-20 space-y-5">
                <h1 className="text-4xl text-sky-700 text-center w-full font-semibold my-5">
                  REGISTER HERE
                </h1>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full h-10 border-2 rounded border-emerald-600 px-2 bg-transparent"
                  placeholder="Enter Your Name "
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="w-full h-10 border-2 rounded border-emerald-600 px-2 bg-transparent"
                  placeholder="Enter Your Email "
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full h-10 border-2 rounded border-emerald-600 px-2 bg-transparent"
                  placeholder="Enter Your Password "
                />
                <div className="flex justify-center w-full">
                  <button
                    className=" px-10 py-3 bg-sky-700 rounded text-white"
                    onClick={register}
                  >
                    REGISTER
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {(showLoginForm || showRegisterForm) && (
          <AiOutlineClose
            className="absolute top-5 right-5 z-10 cursor-pointer text-yellow-950"
            size={20}
            // color="yellow"
            onClick={() => {
              setShowLoginForm(false);
              setShowRegisterForm(false);
            }}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default LandingPage;
