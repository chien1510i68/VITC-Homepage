/**
 * Backend API Proxy Route
 *
 * Purpose:
 * - Provide a stable same-origin proxy at /backend-api/* for browser calls.
 * - Avoid Next.js `rewrites()` depending on build-time env vars.
 * - Use runtime env var NEXT_PUBLIC_API_URL as the upstream base.
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

const BROWSER_ONLY_HEADERS = new Set([
  // These can trigger strict CORS/security middleware upstream when forwarded.
  'origin',
  'referer',
  'sec-fetch-site',
  'sec-fetch-mode',
  'sec-fetch-dest',
  'sec-fetch-user',
]);

function getUpstreamBaseUrl(): string {
  const raw = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
  return raw.replace(/\/$/, '');
}

function buildUpstreamUrl(req: Request, pathSegments: string[]): string {
  const upstreamBase = getUpstreamBaseUrl();
  const url = new URL(req.url);

  const upstreamPath = pathSegments.map(encodeURIComponent).join('/');
  const upstreamUrl = new URL(`${upstreamBase}/${upstreamPath}`);

  // Preserve query string
  upstreamUrl.search = url.search;

  return upstreamUrl.toString();
}

async function proxy(req: Request, pathSegments: string[]) {
  const upstreamUrl = buildUpstreamUrl(req, pathSegments);

  // IMPORTANT:
  // Only forward a safe header allowlist to avoid leaking browser-only headers
  // (Origin/Sec-Fetch/Referer...) that can trip strict CORS/security middleware upstream.
  const reqHeaders = new Headers();
  const incoming = new Headers(req.headers);
  const allowlist = [
    'accept',
    'accept-language',
    'content-type',
    'authorization',
    'cookie',
  ];
  for (const name of allowlist) {
    const value = incoming.get(name);
    if (value) reqHeaders.set(name, value);
  }

  // Some upstream stacks enforce CORS checks whenever an Origin header exists.
  // Ensure it matches the upstream origin (never forward localhost).
  try {
    reqHeaders.set('origin', new URL(getUpstreamBaseUrl()).origin);
  } catch {
    // ignore
  }

  const method = req.method.toUpperCase();
  const hasBody = method !== 'GET' && method !== 'HEAD';

  const upstreamResponse = await fetch(upstreamUrl, {
    method,
    headers: reqHeaders,
    body: hasBody ? await req.arrayBuffer() : undefined,
    redirect: 'manual',
    cache: 'no-store',
  });

  const resHeaders = new Headers(upstreamResponse.headers);
  for (const header of HOP_BY_HOP_HEADERS) resHeaders.delete(header);

  // We’re same-origin, so no need to add permissive CORS headers here.
  const body = await upstreamResponse.arrayBuffer();

  return new NextResponse(body, {
    status: upstreamResponse.status,
    headers: resHeaders,
  });
}

export async function GET(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function POST(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function PUT(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function PATCH(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function DELETE(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function OPTIONS(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return proxy(req, path);
}
