import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/home";
import NeighborhoodPage from "./pages/neighborhood";
import Locationpage from "./pages/chat/location";
import ChatPage from "./pages/chat";
import MyCarrotPage from "./pages/myCarrot";

const App = () => (
  <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="/neighborhood" element={<NeighborhoodPage />} />
    <Route path="/location" element={<Locationpage />} />
    <Route path="/chat" element={<ChatPage />} />
    <Route path="/mycarrot" element={<MyCarrotPage />} />
  </Routes>
);

export default App;
