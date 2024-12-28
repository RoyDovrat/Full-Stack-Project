import { useNavigate, Outlet } from 'react-router-dom';

function Subscriptions() {
  const navigate = useNavigate();

  return (
    <>

      <div className='subscriptions-container'>
        <h3>Subscriptions</h3>
        <button onClick={() => navigate('/main/subscriptions/all-members')}>All Members</button>
        <button onClick={() => navigate('/main/subscriptions/add-member')}>Add Member</button> <br /> <br />
        <Outlet />
      </div>
    </>
  )
}

export default Subscriptions
