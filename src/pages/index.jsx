import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button } from 'antd'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Button type='primary'>Hello World</Button>
      <h1 className='border'>Welcome to Pc Builder</h1>
    </main>
  )
}
