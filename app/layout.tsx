import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Folil Labs — La raíz de tus productos IA",
  description:
    "Motor de empresas early adopters que buscan lanzar productos IA en tiempo récord a costo reducido.",
  metadataBase: new URL("https://folillabs.com"),
  openGraph: {
    title: "Folil Labs — La raíz de tus productos IA",
    description:
      "Motor de empresas early adopters que buscan lanzar productos IA en tiempo récord a costo reducido.",
    type: "website",
    url: "https://folillabs.com",
    locale: "es_CL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Folil Labs — La raíz de tus productos IA",
    description:
      "Motor de empresas early adopters que buscan lanzar productos IA en tiempo récord a costo reducido.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `html,body{background:#0a0a07;color:#f5f0e8;margin:0}body{opacity:0;transition:opacity .12s}body.ready{opacity:1}` }} />
        <script dangerouslySetInnerHTML={{ __html: `window.addEventListener("load",()=>document.body.classList.add("ready"));` }} />
        <link rel="icon" href="/logos/logo-white-on-black.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Folil Labs",
              url: "https://folillabs.com",
              description:
                "Motor de empresas early adopters que buscan lanzar productos IA en tiempo récord a costo reducido.",
              foundingDate: "2026",
              founders: [
                { "@type": "Person", name: "Patricio Acevedo Flores" },
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "CL",
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
