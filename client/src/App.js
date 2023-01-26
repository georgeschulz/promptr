import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import RestrictedRoutes from './components/routeProtection/restrictedRoutes';
import PrivateRoutes from './components/routeProtection/privateRoutes';
import Folder from './pages/folders';
import Businesses from './pages/businesses';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<RestrictedRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/folders" element={<Folder />} />
            <Route path="/businesses" element={<Businesses />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
