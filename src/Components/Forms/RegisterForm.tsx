import React, { useState, useEffect } from "react";
import axios from "axios";

interface ApiResponse {
    id: string;
    name: string;
    username: string;
    email: string;
    // Agrega otros campos de la respuesta si es necesario
}

interface RegisterFormProps {
    onSuccess: (data: ApiResponse) => void;
}


const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "",
        avatar: "https://avatars.githubusercontent.com/u/73078663"
        
      });

    const backendUrl = process.env.BACKEND_URL;

    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("username", formData.username);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("password", formData.password);
            formDataToSend.append("role", formData.role);
            formDataToSend.append("avatar", "https://avatars.githubusercontent.com/u/73078663");
            
            const response = await axios.post(`http://localhost:3000/api/v1/auth/register`,
                formData 
            );

            if (response.status === 200 || response.status === 201) {
                onSuccess(response.data);
            }
        


        } catch (error) {
            console.error('An error occurred while registering the user');
            
        }
    }


      
    return (
        <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      name="name"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      UserName (NickName)
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="userName"
                      name="username"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

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
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button onClick={handleSubmit }
                      className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Create Account
                    </button>

                  </div>
                </form>
    );
}

export default RegisterForm;