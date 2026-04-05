import { thumbnail } from '@/assets'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

const CardOrnamen = ({ image, children }) => {
    return (
        <>
            <motion.div
                drag
                dragMomentum={false} // Menghentikan momentum setelah drag
                dragElastic={0.1} // Mengurangi elastic effect
                whileDrag={{
                    scale: 1.1,
                    backgroundColor: "#1C1917",
                    color: "white",
                    rotate: 0,
                    cursor: "grabbing"
                }}
                className="card-ornamen absolute right-[-56px] -rotate-12 top-1/6 p-3.5 cursor-grab bg-white border border-stone-200 w-fit rounded-xl hidden md:block select-none"
                initial={{ opacity: 0, y: 40, scale: 1 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{
                    scale: 1.15,
                    y: -10,
                    rotate: -8,
                    transition: {
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }
                }}
                transition={{
                    duration: 0.6,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
            >
                <Image
                    className='w-[250px] p-3 bg-stone-200 border-stone-300 rounded-xl pointer-events-none'
                    src={thumbnail}
                    alt="thumbnail"
                    draggable={false}
                />
                <p className='gloria pt-2 text-center pointer-events-none'>
                    pertama kali naik kereta!
                </p>
            </motion.div>
        </>
    )
}

export default CardOrnamen