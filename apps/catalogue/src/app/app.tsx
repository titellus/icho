import "semantic-ui-css/semantic.min.css";
import styles from "./app.module.scss";
import { UiSearch } from "@catalogue/ui/search";
import { AuthProvider } from "@catalogue/utils/shared";
import { SigninForm } from "@catalogue/ui/authenticate";

export function App() {
  return (
    <AuthProvider>
      <div className={styles.app}>
        <header className="flex">
          <h1>Welcome to catalogue!</h1>
          <SigninForm/>
        </header>
        <main>
          <UiSearch />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
