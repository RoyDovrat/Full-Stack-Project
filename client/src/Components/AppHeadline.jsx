import icon from '../images/icon.png'
import '../Style/AppHeadline.scss'

function AppHeadline({ userName }) {
    return (
        <div className='main-header'>
            <p>Welcome, {userName || 'Guest'}</p>
            <div className='webSite-header'>
                <img src={icon} alt="icon" className="icon" />
                <h1>Movies Subscriptions</h1>
            </div>
        </div>
    );
}

export default AppHeadline;
