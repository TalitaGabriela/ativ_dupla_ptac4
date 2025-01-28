import Link from "next/link";
import styles from "../styles/footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>Sobre Nós</h4>
          <p>
            Servimos os melhores lanches da cidade, feitos com amor e
            ingredientes frescos!
          </p>
        </div>
        <div className={styles.footerSection}>
          <h4>Contato</h4>
          <p>(67)9 9882-2704</p>
          <p>joao.canezin@gmail.com</p>
          <p>Rua Lanche Almeida Cabral, 728 - Centro</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Siga nas Redes Sociais</h4>
          <div className={styles.socialIcons}>
            <Link href="#" className={styles.link}>
              <Image src="/images/insta.png" width={15} height={15} alt="a" />{" "}
              Instagram
            </Link>
            <Link href="#" className={styles.link}>
              <Image src="/images/face.png" width={15} height={15} alt="a" />{" "}
              Facebook
            </Link>
            <Link href="#" className={styles.link}>
              <Image src="/images/whats.png" width={15} height={15} alt="a" />{" "}
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>₢ 2025 Lanchonete Gourmet. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
