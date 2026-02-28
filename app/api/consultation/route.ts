/**
 * Consultation Form API Route
 * Server-side API handler to proxy requests to backend
 */

import { NextRequest, NextResponse } from 'next/server';
import { resolveApiUrl } from '@/lib/api/base';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Always call backend via a stable versioned path.
    // This works whether the configured base is:
    // - https://domain/api-service   (Spring context path)
    // - https://domain/api/v1        (direct versioned base)
    const backendUrl = resolveApiUrl('/api/v1/register/');
    
    console.log('📤 [API Route] Proxying consultation to:', backendUrl);
    console.log('📦 [API Route] Request body:', JSON.stringify(body, null, 2));
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    console.log('📡 [API Route] Backend response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [API Route] Backend error:', errorText);
      return NextResponse.json(
        { 
          error: `Backend error: ${response.statusText}`,
          details: errorText 
        },
        { status: response.status }
      );
    }
    
    const result = await response.json();
    console.log('✅ [API Route] Backend response:', result);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ [API Route] Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
