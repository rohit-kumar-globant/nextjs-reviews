import Heading from '@/components/Heading';
import { getReview, getSlugs } from '@/lib/reviews';
import ShareButtons from '@/components/ShareButtons'
export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((slug) => ({ slug }))

}

export async function generateMetadata({ params: { slug } }) {
    const review = await getReview(slug);
    return {
        title: review.title
    }
}
export default async function ReviewPage({ params: { slug } }) {

    const review = await getReview(slug);

    return (
        <>
            <Heading>{review.title}</Heading>
            <div className='flex gap-3 items-baseline'>
                <p className='italic pb-2'>{review.date}</p>
                <ShareButtons />
            </div>
            <img src={review.image} alt="stardew valley" width={640} height={360} className="rounded mb-2" />
            <article dangerouslySetInnerHTML={{ __html: review.body }} className="max-w-screen-sm prose prose-slate" />
        </>
    )
}