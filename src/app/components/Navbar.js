import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Image src="/images/logo.png" width={100} height={90} alt="Logo" />
          <h1>T&J Lanches</h1>
        </div>

        <button className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </button>

        <div className={`${styles.navLink} ${menuOpen ? styles.showMenu : ""}`}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/Reserva" className={styles.link}>
            Reservar
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
