import Link from "next/link";
import styles from "./style.module.sass";
import { FaUserAlt } from "react-icons/fa";

function Button() {
  return (
    <Link href="/login">
      <button type="button" className={styles.signInButton}>
        <FaUserAlt size={25} /> Fazer login
      </button>
    </Link>
  );
}

export default Button;
