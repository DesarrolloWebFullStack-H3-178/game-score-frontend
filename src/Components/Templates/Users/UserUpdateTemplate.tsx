import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCopy  } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

interface UserUpdateProps {
  userData: {
    userId: string;
    name: string;
    username: string;
    email: string;
    password: string,
    avatar?: string;
    roles: string[];
    isActive: boolean;
  };
  isOpen: boolean;
  onClose: (state: boolean, type?: string, message?: string) => void;
  action: string;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const UserUpdate: React.FC<UserUpdateProps> = ({ userData, onClose, action }) => {

    const [formData, setFormData] = useState({
        userId: '',
        name: "",
        username: "",
        email: "",
        password: "",
        role: "",
        avatar: "",
        isActive: false,
      });

    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setImage(selectedImage); 
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
      // Agregar la imagen seleccionada al objeto FormData para enviarla a "uploads"
      const formDataToSend = new FormData();
      formDataToSend.append("file", selectedImage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserEdit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedFormData = {
      ...userData,
      ...formData,
      roles: [formData.role || userData.roles[0] || "Player"], 
      isActive: formData.isActive? true : false
    };

    try {
      const response = await axios.put(`${backendUrl}/users/admin/profile/${userData.userId}`, updatedFormData)
      if (response.status === 200 ) {
        onClose(true, "Success", "User updated successfully");
      }
    } catch (error) {
      console.error(`error editting user ${formData.username}`, error);
      onClose(true, "Error", `error editting user ${updatedFormData.username}`);
    }
  }

  return (
    <form>
            <h2 className="text-lg font-bold mb-4 text-center">
              Edit User <strong>{userData.name}</strong>
              </h2>
              <div className="flex justify-center mb-4 relative">
              <div className="w-20 h-20 z-10 overflow-hidden relative group">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <img src={userData.avatar} alt="Default" className="w-full h-full object-cover rounded-full" />
                )}
                <div className="absolute bottom-0 right-0 z-20">
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                  <button
                    onClick={() => (
                      document.querySelector('input[type="file"]') as HTMLInputElement)?.click()
                    }
                  >
                    <FontAwesomeIcon icon={faCamera} className="text-violet-800 w-6 h-6" />
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                    Change image
                  </div>
                </div>
              </div>
              </div>
            <table className="w-full text-left text-gray-700">
              <tbody>
                <tr>
                  <th className="p-2 border-b font-semibold">Id:</th>
                  <td className="p-2 border-b">
                    {userData.userId}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Name:</th>
                  <td className="p-2 border-b">
                  <input type="text" className="bg-transparent" name="name" value={formData.name || userData.name} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Username:</th><td className="p-2 border-b">
                  <input type="text" className="bg-transparent" name="username" value={formData.username || userData.username} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Email:</th><td className="p-2 border-b">
                  <input type="email" className="bg-transparent" name="email" value={formData.email || userData.email} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Password:</th><td className="p-2 border-b">
                  <input type="password" className="bg-transparent" name="password"  value={formData.password || userData.password} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Role:</th>
                  <td className="p-2 border-b">
                  <select
                    name="role"
                    className="p-2 border rounded bg-transparent"
                    value={formData.role || (userData.roles[0] || "Player")}
                    onChange={handleChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Player">Player</option>
                  </select>
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Is Active?:</th>
                  <td className="p-2 border-b">
                  <select
                    name="isActive"
                    className="p-2 border rounded bg-transparent"
                    value={userData.isActive ? "Yes" : "No"}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button className="px-4 p-2 bg-green-500 text-white rounded-lg mx-auto mt-4" onClick={handleUserEdit}>
                Edit User
              </button>
            </div>
          </form>
  );
};

export default UserUpdate;
