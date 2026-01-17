/**
 * Courses Basic Info API Route
 * Server-side API handler to get courses list
 * Avoids CORS issues by handling requests server-side
 */

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
    const backendUrl = `${apiUrl}/courses/basic-info`;
    
    console.log('📤 [API Route] Fetching courses from:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store', // Don't cache to get fresh data
    });
    
    console.log('📡 [API Route] Backend response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [API Route] Backend error:', errorText);
      return NextResponse.json(
        { 
          success: false,
          message: `Backend error: ${response.statusText}`,
          data: [],
          details: errorText 
        },
        { status: response.status }
      );
    }
    
    const result = await response.json();
    console.log('✅ [API Route] Backend response:', JSON.stringify(result, null, 2));
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ [API Route] Error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        data: []
      },
      { status: 500 }
    );
  }
}
