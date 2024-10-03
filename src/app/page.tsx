"use client"
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo à página inicial</h1>
      <Link href="/Login">Ir para a página de login</Link>
    </div>
  );
}
