import Image from "next/image";
import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Image src="/images/logo.png" width={100} height={90} alt="Logo" />
        </div>

        <div className={styles.navLink}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/Reservas" className={styles.link}>
            Reservas
          </Link>
          <Link href="/Cadastro" className={styles.link}>
            Cadastrar
          </Link>
          <Link href="/Login" className={styles.linkEntrar}>
            Entrar
          </Link>
        </div>
      </nav>
    </div>
  );
}
