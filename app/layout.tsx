import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zombies vs Robots Simulator",
  description: "Academic project with Next.js SSR and Prisma PostgreSQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased font-sans">
        
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 glass-panel border-b-0 border-x-0 border-t-0 rounded-none mb-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              
              {/* Logo / Brand */}
              <div className="flex-shrink-0 font-black text-2xl tracking-tighter">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  <span className="neon-text-zombie">Z</span>
                  <span className="text-white/50 mx-1 text-lg">vs</span>
                  <span className="neon-text-robot">R</span>
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="flex space-x-8">
                <Link href="/characters" className="text-slate-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-widest hover:neon-text-brand">
                  Personajes
                </Link>
                <Link href="/simulator" className="text-slate-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-widest hover:neon-text-brand">
                  Simulador
                </Link>
                <Link href="/history" className="text-slate-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-widest hover:neon-text-brand">
                  Historial
                </Link>
              </nav>

            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container-app pb-12">
          {children}
        </main>
        
      </body>
    </html>
  );
}
