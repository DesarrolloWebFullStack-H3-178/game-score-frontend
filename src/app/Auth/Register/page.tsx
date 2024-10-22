'use client';

import React from "react";
import FooterAuth from "game-score-frontend/Components/Footers/FooterAuth";
import Navbar from "game-score-frontend/Components/Navbars/AuthNavbar";
import RegisterForm from "game-score-frontend/Components/Forms/RegisterForm";

export default function Register() {

  interface ApiResponse {
    id: string;
    name: string;
    username: string;
    email: string;
    // Agrega otros campos que pueda devolver la API si es necesario
  }

  const handleSuccess = (data: ApiResponse) => {
    // Muestra los datos de usuario registrado en la consola
    console.log("Registered user data:", data);
    localStorage.setItem("user", JSON.stringify(data));
  };


  return (
    <>
    <Navbar />
    <main className="bg-gray-800">
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-Gray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
              <div className="rounded-t mb-0 px-4 py-4">
                <div className="text-center mb-3">
                  <h6 className="text-gray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-gray-50 text-gray-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-gray-50 text-gray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-gray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <RegisterForm onSuccess={handleSuccess}/>
              </div>
            </div>
          </div>
        </div>
      </div>
          <FooterAuth />
        </section>
      </main>
      
    </>
  );
}
