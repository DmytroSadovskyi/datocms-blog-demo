import Link from "next/link";
import { Image } from "react-datocms";

function BlogPostPreview(props: any) {
  const { data } = props;

  return (
    <div className="max-w-[400px] mb-12">
      <Image data={data.coverImage.responsiveImage} className="w-full mb-3" />
      <h2 className="font-bold mb-3">
        <Link href={`/blog/${data.slug}`}>{data.title}</Link>
      </h2>
      <div className="mb-3">{data.publishDate}</div>
      <p className="mb-3">{data.excerpt}</p>
      <p className="font-bold">{data.author.name}</p>
    </div>
  );
}

export default BlogPostPreview;
