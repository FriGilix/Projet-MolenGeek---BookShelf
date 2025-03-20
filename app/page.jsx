"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Carousel from "../components/Carousel/Carousel"
import { useSelector } from "react-redux"
import NavBar from "@/components/NavBar/NavBar"


export default function Home() {
  const [books, setBooks] = useState([]) 
  const [visibleBooks, setVisibleBooks] = useState(25)
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState(null) 
  const myData = useSelector((state)=> state.counter)
  const [searchBook, setSearchBook] = useState('')

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("https://example-data.draftbit.com/books")
        if (!res.ok) throw new Error("Failed to fetch books")
        const data = await res.json()

        const filteredBooks = data.filter(book => book.rating >= 4)

        setBooks(filteredBooks)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const loadMoreBooks = () => {
    setVisibleBooks((prev) => prev + 12)
  }

  const handleSearch = (term) =>{
    setSearchBook(term)
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().startsWith(searchBook.toLowerCase())
  )

  function isConnected(connected){
    myData.connected.forEach(conn =>{
      if (conn == connected){
        return true
      }
    })
    return false
  }

  return (
    <div className="flex flex-col gap-20">
      <NavBar onSearch={handleSearch}/>
      <Carousel />

      <div className="flex flex-col justify-center gap-2">
        <h4 className="text-center">Books Gallery</h4>
        {/*<h4>Connected : <span>{myData.connected ? 'yes' : 'no'}</span></h4>*/}
        <h1 className="text-center text-gray-800 text-3xl font-bold">Popular Books</h1>
      </div>

      {loading && <p className="text-center text-gray-600">Loading books...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && filteredBooks.length > 0 && (
        <>
          <div className="grid grid-cols-5 gap-6 p-3 bg-gray-200">
            {filteredBooks.slice(0, visibleBooks).map((book) => (
              <div
              key={book.id}
              className="h-96 p-4 rounded-md shadow-md bg-white flex flex-col items-center relative group overflow-hidden"
              >
                <Link className="flex flex-col items-center justify-center" href={`/books/${book.id}`}>
                  <img src={book.image_url} alt={book.title} className="h-60 rounded-md mb-2" />
                  <h2 className="font-bold text-lg">{book.title}</h2>
                </Link>
                <p className="text-gray-600 italic">By {book.authors}</p>
                <div className="w-full flex justify-evenly items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-full group-hover:translate-y-0 absolute bottom-0 left-0 right-0 bg-white p-2 rounded-t-md shadow-md">
                  <p className="mt-1">⭐ {book.rating} / 5</p>
                  <p className="mt-1">on {book.rating_count} advices</p>
                </div>
              </div>
                  
                
            ))}
          </div>

          {visibleBooks < filteredBooks.length && (
            <button
              onClick={loadMoreBooks}
              className="block mx-auto bg-green-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-800 transition"
            >
              Load More
            </button>
          )}
        </>
      )}

      {!loading && !error && filteredBooks.length === 0 && (
        <p className="text-center text-gray-600">No books found with rating 4 or higher.</p>
      )}
    </div>
  )
}