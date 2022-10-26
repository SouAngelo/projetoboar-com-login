import { useRef, useState } from "react";
import Image from "next/image";

import Burger from "@animated-burgers/burger-squeeze";
import "@animated-burgers/burger-squeeze/dist/styles.css";

import Link from "next/link";
import styles from "./styles.module.sass";
import Button from "../SigninButton";
import logo from "../../../public/images/logo.svg";

function Header() {
  const [open, setOpen] = useState(false);
  const hamb = useRef(null);

  const openHamburguer = () => {
    setOpen(!open);

    if (open === true) {
      hamb.current.style.display = "none";
    } else {
      hamb.current.style.display = "block";
    }
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <a>
            <Image src={logo} />
          </a>
        </Link>

        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>

          <Link href="/board">
            <a>Meu board</a>
          </Link>
        </nav>

        <div ref={hamb} className={styles.btnDiv}>
          <Button />
        </div>

        <Burger isOpen={open} onClick={openHamburguer} id={styles.burguer} />
      </div>
    </header>
  );
}

export default Header;
