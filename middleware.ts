import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import middlewareCheckPressiom from '@/functions/Get/middlewareCheckPressiom';
import { notFound } from 'next/navigation'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')){
    const url = request.nextUrl;
    const VerifyPerssiom = await middlewareCheckPressiom(request.headers)
    if(VerifyPerssiom?.admin !== true){
        url.pathname = `/404`;
        return NextResponse.rewrite(url);
    }
    const response = NextResponse.next();
    return response
  }
  if (request.nextUrl.pathname.startsWith('/user')){
    const url = request.nextUrl;
    const VerifyPerssiom = await middlewareCheckPressiom(request.headers)
    if(!VerifyPerssiom.sub){
        url.pathname = `/loginfirst`;
        return NextResponse.rewrite(url);
    }
    const response = NextResponse.next();
    return response
  }
}

export const config = {
  matcher: ['/admin/:path*', '/admin', '/user/:path*', '/user'],
};