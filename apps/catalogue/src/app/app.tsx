import "semantic-ui-css/semantic.min.css";
import styles from './app.module.scss';
import {UiSearch} from "@catalogue/ui/search";

export function App() {
  return (
    <div className={styles.app}>
      <header className="flex">
        <h1>Welcome to catalogue!</h1>
      </header>
      <main>
        <UiSearch/>
      </main>
    </div>
  );
}

export default App;
