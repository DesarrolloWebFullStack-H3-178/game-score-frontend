"use client";
import { useEffect, useState } from "react";
import type { NextPage } from 'next';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
}

const UsersPage: NextPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/users");
                setUsers(response.data.users);
                console.log(response.data.users);
            } catch (err) {
                console.error(err);
                setError("Hubo un error al cargar los usuarios.");
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-gray-700">
            <div className="mb-4">
                <h1 className="text-green-700">Users Page</h1>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <table className="table-fixed bg-white p-6 rounded-lg shadow-md max-w-screen-md w-full">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="p-4 border-b">User Id</th>
                        <th className="p-4 border-b">username</th>
                        <th className="p-4 border-b">Email</th>
                        <th className="p-4 border-b">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(us => (
                        <tr key={us.id} className="bg-white hover:bg-gray-50 border-b border-dashed">
                            <td className="p-4 text-center">{us.name}</td>
                            <td className="p-4 text-center">{us.username}</td>
                            <td className="p-4 text-center">{us.email}</td>
                            <td className="p-4 text-center">{us.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;
