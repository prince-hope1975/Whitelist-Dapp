import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRef } from "react";
import gsap from "gsap";
const Cursor = () => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    window.document.addEventListener("mousemove", (e) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    });
  }, []);
  useEffect(() => {
    setPosX(posX + (mouseX - posX) / 9);
    setPosY(posY + (mouseY - posY) / 9);
    gsap.set(cursor_follower.current, {
      css: {
        left: posX - 12,
        top: posY - 12,
      },
    });
    gsap.set(cursor.current, {
      css: {
        left: mouseX,
        top: mouseY,
      },
    });
  }, [mouseX, mouseY]);

  // useLayoutEffect(()=>{
  //   document.querySelectorAll("a").forEach(item=>{
  //     item.addEventListener("mouseenter",()=>{
  //       cursor.current.classList.add("active")
  //       cursor_follower.current.classList.add("active");
  //     })
  //      item.addEventListener("mouseleave", () => {
  //        cursor.current.classList.remove("active");
  //        cursor_follower.current.classList.remove("active");
  //      });
    
  //   })
  // },[])
  const cursor = useRef();
  const cursor_follower = useRef();

  return (
    <>
      <div ref={cursor} className="cursor"></div>
      <div ref={cursor_follower} className="cursor-follower"></div>
    </>
  );
};
export default Cursor;
