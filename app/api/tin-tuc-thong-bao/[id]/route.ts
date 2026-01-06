/**
 * News Detail API Route
 * App Router format - GET /api/tin-tuc-thong-bao/[id]
 * Proxies to real backend API
 */

import { NextRequest, NextResponse } from 'next/server';
import { getNewsById } from '@/lib/api/news';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await getNewsById(id);

    if (!item) {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(item, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error in news detail API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
