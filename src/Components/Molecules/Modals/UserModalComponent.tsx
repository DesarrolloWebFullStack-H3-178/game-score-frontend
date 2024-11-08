// JSX Component Code
import axios from "axios";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

interface UserModalProps {
  userId: string;
  isOpen: boolean;
  onClose: (state: boolean, type?: string, message?: string) => void;
  action: string;
}

const backdropVariants = {
  hidden: { opacity: 0.5 },
  visible: {
    opacity: 0.98,
    transition: { duration: 1.3, delayChildren: 0.2 },
  },
};

const modalVariants = {
  hidden: { y: "-100vh" },
  visible: {
    y: 0,
    transition: { type: "spring", stiffness: 70 },
  },
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const UserModal: React.FC<UserModalProps> = ({ userId, isOpen, 
  onClose, action }) => {
  const [userData, setUserData] = useState({
    userId: '',
    name: '',
    username: '',
    email: '',
    password: '',
    roles: [] as string[],
    avatar: '',
    isActive: true
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId && action === "userView" || action === "userEdit" || action === "userBlock") {
        try {
          const response = await axios.get(`${backendUrl}/users/admin/${userId}`);
          if (response.status === 200) {
            const { data } = response;
            setUserData({
              userId,
              name: data.name,
              username: data.username,
              email: data.email,
              roles: data.roles || [],
              password: data.password,
              avatar: data.avatar,
              isActive: data.isActive
            });
          }
        } catch (error) {
          console.error("error fetching data for this user.");
        }
      }
    };

    if (action === "userView" || action === "userEdit" || action === "userBlock") 
      fetchUserDetails();
  }, [userId, action]);

  const [formData, setFormData] = useState({
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
      console.error(`Error for creation a new user ${formData.username}`, error);
      onClose(true, "Error", "Error for creation a new user");
    }
  }

  const handleUserEdit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedFormData = {
      ...userData,
      ...formData,
      roles: [formData.role || userData.roles[0] || "Player"], 
      isActive: formData.isActive? true : false
    };

    try {
      const response = await axios.put(`${backendUrl}/users/admin/profile/${userId}`, updatedFormData)
      if (response.status === 200 ) {
        onClose(true, "Success", "User updated successfully");
      }
    } catch (error) {
      console.error(`error editting user ${formData.username}`, error);
    }
  }

  const handleUserBlock = async() => {
    try {
      const response = await axios.patch(`${backendUrl}/users/admin/${userId}`);

      if (response.status === 200) {
        onClose(true, "Success", "User Status has been modified" );
      }
    } catch (error) {
      console.error(`error in alter status for user ${formData.username}`, error);
    }
  }

  const renderContent = () => {
    switch (action) {
      case 'userCreate':
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
                  <img src={userData.avatar ? userData.avatar : '../../img/image_not_found.jpg'} alt="Default" className="w-full h-full object-cover rounded-full" />
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
              <button className="px-4 p-2 bg-green-500 text-white rounded-lg mx-auto mt-4" onClick={handleUserCreate}>
                Create User
              </button>
            </div>
          </form>
        );
      case 'userView':
        return (
          <>
            <h2 className="text-lg font-bold mb-4 text-center">
              <small>User</small> <strong>{userData.name}</strong> <small>Details</small>
            </h2>
            <div className="flex justify-center mb-4">
              <img
                src={userData.avatar ? userData.avatar : '../../img/image_not_found.jpg' }
                alt={`User ${userId}`}
                className="rounded-full"
                style={{ width: "100px", height: "100px" }}
              />
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
                    {userData.name}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Username:</th>
                  <td className="p-2 border-b">
                    {userData.username}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Email:</th>
                  <td className="p-2 border-b">
                    {userData.email}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Password:</th>
                  <td className="p-2 border-b">
                    ********
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Role:</th>
                  <td className="p-2 border-b">
                    {userData.roles.length > 0 ? (
                      <ul>{userData.roles.map((role, index) => <li key={index}>{role}</li>)}</ul>
                    ) : (
                      <span>No roles assigned</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">isActive:</th>
                  <td className="p-2 border-b">
                    {userData.isActive ? "Yes" : "No"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button className="px-4 p-2 bg-purple-600 text-white rounded-lg mx-auto mt-4" onClick={() => onClose(true, "", "")}>
                  Ok
                </button>
            </div>
          </>
        );
      case 'findUserById':
        return (
          <form className="flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4">Find User</h2>
            <p>Please enter the user ID to search</p>
            <input
              type="text"
              name="name"
              className="border-solid border-2 border-sky-500 rounded-md mb-4"
            />
            <button className="px-4 p-2 bg-green-500 text-white rounded-lg">
              Search
            </button>
          </form>
        );
      case 'userEdit':
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
      case 'userBlock':
        return (
          <>
            <h2 className="text-lg font-bold mb-4 text-center">
              <small>User</small> <strong>{userData.name}</strong> <small>Details</small>
            </h2>
            <div className="flex justify-center mb-4">
              <img
                src={userData.avatar ? userData.avatar : '../../img/image_not_found.jpg'}
                alt={`User ${userId}`}
                className="rounded-full"
                style={{ width: "100px", height: "100px" }}
              />
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
                    {userData.name}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Username:</th>
                  <td className="p-2 border-b">
                    {userData.username}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Email:</th>
                  <td className="p-2 border-b">
                    {userData.email}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Password:</th>
                  <td className="p-2 border-b">
                    ********
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Role:</th>
                  <td className="p-2 border-b">
                    {userData.roles.length > 0 ? (
                      <ul>{userData.roles.map((role, index) => <li key={index}>{role}</li>)}</ul>
                    ) : (
                      <span>No roles assigned</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">isActive:</th>
                  <td className="p-2 border-b">
                    {userData.isActive ? "Yes" : "No"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button className="px-4 p-2 bg-purple-600 text-white rounded-lg mx-auto mt-4" onClick={handleUserBlock}>
                  {userData.isActive ? "Block User" : "UnBlock User"}
              </button>
            </div>
          </>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop fixed inset-0 bg-gray-700 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="modal-container bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
            style={{ width: "35em", minHeight: "40em" }} // Altura mínima y máxima dinámica
            variants={modalVariants}
          >
            {renderContent()}
            <motion.div
              whileHover={{ rotate: 45 }}
              className="close absolute top-4 right-4 cursor-pointer"
              onClick={() => onClose(false)}
            >
              <div></div>
              <div></div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(UserModal);
