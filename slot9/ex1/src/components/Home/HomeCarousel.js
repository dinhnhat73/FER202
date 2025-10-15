import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import "./HomeCarousel.css";

function HomeCarousel() {
  const movies = [
  {
    title: "Basic Instinct",
    genre: "Erotic Thriller",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/20/Basic_Instinct_Cannes_1992.jpg"
  },
  {
    title: "9½ Weeks",
    genre: "Erotic Romance",
    img: "https://upload.wikimedia.org/wikipedia/en/4/49/Nine-12-weeks-theatrical-movie-poster-md.jpg"
  },
  {
    title: "Secretary",
    genre: "Erotic Romance/Drama",
    img: "https://upload.wikimedia.org/wikipedia/en/9/91/Secretary_%282002%29.png"
  }
];
  return (
    <Carousel fade interval={3000} controls indicators>
      {movies.map((movie, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 carousel-img"
            src={movie.img}
            alt={movie.title}
          />
          <Carousel.Caption>
            <h3>{movie.title}</h3>
            <Badge bg="primary">{movie.genre}</Badge>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HomeCarousel;
