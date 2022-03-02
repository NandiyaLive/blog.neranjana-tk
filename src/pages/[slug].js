import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Post({
  frontmatter: { title, date, image },
  slug,
  content
}) {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{title} — Neranjana's Blog 📝</title>
        <meta name="title" content={`${title} — Neranjana's Blog 📝`} />
        <meta
          name="description"
          content="Neranjana Prasad's (Nandiya's) personal blog. Writes about tech, thoughts, personal opinions and some random stuff."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://blog.neranjana.tk/${slug}`} />
        <meta property="og:title" content={`${title} — Neranjana's Blog 📝`} />
        <meta
          property="og:description"
          content="Neranjana Prasad's (Nandiya's) personal blog. Writes about tech, thoughts, personal opinions and some random stuff."
        />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://blog.neranjana.tk/${slug}`}
        />
        <meta
          property="twitter:title"
          content={`${title} — Neranjana's Blog 📝`}
        />
        <meta
          property="twitter:description"
          content="Neranjana Prasad's (Nandiya's) personal blog. Writes about tech, thoughts, personal opinions and some random stuff."
        />
        <meta property="twitter:image" content={image} />
      </Head>
      <main className="post container">
        <section className="post-intro">
          <nav>
            <h2>Neranjana's Blog</h2>
            <p>
              <Link href={"/"}>Home</Link>
            </p>
          </nav>
          <div className="post-img">
            <Image src={image} objectFit="cover" layout="fill" priority />
            <div className="post-img-overlay"></div>
          </div>
          <div className="post-head">
            <p className="post-title">{title}</p>
            <p className="date">{date}</p>
          </div>
        </section>

        <section className="post-content">
          <div className="post-body">
            <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
          </div>
          <p>
            <a
              href={`https://github.com/NandiyaLive/blog.neranjana-tk/blob/main/src/posts/${slug}.md`}
              target="_blank"
              rel="noreferrer"
            >
              ✏️ Edit On Github
            </a>
          </p>
        </section>

        <footer className="post-footer">
          <div>
            <p>Thanks For Reading!</p>
            <p>
              Written with ❤️ By{" "}
              <a
                href="https://neranjana.tk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Neranjana.
              </a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("src/posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", "")
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("src/posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content
    }
  };
}
