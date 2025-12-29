import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CameraProvider } from "@/components/camera/camera-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web camera',
  description: 'Web Camer  app',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CameraProvider>{children}</CameraProvider>
      </body>
    </html>
  )
}
