import { useNavigate } from 'react-router-dom';

function UsersManagement() {
  const navigate = useNavigate();

    return (
      <>
        <h3>Manage Users</h3>
        <button onClick={() => navigate('/users-management/all-users')}>All Users</button>
        <button onClick={() => navigate('/users-management/add-user')}>Add User</button>
      </>
    )
  }
  
  export default UsersManagement
  