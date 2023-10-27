import { Inter } from 'next/font/google'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Yepic Sample Express Video App',
  description: 'Yepic Sample Express Video App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
      </head>
      <body className={inter.className}>
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  )
}
