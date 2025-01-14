import { useNavigate, Outlet } from 'react-router-dom';
import '../Style/Subscriptions.scss'

function Subscriptions() {
  const navigate = useNavigate();

  return (
    <>

      <div className='subscriptions-container'>
        <button className="subscriptions-button" onClick={() => navigate('/main/subscriptions/all-members')}>All Members</button>
        <button className="subscriptions-button" onClick={() => navigate('/main/subscriptions/add-member')}>Add Member</button> <br /> <br />
        <Outlet />
      </div>
    </>
  )
}

export default Subscriptions
