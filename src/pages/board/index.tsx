import Head from "next/head";
import styles from "./styles.module.sass";
import {
  FiPlus,
  FiCalendar,
  FiEdit2,
  FiTrash,
  FiClock,
  FiX,
} from "react-icons/fi";
import SupportButton from "../../components/SupportButton";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import firebase from "../../services/firebaseConnection";
import { format } from "date-fns";
import Link from "next/link";

type TaskList = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  tarefa: string;
  userId: string;
  nome: string;
};

interface BoardProps {
  user: {
    id: string;
    nome: string;
  };
  data: string;
}

function Board({ user, data }: BoardProps) {
  const [input, setInput] = useState("");
  const [task, setTask] = useState<TaskList[]>(JSON.parse(data));
  const [taskEdit, setTaskEdit] = useState<TaskList | null>(null);

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();

    if (input === "") {
      alert("Digite uma tarefa");
      return;
    }

    if (taskEdit) {
      await firebase
        .firestore()
        .collection("tarefas")
        .doc(taskEdit.id)
        .update({
          tarefa: input,
        })
        .then(() => {
          let data = task;
          let taskIndex = task.findIndex((item) => (item.id = taskEdit.id));
          data[taskIndex].tarefa = input;

          setTask(data);
          setTaskEdit(null);
          setInput("");
        });

      return;
    }

    await firebase
      .firestore()
      .collection("tarefas")
      .add({
        create: new Date(),
        tarefa: input,
        userId: user.id,
        nome: user.nome,
      })
      .then((doc) => {
        const data = {
          id: doc.id,
          created: new Date(),
          createdFormated: format(new Date(), "dd MMMM yyyy"),
          tarefa: input,
          userId: user.id,
          nome: user.nome,
        };
        setTask([...task, data]);
        setInput("");
      });
  };

  async function handleDelete(id: string) {
    await firebase
      .firestore()
      .collection("tarefas")
      .doc(id)
      .delete()
      .then(() => {
        let taskDelete = task.filter((task) => task.id !== id);

        setTask(taskDelete);
      });
  }

  function handleEditTask(task: TaskList) {
    setTaskEdit(task);
    setInput(task.tarefa);
  }

  function handleCancelEdit() {
    setInput("");
    setTaskEdit(null);
  }

  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>

      <main className={styles.container}>
        {taskEdit && (
          <span className={styles.warnText}>
            <button onClick={handleCancelEdit}>
              <FiX size={30} color="#ff3636" />
            </button>
            Você está editando uma tarefa...
          </span>
        )}
        <form>
          <input
            type="text"
            placeholder="Digite sua tarefa"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit" onClick={handleAddTask}>
            <FiPlus size={25} color="#17181f" />
          </button>
        </form>

        <h1>
          Voce tem {task.length} {task.length == 1 ? "Tarefa" : "Tarefas"}
        </h1>

        <section>
          {task.map((task) => (
            <article className={styles.taskList} key={task.id}>
              <Link href={`/board/${task.id}`}>
                <p>{task.tarefa}</p>
              </Link>

              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color="#ffb800" />
                    <time>{task.createdFormated}</time>
                  </div>
                  <button onClick={() => handleEditTask(task)}>
                    <FiEdit2 size={20} color="#fff" />
                    <span>Editar</span>
                  </button>
                </div>

                <button onClick={() => handleDelete(task.id)}>
                  <FiTrash size={20} color="#ff3636" />
                  <span>Excluir</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar esse projeto.</h3>
        <div>
          <FiClock size={20} color="#fff" />
          <time>Última doação foi a 3 dias.</time>
        </div>
      </div>

      <SupportButton />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    //redirecionar se nao estiver logado

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

  const data = JSON.stringify(
    tasks.docs.map((item) => {
      return {
        id: item.id,
        createdFormated: format(item.data().create.toDate(), "dd MMMM yyyy"),
        ...item.data(),
      };
    })
  );

  const user = {
    nome: session?.user.name,
    id: session?.user,
  };

  return {
    props: {
      user,
      data,
    },
  };
};

export default Board;
