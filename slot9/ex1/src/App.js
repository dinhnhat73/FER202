import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./pages/HomePage";
import FooterPage from "./pages/FooterPage";
import NavigationBar from './components/NavigationBar'; // --- IGNORE ---
function App() {
  return (
    <div>
      <HomePage />
      <FooterPage />
      <NavigationBar /> {/* --- IGNORE --- */}
    </div>
  );
}

export default App;
