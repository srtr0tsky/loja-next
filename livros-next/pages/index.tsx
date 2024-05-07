import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {Menu} from "@/componentes/Menu";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Loja Next</title>
      </Head>
      <Menu/>
      <main className={styles.main} >
        
        <h1 className={styles.title} >Pagina  Inicial</h1>  
      </main>
    </>
  );
}
