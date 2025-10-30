import axios from "axios";

export async function fetchBloggerPosts(blogId: string) {
  const key = import.meta.env.VITE_BLOGGER_API_KEY;
  const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${key}`;

  const { data } = await axios.get(url);
  return data.items || [];
}
