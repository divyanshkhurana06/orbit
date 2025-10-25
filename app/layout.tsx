import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Orbit - Your world, perfectly organized',
  description: 'Next-gen social platform with Web3 integration, powered by Yellow, Avail, and Blockscout',
  keywords: ['Web3', 'Social', 'Blockchain', 'Groups', 'Yellow Network', 'Avail', 'Blockscout'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

