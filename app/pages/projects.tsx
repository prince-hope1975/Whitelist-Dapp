import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import { Squiggles } from "./contact";
import styles from "../styles/Project.module.css";
import Data from "../data/ProjectsData";
import { useGlobalContext } from "../context";

const Work = () => {
  const { setModal } = useGlobalContext();
  const [tl, setTl] = useState(gsap.timeline({ paused: false }));

  useEffect(() => {
    setModal(false);
  }, []);

  return (
    <>
      <Head>
        <title>My Work</title>
        <meta
          name="description"
          content="Prince charles Amachree Portfoliio About"
        />
        <link rel="icon" href="/png.ico" />
      </Head>
      <section className={`${styles.section}`}>
        <div className={styles.projects}>Projects</div>
        <div className={styles.cardSection}>
          {Data.map((data, index) => {
            return <Card key={index} {...data} className={`${styles.card} `} />;
          })}
        </div>
      </section>
      <Squiggles />
      <Footer />
    </>
  );
};
const Card = ({ className, title, description, links, tools }) => {
  const router = useRouter();
  return (
    <div className={className}>
      <h1>{title}</h1>
      <div className={styles.tools}>
        {tools.map((tool: String, index: Number) => {
          if (index === tools.length - 1) return tool.toUpperCase();
          return tool.toUpperCase() + " + ";
        })}
      </div>
      <div className={styles.links}>
        {links.map(({ Logo, link }, index) => {
          return (
            <a
              onClick={() => {
                router.push(link);
              }}
              key={`key${index}`}
            >
              <Logo />{" "}
              <span className={styles.span}>
                {index === 0 ? "Live" : "Code"}
              </span>
            </a>
          );
        })}
      </div>

      <p>{description.slice(0, 150)}</p>
    </div>
  );
};
export default Work;
