import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieManager from './pages/MovieManager';

function App() {
  console.log("✅ App component rendered");
  return (
    <div className="App">
      <MovieManager />
    </div>
  );
}

export default App;
