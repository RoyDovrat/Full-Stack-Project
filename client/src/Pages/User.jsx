import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

function User({ user }) {

    return (

        <div className="user-container">
            <span className="user-info-label">Name:</span>
            {`${user.firstName} ${user.lastName}`} <br />
            <span className="user-info-label">Username:</span>
            {user.userName} <br />
            <span className="user-info-label">Session Time Out (Minutes):</span>
            {user.sessionTimeOut} <br />
            <span className="user-info-label">Created Date:</span>
            {user.createdDate} <br />
            <span className="user-info-label">Permissions:</span>
            <ul>
                {user.permissions.map((permission, index) => (
                    <li key={index}>{permission}</li>
                ))}
            </ul> <br /> <br />

            <button onClick={() => <EditUser key={user.id} user={user}/>}>Edit</button>
            <button onClick={() => <DeleteUser key={user.id} user={user}/>}>Delete</button>



        </div>
    )
}

export default User
