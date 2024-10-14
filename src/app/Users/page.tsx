"use client";
import {useEffect, useState} from "react";
import type { NextPage } from 'next'

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
}

const UserPage : NextPage = () => {
    const [user, setUser] = useState<User[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/users")
            .then(res => res.json())
            .then(data => {
                setUser(data.users);
                console.log( data.users );
                
            })
            .catch(err => console.log(err));
    }, []);

    return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-700">
            <div className="mb-4">
                <h1 className="text-green-700">Users Page</h1>
            </div>
            
            <table className="table-fixed bg-white p-6 rounded-lg shadow-md max-w-screen-md w-full">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="p-4 border-b">User Id</th>
                        <th className="p-4 border-b">Score</th>
                        <th className="p-4 border-b">Date</th>
                        <th className="p-4 border-b">Game</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map(us => (
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
}
export default UserPage;