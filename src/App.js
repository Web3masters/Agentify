import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
// pages
import Features from './Pages/Features/Features'
import Marketplace from './Pages/Marketplace/Marketplace';
import Dashboard from './Pages/Dashboard/Dashboard';
import CreateAgent from './Pages/CreateAgent/CreateAgent';
import EditAgent from './Pages/EditAgent/EditAgent';
import AgentDetails from './Pages/AgentDetails/AgentDetails';
import Playground from './Pages/Playground/Playground';
import NotFound from './Pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute ';
import { API_AUDIENCE_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_URL } from './config/constant';
function App() {
  return (
    <div className="App">
      <Auth0Provider
    domain={AUTH0_CLIENT_URL}
    clientId={AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: API_AUDIENCE_URL,
      scope: "openid profile email"
    }}
  >
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
          <Route path="/create" element={ <ProtectedRoute>
                <CreateAgent />
              </ProtectedRoute>} />
          <Route path="/edit-agent" element={ <ProtectedRoute>
                <EditAgent />
              </ProtectedRoute>} />
          <Route path="/agent-details" element={<ProtectedRoute>
                <AgentDetails />
              </ProtectedRoute>} />
          <Route path="/playground" element={<ProtectedRoute>
                <Playground />
              </ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </Auth0Provider>
    </div>
  );
}
export default App;