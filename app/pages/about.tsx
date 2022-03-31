import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Footer from "../components/footer"
import { Squiggles } from "./contact";
import styles from "../styles/about.module.css"
import { Logo } from ".";
import { Blob } from "../components/footer";
import { useGlobalContext } from "../context";


const About = () => {
  const ref = useRef();
  const [tl, setTl] = useState(gsap.timeline({ paused: false }));
  const {active, setModal} = useGlobalContext()


  useEffect(() => {
    tl.from(ref.current, {
      x: `${Number(Math.random().toFixed()) > 0.5 ? "+" : "-"}=60`,
      opacity: 0,
      duration: 0.3,
    });
    setModal(false)
  }, []);
  return (
    <>
      <Head>
        <title>About Me</title>
        <meta
          name="description"
          content="Prince charles Amachree Portfoliio About"
        />
        <link rel="icon" href="/png.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}  ref={ref}>
          <Logo className={styles.logo} />
          {"I'm Prince Charles"}
        </main>
        <Blob className={styles.blob}>
          <h2>BackGround</h2>
        <p>I am a multi Discipline Engineer, with a Background in Software and Electrical Engineering</p>
        <h2>Roots</h2>
        <p>I have Been Into Software Development sinceIs 2018 and have gathered skills that help me create software that solves real world problems and provide value</p>
        <h2>Tech Tools</h2>
        <p>Javascript, React, Next.js, TypeScript, HTML, Vite, Webpack,Node, Solidity, Reach, Pyteal,</p>
          </Blob>
        <Squiggles />
        <Footer />
      </div>
    </>
  );
};
export default About;
