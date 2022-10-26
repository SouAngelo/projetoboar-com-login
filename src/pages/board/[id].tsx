import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import firebase from "../../services/firebaseConnection";
import format from "date-fns/format";
import Head from 'next/head';
import { FiCalendar } from "react-icons/fi";
import styles from './task.module.sass'

type Task = {
    id: string;
    created: string | Date;
    createdFormated?: string;
    tarefa: string;
    userId: string;
    nome: string;
}

interface TaskProps{
    data: string;
}

function Task( { data }: TaskProps ) {

  const task = JSON.parse(data) as Task

  return (
    
    <>
     <Head>
        <title>Detalhes de sua terefa</title>
     </Head>

     <article className={styles.container}>
        <div className={styles.actions}>
            <div>
                <FiCalendar size={30} color='#fff'/>
                <span>Tarefa criada:</span>
                <time>{task.createdFormated}</time>
            </div>
        </div>
        <p>{task.tarefa}</p>
     </article>
    </>
  );
}

export default Task;

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { id } = params
    const session = await getSession({ req })

  if(!session?.user){
    return{
        redirect:{
            destination: '/board',
            permanent: false
        }
    }
  }

  const data = await firebase.firestore().collection('tarefas')
  .doc(String(id))
  .get()
  .then( snapshot => {
    const data = {
        id: snapshot.id,
        created: snapshot.data().create,
        createdFormated: format(snapshot.data().create.toDate(), 'dd MMMM yyyy'),
        tarefa: snapshot.data().tarefa,
        userId: snapshot.data().userId,
        nome: snapshot.data().nome
    }

    return JSON.stringify(data)
  })

  return {
    props: {
        data
    },
  };
};
