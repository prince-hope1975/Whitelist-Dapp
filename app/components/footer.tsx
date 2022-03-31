import Link from "next/link";
import styles from "../styles/Footer.module.css";
import links from "../data/footerData";

const Footer = () => {
  return (
    <Blob className={`${styles.footer}`}>
      <div className={styles.icons}>
        {" "}
        {links.map((item,index)=>{
          const {Logo} = item
          return (
            <Link key={index} href={`${item.Link}`}>
              <Logo />
            </Link>
          );
        })}
        
      </div>

      <div className={styles.copy}>&copy; 2022 Prince Charles </div>
    </Blob>
  );
};
export const Blob =({className, children})=>{
return <div className={`${styles.blob} ${className}`}>
{children}
</div>
}
export default Footer;
