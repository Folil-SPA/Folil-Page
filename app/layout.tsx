import type { Metadata } from "next";
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
    <html lang="es" data-lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230a0a07'/><path d='M16 25V11' stroke='%23e8903c' stroke-width='2.1' stroke-linecap='round'/><path d='M16 18c-4.4-1.4-6.8-4.2-7.2-8.2M16 18c4.4-1.4 6.8-4.2 7.2-8.2M16 23c-4.2-1-7-3.2-8.4-6.8M16 23c4.2-1 7-3.2 8.4-6.8' stroke='%237fb069' stroke-width='1.9' stroke-linecap='round'/><circle cx='16' cy='8' r='2.1' fill='%23e8903c'/><circle cx='8.6' cy='9.4' r='1.8' fill='%237fb069'/><circle cx='23.4' cy='9.4' r='1.8' fill='%237fb069'/></svg>" />
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
      <body>{children}</body>
    </html>
  );
}
