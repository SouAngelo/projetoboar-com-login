import Head from "next/head"
import { GetStaticProps } from "next";
import styles from '../styles/styles.module.sass'
import firebase from "../services/firebaseConnection"
import { useState } from 'react'
import Image from 'next/image'
import boardImage from '../../public/images/board-user.svg'

type Data = {
  id: string;
  donate: boolean;
  lastDonate: Date;
  image: string;
}

interface HomeProps{
  data: string
}

export default function Home( { data }: HomeProps ) {

  const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data))

  return (
    <>
      <Head>
        <title>Bem vindo a home</title>
      </Head>

      <main className={styles.contentContainer}>
        <Image src={boardImage} alt="" />

        <section className={styles.callToAction}>
          <h1>Uma ferramenta para seu dia a dia. Escreva, planeje e organize-se!</h1>
          <p><span>100% Gratuita</span> e online</p>
        </section>

         {donaters.length > 0 && <h3>Apoiadores:</h3>}
        <div className={styles.donaters}>
          {donaters.map( item => (
            <img key={item.id} src={item.image} alt="" />
          ))}
        </div>
      </main>
    </>
  );
}


export const getStaticProps: GetStaticProps = async () => {


  const donaters = await firebase.firestore().collection('users')
  .get()

  const data = JSON.stringify(donaters.docs.map( item => {
    return{
      id: item.id,
      ...item.data()
    }
  }))

  return{
    props:{
      data
    },
    revalidate: 60 * 60 // Atualiza a cada 1 hora
  }
}