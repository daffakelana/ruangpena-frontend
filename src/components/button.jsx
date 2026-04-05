// components/button.jsx — tambahkan support scroll
'use client'

import { scroller } from 'react-scroll'
import Link from 'next/link'

const variants = {
    primary: 'bg-emerald-800 text-white px-4 py-2'
}

const Button = ({ to, href, children, className, ...props }) => {
    // Scroll ke section (react-scroll)
    if (to) {
        return (
            <button
                onClick={() =>
                    scroller.scrollTo(to, {
                        smooth: true,
                        duration: 500,
                        offset: -80, // sesuaikan tinggi navbar
                    })
                }
                className={className}
                {...props}
            >
                {children}
            </button>
        )
    }

    // Navigasi ke halaman lain (Next.js Link)
    if (href) {
        return (
            <Link href={href} className={`${className} ${variants.primary   }`} {...props}>
                {children}
            </Link>
        )
    }

    // Button biasa
    return (
        <button className={className} {...props}>
            {children}
        </button>
    )
}

export default Button