import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Create from './components/Create';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Project from './components/Project';
import Skills from './components/Skills';
import Summary from './components/Summary';
import PublicPortfolio from './components/PublicPortfolio';
import PrivateRoute from './components/utils/PrivateRoute';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import AuthWrapper from './components/context/AuthWrapper';

function App() {
  return (
    <div className='App'>
      <AuthWrapper>
        <Navbar />
        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/about' element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path='/create' element={<PrivateRoute><Create /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/project' element={<PrivateRoute><Project /></PrivateRoute>} />
          <Route path='/skills' element={<PrivateRoute><Skills /></PrivateRoute>} />
          <Route path='/summary' element={<PrivateRoute><Summary /></PrivateRoute>} />
          <Route path="/u/:username" element={<PublicPortfolio />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </AuthWrapper>
    </div>
  );
}

export default App;