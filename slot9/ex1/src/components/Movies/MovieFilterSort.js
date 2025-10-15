// src/components/Movie/MovieFilterSort.jsx

import React from 'react';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { allGenres } from '../../data/movies.js'; // Import danh sách thể loại
import { BiSearch } from 'react-icons/bi'; // Import icon tìm kiếm

// Component này nhận các state và hàm xử lý từ component cha (MoviePage)
export default function MovieFilterSort({
    searchKeyword,
    genreFilter,
    sortCriteria,
    onSearchChange,
    onGenreChange,
    onSortChange,
    onSearchClick // Thêm hàm xử lý khi click Search
}) {
    // Danh sách các tiêu chí sắp xếp
    const sortOptions = [
        { value: '', label: 'None' },
        { value: 'year_asc', label: 'Year ↑' }, // Năm tăng dần
        { value: 'year_desc', label: 'Year ↓' }, // Năm giảm dần
        { value: 'title_asc', label: 'Title A→Z' },
        { value: 'title_desc', label: 'Title Z→A' },
        { value: 'duration_asc', label: 'Duration ↑' }, // Thời lượng tăng dần
        { value: 'duration_desc', label: 'Duration ↓' } // Thời lượng giảm dần
    ];

    return (
        <div className="mb-4 p-3 border rounded shadow-sm bg-light">
            <h5 className="mb-3">Filter & Sort Movies</h5>
            <Row className="g-3">
                {/* 1. Tìm kiếm theo Từ khóa */}
                <Col xs={12} md={5} lg={4}>
                    <Form.Label>Quick Search</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search by Title or Description..."
                            value={searchKeyword}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                        <Button 
                            variant="outline-secondary" 
                            onClick={onSearchClick} // Gọi hàm khi click
                        >
                            <BiSearch /> Search
                        </Button>
                    </InputGroup>
                </Col>

                {/* 2. Lọc theo Thể loại */}
                <Col xs={12} md={3} lg={4}>
                    <Form.Group>
                        <Form.Label>Filter by Genre</Form.Label>
                        <Form.Select
                            value={genreFilter}
                            onChange={(e) => onGenreChange(e.target.value)}
                        >
                            {/* Thể loại 'All' luôn là lựa chọn đầu tiên */}
                            <option value="All">All Genres</option>
                            {allGenres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>

                {/* 3. Sắp xếp */}
                <Col xs={12} md={4} lg={4}>
                    <Form.Group>
                        <Form.Label>Sort By</Form.Label>
                        <Form.Select
                            value={sortCriteria}
                            onChange={(e) => onSortChange(e.target.value)}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}