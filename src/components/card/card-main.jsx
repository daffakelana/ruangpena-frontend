import React from 'react'
import Image from 'next/image'
import { BodyText, HeadingTiga } from '..'
import { motion } from 'motion/react'

const CardMain = ({ image, duration, title, excerpt, tag, date, index }) => {
    return (
        <motion.div
            variants={{
                hidden: {
                    opacity: 0,
                    y: 60,
                    scale: 0.95
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1
                }
            }}
            transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: {
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                }
            }}
            className="rounded-xl overflow-hidden border border-stone-300 shadow-sm bg-white hover:shadow-lg transition-shadow duration-300"
        >
            <div className="w-full h-[220px] relative overflow-hidden">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="w-full h-full"
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                    />
                </motion.div>
            </div>
            <div className="p-5 flex flex-col gap-3">
                <BodyText variant='baseRegular' classname="text-stone-500 mb-1">{duration}</BodyText>
                <div className="heading flex flex-col gap-2">
                    <HeadingTiga className="text-stone-800">
                        {title}
                    </HeadingTiga>
                    <BodyText variant='base' classname={"text-stone-700 line-clamp-2"}>{excerpt}</BodyText>
                </div>
                <div className="text-sm mt-4 font-medium flex gap-1 text-stone-900">
                    <BodyText variant="baseBold">#{tag}</BodyText>
                    <span className="mx-1">•</span>
                    <BodyText variant='baseBold'>{date}</BodyText>
                </div>
            </div>
        </motion.div>
    )
}

export default CardMain