import Head from "next/head";
import Image from "next/image";
import Footer from "../components/footer";
import styles from "../styles/Contact.module.css";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGlobalContext } from "../context";

const Contact = () => {
  const {setModal} = useGlobalContext()
  const [input, setInput] = useState({})
  const handleSubmit = () => {
    return;
  };
     const ref = useRef();
     const [tl, setTl] = useState(gsap.timeline({ paused: false }));

     useEffect(() => {
       tl.from(ref.current, {
         x: `${Number(Math.random().toFixed()) > 0.5 ? "+" : "-"}=60`,
         opacity: 0,
         duration: 0.3,
       });
       setModal(false)
     }, []);
  return (
    <div ref={ref}>
      <Head>
        <title>Contact Me</title>
        <meta
          name="description"
          content="Prince charles Amachree Portfoliio About"
        />
        <link rel="icon" href="/png.ico" />
      </Head>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input required
            type="text"
            onChange={(e) => {
              setInput({ ...input, name: e.target.value });
            }}
            placeholder="Your Name"
          />
          <input required
            type="email"
            onChange={(e) => {
              setInput({ ...input, mail: e.target.value });
            }}
            placeholder="Your Email"
          />
          <textarea placeholder="Job Details" required/>

          <input type="submit" value="SUBMIT" />
        </form>
      </main>
      <Squiggles />

      <Footer />
    </div>
  );
};
export const Squiggles = () => {
  return (
    <>
      <div className={`${styles.squiggle1}`}>
        <Image alt="squiggles"src="/Saly-33.png" width={900} height={400} />
      </div>
      <div className={`${styles.squiggle2}`}>
        <Image alt="squiggles" src="/Saly-33.png" width={700} height={300} />
      </div>
    </>
  );
};
export default Contact;
