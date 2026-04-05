"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { EnvelopeIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { BodyText } from '.'
import { ruang_pena } from '@/assets'
import Image from 'next/image'

const navItems = [
  { href: '/', label: 'Blog' },
  { href: '/rekomendasi-buku', label: 'Rekomendasi Buku' },
  { href: '/media-sosial', label: 'Media Sosial' },
  { href: '/tentang', label: 'Tentang Saya' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed md:top-4 left-0 right-0 z-50 flex max-w-full items-center justify-between px-6 py-4 border border-stone-300 bg-white lg:max-w-[1200px] mx-auto md:rounded-2xl">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src={ruang_pena} alt="Logo" className="w-[162px]" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <BodyText variant="base" classname="text-stone-600 hover:text-stone-800">
                {item.label}
              </BodyText>
            </Link>
          ))}
        </div>

        {/* Desktop Email */}
        <div className="hidden md:flex items-center gap-2 border border-stone-300 px-3 py-1.5 rounded-md">
          <EnvelopeIcon className="w-5 h-5 text-stone-600" />
          <BodyText variant="sm" classname="text-stone-800">
            DAFFAERPAN@GMAIL.COM
          </BodyText>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6 text-stone-800" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-stone-800" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-[76px] left-4 right-4 z-40 bg-white border border-stone-300 rounded-2xl p-4 shadow-md">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                <BodyText variant="base" classname="text-stone-600 hover:text-stone-800">
                  {item.label}
                </BodyText>
              </Link>
            ))}

            <div className="flex items-center gap-2 border border-stone-300 px-3 py-1.5 rounded-md mt-2">
              <EnvelopeIcon className="w-5 h-5 text-stone-600" />
              <BodyText variant="sm" classname="text-stone-800">
                DAFFAERPAN@GMAIL.COM
              </BodyText>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
