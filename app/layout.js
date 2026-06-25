import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartProvider from '@/components/CartProvider'

export const metadata = {
  title: "Medrano's 🍔 — Flame-Grilled Burgers",
  description: "The best flame-grilled burgers in town. Order online or reserve a table.",
  themeColor: '#2b2118',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#2b2118" />
      </head>
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
