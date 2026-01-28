import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_PROJECTS_SERVICE_URL: process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL,
    NEXT_PUBLIC_PARTNERS_CRM_SERVICE_URL: process.env.NEXT_PUBLIC_PARTNERS_CRM_SERVICE_URL,
    NEXT_PUBLIC_AI_SERVICE_URL: process.env.NEXT_PUBLIC_AI_SERVICE_URL,
  });
}
