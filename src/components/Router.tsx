import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/home";
import LoginPage from "../pages/login";
import PostEdit from "../pages/posts/edit";
import PostNew from "../pages/posts/new";
import PostPage from "../pages/posts/detail";
import PostsPage from "../pages/posts";
import ProfilePage from "../pages/profile";
import SignupPage from "../pages/signup";
import { useState } from "react";

export default function Router() {
  // firebase Auth가 인증되었으면 true로 변경해주는 로직 추가
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/new" element={<PostNew />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </>
  );
}
