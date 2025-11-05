import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { getComments, addComment } from '@/lib/commentData';
import { useToast } from '@/components/ui/use-toast';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', text: '' });
  const { toast } = useToast();

  useEffect(() => {
    setComments(getComments(postId));
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.text.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in both name and comment fields.",
        variant: "destructive",
      });
      return;
    }

    const comment = addComment(postId, newComment.name, newComment.text);
    setComments([...comments, comment]);
    setNewComment({ name: '', text: '' });
    toast({
      title: "Comment posted!",
      description: "Your comment has been added successfully.",
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="w-8 h-8" />
        Comments ({comments.length})
      </h2>

      <div className="space-y-6 mb-8">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-slate-50 p-6 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                {comment.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{comment.author}</p>
                <p className="text-sm text-slate-500">{comment.date}</p>
              </div>
            </div>
            <p className="text-slate-700">{comment.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your name"
              value={newComment.name}
              onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
            />
          </div>
          <div>
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment.text}
              onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
              rows={4}
            />
          </div>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4 mr-2" />
            Post Comment
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;