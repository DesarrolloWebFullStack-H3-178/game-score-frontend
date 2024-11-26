'use client';

import Link from "next/link";
import FooterAuth from "game-score-frontend/Components/Footers/FooterAuth";
import GitHubComponentAtom from "game-score-frontend/Components/Atoms/Buttons/GitHubComponentAtom";
import GoogleComponentAtom from "game-score-frontend/Components/Atoms/Buttons/GoogleComponentAtom";
import BackGroundAuthComponentAtom from "game-score-frontend/Components/Atoms/Styles/BackGroundAuthComponentAtom";
import LoginFormComponentOrganism from "game-score-frontend/Components/Organisms/Forms/LoginFormComponentOrganism";


export default function LoginSectionComponent() {
    return (
        <main>
            <BackGroundAuthComponentAtom />
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div className="container mx-auto px-4 h-full">
                    
                        <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-4/12 px-4">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 bg-gray-200">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                <h6 className="text-gray-500 text-sm font-bold">
                                    Sign in with
                                </h6>
                                </div>
                                <div className="btn-wrapper text-center">
                                <GitHubComponentAtom />
                                <GoogleComponentAtom />
                                </div>
                                <hr className="mt-6 border-b-1 border-gray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-gray-400 text-center mb-3 font-bold">
                                <small>Or sign in with credentials</small>
                                </div>
                                <LoginFormComponentOrganism />
                            </div>
                            </div>
                            <div className="flex flex-wrap mt-6 relative">
                                <div className="w-1/2">
                                    {/* <Link
                                    href=""
                                    onClick={(e) => e.preventDefault()}
                                    className="text-gray-200"
                                    >
                                    <small>Forgot password?</small>
                                    </Link> */}
                                </div>
                                <div className="w-1/2 text-right">
                                    <Link 
                                    className="text-gray-200"
                                    href="/Auth/Register">
                                        <small>Create new account</small>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <FooterAuth />
                </section>
            </main>
    );
}