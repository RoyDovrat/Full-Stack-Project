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
const VIEW_SUBSCRIPTIONS_PERMISSIONS = "View Subscriptions";
const VIEW_MOVIES_PERMISSIONS = "View Movies";

function EditUser({ user, setIsEditVisible }) {
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const dispatch = useDispatch();

  const handlePermissionChange = (permission, isChecked) => {
    let updatedPermissions = [...updatedUser.permissions];

    if (isChecked) {
      if (!updatedPermissions.includes(permission)) {
        updatedPermissions.push(permission);
      }

      if (SUBSCRIPTIONS_PERMISSIONS.includes(permission)) {
        if (!updatedPermissions.includes("View Subscriptions")) {
          updatedPermissions.push("View Subscriptions");
        }
      }

      if (MOVIES_PERMISSIONS.includes(permission)) {
        if (!updatedPermissions.includes("View Movies")) {
          updatedPermissions.push("View Movies");
        }
      }
    } else {
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
      <h2 style={{ fontWeight: 'bold' }}>Edit User: {`${user.firstName} ${user.lastName}`}</h2>
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
          type="email"
          value={updatedUser.userName}
          onChange={(e) => {
            setUpdatedUser({ ...updatedUser, userName: e.target.value });
          }}
        />
        <br /> <br />
        <span className="user-info-label">Session Time Out (Minutes):</span>
        <input
          type="number" min={1}
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
        <button className="button-edit-user" onClick={updateUser}>Update</button>
        <button className="button-edit-user" onClick={() => setIsEditVisible(false)}>Cancel</button>
      </div>
    </>
  );
}

export default EditUser;
