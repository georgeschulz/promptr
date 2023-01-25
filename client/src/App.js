import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import RestrictedRoutes from './components/routeProtection/restrictedRoutes';
import PrivateRoutes from './components/routeProtection/privateRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<RestrictedRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/folders" element={<h1>Folders</h1>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
