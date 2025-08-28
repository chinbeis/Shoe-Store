import { NextRequest, NextResponse } from 'next/server';

type RouteParams = {
  params: Promise<{ width: string; height: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const { width: widthParam, height: heightParam } = await params;
  const width = parseInt(widthParam, 10) || 300;
  const height = parseInt(heightParam, 10) || 300;

  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#888" text-anchor="middle" dominant-baseline="middle">${width}×${height}</text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    },
  });
}