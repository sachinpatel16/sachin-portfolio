import './globals.css';
import type { Metadata } from 'next';
import { Inter, Lora, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
});

const lora = Lora({ 
  subsets: ['latin'], 
  variable: '--font-serif' 
});

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono' 
});

export const metadata: Metadata = {
  title: 'Sachin Patel | Python & AI Systems Engineer',
  description: 'Portfolio of Sachin Patel, a senior Python Developer and AI Engineer specializing in Django, FastAPI, LangChain, and scalable backend microservices.',
  openGraph: {
    title: 'Sachin Patel | Python & AI Systems Engineer',
    description: 'Portfolio of Sachin Patel, specializing in Django, FastAPI, LangChain, and scalable backend microservices.',
    images: [
      {
        url: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased bg-[#FAF9F5] text-[#1C1917]">
        {children}
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q0GV8JXH8T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Q0GV8JXH8T');
          `}
        </Script>
      </body>
    </html>
  );
}

