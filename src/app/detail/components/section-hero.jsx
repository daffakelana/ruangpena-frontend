"use client"

import { BodyText, ClickAbleBadge, HeadingSatoe } from '@/components'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { share } from '@/assets'
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

// ── Mobile Horizontal Scroll Slider ───────────────────────────────────────────
const MobileSlider = ({ images = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollRef = useRef(null)

    const handleScroll = () => {
        const el = scrollRef.current
        if (!el) return
        const index = Math.round(el.scrollLeft / el.offsetWidth)
        setActiveIndex(index)
    }

    const scrollTo = (index) => {
        const el = scrollRef.current
        if (!el) return
        el.scrollTo({ left: index * el.offsetWidth, behavior: 'smooth' })
        setActiveIndex(index)
    }

    if (images.length === 0) return null

    return (
        <div className="lg:hidden w-full">
            {/* Scroll Container */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="relative shrink-0 w-[80vw] h-[500px] rounded-2xl overflow-hidden snap-center border-4 border-white shadow-md"
                    >
                        <Image
                            src={src}
                            alt={`Gambar ${index + 1}`}
                            fill
                            className="object-cover"
                            draggable={false}
                            sizes="80vw"
                        />
                    </div>
                ))}
            </div>

            {/* Indicators */}
            {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`transition-all duration-300 rounded-full ${index === activeIndex
                                    ? 'bg-stone-800 w-5 h-2.5'
                                    : 'bg-stone-300 w-2.5 h-2.5 hover:bg-stone-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Counter */}
            <div className="text-center mt-2">
                <BodyText variant="sm" classname="text-stone-500">
                    {activeIndex + 1} / {images.length}
                </BodyText>
            </div>
        </div>
    )
}

// ── Desktop Tinder Stack Slider ────────────────────────────────────────────────
const TinderImageSlider = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    if (images.length === 0) return null

    const handlePrevious = () =>
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length)

    const handleNext = () =>
        setCurrentIndex(prev => (prev + 1) % images.length)

    const getCardProps = (index) => {
        const adjustedIndex = (index - currentIndex + images.length) % images.length
        return {
            scale: adjustedIndex === 0 ? 1 : 1 - adjustedIndex * 0.05,
            y: adjustedIndex * 15,
            zIndex: images.length - adjustedIndex,
            rotateZ: adjustedIndex * 1.5,
            opacity: adjustedIndex < 3 ? 1 : 0,
        }
    }

    return (
        <div className="w-full max-w-xs mx-auto relative hidden lg:block">
            {/* Cards Stack */}
            <div className="relative w-full h-[392px] mt-8">
                {images.map((src, index) => {
                    const cardProps = getCardProps(index)
                    const isTopCard = (index - currentIndex + images.length) % images.length === 0

                    return (
                        <motion.div
                            key={index}
                            className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-white h-fit cursor-grab active:cursor-grabbing select-none"
                            style={{
                                zIndex: cardProps.zIndex,
                                pointerEvents: cardProps.opacity === 0 ? 'none' : 'auto',
                            }}
                            animate={{
                                scale: cardProps.scale,
                                y: cardProps.y,
                                rotateZ: cardProps.rotateZ,
                                opacity: cardProps.opacity,
                                x: 0,
                            }}
                            drag={isTopCard ? 'x' : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.1}
                            dragMomentum={false}
                            onDragEnd={(_, info) => {
                                if (isTopCard) {
                                    const threshold = 70
                                    const velocity = Math.abs(info.velocity.x)
                                    if (Math.abs(info.offset.x) > threshold || velocity > 500) {
                                        handleNext()
                                    }
                                }
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 40,
                                mass: 0.5,
                            }}
                        >
                            <div className="relative w-full h-[380px]">
                                <Image
                                    src={src}
                                    alt={`Gambar ${index + 1}`}
                                    fill
                                    className="object-cover rounded-2xl"
                                    draggable={false}
                                    sizes="320px"
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 mt-6 max-w-[200px] mx-auto">
                <button
                    onClick={handlePrevious}
                    className="bg-white/90 hover:bg-white border border-stone-200 rounded-full p-2 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                    aria-label="Previous image"
                >
                    <ChevronLeftIcon className="w-4 h-4 text-gray-700" />
                </button>

                <div className="flex justify-center gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`transition-all duration-300 rounded-full ${index === currentIndex
                                    ? 'bg-stone-800 w-5 h-2.5'
                                    : 'bg-stone-300 w-2.5 h-2.5 hover:bg-stone-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="bg-white/90 hover:bg-white border border-stone-200 rounded-full p-2 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                    aria-label="Next image"
                >
                    <ChevronLeftIcon className="w-4 h-4 text-gray-700 rotate-180" />
                </button>
            </div>

            {/* Counter */}
            <div className="text-center mt-3">
                <BodyText variant="sm" classname="text-stone-600">
                    {currentIndex + 1} / {images.length}
                </BodyText>
            </div>
        </div>
    )
}

// ── Back Button ────────────────────────────────────────────────────────────────
const BackButton = () => (
    <Link href="/" className="flex gap-1 items-center w-fit">
        <ChevronLeftIcon className="w-4" />
        <BodyText variant="baseBold">Kembali</BodyText>
    </Link>
)

// ── Detail Information ─────────────────────────────────────────────────────────
const DetailInformation = ({ category, date, readDuration }) => (
    <div className="flex flex-col md:items-center md:flex-row gap-3 md:gap-4">
        <div className="sub-info">
            <BodyText variant="sm" classname="text-stone-600">KATEGORI</BodyText>
            <BodyText variant="baseBold" classname="text-stone-900">
                #{category?.toUpperCase()}
            </BodyText>
        </div>
        <div className="md:w-[1px] md:h-[24px] w-full h-[1px] bg-stone-300" />
        <div className="sub-info">
            <BodyText variant="sm" classname="text-stone-600">TANGGAL</BodyText>
            <BodyText variant="baseBold" classname="text-stone-900">{date}</BodyText>
        </div>
        <div className="md:w-[1px] md:h-[24px] w-full h-[1px] bg-stone-300" />
        <div className="sub-info">
            <BodyText variant="sm" classname="text-stone-600">ESTIMASI</BodyText>
            <BodyText variant="baseBold" classname="text-stone-900">{readDuration}</BodyText>
        </div>
    </div>
)

// ── Section Hero ───────────────────────────────────────────────────────────────
const SectionHero = ({ article }) => {
    const date = new Date(article.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const images = article.gallery?.length > 0
        ? article.gallery
        : [article.thumbnail].filter(Boolean)

    return (
        <section className="bg-white">
            <div className="pt-[140px] pb-[64px] px-5 lg:px-0 max-w-[996px] mx-auto bg-white">

        

                {/* Main Content */}
                <div className="flex gap-5">
                    {/* Left Side */}
                    <article className="flex flex-col gap-9 max-w-[690px] w-full">
                        <BackButton />
                        <HeadingSatoe>{article.title}</HeadingSatoe>
                        <DetailInformation
                            category={article.category_name}
                            date={date}
                            readDuration={article.read_duration}
                        />
                        <ClickAbleBadge icon={share} classname="w-fit">Share</ClickAbleBadge>

                        {/* Mobile Slider — di atas konten */}
                        <div className=" lg:hidden">
                            <MobileSlider images={images} />
                        </div>
                    </article>

                    {/* Right Side — Desktop Tinder Slider */}
                    <article className="lg:flex w-full hidden">
                        <TinderImageSlider images={images} />
                    </article>
                </div>
            </div>
        </section>
    )
}

export default SectionHero