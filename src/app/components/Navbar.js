import Image from "next/image";
import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Image src="/images/logo.jpg" width={40} height={40} alt="Logo"/>
      </div>

      <div className={styles.navLink}>
        <Link href="/Reservas" className={styles.link}>Reservas</Link>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/Login" className={styles.link}>Login</Link>
        <Link href="/Cadastro" className={styles.link}>Cadastrar</Link>
      </div>
    </nav>
  );
}
