import HomeCarousel from "../components/Home/HomeCarousel";
import MovieCard from "../components/Movies/MovieCard";
import movies from "../components/data/movies.js";
// 1. Bỏ ghi chú ở dòng này để import component
import NavigationBar from '../components/NavigationBar'; 

export default function HomePage() {
  return (
    <div>
      {/* 2. Đặt component NavigationBar ở đây */}
      <NavigationBar /> 

      <h2 style={{ textAlign: "center", margin: "20px 0" }}>🎬 Featured Movie Collection</h2>
      <HomeCarousel movies={movies} />
       

      <h3 style={{ textAlign: "center", marginTop: "40px" }}>🎥 All Movies</h3>
      <MovieCard movies={movies} />
    </div>
  );
}