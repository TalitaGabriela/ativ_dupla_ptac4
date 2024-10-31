import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Image src="" width={40} height={40} />
      </div>

      <div className={styles.navLink}>
        <Link href="/Reservas" className={styles.link}>Reservas</Link>
        <Link href="/Login" className={styles.link}>Login</Link>
        <Link href="/Cadastro" className={styles.link}>Cadastra-se</Link>
      </div>
    </nav>
  );
}
