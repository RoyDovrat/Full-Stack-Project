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
const VIEW_SUBSCRIPTIONS_PERMISSIONS = "View Subscriptions";
const VIEW_MOVIES_PERMISSIONS = "View Movies";

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
    const updatedPermissions = newUser.permissions ? [...newUser.permissions] : [];

    if (isChecked) {
      if (!updatedPermissions.includes(permission)) {
        updatedPermissions.push(permission);
      }

      // add "View Subscriptions" if a subscription-related permission is added
      if (SUBSCRIPTIONS_PERMISSIONS.includes(permission) && !updatedPermissions.includes("View Subscriptions")) {
        updatedPermissions.push("View Subscriptions");
      }

      // add "View Movies" if a movie-related permission is added
      if (MOVIES_PERMISSIONS.includes(permission) && !updatedPermissions.includes("View Movies")) {
        updatedPermissions.push("View Movies");
      }
    } else {
      // remove the permission
      let filteredPermissions = updatedPermissions.filter((perm) => perm !== permission);

      if (permission === VIEW_SUBSCRIPTIONS_PERMISSIONS) {
        filteredPermissions = filteredPermissions.filter((perm) => !SUBSCRIPTIONS_PERMISSIONS.includes(perm));
      }

      if (permission === VIEW_MOVIES_PERMISSIONS) {
        filteredPermissions = filteredPermissions.filter((perm) => !MOVIES_PERMISSIONS.includes(perm));
      }

      updatedPermissions.length = 0;
      updatedPermissions.push(...filteredPermissions);
    }
    setNewUser({ ...newUser, permissions: updatedPermissions });
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = 16;
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  };

  const checkEmailValidation = () => {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newUser.userName)) {
      alert('Username must be a valid email address.');
      return false;
    }
    return true;
  }

  const checkSessionTimeoutValidation = () => {
    if (newUser.sessionTimeOut < 1) {
      alert('Session Timeout must be at least 1 minute.');
      return false;
    } else {
      return true;
    }
  }

  const addUser = async () => {
    if (!checkEmailValidation()) {
      return;
    }
    if (!checkSessionTimeoutValidation()) {
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      const config = { headers: { 'x-access-token': token } };
      const password = generateRandomPassword();
      const newUserWithPassword = { ...newUser, password };
      const { data } = await axios.post(USERS_URL, newUserWithPassword, config);
      dispatch({ type: 'ADD_USER', payload: data });
      console.log(`User added successfully. ID: ${data._id}, Name: ${data.userName}`);
      alert(`User "${data.userName}" added successfully.`);
      navigate('/main/users-management/all-users')
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
        <button className="button-edit-user" onClick={addUser}>Save</button>
        <button className="button-edit-user" onClick={() => navigate('/main/users-management')}>Cancel</button>
      </div>
    </>
  );
}

export default AddUser;
