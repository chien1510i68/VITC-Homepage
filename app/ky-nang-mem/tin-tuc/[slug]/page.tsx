import { notFound, redirect } from 'next/navigation';
import { SAMPLE_NEWS } from '@/lib/newsData';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetailRedirectPage({ params }: PageProps) {
  const { slug } = await params;

  const newsItem = SAMPLE_NEWS.find((item) => item.slug === slug);

  if (!newsItem) {
    notFound();
  }

  redirect(`/tin-tuc-thong-bao/${newsItem.id}`);
}

export async function generateStaticParams() {
  return SAMPLE_NEWS
    .filter((news) => !!news.slug)
    .map((news) => ({ slug: news.slug as string }));
}