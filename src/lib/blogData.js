const STORAGE_KEY = 'blogPosts';

const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React and Modern Web Development',
    excerpt: 'Learn the fundamentals of React and how to build modern web applications with the latest tools and best practices.',
    content: '<h2>Introduction to React</h2><p>React has revolutionized the way we build web applications. In this comprehensive guide, we\'ll explore the core concepts and best practices.</p><h3>Why React?</h3><p>React offers a component-based architecture that makes building complex UIs manageable and maintainable. Its virtual DOM ensures optimal performance.</p><h3>Getting Started</h3><p>To begin your React journey, you\'ll need Node.js installed on your system. Then, you can create a new React app using Create React App or Vite.</p><p>The beauty of React lies in its simplicity and power. Components are reusable, making your code DRY (Don\'t Repeat Yourself).</p>',
    category: 'technology',
    tags: ['react', 'javascript', 'web development'],
    author: 'John Doe',
    date: 'November 1, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: '2',
    title: 'The Art of Minimalist Living',
    excerpt: 'Discover how embracing minimalism can transform your life, reduce stress, and bring more meaning to your daily routine.',
    content: '<h2>What is Minimalism?</h2><p>Minimalism is more than just decluttering your space—it\'s a mindset that helps you focus on what truly matters in life.</p><h3>Benefits of Minimalist Living</h3><p>Living with less can lead to reduced stress, increased focus, and more financial freedom. When you own fewer possessions, you have less to maintain and worry about.</p><p>Start small by decluttering one room at a time. Ask yourself: Does this item add value to my life?</p>',
    category: 'lifestyle',
    tags: ['minimalism', 'lifestyle', 'wellness'],
    author: 'Jane Smith',
    date: 'October 28, 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: '3',
    title: 'Exploring Hidden Gems in Southeast Asia',
    excerpt: 'Join me on a journey through lesser-known destinations in Southeast Asia that offer authentic cultural experiences.',
    content: '<h2>Off the Beaten Path</h2><p>Southeast Asia is full of incredible destinations beyond the typical tourist hotspots. Let me share some hidden gems I discovered.</p><h3>Luang Prabang, Laos</h3><p>This UNESCO World Heritage site offers stunning temples, French colonial architecture, and breathtaking waterfalls.</p><h3>Hoi An, Vietnam</h3><p>A charming ancient town with lantern-lit streets, incredible food, and rich history.</p><p>These destinations offer authentic experiences without the crowds of more popular locations.</p>',
    category: 'travel',
    tags: ['travel', 'asia', 'adventure'],
    author: 'Mike Johnson',
    date: 'October 25, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: '4',
    title: 'My First Draft Post',
    excerpt: 'This is a draft post and should not be visible to the public.',
    content: '<h2>This is a draft</h2><p>Only admins should be able to see this post from the admin dashboard.</p>',
    category: 'business',
    tags: ['draft', 'testing'],
    author: 'Admin',
    date: 'November 5, 2025',
    readTime: '1 min read',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=400&fit=crop',
    status: 'draft'
  }
];

const getPostsFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts));
      return samplePosts;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to parse blog posts from localStorage", error);
    return samplePosts;
  }
};

export const getBlogPosts = (showDrafts = false) => {
  const posts = getPostsFromStorage();
  if (showDrafts) {
    return posts;
  }
  return posts.filter(post => post.status === 'published');
};

export const getBlogPostById = (id) => {
  const posts = getPostsFromStorage();
  return posts.find(post => post.id === id);
};

export const getBlogPostsByCategory = (category) => {
  const posts = getBlogPosts();
  return posts.filter(post => post.category === category);
};

export const getBlogPostsByAuthor = (author) => {
  const posts = getBlogPosts();
  return posts.filter(post => post.author === author);
};

export const createBlogPost = (postData) => {
  const posts = getPostsFromStorage();
  const newPost = {
    ...postData,
    id: Date.now().toString(),
  };
  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return newPost;
};

export const updateBlogPost = (id, postData) => {
  const posts = getPostsFromStorage();
  const index = posts.findIndex(post => post.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...postData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return posts[index];
  }
  return null;
};

export const deleteBlogPost = (id) => {
  let posts = getPostsFromStorage();
  const filtered = posts.filter(post => post.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};