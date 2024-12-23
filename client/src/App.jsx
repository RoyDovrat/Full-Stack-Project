import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import CreateAccount from './Pages/CreateAccount';
import MainPage from './Pages/MainPage';
import Movies from './Pages/Movies';
import Subscriptions from './Pages/Subscriptions';
import UsersManagement from './Pages/UsersManagement';
import Users from './Pages/Users';
import AddUser from './Pages/AddUser';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/subscriptions' element={<Subscriptions />} />

        <Route path='/main' element={<MainPage />}>
          <Route path='users-management' element={<UsersManagement />}>
            <Route path='all-users' element={<Users />} />
            <Route path='add-user' element={<AddUser />} />
          </Route>
        </Route>

      </Routes>

    </>
  )
}

export default App
