// src/data/movies.js

 const movies = [
    {
        id: 1,
        title: "Avengers: Endgame",
        description:
          "Các siêu anh hùng còn sống sót sau cú búng tay của Thanos phải tìm cách đảo ngược hành động của hắn và khôi phục lại trật tự vũ trụ.",
        year: 2019,
        country: "USA",
        duration: 181,
        genre: "Action/Sci-Fi",
        poster: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
        showtimes: "10:00, 14:00, 18:00"
    },
    {
        id: 2,
        title: "Avatar: The Way of Water",
        description:
          "Jake Sully và Ney'tiri đã lập gia đình và có con. Họ phải đối mặt với một mối đe dọa mới và cùng nhau chiến đấu để bảo vệ hành tinh Pandora.",
        year: 2022,
        country: "USA",
        duration: 192,
        genre: "Sci-Fi/Adventure",
        poster: "https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg",
        showtimes: "11:30, 16:00, 20:30"
    },
    {
        id: 3,
        title: "Interstellar",
        description:
          "Một nhóm các nhà thám hiểm sử dụng lỗ sâu để vượt qua các giới hạn của du hành vũ trụ của con người, trong khi Trái Đất đang dần chết mòn.",
        year: 2014,
        country: "USA/UK",
        duration: 169,
        genre: "Sci-Fi/Drama",
        poster: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
        showtimes: "12:00, 16:30, 21:00"
    },
    {
        id: 4,
        title: "The Dark Knight",
        description:
          "Batman phải đối mặt với một kẻ thủ ác mới, The Joker, người gây ra sự hỗn loạn và thách thức anh hùng bảo vệ thành phố Gotham.",
        year: 2008,
        country: "USA/UK",
        duration: 152,
        genre: "Action/Crime/Drama",
        poster: "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg",
        showtimes: "15:00, 19:30"
    },
    {
        id: 5,
        title: "Pulp Fiction",
        description:
          "Những câu chuyện về tội phạm ở Los Angeles đan xen vào nhau, khám phá các chủ đề về đạo đức và bạo lực trong văn hóa Pop.",
        year: 1994,
        country: "USA",
        duration: 154,
        genre: "Crime/Drama",
        poster: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
        showtimes: "14:30, 22:00"
    },
    {
        id: 6,
        title: "Spirited Away",
        description:
          "Một cô bé mười tuổi bị lạc vào một thế giới linh hồn kỳ lạ, nơi cô phải làm việc để cứu cha mẹ mình và tìm đường trở về nhà.",
        year: 2001,
        country: "Japan",
        duration: 125,
        genre: "Animation/Fantasy",
        poster: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png",
        showtimes: "09:00, 13:00, 17:00"
    },
    {
        id: 7,
        title: "Forrest Gump",
        description:
          "Câu chuyện về một người đàn ông có IQ thấp vô tình chứng kiến và đóng vai trò quan trọng trong nhiều sự kiện lịch sử của Mỹ.",
        year: 1994,
        country: "USA",
        duration: 142,
        genre: "Drama/Romance",
        poster: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
        showtimes: "11:00, 19:00"
    },
    {
        id: 8,
        title: "Parasite",
        description:
          "Một gia đình nghèo tìm cách thâm nhập và chiếm lấy cuộc sống của một gia đình giàu có, dẫn đến những hậu quả kinh hoàng.",
        year: 2019,
        country: "South Korea",
        duration: 132,
        genre: "Drama/Thriller",
        poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
        showtimes: "18:30, 23:00"
    },
    {
        id: 9,
        title: "La La Land",
        description:
          "Câu chuyện tình yêu đầy tham vọng giữa một nhạc sĩ Jazz và một nữ diễn viên trẻ ở Los Angeles.",
        year: 2016,
        country: "USA",
        duration: 128,
        genre: "Musical/Drama/Romance",
        poster: "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png",
        showtimes: "14:00, 20:00"
    }
];

// Danh sách thể loại để sử dụng cho Bộ lọc
export default movies;