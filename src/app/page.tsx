"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar'
import { setCookie } from 'nookies';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

export default function Home() {


  const router = useRouter();
  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies()
    if (!token) {
      router.push('/Login')
    }
  }, [])
  return (
    <Navbar />
  )
}