"use client"

import { Geist, Geist_Mono } from "next/font/google"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaLifeRing, FaHeart, FaRegCopyright} from "react-icons/fa"
import { IoLayers } from "react-icons/io5"
import "./globals.css"
import store from "./store"
import { Provider } from "react-redux"
import { usePathname } from "next/navigation"



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const pathname = usePathname


export default function RootLayout({ children }) {
  return (

<Provider store={store}>

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
      
        {children}
        <section className="w-full h-80 bg-white flex justify-center items-center">
          
          <div className="w-2/5 h-3/5 flex justify-center items-center rounded shadow-md">
            <div className="w-2/5 h-5/6 pl-2">
              <img className="w-full h-full rounded" src="./Book.jpg" alt="" />
            </div>
            <div className="w-3/5 h-5/6 flex flex-col gap-3 pl-5 py-1">
              <h1 className="text-3xl font-bold">Join Our Community</h1>
              <p>Sign up & get 10 % of your first books.</p>
              <div className="w-full">
                <input className="shadow-md w-3/5 p-1.5" type="email" name="" id="" placeholder="your email" />
                <button className="p-1.5 bg-green-700 text-white">Subscribe</button>
              </div>
              <div className="flex justify-between w-2/4">
                <span className="bg-green-700 p-1.5 rounded-full flex justify-center items-center"><FaFacebookF className="text-white"/></span>
                <span className="bg-green-700 p-1.5 rounded-full flex justify-center items-center"><FaTwitter className="text-white"/></span>
                <span className="bg-green-700 p-1.5 rounded-full flex justify-center items-center"><FaInstagram className="text-white"/></span>
                <span className="bg-green-700 p-1.5 rounded-full flex justify-center items-center"><FaLinkedin className="text-white"/></span>
                <span className="bg-green-700 p-1.5 rounded-full flex justify-center items-center"><FaYoutube className="text-white"/></span>
              </div>
            </div>
          </div>
        </section>

        {pathname === '/' && (

          <footer className="w-full h-60 bg-gray-700 flex items-end justify-center">
          <div className="w-4/5 h-4/5 flex flex-col justify-between items-center">
            <div className="w-full h-2/4 border-b border-gray-300 flex">
              <div className="w-2/4 h-full flex">
                <div className="h-3/4 flex items-center">
                  <IoLayers className="w-3/4 h-3/4 text-green-700"/>
                </div>
                <div className="text-white flex flex-col gap-0.5 pt-2">
                  <h3>Book Information ?</h3>
                  <p>Please send us an email at support@gmail.com</p>
                </div>
              </div>
              <div className="w-2/4 h-full flex">
                <div className="h-3/4 flex items-center">
                  <FaLifeRing className="w-3/4 h-3/4 text-green-700"/>
                </div>
                <div className="text-white flex flex-col gap-0.5 pt-2">
                  <h3>Book Information ?</h3>
                  <p>Please send us an email at support@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="w-full h-2/4 flex items-center justify-between">
              <div className="w-2/4 h-3/4 flex items-center">
                <h1 className="text-white text-2xl">BookShelf</h1>
              </div>
              <div className="w-2/4 h-3/4 flex items-center justify-end">
                <p className="text-white inline-flex items-center space-x-1">
                  <FaRegCopyright /> <span>2025 All right reserved made with love by</span> <FaHeart /> <span>Corentin</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
        )}
      </body>
    </html>
          </Provider>
  )
}