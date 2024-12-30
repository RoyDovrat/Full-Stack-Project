import { useSelector } from 'react-redux';
import '../Style.css';
import Member from './Member';


const VIEW_SUBSCRIPTINS_PERMISSION = "View Subscriptions";

function Members() {
    const members = useSelector((state) => state.members);
    const currUser = useSelector((state) => state.currUser);

    return (
        <div>
            
            {currUser?.permissions?.includes(VIEW_SUBSCRIPTINS_PERMISSION) &&
                members.map((member) => (
                    <Member key={member._id} member={member} />
                ))}

        </div>
    );
}

export default Members;
