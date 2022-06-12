import { useEffect } from "react"
import DefaultLayout from "../layouts/default";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios"

axios.defaults.baseURL = `${window.location.origin}/`

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);

  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;
