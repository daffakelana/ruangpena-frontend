import { rpc } from '@/lib/supabase'
import SectionHero from '../components/section-hero'
import SectionDescription from '../components/section-description'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
    const { slug } = await params

    try {
        const results = await rpc('get_article_by_slug', { p_slug: slug })
        const article = results?.[0]

        if (!article) return {}

        const plainText = article.content?.replace(/<[^>]*>/g, '').slice(0, 160)

        return {
            title: article.title,
            description: plainText,
            openGraph: {
                title: article.title,
                description: plainText,
                images: [
                    {
                        url: article.thumbnail,
                        width: 1200,
                        height: 630,
                        alt: article.title,
                    },
                ],
                type: 'article',
                publishedTime: article.created_at,
                locale: 'id_ID',
            },
            twitter: {
                card: 'summary_large_image',
                title: article.title,
                description: plainText,
                images: [article.thumbnail],
            },
        }
    } catch {
        return {}
    }
}

export default async function Page({ params }) {
    const { slug } = await params

    let article
    try {
        const results = await rpc('get_article_by_slug', { p_slug: slug })
        article = results?.[0]
    } catch {
        notFound()
    }

    if (!article) notFound()

    return (
        <>
            <SectionHero article={article} />
            <SectionDescription content={article.content} />
        </>
    )
}