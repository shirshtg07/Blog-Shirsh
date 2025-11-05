import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenTool, Home, BookOpen, Plus, LogIn, LogOut, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.2 }}
            >
              <PenTool className="w-8 h-8 text-blue-600" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BlogHub
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="gap-2 hidden sm:flex">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="ghost" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Blog
              </Button>
            </Link>
            
            {user ? (
              <>
                <Link to="/admin">
                  <Button variant="ghost" className="gap-2">
                    <UserCog className="w-4 h-4" />
                    Admin
                  </Button>
                </Link>
                <Link to="/create">
                  <Button className="bg-blue-600 hover:bg-blue-700 gap-2 hidden sm:flex">
                    <Plus className="w-4 h-4" />
                    New Post
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Admin Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;