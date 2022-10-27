import Head from "next/head";
import React from "react";
import styles from './styles.module.sass'
import Link from "next/link";

function Login() {
  return (
    <>
      <Head>
        <title>Faça o login</title>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        ></link>
      </Head>

      <section className="vh-100" id={styles.container} style={{ backgroundColor: "#f7f2f2"}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100" id={styles.containerDiv}>
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem", minWidth:'300px' }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Entrar</h3>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                      placeholder="Digite seu email"
                    />
                    
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                      placeholder="Digite sua senha"
                    />
                   
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Entrar
                  </button>

                  <hr className="my-4" />
                  
                  <label>Não tem uma conta? <Link href='/register'><a>Cadastre-se</a></Link></label>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
