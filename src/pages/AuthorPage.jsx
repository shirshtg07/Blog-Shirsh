import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getBlogPostsByAuthor } from '@/lib/blogData';

const AuthorPage = () => {
  const { author } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const authorPosts = getBlogPostsByAuthor(author);
    setPosts(authorPosts);
  }, [author]);

  return (
    <>
      <Helmet>
        <title>{author} - BlogHub</title>
        <meta name="description" content={`Read blog posts by ${author}.`} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{author}</h1>
                    <p className="text-slate-600">Content Creator & Writer</p>
                  </div>
                </div>
                <p className="text-lg text-slate-700 mb-4">
                  Passionate about sharing knowledge and insights through engaging blog posts.
                </p>
                <div className="flex flex-wrap gap-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{author.toLowerCase().replace(' ', '.')}@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Remote</span>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6">
                Posts by {author} ({posts.length})
              </h2>
            </motion.div>

            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-slate-600">No posts found by this author.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AuthorPage;