import Header from "../components/Header";
import "../styles/global.sass";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { SessionProvider } from "next-auth/react";

const initialOptions = {
  "client-id": "AVTR8WF9w_jqiBRism0u2nLX78KWwP42mFB7fN38FNw-pFiIdEU_8y8rowJg9xmHRjdfPXqtBOYHote1",
  currency: "BRL",
  intent: "capture"
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} basePath="/api/auth">
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps}  />
      </PayPalScriptProvider>
    </SessionProvider>
  );
}

export default MyApp;
