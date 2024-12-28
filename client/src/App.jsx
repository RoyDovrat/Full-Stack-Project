import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import CreateAccount from './Pages/CreateAccount';
import MainPage from './Pages/MainPage';
import MoviesManagment from './Pages/MoviesManagment';
import Subscriptions from './Pages/Subscriptions';
import UsersManagement from './Pages/UsersManagement';
import Users from './Pages/Users';
import AddUser from './Pages/AddUser';
import Movies from './Pages/Movies';
import AddMovie from './Pages/AddMovie';
import Members from './Pages/Members';
import AddMember from './Pages/AddMember';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/create-account' element={<CreateAccount />} />

        <Route path='/main' element={<MainPage />}>

          <Route path='users-management' element={<UsersManagement />}>
            <Route path='all-users' element={<Users />} />
            <Route path='add-user' element={<AddUser />} />
          </Route>

          <Route path='movies-management' element={<MoviesManagment />}>
            <Route path='all-movies' element={<Movies />} />
            <Route path='add-movie' element={<AddMovie />} />
          </Route>

          <Route path='subscriptions' element={<Subscriptions />}>
            <Route path='all-members' element={<Members />} />
            <Route path='add-member' element={<AddMember />} />
          </Route>
          
        </Route>

        

      </Routes>

    </>
  )
}

export default App
