import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import RestrictedRoutes from './components/routeProtection/restrictedRoutes';
import PrivateRoutes from './components/routeProtection/privateRoutes';
import Folder from './pages/folders';
import Businesses from './pages/businesses';
import Offers from './pages/offers';
import Templates from './pages/templates';
import PromptList from './pages/promptList';
import Prompt from './pages/prompt';
import Home from './pages/home';
import SynthesizePage from './pages/synthesize';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<RestrictedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/folders" element={<Folder />} />
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/folders/:id" element={<PromptList />} />
            <Route path="/prompts/:id" element={<Prompt />} />
            <Route path="/synthesize" element={<SynthesizePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
