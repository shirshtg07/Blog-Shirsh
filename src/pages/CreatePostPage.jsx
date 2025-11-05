import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostEditor from '@/components/PostEditor';
import { createBlogPost } from '@/lib/blogData';
import { useToast } from '@/components/ui/use-toast';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSave = (postData) => {
    createBlogPost(postData);
    toast({
      title: "Post created!",
      description: "Your blog post has been successfully created.",
    });
    navigate('/admin');
  };

  return (
    <>
      <Helmet>
        <title>Create New Post - BlogHub</title>
        <meta name="description" content="Create a new blog post and share your thoughts with the world." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-8">Create New Post</h1>
              <PostEditor onSave={handleSave} />
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CreatePostPage;