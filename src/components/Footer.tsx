'use client'
import React from 'react'
import Link from 'next/link'
import { Code } from 'lucide-react';

export default function Footer() {
    const year = new Date().getFullYear();
  return (
    <footer className='w-full border-t h-10 text-xs flex justify-center items-center absolute bottom-0'>
        <p>
        &copy; {year} Mystery Feedback. All rights reserved.
        <Link
                        target="_blank"
                        href={"https://github.com/alpesh677/mystery-feedback"}
                        className="font-semibold cursor-pointer hover:underline"
                    >
                        <Code/> Source Code
                    </Link>
        </p>
        <p>Made with ❤️</p>
    </footer>
  )
}
