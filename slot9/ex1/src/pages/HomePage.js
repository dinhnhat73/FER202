import HomeCarousel from "../components/Home/HomeCarousel";

export default function HomePage() {
  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        🎬 Top 3 Featured Movies
      </h2>
      <HomeCarousel />
    </div>
  );
}
