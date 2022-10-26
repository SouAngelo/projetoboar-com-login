
import styles from './style.module.sass'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import { signIn, signOut, useSession } from 'next-auth/react'

function Button() {

    const {data: session} = useSession()

  return session ? (
    <button
    type='button'
    className={styles.signInButton}
    onClick={() => signOut()}
    >
        <img src={session.user.image} alt="" />
         <p>Olá {session.user.name}</p>
        <FiX color='737380' className={styles.closeIcon}/>
    </button>
  ) : (
    <button
    type='button'
    className={styles.signInButton}
    onClick={() => signIn('github')}
    >
        <FaGithub color='#ffb800'/>
        Entrar com github
    </button>
  )
}

export default Button