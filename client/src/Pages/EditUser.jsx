import { useState } from 'react';
import { useDispatch } from 'react-redux';
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

function EditUser({ user, setIsEditVisible }) {
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const dispatch = useDispatch();

  const handlePermissionChange = (permission, isChecked) => {
    let updatedPermissions = [...updatedUser.permissions];

    if (isChecked) {
      // Add the permission if not already included
      if (!updatedPermissions.includes(permission)) {
        updatedPermissions.push(permission);
      }

      // Automatically check "View Subscriptions" if any subscription-related permission is added
      if (SUBSCRIPTIONS_PERMISSIONS.includes(permission)) {
        if (!updatedPermissions.includes("View Subscriptions")) {
          updatedPermissions.push("View Subscriptions");
        }
      }

      // Automatically check "View Movies" if any movie-related permission is added
      if (MOVIES_PERMISSIONS.includes(permission)) {
        if (!updatedPermissions.includes("View Movies")) {
          updatedPermissions.push("View Movies");
        }
      }
    } else {
      updatedPermissions = updatedPermissions.filter((perm) => perm !== permission);

      // Remove "View Subscriptions" if no subscription related permissions remain
      if (SUBSCRIPTIONS_PERMISSIONS.includes(permission)) {
        const hasOtherSubscriptions = updatedPermissions.some((perm) => SUBSCRIPTIONS_PERMISSIONS.includes(perm));
        if (!hasOtherSubscriptions) {
          updatedPermissions = updatedPermissions.filter((perm) => perm !== "View Subscriptions");
        }
      }

      // Remove "View Movies" if no movie related permissions remain
      if (MOVIES_PERMISSIONS.includes(permission)) {
        const hasOtherMovies = updatedPermissions.some((perm) => MOVIES_PERMISSIONS.includes(perm));
        if (!hasOtherMovies) {
          updatedPermissions = updatedPermissions.filter((perm) => perm !== "View Movies");
        }
      }
    }

    setUpdatedUser({ ...updatedUser, permissions: updatedPermissions });
  };

  const updateUser = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const config = { headers: { 'x-access-token': token } };
      const { data } = await axios.put(`${USERS_URL}/${user._id}`, updatedUser, config);
      dispatch({ type: 'UPDATE_USER', payload: data });
      setIsEditVisible(false);
    } catch (error) {
      console.error('Error updating user:', error.response?.data || error.message);
    }
  };


  return (
    <>
      <h2>Edit User: {`${user.firstName} ${user.lastName}`}</h2>
      <div className="user-container">
        <span className="user-info-label">First Name:</span>
        <input
          type="text"
          value={updatedUser.firstName}
          onChange={(e) => {
            setUpdatedUser({ ...updatedUser, firstName: e.target.value });
          }}
        />
        <br /> <br />
        <span className="user-info-label">Last Name:</span>
        <input
          type="text"
          value={updatedUser.lastName}
          onChange={(e) => {
            setUpdatedUser({ ...updatedUser, lastName: e.target.value });
          }}
        />
        <br /> <br />
        <span className="user-info-label">Username:</span>
        <input
          type="text"
          value={updatedUser.userName}
          onChange={(e) => {
            setUpdatedUser({ ...updatedUser, userName: e.target.value });
          }}
        />
        <br /> <br />
        <span className="user-info-label">Session Time Out (Minutes):</span>
        <input
          type="text"
          value={updatedUser.sessionTimeOut}
          onChange={(e) => {
            setUpdatedUser({ ...updatedUser, sessionTimeOut: e.target.value });
          }}
        />
        <br /> <br />
        <span className="user-info-label">Created Date:</span>
        {user.createdDate}
        <br /> <br />
        <span className="user-info-label">Permissions:</span>
        <ul>
          {PERMISSIONS_LIST.map((permission) => (
            <li key={permission}>
              <label>
                <input
                  type="checkbox"
                  checked={updatedUser.permissions.includes(permission)}
                  onChange={(e) =>
                    handlePermissionChange(permission, e.target.checked)
                  }
                />
                {permission}
              </label>
            </li>
          ))}
        </ul>
        <br /> <br />
        <button onClick={updateUser}>Update</button>
        <button onClick={() => setIsEditVisible(false)}>Cancel</button>
      </div>
    </>
  );
}

export default EditUser;
