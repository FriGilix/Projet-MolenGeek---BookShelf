"use client"

console.log("NavBar chargé")

import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "@/app/features/CounterSlice"
import { CgMenuLeft } from "react-icons/cg"
import { FaPhoneAlt, FaHeart, FaSearch } from "react-icons/fa"
import { FiUser, FiX } from "react-icons/fi"
import Link from "next/link"
import { usePathname } from "next/navigation"


function NavBar({ onSearch }) {
    const dispatch = useDispatch()
    const { username, connected } = useSelector((state) => state.counter)
    const [inputUsername, setInputUsername] = useState("")
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
    const [searchBook, setSearchBook] = useState('')
    const [favorites, setFavorites] = useState([])

    const pathname = usePathname()

    useEffect(() => {
        // Charger les favoris depuis localStorage
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
        setFavorites(savedFavorites)
    }, [])

    const handleLogin = () => {
        if (inputUsername.trim() !== "") {
            dispatch(login(inputUsername))
            setInputUsername("")
        }
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleSearch = (e) => {
        setSearchBook(e.target.value)
        onSearch(e.target.value)
    }

    const removeFavorite = (id) => {
        const updatedFavorites = favorites.filter((book) => book.id !== id)
        setFavorites(updatedFavorites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }

    return (
        <>
            <header className="w-full h-16 bg-white flex justify-between items-center px-6 py-4 shadow-md">
                <div className="flex items-center gap-4">
                    <CgMenuLeft 
                        className="text-3xl cursor-pointer" 
                        onClick={() => setIsSidebarOpen(true)} 
                    />
                    <h1 className="text-3xl font-bold">BOOKSHELF.</h1>
                </div>

                
              {pathname === '/' && (
                <div className="w-1/3 relative">
                    <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
                    <input 
                        type="text"
                        placeholder="Search your book here"
                        value={searchBook}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                </div>
                )}

                <div className="flex items-center gap-4">
                    <FaPhoneAlt />
                    <span>0489632596</span>
                    <div className="relative cursor-pointer" onClick={() => setIsFavoritesOpen(true)}>
                        <FaHeart className="text-2xl text-red-500" />
                        {favorites.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {favorites.length}
                            </span>
                        )}
                    </div>
                </div>
            </header>

            {/* SIDEBAR MENU */}
            <div 
                className={`fixed top-0 left-0 w-64 h-full bg-white text-black z-50 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-64"
                } transition-transform duration-300 ease-in-out shadow-lg`}
            >
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300">
                    <h1 className="text-2xl font-bold">BOOKSHELF</h1>
                    <FiX 
                        className="text-2xl cursor-pointer" 
                        onClick={() => setIsSidebarOpen(false)} 
                    />
                </div>

                <div className="p-6 flex flex-col gap-4 text-lg">
                    <Link href='/' className="text-gray-600 hover:text-green-600 transition">
                      Main page
                    </Link>
                    <Link href='/allBook' className="text-gray-600 hover:text-green-600 transition">
                    All books
                    </Link>
                  </div>

                <div className="p-4">
                    {connected ? (
                        <div className="flex flex-col items-center">
                            <span className="text-lg font-semibold">Bienvenue, {username} !</span>
                            <button
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={handleLogout}
                            >
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <input
                                type="text"
                                placeholder="Nom d'utilisateur"
                                value={inputUsername}
                                onChange={(e) => setInputUsername(e.target.value)}
                                className="px-2 py-1 border rounded text-white mb-2 w-full"
                            />
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                                onClick={handleLogin}
                            >
                                Connexion
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* SIDEBAR FAVORIS */}
            <div 
                className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform ${
                    isFavoritesOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 z-50`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold">❤️ Favoris</h2>
                    <button onClick={() => setIsFavoritesOpen(false)}>
                        <FiX className="text-2xl text-gray-600 hover:text-black transition" />
                    </button>
                </div>

                <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-64px)]">
                    {favorites.length === 0 ? (
                        <p className="text-center text-gray-600">Aucun livre en favoris.</p>
                    ) : (
                        favorites.map((book) => (
                            <div key={book.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow">
                                <div className="flex items-center gap-3">
                                    <img src={book.image_url} alt={book.title} className="w-12 h-16 object-cover rounded" />
                                    <div>
                                        <p className="font-semibold">{book.title}</p>
                                        <p className="text-sm text-gray-600">By {book.authors}</p>
                                    </div>
                                </div>
                                <button onClick={() => removeFavorite(book.id)}>
                                    <FaHeart className="text-red-500" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Overlay pour fermer la sidebar favoris */}
            {isFavoritesOpen && (
                <div 
                    className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
                    onClick={() => setIsFavoritesOpen(false)}
                ></div>
            )}
        </>
    )
}

export default NavBar
