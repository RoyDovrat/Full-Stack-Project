import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const USERS_URL = 'http://localhost:3000/users';
const PERMISSIONS_LIST = [
  "View Subscriptions",
  "Create Subscriptions",
  "Update Subscriptions",
  "Delete Subscriptions",
  "View Movies",
  "Create Movies",
  "Update Movies",
  "Delete Movies",
];
const SUBSCRIPTIONS_PERMISSIONS = ["Create Subscriptions", "Update Subscriptions", "Delete Subscriptions"];
const MOVIES_PERMISSIONS = ["Create Movies", "Update Movies", "Delete Movies"];

function AddUser() {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    sessionTimeOut: '',
    permissions: []
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePermissionChange = (permission, isChecked) => {
    // Ensure permissions is initialized as an array if not already present
    const updatedPermissions = newUser.permissions ? [...newUser.permissions] : [];

    if (isChecked) {
      // Add the permission if not already included
      if (!updatedPermissions.includes(permission)) {
        updatedPermissions.push(permission);
      }

      // Automatically add "View Subscriptions" if a subscription-related permission is added
      if (SUBSCRIPTIONS_PERMISSIONS.includes(permission) && !updatedPermissions.includes("View Subscriptions")) {
        updatedPermissions.push("View Subscriptions");
      }

      // Automatically add "View Movies" if a movie-related permission is added
      if (MOVIES_PERMISSIONS.includes(permission) && !updatedPermissions.includes("View Movies")) {
        updatedPermissions.push("View Movies");
      }
    } else {
      // Remove the permission
      const filteredPermissions = updatedPermissions.filter((perm) => perm !== permission);

      // Check if we need to remove "View Subscriptions"
      if (
        SUBSCRIPTIONS_PERMISSIONS.includes(permission) &&
        !filteredPermissions.some((perm) => SUBSCRIPTIONS_PERMISSIONS.includes(perm))
      ) {
        updatedPermissions.splice(updatedPermissions.indexOf("View Subscriptions"), 1);
      }

      // Check if we need to remove "View Movies"
      if (
        MOVIES_PERMISSIONS.includes(permission) &&
        !filteredPermissions.some((perm) => MOVIES_PERMISSIONS.includes(perm))
      ) {
        updatedPermissions.splice(updatedPermissions.indexOf("View Movies"), 1);
      }

      // Final updatedPermissions assignment
      updatedPermissions.length = 0;
      updatedPermissions.push(...filteredPermissions);
    }
    console.log("Updated Permissions:", updatedPermissions);
    setNewUser({ ...newUser, permissions: updatedPermissions });
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = 16; // Length of the password
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length); // Generate a random index
      password += chars[randomIndex]; // Add the character at the random index to the password
    }
    console.log('password func', password)
    return password;
  };


  const addUser = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const config = { headers: { 'x-access-token': token } };
      const password = generateRandomPassword();
      const newUserWithPassword = { ...newUser, password };
      const { data } = await axios.post(USERS_URL, newUserWithPassword, config);
      dispatch({ type: 'ADD_USER', payload: data });
    } catch (error) {
      console.error('Error adding user:', error.response?.data || error.message);
    }
  };


  return (
    <>
      <h2>Add New User: </h2>
      <div className="user-container">
        <span className="user-info-label">First Name:</span>
        <input type="text" onChange={(e) => { setNewUser({ ...newUser, firstName: e.target.value }); }} />
        <br /> <br />
        <span className="user-info-label">Last Name:</span>
        <input type="text" onChange={(e) => { setNewUser({ ...newUser, lastName: e.target.value }); }} />
        <br /> <br />
        <span className="user-info-label">Username:</span>
        <input type="email" onChange={(e) => { setNewUser({ ...newUser, userName: e.target.value }); }} />
        <br /> <br />
        <span className="user-info-label">Session Time Out (Minutes):</span>
        <input type="number" min={1} onChange={(e) => { setNewUser({ ...newUser, sessionTimeOut: e.target.value }); }} />
        <br /> <br />
        <span className="user-info-label">Created Date:</span>
        {new Date().toISOString().split('T')[0]}
        <br /> <br />
        <span className="user-info-label">Permissions:</span>
        <ul>
          {PERMISSIONS_LIST.map((permission) => (
            <li key={permission}>
              <label>
                <input
                  type="checkbox"
                  checked={newUser.permissions?.includes(permission)}
                  onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                />
                {permission}
              </label>
            </li>
          ))}
        </ul>
        <br /> <br />
        <button onClick={addUser}>Save</button>
        <button onClick={() => navigate('/main/users-management')}>Cancel</button>
      </div>
    </>
  );
}

export default AddUser;
