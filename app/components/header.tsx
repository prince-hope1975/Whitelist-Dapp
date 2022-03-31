import { useState, useRef, useEffect, Component } from "react";
// import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGlobalContext } from "../context";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Header = () => {
  const burger1 = useRef();
  const burger2 = useRef();
  const modal = useRef();
  const router = useRouter();
  const { active, setActive } = useGlobalContext();
  // const [tl, setTl] = useState(gsap.timeline({ paused: false }));
  const { isModalOpen, setModal } = useGlobalContext();
  const ref = useRef();

  // const handleModal = () => {
  //   console.log(isModalOpen);
  //   if (!isModalOpen) {
  //     gsap.to(burger1.current, { rotate: "45deg", y: "15", width: "2rem" });
  //     gsap.to(burger2.current, { rotate: "-45deg" });
  //     gsap.to(modal.current, {
  //       y: "105vh",
  //       opacity: 1,
  //       duration: 0.6,
  //       display: "flex",
  //     });
  //     setModal(!isModalOpen);
  //   }
  //   if (isModalOpen) {
  //     gsap.to(burger1.current, {
  //       duration: 0,
  //       rotate: "0",
  //       y: "-3",
  //       width: "3rem",
  //     });
  //     gsap.to(burger2.current, { rotate: "+0", duration: 0 });
  //     gsap.to(modal.current, {
  //       y: "-105vh",
  //       display: "none",
  //       opacity: 0,
  //       duration: 0.1,
  //     });
  //     setModal(!isModalOpen);
  //   }
  // };

  // useEffect(() => {
  //   tl.from(ref.current, {
  //     x: `${Number(Math.random().toFixed()) > 0.5 ? "+" : "-"}=60`,
  //     opacity: 0,
  //     duration: 0.3,
  //   });
  //   setModal(false);
  // }, []);

  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.nav}`}>
        <ul ref={modal} className={`${styles["nav-menu"]} `}>
          {data.map(({ name, link, alt }, index) => {
            return (
              <NavItem
                handleModal={
                  ""
                }
                key={index}
                alt={alt}
                name={name}
                link={link}
                index={index}
              />
            );
          })}
        </ul>
        <div className={styles.burger} >
          <div ref={burger1} className={styles.burger1}></div>
          <div ref={burger2} className={styles.burger2}></div>
        </div>
      </nav>
      <div
        className={styles.img}
        onClick={() => {
          setActive(0);
          router.push("/");
        }}
      >
        <Image
          alt="Header icon"
          className={`${styles.image}`}
          src="/png2.png"
          width={90}
          height={100}
        />
      </div>
    </header>
  );
};

const NavItem = ({ name, link, index, alt, handleModal }) => {
  const { active, setActive, setModal } = useGlobalContext();
  return (
    <li
      key={index}
      className={`${styles["nav-item"]}    ${
        active === index ? "current" : ""
      }`}
      onClick={() => {
        setActive(index);
      }}
    >
      <Link href={`/${link}`}>
        {!alt ? (
          <a
            onClick={handleModal}
            className={`${styles["home-link"]} ${
              active === index && styles.underline
            }`}
          >
            {name || "Home"}
          </a>
        ) : (
          <a className={`${styles["home-link"]}`}>
            <span className={styles.homeText}>Home</span>
            <span
              className={`${styles.homeSvg} ${
                active === 0 && styles.invisible
              }`}
            >
              {alt}
            </span>
          </a>
        )}
      </Link>
    </li>
  );
};

const data = [
  {
    name: "Home",
    link: "",
    alt: null,
  },
  {
    name: "About",
    link: "about",
  },
  {
    name: "Portfolio",
    link: "projects",
  },
  {
    name: "Contact",
    link: "contact",
  },
];
export default Header;
