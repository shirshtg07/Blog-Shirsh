import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthProvider } from '@/contexts/AuthContext';
import HomePage from '@/pages/HomePage';
import BlogPage from '@/pages/BlogPage';
import PostPage from '@/pages/PostPage';
import CreatePostPage from '@/pages/CreatePostPage';
import EditPostPage from '@/pages/EditPostPage';
import CategoryPage from '@/pages/CategoryPage';
import AuthorPage from '@/pages/AuthorPage';
import LoginPage from '@/pages/LoginPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';

const AppContent = () => {
  const location = useLocation();
  
  // This key will change on every navigation, forcing Footer to re-render and run its useEffect
  const footerKey = location.pathname + location.search;

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/author/:author" element={<AuthorPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/create" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditPostPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
      </Routes>
      {/* We render Footer here for pages that have it, and give it a key to force re-renders */}
      {!['/login'].includes(location.pathname) && <Footer key={footerKey} />}
    </>
  );
};


function App() {
  return (
    <>
      <Helmet>
        <title>BlogHub - Your Creative Writing Space</title>
        <meta name="description" content="A modern blogging platform where writers share their stories, insights, and creativity with the world." />
      </Helmet>
      <AuthProvider>
        <Router>
          <AppContent />
          <Toaster />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;