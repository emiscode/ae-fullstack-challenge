import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type AuthorProps = {
  id: string;
  name: string;
  email: string;
} | null;

export type PostProps = {
  id: string;
  title: string;
  author: AuthorProps
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
