import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PenTool, BookOpen, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const features = [
    {
      icon: PenTool,
      title: 'Easy Writing',
      description: 'Intuitive editor with rich formatting options'
    },
    {
      icon: BookOpen,
      title: 'Organize Content',
      description: 'Categories and tags to keep everything structured'
    },
    {
      icon: Users,
      title: 'Build Community',
      description: 'Engage with readers through comments'
    },
    {
      icon: TrendingUp,
      title: 'Track Growth',
      description: 'Monitor your blog\'s performance'
    }
  ];

  return (
    <>
      <Helmet>
        <title>BlogHub - Your Creative Writing Space</title>
        <meta name="description" content="Start your blogging journey with BlogHub. Share your stories, insights, and creativity with the world." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Share Your Story with the World
                </h1>
                <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                  A modern blogging platform designed for writers who want to create, publish, and grow their audience.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  {user && (
                    <Link to="/create">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                        Start Writing
                      </Button>
                    </Link>
                  )}
                  <Link to="/blog">
                    <Button size="lg" variant="outline">
                      Explore Blogs
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-16"
              >
                <img 
                  className="rounded-2xl shadow-2xl w-full max-w-4xl mx-auto"
                  alt="Modern blogging platform interface"
                 src="https://images.unsplash.com/photo-1504983875-d3b163aba9e6" />
              </motion.div>
            </div>
          </section>

          <section className="py-20 px-4 bg-white/50">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold mb-4">Everything You Need to Blog</h2>
                <p className="text-xl text-slate-600">Powerful features to help you create amazing content</p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold mb-6">Write, Publish, Grow</h2>
                  <p className="text-lg text-slate-600 mb-6">
                    Our platform makes it easy to create beautiful blog posts with our intuitive editor. 
                    Add images, format text, and organize your content with categories and tags.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-slate-700">Rich text editor with formatting tools</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-slate-700">Draft and publish workflow</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-slate-700">Categories and tags for organization</span>
                    </li>
                  </ul>
                  {user && (
                    <Link to="/create">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Create Your First Post
                      </Button>
                    </Link>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <img 
                    className="rounded-xl shadow-2xl"
                    alt="Blog post editor interface"
                   src="https://images.unsplash.com/photo-1504983875-d3b163aba9e6" />
                </motion.div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default HomePage;