import styles from "../styles/Home.module.css";
import { DataStore } from "aws-amplify";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Post } from "../src/models";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const postData = await DataStore.query(Post);
      setPosts(postData);
    }

    fetchPosts();
    const subscription = DataStore.observe(Post).subscribe(() => fetchPosts());
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <a>
            <h2>{post.title}</h2>
          </a>
        </Link>
      ))}
    </div>
  );
}
