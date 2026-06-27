import { Metadata, Viewport } from "next";
import ChatContainer from "./components/ChatContainer";


// Next.js 15 Metadata Configuration
export const metadata: Metadata = {
  title: "KidsBot | AI-Powered English Learning Chatbot for Kids",
  description: "An interactive, adaptive, and emotionally aware AI English tutor designed for children under 7 years old.",
  keywords: ["English learning chatbot", "AI for kids", "child language learning", "progressive learning system"],
  authors: [{ name: "Sharifa", url: "https://github.com/SHARIFA-AKHTER" }],
  openGraph: {
    title: "KidsBot - AI English Tutor for Kids",
    description: "Step-by-step progressive English learning system with Social and Emotional Learning (SEL) features.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-linear-to-b from-amber-50 to-orange-100 p-3 sm:p-4 md:p-8 flex flex-col items-center justify-between">
      <div className="w-full max-w-5xl flex flex-col items-center flex-1 h-full">

        <ChatContainer />
      </div>
    </main>
  );
}