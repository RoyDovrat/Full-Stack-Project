import { useNavigate, Outlet } from 'react-router-dom';
import '../Style/Subscriptions.scss'

function Subscriptions() {
  const navigate = useNavigate();
  const buttons = [
    { label: 'All Members', path: '/main/subscriptions/all-members' },
    { label: 'Add Member', path: '/main/subscriptions/add-member' },
  ];

  return (
      <div className='subscriptions-container'>

        {buttons.map(({ label, path }) => (
          <button key={path} className="subscriptions-button" onClick={() => navigate(path)}>
            {label}
          </button>
        ))} <br /> <br />
        <Outlet />
        
      </div>
  )
}

export default Subscriptions
