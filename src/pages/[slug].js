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
  content }) {

  return (
    <>
      <Head>
        <title>{title} | Neranjana's Blog 📝</title>
      </Head>
      <main className="post container">
        <section className="post-intro">
          <nav>
            <h2>Neranjana's Blog</h2>
            <p><Link href={"/"}>Home</Link></p>
          </nav>
          <div className="post-img">
            <Image
              src={image}
              objectFit="cover"
              layout="fill"
              priority
            />
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
        </section>

        <footer className="post-footer">
            <div>
              <p>Thanks For Reading</p>
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
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
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
      content,
    },
  };
}
