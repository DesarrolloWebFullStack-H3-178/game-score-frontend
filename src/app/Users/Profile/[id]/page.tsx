"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import type { NextPage } from 'next';

interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    isBlocked: boolean;
    image: string;
    highScore: number;
}

const UserProfilePage: NextPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            // Obtener el id de la URL
            const id = window.location.pathname.split('/').pop(); // Obtener el último segmento de la URL
            
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/v1/users/profile/${id}`, {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJpYXQiOjE3Mjg4Njk0MTIsImV4cCI6MTcyODg4MzgxMn0.MaXY4Lr8jpOQ_v-Jf_iSKl9vVXLHhnRSh4t6SvktyFE'
                        }
                    });

                    if (response.status === 200) {
                        setUser(response.data); // Guarda el usuario recibido
                        console.log(response.data);
                    }
                } catch (err) {
                    setError("Hubo un error al obtener los datos del usuario.");
                    console.error(err);
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-gray-700">
            <div className="mb-4">
                <h1 className="text-green-700">User Profile Page</h1>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {user ? (
                <table className="table-fixed bg-white p-6 rounded-lg shadow-md max-w-screen-md w-full">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="p-4 border-b">User Id</th>
                            <th className="p-4 border-b">Name</th>
                            <th className="p-4 border-b">Username</th>
                            <th className="p-4 border-b">Email</th>
                            <th className="p-4 border-b">Role</th>
                            <th className="p-4 border-b">High Score</th>
                            <th className="p-4 border-b">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={user.id} className="bg-white hover:bg-gray-50 border-b border-dashed">
                            <td className="p-4 text-center">{user.id}</td>
                            <td className="p-4 text-center">{user.name}</td>
                            <td className="p-4 text-center">{user.username}</td>
                            <td className="p-4 text-center">{user.email}</td>
                            <td className="p-4 text-center">{user.role}</td>
                            <td className="p-4 text-center">{user.highScore}</td>
                            <td className="p-4 text-center">
                                <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Cargando usuario...</p>
            )}
        </div>
    );
};

export default UserProfilePage;
