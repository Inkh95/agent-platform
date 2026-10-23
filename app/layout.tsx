import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = { title: "Agent Platform", description: "AI task automation platform — early preview" };
export default function RootLayout({children}:{children:ReactNode}) { return <html lang="en"><body style={{margin:0,background:"#07120f",color:"#ecfff6",fontFamily:"Arial,sans-serif"}}>{children}</body></html>; }
