import { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface UserCreateProps {
    userData: {
        name: string;
        avatar?: string;
        username: string;
        email: string;
        password?: string;
        roles: string[];
    };
    isOpen: boolean;
    onClose: (state: boolean, type?: string, message?: string) => void;
    action: string;
}

const UserCreate: React.FC<UserCreateProps> = ({ userData, isOpen, onClose, action }) => {
    const [formData, setFormData] = useState({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: '',
        role: userData.roles[0] || 'Player',
        isActive: true
    });

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserCreate = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const createUserFormData = {
      ...formData,
      roles: [formData.role || "Player"], 
      isActive: formData.isActive? true : false
    };

    try {
      const response = await axios.post(`${backendUrl}/users/auth/register`, createUserFormData)
      if (response.status === 201 ) {
        onClose(true, "Success", "User created successfully");
      }
    } catch (error) {
      console.error(`Error for creation a new user ${createUserFormData.username}`, error);
      onClose(true, "Error", "Error for creation a new user");
    }
  }

  return (
    <form>
      <h2 className="text-lg font-bold mb-4 text-center text-gray-700">
        Create New User <strong>{userData.name}</strong>
      </h2>
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 z-10 overflow-hidden relative group">
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-full" />
          ) : (
            <img
              src={userData.avatar ? userData.avatar : '../../img/image_not_found.jpg'}
              alt="Default"
              className="w-full h-full object-cover rounded-full"
            />
          )}
          <div className="absolute bottom-0 right-0 z-20">
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            <button
              type="button"
              onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
            >
              <FontAwesomeIcon icon={faCamera} className="text-violet-800 w-6 h-6" />
            </button>
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
              Upload Avatar
            </div>
          </div>
        </div>
      </div>
      <table className="w-full text-left text-gray-700">
        <tbody>
          <tr>
            <th className="p-2 border-b font-semibold">Name:</th>
            <td className="p-2 border-b">
              <input
                type="text"
                className="bg-transparent"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Username:</th>
            <td className="p-2 border-b">
              <input
                type="text"
                className="bg-transparent"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Email:</th>
            <td className="p-2 border-b">
              <input
                type="email"
                className="bg-transparent"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Password:</th>
            <td className="p-2 border-b">
              <input
                type="password"
                className="bg-transparent"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Role:</th>
            <td className="p-2 border-b">
              <select
                name="role"
                className="p-2 border rounded bg-transparent"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Admin">Admin</option>
                <option value="Player">Player</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button type="button" className="px-4 p-2 bg-green-500 text-white rounded-lg mx-auto mt-4" onClick={handleUserCreate}>
          Create User
        </button>
      </div>
    </form>
    
  );
};

export default UserCreate;
