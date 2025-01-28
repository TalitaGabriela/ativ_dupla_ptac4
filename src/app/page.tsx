"use client"
import styles from "./styles/home.module.css"
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

export default function Home() {


  const router = useRouter();
  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies()
    if (!token) {
      router.push('/Login')
    }
  }, [router])
  return (
    <div className={styles.body}>
      <Navbar />
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <img src="/images/Cardápio.png" alt="cardapio" className={styles.cardimg} />
          <div className={styles.conteudo}>
            <h2>Cardápio Especial</h2>
            <p>Explore nossos pratos deliciosos e escolha sua próxima refeição!</p>
            <a href="/" className={styles.verMais}>Ver Cardápio</a>
          </div>
        </div>

        <div className={styles.card}>
          <img src="/images/reservaMesa.jpg" alt="reserva" className={styles.cardimg} />
          <div className={styles.conteudo}>
            <h2>Reserve sua Mesa</h2>
            <p>Garanta seu lugar e aproveite uma experiência incrível!</p>
            <a href="/" className={styles.verMais}>Ver Reservas</a>
          </div>
        </div>

        <div className={styles.card}>
          <img src="/images/t&j_fachada.png" alt="logo" className={styles.cardimg} />
          <div className={styles.conteudo}>
            <h2>Venha até ao nosso Estabelicimento!</h2>
            <p>Garanta seu lugar e a experiência de comer lanches incríveis!</p>
            <a href="/" className={styles.verMais}>Ver Localização</a>
          </div>
        </div>
      </div>


      <div className={styles.propagandaContainer}>
        <div className={styles.imagemPropaganda}>
          <img src="/images/marketing.jpg" alt="a" />
        </div>
        <div className={styles.imagemPropaganda}>
          <img src="/images/marketing.2jpg.jpg" alt="aa" />
        </div>
      </div>


      < Footer />
    </div>
  )
}