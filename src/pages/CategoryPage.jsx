import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getBlogPostsByCategory } from '@/lib/blogData';

const CategoryPage = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const categoryPosts = getBlogPostsByCategory(category);
    setPosts(categoryPosts);
  }, [category]);

  return (
    <>
      <Helmet>
        <title>{category.charAt(0).toUpperCase() + category.slice(1)} - BlogHub</title>
        <meta name="description" content={`Explore blog posts in the ${category} category.`} />
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
              <h1 className="text-5xl font-bold mb-4 capitalize">{category}</h1>
              <p className="text-xl text-slate-600">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
              </p>
            </motion.div>

            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-slate-600">No posts found in this category.</p>
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

export default CategoryPage;