'use client'
import React, { useEffect } from 'react'
import { BodyText, Button, CardOrnamen, ClickAbleBadge, HeadingDua } from '..'
import { socialMediaBadge } from '@/constant/mockdata'
import { motion } from 'motion/react'
import { Link } from 'react-scroll';

const HeroSection = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <section className="hero-section py-[180px] flex flex-col items-center gap-9">
            <CardOrnamen/>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0, 0.71, 0.2, 1.01], }}

            >
                <BodyText variant="base" classname="text-stone-900">
                    Sebuah Personal Blog oleh{' '}
                    <a href="#" className="underline">
                        Daffa Putra
                    </a>
                </BodyText>
            </motion.div>

            <motion.div
                className="flex flex-col gap-7 items-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0, 0.71, 0.2, 1.01], }}
            >
                <HeadingDua classname="text-center">
                    Selamat Datang
                    <br />
                    di Ruang Pena.
                </HeadingDua>

                <motion.div
                    className="social-media-badge flex gap-2 md:gap-4 flex-wrap justify-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: [0, 0.71, 0.2, 1.01], }}
                >
                    {socialMediaBadge.map((element) => (
                        <ClickAbleBadge key={element.id} href={element.href} icon={element.icon}>
                            {element.nama}
                        </ClickAbleBadge>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0, 0.71, 0.2, 1.01], }}
            >
            <Button to='blog'>Baca sekarang</Button>
            </motion.div>
        </section>
    )
}

export default HeroSection
