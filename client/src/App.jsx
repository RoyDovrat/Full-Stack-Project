import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import CreateAccount from './Pages/CreateAccount';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/create-account' element={<CreateAccount />} />
       


      </Routes>

    </>
  )
}

export default App
