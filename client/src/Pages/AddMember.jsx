import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MEMBERS_URL = 'http://localhost:8000/members';
const CREATE_SUBSCRIPTIONS_PERMISSION = "Create Subscriptions";

function AddMember() {
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    city: '',
    moviesWatched: []
  });
  const currUser = useSelector((state) => state.currUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addMember = async () => {
    try {
      const { data } = await axios.post(MEMBERS_URL, newMember);
      dispatch({ type: 'ADD_MEMBER', payload: data });
      console.log(`Member added successfully. ID: ${data._id}, Name: ${data.name}`);
      alert(`Member "${data.name}" added successfully.`);
      navigate('/main/subscriptions/all-members')
    } catch (error) {
      console.error('Error adding member:', error.response?.data || error.message);
    }
  };


  return (
    <>
      <h2>Add New Member: </h2>
      {currUser?.permissions?.includes(CREATE_SUBSCRIPTIONS_PERMISSION) &&
        <div className="member-container">
          <span className="member-info-label">Name:</span>
          <input type="text" onChange={(e) => { setNewMember({ ...newMember, name: e.target.value }); }} />
          <br /> <br />
          <span className="member-info-label">Email:</span>
          <input type="text" onChange={(e) => { setNewMember({ ...newMember, email: e.target.value }); }} />
          <br /> <br />
          <span className="movie-info-label">City:</span>
          <input type="text" onChange={(e) => { setNewMember({ ...newMember, city: e.target.value }); }} />
          <br /> <br />
         
          <button className="button-edit-member" onClick={addMember}>Save</button>
          <button className="button-edit-member" onClick={() => navigate('/main/subscriptions/all-members')}>Cancel</button>
        </div>}
    </>
  );
}

export default AddMember;
