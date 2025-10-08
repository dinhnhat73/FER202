import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import "./HomeCarousel.css";

function HomeCarousel() {
  const movies = [
    {
      title: "Avengers: Endgame",
      genre: "Action",
      img: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SL1500_.jpg"
    },
    {
      title: "Frozen II",
      genre: "Animation",
      img: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SL1500_.jpg"
    },
    {
      title: "Joker",
      genre: "Drama",
      img: "https://m.media-amazon.com/images/I/71oN5f2Xv0L._AC_SL1024_.jpg"
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
