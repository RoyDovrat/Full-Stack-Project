import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import CreateAccount from './Pages/CreateAccount';
import MainPage from './Pages/MainPage';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path='/main' element={<MainPage />} />

      </Routes>

    </>
  )
}

export default App
