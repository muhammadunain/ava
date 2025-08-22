import { LayoutProps } from '@/types'
import Link from 'next/link'
import React from 'react'

const Wrapper = ({children}:LayoutProps) => {
  return (
    <Link href={'/opportunites'}>
     {children} 
    </Link>
  )
}

export default Wrapper
