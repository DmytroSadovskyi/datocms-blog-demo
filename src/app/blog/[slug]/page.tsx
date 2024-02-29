import { performRequest } from "@/app/lib/datocms";
import Image from "next/image";
import Link from "next/link";
import { StructuredText } from "react-datocms";

const SLUGS_QUERY = `
query MyQuery {
  allPosts {
    slug
  }
}
`;

const POST_QUERY = `
  query MyQuery($slug: String) {
    post(filter: { slug: { eq: $slug } }) {
      content {
        value
      }
      coverImage {
        url
      }
      id
      publishDate
      slug
      title
      author {
        name
      }
    }
  }
`;

export async function generateStaticParams() {
  const { data } = await performRequest({
    query: SLUGS_QUERY,
  });

  const slugs = data.allPosts.map((post: any) => post.slug);

  return slugs.map((slug: string) => ({
    params: {
      slug: slug,
    },
  }));
}

export default async function BlogPost(params: { slug: string }) {
  const postData = await performRequest({
    query: POST_QUERY,
    variables: { slug: params.slug },
  });

  const post = postData.data.post;

  return (
    <div className="min-h-screen h-screen flex flex-col justify-top items-center py-0 px-[0.5rem]">
      <div className="max-w-[600px] mb-12">
        <Image
          src={post.coverImage.url}
          alt={post.title}
          width={1200}
          height={800}
          className="w-full mb-3 mt-2"
        />
        <h1>{post.title}</h1>
        <p>
          {post.author.name}/{post.publishDate}
        </p>
        <StructuredText data={post.content.value} />

        <Link href={"/"}>Back to recipes</Link>
      </div>
    </div>
  );
}
