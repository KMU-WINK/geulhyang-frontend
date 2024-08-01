import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Book {
  isbn: string;
  rank: number;
  name: string;
  author: string;
  publisher: string;
  publishedAt: string;
  coverImage: string;
  rating: number;
}

function MainPage() {
  const [bestSellers, setBestSellers] = useState<Book[]>([]);
  const [newReleases, setNewReleases] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bestSellersResponse = await axios.get("엔드포인트");
        setBestSellers(bestSellersResponse.data);

        const newReleasesResponse = await axios.get("엔드포인트");
        setNewReleases(newReleasesResponse.data);
      } catch (error) {
        console.error("에러:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-[#DCE6C9] w-full mx-auto h-96 mb-8" />

      <h1 className="text-3xl font-semibold mb-4 pl-8">🍀 베스트셀러</h1>
      <div className="flex space-x-4 overflow-x-auto mb-8">
        {bestSellers.map((book) => (
          <div
            key={book.isbn}
            className="flex-none w-40 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/books/${book.isbn}`)}
          >
            <img
              src={book.coverImage}
              alt={book.name}
              className="w-full h-56 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold">{book.name}</h2>
            <p className="text-sm text-gray-500">평점: {book.rating}</p>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-semibold mb-4 pl-8">🌱 신간 인기 도서</h1>
      <div className="flex space-x-4 overflow-x-auto">
        {newReleases.map((book) => (
          <div
            key={book.isbn}
            className="flex-none w-40 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/books/${book.isbn}`)}
          >
            <img
              src={book.coverImage}
              alt={book.name}
              className="w-full h-56 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold">{book.name}</h2>
            <p className="text-sm text-gray-500">평점: {book.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
