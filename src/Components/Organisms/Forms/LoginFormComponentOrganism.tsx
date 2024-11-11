'use client';

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginFormComponentOrganism() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleSubmit = async () => {
        setLoading(true); // Inicia el estado de carga
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('email', formData.email);
            formDataToSend.append("password", formData.password);

            const response = await axios.post(`${backendUrl}/auth/login`, 
                { formDataToSend });

            if (response.status === 200 || response.status === 201) {
                const { token, user } = response.data;
                console.log("Login successful", token);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                router.push(`/Users/Admin?limit=20&page=1`);
            }
        } catch (error) {
            console.error('An error occurred while user login', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form>
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <div className="text-center mt-6">
                    <button
                        className="bg-gray-800 text-white active:bg-gray-600 hover:bg-teal-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading} // Deshabilita el botón mientras se carga
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                <span className="ml-2">Loading...</span>
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </div>
            </form>
        </>
    )
}
