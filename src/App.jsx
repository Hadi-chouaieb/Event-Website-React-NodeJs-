import './App.css';
import Auth from './components/Auth/Auth';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Auth/Login';
import ModalFrames from './components/infoWeb/ModalFrames';
import Terms from './components/terms/Terms';
import CTXCube from './components/CTX3d/CTX3D';

function App() {
  const location = useLocation();
  const showOverlay = location.pathname !== '/Terms'; 

  return (
    <div>
      {showOverlay && <div className="overlay"></div>}
      <Routes>
        <Route path="/Register" element={<Auth />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<ModalFrames />} />
        <Route path="/terms" element={<Terms />} />
        {/* <Route path="/3d" element={<CTXCube />} /> */}
        {/* <Route path="/*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default WrappedApp;
