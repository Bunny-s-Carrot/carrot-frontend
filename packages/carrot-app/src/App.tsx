import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "./pages/home";
import NeighborhoodPage from "./pages/neighborhood";
import AroundPage from "./pages/around";
import ChatPage from "./pages/chat";
import ChatRoomDetailPage from './pages/chat/[chatRoom_id]'
import MyCarrotPage from "./pages/myCarrot";
import LaunchPage from "./pages/launch";
import LoginPage from "./pages/logIn";
import SignupPage from "./pages/signup";
import FindLocationPage from "./pages/findLocation";
import PersistLogin from "./components/auth/persistLogin";
import RequireAuth from "./components/auth/requireAuth";
import ProductDetailPage from "./pages/home/[product_id]";
import SellProductPage from "./pages/home/sellProduct";
import TopicBarDetailPage from "./pages/neighborhood/category";
import PostDetailPage from "./pages/neighborhood/[post_id]";
import WritePostPage from "./pages/neighborhood/writePost";
import RecommentPage from './pages/neighborhood/[post_id]/recomment';
import SetLocationPage from "./pages/setLocation";
import SetWantedLocationPage from "./pages/home/sellProduct/setWantedLocation";
import SettingPage from "./pages/myCarrot/setting";
import WantedLocationPage from "./pages/watedLocation";
import ProductChatPage from "./pages/chat/productChat";


const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<LaunchPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/product/:product_id"
              element={<ProductDetailPage />}
            />
            <Route path='/product/:product_id/chatroom' element={<ProductChatPage />} />
            <Route
              path="/product/:product_id/wantedlocation"
              element={<WantedLocationPage />}
            />
            <Route path="/sell-product" element={<SellProductPage />} />
            <Route
              path="/sell-product/setwantedlocation"
              element={<SetWantedLocationPage />}
            />
            <Route path="/neighborhood" element={<NeighborhoodPage />} />
            <Route
              path="/category/:classif_id"
              element={<TopicBarDetailPage />}
            />
            <Route path="/post/:post_id" element={<PostDetailPage />} />
            <Route path="/write-post" element={<WritePostPage />} />
            <Route path="/post/:post_id/comment/:comment_id" element={<RecommentPage />} />
            <Route path="/around" element={<AroundPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/chat/chatroom/:uuid" element={<ChatRoomDetailPage />} />

            <Route path="/mycarrot" element={<MyCarrotPage />} />
            <Route path="/mycarrot/setting" element={<SettingPage />} />
            <Route path="/setlocation" element={<SetLocationPage />} />
          </Route>
        </Route>

        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/findlocation" element={<FindLocationPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
