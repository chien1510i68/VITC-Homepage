/**
 * Course Registration API Route
 * Server-side API handler to proxy requests to backend
 * Avoids CORS issues by handling requests server-side
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
    const backendUrl = `${apiUrl}/register/`;
    
    console.log('📤 [API Route] Proxying registration to:', backendUrl);
    console.log('📦 [API Route] Request body:', JSON.stringify(body, null, 2));
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      // Try to parse error as JSON first (backend error format)
      let errorData;
      try {
        errorData = await response.json();
        console.error('❌ [API Route] Backend error:', errorData);
      } catch {
        const errorText = await response.text();
        console.error('❌ [API Route] Backend error (text):', errorText);
        errorData = { message: errorText };
      }
      
      // Return backend error with proper format
      return NextResponse.json(
        { 
          isRegistered: false,
          error: errorData.message || response.statusText,
          code: errorData.code,
          details: errorData.details,
          backendError: errorData
        },
        { status: response.status }
      );
    }
    
    const result = await response.json();
    console.log('✅ [API Route] Backend response:', result);
    
    // Handle duplicate registration (phone number already exists)
    if (result.isRegistered === false) {
      return NextResponse.json(
        { 
          isRegistered: false,
          error: 'Số điện thoại này đã được đăng ký trước đó',
          message: 'Duplicate phone number'
        },
        { status: 409 } // 409 Conflict
      );
    }
    
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
