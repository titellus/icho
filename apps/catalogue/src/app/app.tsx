import "semantic-ui-css/semantic.min.css";
import styles from "./app.module.scss";
import { UiSearch } from "@catalogue/ui/search";
import { AuthProvider } from "@catalogue/utils/shared";
import { Link, Outlet } from "react-router-dom";

export function App() {
  return (
    <AuthProvider>
      <div className={styles.app}>
        <header className="flex">
          <h1>Welcome to catalogue!</h1>

          <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem"
            }}
          >
            <Link to="/home">Home</Link> |{" "}
            <Link to="/search">Search</Link> |{" "}
            <Link to="/search?filter=PICC">PICC</Link> |{" "}
            <Link to="/authenticate">Sign in</Link>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </AuthProvider>


  );
}

export default App;
