const STORAGE_KEY = 'blogComments';

export const getComments = (postId) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const allComments = stored ? JSON.parse(stored) : {};
  return allComments[postId] || [];
};

export const addComment = (postId, author, text) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const allComments = stored ? JSON.parse(stored) : {};
  
  if (!allComments[postId]) {
    allComments[postId] = [];
  }
  
  const newComment = {
    id: Date.now().toString(),
    author,
    text,
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
  };
  
  allComments[postId].push(newComment);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));
  
  return newComment;
};