// src/pages/MoviePage.jsx

import React, { useState, useMemo } from 'react'; // Import useState và useMemo
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCard from '../components/Movie/MovieCard.jsx';
import MovieFilterSort from '../components/Movie/MovieFilterSort.jsx'; // Import component Filter/Sort
import { movies } from '../data/movies.js';

export default function MoviePage() {
    // State cho các tiêu chí Lọc và Sắp xếp
    const [searchKeyword, setSearchKeyword] = useState('');
    const [genreFilter, setGenreFilter] = useState('All');
    const [sortCriteria, setSortCriteria] = useState('');

    // State tạm thời để lưu keyword sau khi click Search
    const [appliedSearchKeyword, setAppliedSearchKeyword] = useState('');

    // Hàm xử lý logic Lọc và Sắp xếp
    const filteredAndSortedMovies = useMemo(() => {
        let result = [...movies];

        // 1. Lọc theo Thể loại (Genre)
        if (genreFilter !== 'All') {
            result = result.filter(movie => movie.genre.includes(genreFilter));
        }

        // 2. Lọc theo Từ khóa (Áp dụng keyword đã được click Search)
        if (appliedSearchKeyword) {
            const keyword = appliedSearchKeyword.toLowerCase();
            result = result.filter(movie => 
                movie.title.toLowerCase().includes(keyword) || 
                movie.description.toLowerCase().includes(keyword)
            );
        }

        // 3. Sắp xếp (Sort)
        if (sortCriteria) {
            const [field, direction] = sortCriteria.split('_'); // Ví dụ: year_asc => field='year', direction='asc'

            result.sort((a, b) => {
                let comparison = 0;

                if (field === 'title') {
                    // Sắp xếp chuỗi (Title)
                    comparison = a.title.localeCompare(b.title);
                } else if (field === 'year' || field === 'duration') {
                    // Sắp xếp số (Year, Duration)
                    comparison = a[field] - b[field];
                }

                // Đảo ngược kết quả nếu là sắp xếp giảm dần ('desc')
                return direction === 'desc' ? comparison * -1 : comparison;
            });
        }

        return result;
    }, [genreFilter, appliedSearchKeyword, sortCriteria]); // Chạy lại khi 3 state này thay đổi


    // Hàm xử lý sự kiện: Chỉ áp dụng tìm kiếm khi người dùng nhấn nút Search
    const handleSearchClick = () => {
        setAppliedSearchKeyword(searchKeyword);
    };

    // Hàm xử lý sự kiện: Xóa keyword tìm kiếm nếu ô input trống
    const handleSearchChange = (value) => {
        setSearchKeyword(value);
        // Nếu người dùng xóa hết ký tự, reset bộ lọc tìm kiếm
        if (value === '') {
            setAppliedSearchKeyword('');
        }
    };

    return (
        <div className="container-fluid p-4">
            {/* 1. Component Lọc/Sắp xếp */}
            <MovieFilterSort
                searchKeyword={searchKeyword}
                genreFilter={genreFilter}
                sortCriteria={sortCriteria}
                onSearchChange={handleSearchChange}
                onGenreChange={setGenreFilter}
                onSortChange={setSortCriteria}
                onSearchClick={handleSearchClick}
            />

            <h2 className='mb-4'>
                Featured Movies ({filteredAndSortedMovies.length} found)
            </h2>

            {/* 2. Hiển thị danh sách phim đã được lọc và sắp xếp */}
            <Row xs={1} md={2} lg={3} xl={4} className="g-4"> 
                {filteredAndSortedMovies.map((movie) => (
                    <Col key={movie.id} className="d-flex align-items-stretch">
                        <MovieCard {...movie} /> {/* Sử dụng spread operator */}
                    </Col>
                ))}
            </Row>

            {/* Hiển thị thông báo nếu không tìm thấy phim nào */}
            {filteredAndSortedMovies.length === 0 && (
                <div className="text-center p-5">
                    <p className="lead">
                        No movies found matching the current criteria.
                    </p>
                </div>
            )}
        </div>
    );
}