import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path, 'PUT');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path, 'PATCH');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path, 'DELETE');
}

async function handleProxyRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  try {
    const path = pathSegments.join('/');
    const url = new URL(path, API_BASE_URL);
    
    // Copy query parameters
    const searchParams = request.nextUrl.searchParams;
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Copy authorization header if present
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers.Authorization = authHeader;
    }

    // Prepare request body for non-GET requests
    let body: string | undefined;
    if (method !== 'GET') {
      try {
        body = await request.text();
      } catch (error) {
        console.error('Error reading request body:', error);
      }
    }

    // Make the request to the backend
    const response = await fetch(url.toString(), {
      method,
      headers,
      body,
    });

    // Get response data
    const responseData = await response.text();
    
    // Create response with proper headers
    const nextResponse = new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
    });

    // Copy relevant headers
    const headersToCopy = ['content-type', 'cache-control'];
    headersToCopy.forEach(headerName => {
      const headerValue = response.headers.get(headerName);
      if (headerValue) {
        nextResponse.headers.set(headerName, headerValue);
      }
    });

    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy request failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
