
'use client';
import React from "react";
import Navbar from "game-score-frontend/Components/Organisms/Navbars/AuthNavbar";
import LoginSectionComponent from "../Molecules/Sections/LoginSectionComponentMolecule";

export default function LoginComponentPage() {

    return (
        <>
        <Navbar />
            <LoginSectionComponent />
        </>
    )
}