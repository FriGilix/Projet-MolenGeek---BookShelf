"use client"
import NavBar from "@/components/NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const fetchBookById = async (id) => {
  const res = await fetch("https://example-data.draftbit.com/books");
  const books = await res.json();
  return books.find((book) => book.id === Number(id));
};

const BookDetailPage = ({ params }) => {
  const [book, setBook] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadBook = async () => {
      const fetchedBook = await fetchBookById(params.id);
      setBook(fetchedBook);
    };

    loadBook();

    // Charger les favoris depuis localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, [params.id]);

  if (!book) {
    return <div>Book not found frère</div>;
  }

  // Ajouter ou retirer un livre des favoris
  const toggleFavorite = () => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === book.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== book.id);
    } else {
      updatedFavorites = [...favorites, book];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
    <NavBar/>
    <section className="w-full h-4/5 flex justify-center items-center bg-gray-200 py-20">
      <div className="w-3/10 h-188">
        <img src={book.image_url} alt="" className="rounded-xl h-full" />
      </div>
      <div className="w-6/12 h-188 bg-white pt-5 rounded-xl flex flex-col items-center gap-2">
        <h1 className="text-center text-2xl font-bold">{book.title}</h1>
        <p className="text-center">
          By : <span className="italic">{book.authors}</span>
        </p>
        <p className="w-8/12 text-sm overflow-auto">{book.description}</p>

        {/* Bouton Favori */}
        <button onClick={toggleFavorite} className="mt-3">
          <FaHeart className={`text-3xl ${favorites.some(fav => fav.id === book.id) ? "text-red-600" : "text-gray-400"}`} />
        </button>

        <div className="flex flex-col gap-2 w-8/12 bg-gray-200 rounded p-2">
          <div className="p-3 flex justify-between items-center border">
            <span>Edition :</span>
            <span>{book.edition}</span>
          </div>
          <div className="p-3 flex justify-between items-center border">
            <span>Format :</span>
            <span>{book.format}</span>
          </div>
          <div className="p-3 flex flex-wrap gap-2 items-center justify-between border">
            <span>Genres :</span>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(book.genres.split(",").map((genre) => genre.trim()))).map((genre, index) => (
                <span key={index} className="px-2 py-1 bg-green-700 rounded-2xl text-white">
                  {genre}
                </span>
              ))}
            </div>
          </div>
          <div className="p-3 flex justify-between items-center border">
            <span>Number of Pages :</span>
            <span>{book.num_pages}</span>
          </div>
          <div className="p-3 flex justify-between items-center border">
            <span>Rating :</span>
            <span
              className={`font-bold ${
                book.rating > 4 ? "text-green-600" : book.rating < 2.5 ? "text-red-600" : "text-black"
              }`}
              >
              {book.rating} / 5
            </span>
          </div>
        </div>
      </div>
    </section>
              </>
  );
};

export default BookDetailPage;
