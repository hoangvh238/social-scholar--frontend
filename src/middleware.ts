import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { NextResponse } from "next/dist/server/web/spec-extension/response";

function shouldRedirectToSignIn(verify: RequestCookie | undefined, url: string | string[]) {
    return !verify && (url.includes('/blogs') || url.includes('/members') || url.includes('/notifications'));
}

export default function middleware(req: NextRequest): NextResponse<unknown> | undefined {
    let verify = req.cookies.get("token");
    let url = req.url;
       
    if (shouldRedirectToSignIn(verify, url)) {
        return NextResponse.redirect("http://localhost:3000/auth/sign-in");
    }

    if (verify && url.includes('/sign')) {
        return NextResponse.redirect("http://localhost:3000/");
    }

    return NextResponse.next();
}
