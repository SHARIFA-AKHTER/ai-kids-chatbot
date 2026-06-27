import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to AI Kids Chatbot. Safe, fun and educational AI assistant for children.",
};

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold text-center">
          Welcome to AI Kids Chatbot!
        </h1>
        <p className="mt-4 text-lg text-center">
          A child-friendly AI chatbot that helps kids learn, explore, and enjoy safe conversations powered by Google Gemini.
        </p>
      </div>
    </main>
  );
}
  