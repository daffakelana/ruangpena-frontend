"use client"

import { BodyText } from '@/components'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

const WhatsAppIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.535 5.847L.057 23.535a.75.75 0 0 0 .916.919l5.762-1.505A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.691-.499-5.231-1.373l-.374-.217-3.88 1.015 1.031-3.762-.237-.389A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
)

const TwitterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

const FacebookIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
)

const CopyButton = ({ url }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (copied) {
        return (
            <button
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-green-500 text-white transition-all duration-200"
            >
                <CheckIcon className="w-3.5 h-3.5" />
                Tersalin
            </button>
        )
    }

    return (
        <button
            onClick={handleCopy}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-stone-900 text-white hover:bg-stone-700 transition-all duration-200"
        >
            Salin
        </button>
    )
}

const SharePopup = ({ article, onClose }) => {
    const overlayRef = useRef(null)
    const url = typeof window !== 'undefined' ? window.location.href : ''

    useEffect(() => {
        const handleMouseDown = (e) => {
            if (overlayRef.current === e.target) onClose()
        }
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    const shareItems = [
        {
            label: 'WhatsApp',
            color: 'bg-[#25D366]',
            icon: <WhatsAppIcon />,
            href: 'https://wa.me/?text=' + encodeURIComponent(article.title + ' ' + url),
        },
        {
            label: 'X / Twitter',
            color: 'bg-black',
            icon: <TwitterIcon />,
            href: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(article.title) + '&url=' + encodeURIComponent(url),
        },
        {
            label: 'Facebook',
            color: 'bg-[#1877F2]',
            icon: <FacebookIcon />,
            href: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
        },
    ]

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm px-4 pb-4 sm:pb-0"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-stone-100">
                    <BodyText variant="lgSemibold" classname="text-stone-900">
                        Bagikan Artikel
                    </BodyText>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-stone-100 transition-colors text-stone-500"
                    >
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                </div>

                <div className="px-5 py-4 flex gap-3 bg-stone-50 border-b border-stone-100">
                    {article.thumbnail && (
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                            <Image
                                src={article.thumbnail}
                                alt={article.title}
                                fill
                                className="object-cover"
                                sizes="56px"
                            />
                        </div>
                    )}
                    <div className="flex flex-col justify-center min-w-0">
                        <BodyText variant="baseBold" classname="text-stone-900 line-clamp-2">
                            {article.title}
                        </BodyText>
                        <BodyText variant="sm" classname="text-stone-400 mt-0.5 truncate">
                            {url}
                        </BodyText>
                    </div>
                </div>

                <div className="px-5 py-4">
                    <BodyText variant="sm" classname="text-stone-400 mb-3">
                        Bagikan via
                    </BodyText>
                    <div className="flex gap-3">
                        {shareItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 flex-1"
                            >
                                <div className={'w-12 h-12 rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform ' + item.color}>
                                    {item.icon}
                                </div>
                                <BodyText variant="sm" classname="text-stone-600 text-center">
                                    {item.label}
                                </BodyText>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="px-5 pb-5">
                    <BodyText variant="sm" classname="text-stone-400 mb-2">
                        Salin tautan
                    </BodyText>
                    <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3">
                        <BodyText variant="baseRegular" classname="text-stone-600 truncate flex-1">
                            {url}
                        </BodyText>
                        <CopyButton url={url} />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default SharePopup