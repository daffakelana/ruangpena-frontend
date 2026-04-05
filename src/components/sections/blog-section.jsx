'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { BodyText, CardMain } from '..'
import { motion } from 'motion/react'
import { Element } from 'react-scroll'
import { rpc } from '@/lib/supabase'
import Link from 'next/link'

// ── Skeleton Card ─────────────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="rounded-xl overflow-hidden border border-stone-200 bg-white animate-pulse">
        <div className="w-full h-[220px] bg-stone-200" />
        <div className="p-5 flex flex-col gap-3">
            <div className="h-3 w-20 bg-stone-200 rounded" />
            <div className="h-5 w-3/4 bg-stone-300 rounded" />
            <div className="h-4 w-full bg-stone-200 rounded" />
            <div className="h-4 w-2/3 bg-stone-200 rounded" />
            <div className="h-3 w-1/2 bg-stone-200 rounded mt-2" />
        </div>
    </div>
)

// ── Skeleton Tab List ─────────────────────────────────────────────────────────
const SkeletonTabs = () => (
    <div className="border-b border-stone-400 pb-4 flex gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
            <div
                key={i}
                className="h-4 bg-stone-200 rounded animate-pulse"
                style={{ width: `${50 + i * 15}px` }}
            />
        ))}
    </div>
)

// ── Blog Section ──────────────────────────────────────────────────────────────
const BlogSection = ({ categories = [] }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
    const [articles, setArticles] = useState([])
    const [isLoadingArticles, setIsLoadingArticles] = useState(true)

    const tabRefs = useRef([])
    const isCategoriesReady = categories.length > 0

    useEffect(() => {
        const current = tabRefs.current[selectedIndex]
        if (current) {
            setIndicatorStyle({
                left: current.offsetLeft,
                width: current.clientWidth,
            })
        }
    }, [selectedIndex, isCategoriesReady])

    const fetchArticles = useCallback(async (categoryId) => {
        setIsLoadingArticles(true)
        try {
            const data = await rpc('get_articles_by_category', {
                p_category_id: categoryId,
            })
            setArticles(data ?? [])
        } catch (err) {
            console.error('[fetchArticles]', err)
            setArticles([])
        } finally {
            setIsLoadingArticles(false)
        }
    }, [])

    useEffect(() => {
        if (categories?.[selectedIndex]?.id) {
            fetchArticles(categories[selectedIndex].id)
        }
    }, [selectedIndex, categories, fetchArticles])

    return (
        <Element name='blog'>
            <motion.div className="max-w-[996px] mx-auto py-6 px-5 lg:px-0">

                {/* Belum ada kategori → skeleton penuh */}
                {!isCategoriesReady ? (
                    <div className="space-y-6">
                        <SkeletonTabs />
                        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <div className="relative w-full">
                                <Tab.List className="flex gap-6 overflow-x-auto border-b border-stone-400 relative">
                                    {categories.map((cat, index) => (
                                        <Tab
                                            key={cat.id}
                                            ref={(el) => (tabRefs.current[index] = el)}
                                            className={({ selected }) =>
                                                clsx(
                                                    'pb-4 pt-3 whitespace-nowrap outline-none w-fit',
                                                    selected ? 'text-black' : 'text-stone-600 hover:text-stone-800'
                                                )
                                            }
                                        >
                                            <BodyText variant='lg'>{cat.name}</BodyText>
                                        </Tab>
                                    ))}
                                    <div
                                        className="absolute bottom-0 h-[2px] bg-black transition-all duration-300"
                                        style={indicatorStyle}
                                    />
                                </Tab.List>
                            </div>
                        </motion.div>

                        <Tab.Panels className="mt-6">
                            {categories.map((cat) => (
                                <Tab.Panel key={cat.id}>
                                    {isLoadingArticles ? (
                                        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
                                            {Array.from({ length: 6 }).map((_, i) => (
                                                <SkeletonCard key={i} />
                                            ))}
                                        </div>
                                    ) : articles.length === 0 ? (
                                        <div className="py-20 text-center">
                                            <BodyText variant='lg' classname="text-stone-400">
                                                Belum ada artikel di kategori ini.
                                            </BodyText>
                                        </div>
                                    ) : (
                                        <motion.div
                                            className="grid grid-cols-1 gap-7 lg:grid-cols-3"
                                            initial="hidden"
                                            animate="visible"
                                            variants={{
                                                hidden: {},
                                                visible: {
                                                    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
                                                }
                                            }}
                                        >
                                            {articles.map((article, index) => (
                                                <Link key={article?.id} href={`/detail/${article?.slug}`}>
                                                    <CardMain
                                                        index={index}
                                                        image={article.thumbnail}
                                                        date={new Date(article.created_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric', month: 'long', year: 'numeric'
                                                        })}
                                                        title={article.title}
                                                        duration={article.read_duration}
                                                        tag={article.category_name}
                                                        excerpt={article.excerpt}
                                                    />
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                )}
            </motion.div>
        </Element>
    )
}

export default BlogSection  