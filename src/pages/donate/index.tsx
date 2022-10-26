import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import styles from "./styles.module.sass";
import firebase from "../../services/firebaseConnection";
import { useState } from "react";
import Image from 'next/image'
import rocketImage from '../../../public/images/rocket.svg'


interface DonateProps {
  user: {
    nome: string;
    id: string;
    image: string;
  };
}

function Donate({ user }: DonateProps) {
  const [vip, setVip] = useState(false);

  console.log(user)

  async function handleSaveDonate() {
        setVip(true);
  }

  return (
    <>
      <Head>
        <title>Ajude a plataforma board ficar online</title>
      </Head>

      <main className={styles.container}>
        <Image src={rocketImage} alt="Seja apoiador" />

        {vip && (
          <div className={styles.vip}>
            <span>Parabéns você é um apoiador!</span>
          </div>
        )}

        <h1>Seja um apoiador desse projeto 🏆</h1>
        <h3>
          Contribua com apenas <span>R$ 1.00</span>
        </h3>
        <strong>
          Tenha funcionalidades exclusivas.
        </strong>

        {vip ? <></> : <button onClick={handleSaveDonate} className={styles.btn}>
          Quero apoiar
        </button>}

      </main>
    </>
  );
}

export default Donate;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const tasks = await firebase
  .firestore()
  .collection("tarefas")
  .orderBy("create", "asc")
  .get();

const user = JSON.stringify(
  tasks.docs.map((item) => {
    return {
      nome: item.data().userId.name,
      id: item.id,
      image: item.data().userId.image,
    };
  })
);

console.log(user)

  return {
    props: {
      user,
    },
  };
};
