import { useState, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Award, Heart, MessageCircle, AtSign, Lightbulb, Twitter, Facebook, Instagram, Upload, X, Send } from "lucide-react";
import { toast } from "sonner";

const badgesData = [
  { id: 1, name: "🌱 First Steps", description: "Completed first eco action", earned: "Dec 15, 2025" },
  { id: 2, name: "💧 Water Saver", description: "Saved 1000L of water", earned: "Dec 18, 2025" },
  { id: 3, name: "♻️ Recycler Pro", description: "Recycled 50kg of waste", earned: "Dec 20, 2025" },
  { id: 4, name: "🚶 Green Commuter", description: "Used green transport 30 days", earned: "Dec 22, 2025" },
];

interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
}

interface Post {
  id: number;
  type: string;
  content: string;
  image: string;
  imageUrl: string;
  badge: string;
  likes: number;
  comments: Comment[];
  tags: string[];
}

const initialPosts: Post[] = [
  { 
    id: 1, 
    type: "photo", 
    content: "Planted 5 trees in my neighborhood today! 🌳", 
    image: "🌳", 
    imageUrl: "", 
    badge: "", 
    likes: 24, 
    comments: [
      { id: 1, author: "@nature_lover22", text: "Amazing work! Keep it up! 🌿", time: "2h ago" },
      { id: 2, author: "@green_warrior", text: "Inspiring! Where is this?", time: "1h ago" },
    ], 
    tags: ["@nature_lover22", "@green_warrior"] 
  },
  { 
    id: 2, 
    type: "badge", 
    content: "Just earned the Water Saver badge! 💧", 
    image: "", 
    imageUrl: "", 
    badge: "💧 Water Saver", 
    likes: 45, 
    comments: [
      { id: 1, author: "@eco_ninja", text: "Congratulations! 🎉", time: "3h ago" },
    ], 
    tags: [] 
  },
  { 
    id: 3, 
    type: "photo", 
    content: "Started composting at home - zero waste journey begins!", 
    image: "🥬", 
    imageUrl: "", 
    badge: "", 
    likes: 32, 
    comments: [], 
    tags: ["@eco_ninja"] 
  },
];

const MyPosts = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showNewPost, setShowNewPost] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [showComments, setShowComments] = useState<number | null>(null);
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.startsWith("@") ? tagInput : `@${tagInput}`]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setUploadedFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setUploadedFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreatePost = () => {
    if (postContent.trim()) {
      const newPost: Post = {
        id: posts.length + 1,
        type: selectedBadge ? "badge" : "photo",
        content: postContent,
        image: selectedBadge ? "" : (uploadedImage ? "" : "📸"),
        imageUrl: uploadedImage || "",
        badge: selectedBadge || "",
        likes: 0,
        comments: [],
        tags,
      };
      setPosts([newPost, ...posts]);
      setPostContent("");
      setTags([]);
      setSelectedBadge(null);
      setUploadedImage(null);
      setUploadedFileName("");
      setShowNewPost(false);
      toast.success("Post created successfully!");
    }
  };

  const handleShare = (platform: string, post: Post) => {
    const text = `${post.content} #EcoTrack #Sustainability`;
    if (platform === "instagram") {
      // Redirect to Instagram share - opens Instagram website
      window.open("https://www.instagram.com/", "_blank");
      toast.info("Opening Instagram - share your achievement there!");
      return;
    }
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`,
    };
    if (urls[platform]) {
      window.open(urls[platform], "_blank");
    }
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId: number) => {
    const commentText = newComment[postId];
    if (!commentText?.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "@eco_warrior",
      text: commentText,
      time: "Just now",
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] } 
        : post
    ));
    setNewComment({ ...newComment, [postId]: "" });
    toast.success("Comment added!");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl gradient-pink">
              <ImagePlus className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Posts</h1>
              <p className="text-muted-foreground">Share your eco achievements with the community</p>
            </div>
          </div>
          <Button variant="eco" onClick={() => setShowNewPost(!showNewPost)}>
            <ImagePlus className="w-4 h-4 mr-2" /> New Post
          </Button>
        </div>

        {/* Create New Post */}
        {showNewPost && (
          <Card variant="glass">
            <CardHeader><CardTitle>Create New Post</CardTitle></CardHeader>
            <CardContent>
              <Textarea
                placeholder="Share something eco-friendly you did..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="mb-4"
                rows={3}
              />

              {/* Image Upload */}
              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-2 block">Upload Image of Your Sustainable Act</label>
                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {uploadedFileName || "Choose Image"}
                  </Button>
                  {uploadedImage && (
                    <Button variant="ghost" size="icon" onClick={handleRemoveImage}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {uploadedImage && (
                  <div className="mt-3 relative inline-block">
                    <img 
                      src={uploadedImage} 
                      alt="Preview" 
                      className="max-w-[200px] max-h-[150px] rounded-xl object-cover border border-border"
                    />
                  </div>
                )}
              </div>

              {/* Tag Friends */}
              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-2 block">Tag Friends</label>
                <div className="flex gap-2 mb-2">
                  <div className="relative flex-1">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter username..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" onClick={handleAddTag}>Add</Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 rounded-full bg-eco-lavender/20 text-eco-lavender text-sm flex items-center gap-1"
                      >
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="hover:text-foreground">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Share Badge */}
              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-2 block">Share a Badge Achievement</label>
                <div className="flex gap-2 flex-wrap">
                  {badgesData.map((badge) => (
                    <button
                      key={badge.id}
                      onClick={() => setSelectedBadge(selectedBadge === badge.name ? null : badge.name)}
                      className={`px-3 py-2 rounded-xl text-sm transition-all ${
                        selectedBadge === badge.name
                          ? "bg-eco-green text-foreground"
                          : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {badge.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="eco" onClick={handleCreatePost}>Post</Button>
                <Button variant="outline" onClick={() => setShowNewPost(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} variant="glass">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-eco-green to-eco-cyan flex items-center justify-center text-2xl">
                    🌱
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-foreground">@eco_warrior</span>
                      <span className="text-xs text-muted-foreground">• Just now</span>
                    </div>
                    <p className="text-foreground mb-3">{post.content}</p>
                    
                    {post.badge && (
                      <div className="mb-3 p-4 rounded-xl bg-gradient-to-r from-eco-yellow/20 to-eco-orange/20 border border-eco-yellow/30">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-eco-yellow" />
                          <span className="font-medium text-foreground">Badge Earned: {post.badge}</span>
                        </div>
                      </div>
                    )}

                    {post.imageUrl && (
                      <div className="mb-3">
                        <img 
                          src={post.imageUrl} 
                          alt="Post" 
                          className="max-w-full max-h-[400px] rounded-xl object-cover"
                        />
                      </div>
                    )}

                    {post.image && !post.imageUrl && (
                      <div className="mb-3 p-8 rounded-xl bg-secondary/50 flex items-center justify-center text-6xl">
                        {post.image}
                      </div>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {post.tags.map((tag, i) => (
                          <span key={i} className="text-eco-lavender text-sm">{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className="flex items-center gap-1 text-muted-foreground hover:text-eco-pink transition-colors"
                        >
                          <Heart className="w-4 h-4" /> {post.likes}
                        </button>
                        <button 
                          onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                          className="flex items-center gap-1 text-muted-foreground hover:text-eco-lavender transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" /> {post.comments.length}
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleShare("twitter", post)}
                          className="p-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <Twitter className="w-4 h-4 text-muted-foreground hover:text-[#1DA1F2]" />
                        </button>
                        <button
                          onClick={() => handleShare("facebook", post)}
                          className="p-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <Facebook className="w-4 h-4 text-muted-foreground hover:text-[#4267B2]" />
                        </button>
                        <button
                          onClick={() => handleShare("instagram", post)}
                          className="p-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <Instagram className="w-4 h-4 text-muted-foreground hover:text-[#E4405F]" />
                        </button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    {showComments === post.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="font-medium text-foreground mb-3">Comments</h4>
                        
                        {/* Existing Comments */}
                        <div className="space-y-3 mb-4">
                          {post.comments.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No comments yet. Be the first!</p>
                          ) : (
                            post.comments.map((comment) => (
                              <div key={comment.id} className="p-3 rounded-xl bg-secondary/50">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm text-eco-lavender">{comment.author}</span>
                                  <span className="text-xs text-muted-foreground">{comment.time}</span>
                                </div>
                                <p className="text-sm text-foreground">{comment.text}</p>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Add Comment */}
                        <div className="flex gap-2">
                          <Input
                            placeholder="Write a comment..."
                            value={newComment[post.id] || ""}
                            onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                            onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                          />
                          <Button variant="eco" size="icon" onClick={() => handleAddComment(post.id)}>
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-eco-yellow" />
              Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Share your eco-friendly actions to inspire others! Upload photos of your sustainable acts, tag your friends to encourage them to join the green movement. 
              Sharing badge achievements earns you bonus points!
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MyPosts;
