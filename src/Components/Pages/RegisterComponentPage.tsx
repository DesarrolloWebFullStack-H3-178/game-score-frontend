'use client';

import Link from "next/link";
import React from "react";
import FooterAuth from "game-score-frontend/Components/Footers/FooterAuth";
import Navbar from "game-score-frontend/Components/Organisms/Navbars/AuthNavbar";
import RegisterForm from "game-score-frontend/Components/Organisms/Forms/RegisterFormComponentOrganism";
import ProvidersComponentMolecule from "../Molecules/SocialAuth/ProvidersComponentMolecule";
import SignInMessageComponentAtom from "../Atoms/Titles/SignInMessageComponentAtom";
import CredentialsMessageComponentAtom from "../Atoms/Titles/CredentialsMessage";
import BackGroundAuthComponentAtom from "../Atoms/Styles/BackGroundAuthComponentAtom";

export default function RegisterComponentPage() {

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
          <BackGroundAuthComponentAtom />
          <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
              <div className="rounded-t mb-0 px-4 py-4">
                <SignInMessageComponentAtom />
                <ProvidersComponentMolecule />
                <hr className="mt-6 border-b-1 border-gray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <CredentialsMessageComponentAtom/>
                <RegisterForm onSuccess={handleSuccess}/>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
                        <div className="w-1/2"></div>
                        <div className="w-1/2 text-right">
                        <small className="text-gray-600">Do you have acount? </small>
                            <Link 
                            className="text-gray-200"
                            href="/Auth/Login">
                                <small>Login</small>
                            </Link>
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
