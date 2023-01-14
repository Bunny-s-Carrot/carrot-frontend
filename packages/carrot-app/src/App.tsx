import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import HomePage from "./pages/home";
import NeighborhoodPage from "./pages/neighborhood";
import AroundPage from "./pages/around";
import ChatPage from "./pages/chat";
import MyCarrotPage from "./pages/myCarrot";
import LaunchPage from "./pages/launch";
import LoginPage from "./pages/logIn";
import SignupPage from "./pages/signup";
import FindLocationPage from "./pages/signup/findLocation";
import PersistLogin from "./components/auth/persistLogin";
import ProductDetailPage from "./pages/home/[product_id]";
import SellProductPage from "./pages/home/sellProduct";
import SetLocationPage from "./pages/setLocation";
import PostDetailPage from "./pages/neighborhood/[post_id]";

// import RequireAuth from "./components/auth/requireAuth";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
   
        <Route element={<PersistLogin />}>
        {/* <Route element={<RequireAuth />}> */}
          <Route path="/" element={<LaunchPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product/:product_id" element={<ProductDetailPage />} />
          <Route path="/sell-product" element={<SellProductPage />} />
          <Route path="/neighborhood" element={<NeighborhoodPage />} />
          <Route path="/post/:post_id" element={<PostDetailPage />} />
          <Route path="/around" element={<AroundPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/mycarrot" element={<MyCarrotPage />} />
          <Route path="/setlocation" element={<SetLocationPage />} />
        {/* </Route> */}
        </Route>

        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/findlocation" element={<FindLocationPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Routes>
    </QueryClientProvider>
    
  )
};

export default App;