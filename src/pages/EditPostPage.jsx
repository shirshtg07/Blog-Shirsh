import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostEditor from '@/components/PostEditor';
import { getBlogPostById, updateBlogPost } from '@/lib/blogData';
import { useToast } from '@/components/ui/use-toast';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = getBlogPostById(id);
    setPost(foundPost);
  }, [id]);

  const handleSave = (postData) => {
    updateBlogPost(id, postData);
    toast({
      title: "Post updated!",
      description: "Your blog post has been successfully updated.",
    });
    navigate(`/admin`);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Loading post...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit Post - BlogHub</title>
        <meta name="description" content="Edit your blog post." />
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
              <h1 className="text-4xl font-bold mb-8">Edit Post</h1>
              <PostEditor initialData={post} onSave={handleSave} />
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EditPostPage;