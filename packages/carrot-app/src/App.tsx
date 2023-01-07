import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import HomePage from "./pages/home";
import NeighborhoodPage from "./pages/neighborhood";
import Locationpage from "./pages/chat/location";
import ChatPage from "./pages/chat";
import MyCarrotPage from "./pages/myCarrot";
import LaunchPage from "./pages/launch";
import LoginPage from "./pages/logIn";
import SignupPage from "./pages/signup";
import FindLocationPage from "./pages/signup/findLocation";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/neighborhood" element={<NeighborhoodPage />} />
        <Route path="/location" element={<Locationpage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/mycarrot" element={<MyCarrotPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/findlocation" element={<FindLocationPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Routes>
    </QueryClientProvider>
    
  )
};

export default App;
