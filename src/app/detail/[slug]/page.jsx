import { rpc } from '@/lib/supabase'
import SectionHero from '../components/section-hero'
import SectionDescription from '../components/section-description'
import { notFound } from 'next/navigation'

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