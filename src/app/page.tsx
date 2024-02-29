import { Metadata } from "next";

import { performRequest } from "./lib/datocms";
import BlogPostPreview from "./components/BlogPostPreview";

export const metadata: Metadata = {
  title: "Simple blog",
  description: "A simple blog using DatoCMS",
};

const PAGE_CONTENT_QUERY = `
query MyQuery {
  allPosts {
    title
    slug
    excerpt
    coverImage {
     responsiveImage {
        alt
        aspectRatio
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        base64
      }
    }
    publishDate
    id
    author {
    name
  }
  }
  
}
 `;

export default async function Home() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const posts = data.allPosts;

  return (
    <div className="min-h-screen h-screen flex flex-col justify-top items-center py-0 px-[0.5rem]">
      <div>
        <h1>Simple blog</h1>
      </div>
      <div>
        {posts.map((post: any) => (
          <BlogPostPreview key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
}
