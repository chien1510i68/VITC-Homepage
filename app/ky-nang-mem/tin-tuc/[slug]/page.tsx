import { notFound, redirect } from 'next/navigation';
import { getNewsBySlug } from '@/lib/api/news';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetailRedirectPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const newsItem = await getNewsBySlug(slug);

    if (!newsItem) {
      notFound();
    }

    redirect(`/tin-tuc-thong-bao/${newsItem.id}`);
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  // Return empty array to disable static generation
  // Pages will be generated on-demand
  return [];
}