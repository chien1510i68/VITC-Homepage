/**
 * Thu Vien API Route
 * App Router format - GET /api/thu-vien
 */

import { NextResponse } from 'next/server';
import SAMPLE_THU_VIEN from '@/lib/thuVienData';

export async function GET() {
  try {
    return NextResponse.json(
      { items: SAMPLE_THU_VIEN },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Error in thu-vien API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
