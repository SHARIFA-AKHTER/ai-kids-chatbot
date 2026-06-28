# 🧸 KidsBot: AI-Powered English Learning Chatbot for Children

KidsBot is an advanced, AI-powered full-stack English learning chatbot designed specifically for children under 7 years old. Built using **Next.js 15 (Turbopack)**, **Google Gemini 2.5 Flash**, and **Prisma ORM with Neon PostgreSQL**, this application provides an adaptive, emotionally aware, and high-performance learning environment.

---

## 🚀 Live Links & Assignment Deliverables

* **Live Deployed URL:** [https://ai-kids-chatbot-client.vercel.app]
* **GitHub Repository:** [https://github.com/SHARIFA-AKHTER/ai-kids-chatbot.git]

---

## 🛠️ Core Features

### 1. Progressive Learning System
The chatbot automatically tracks, adapts, and updates the linguistic difficulty based on the child's progressive capability:
* **Level 1 (L1 - Words & Phonics):** Focuses on isolated words, letter sounds, and repetitive phonics (e.g., *"A for Apple! 🍎"*).
* **Level 2 (L2 - Phrases):** Uses 2-3 word pairings, highly descriptive yet short (e.g., *"Happy small bird! 🐦"*).
* **Level 3 (L3 - Simple Sentences):** Introduces basic full sentences without complex subordinate clauses (e.g., *"The butterfly sits on a big flower. 🦋"*).

### 2. Intelligent Child Mode & Mood Detection
KidsBot dynamically switches communication profiles based on the child's real-time interaction token analysis:
* `Learning`: Active structural language mechanics instruction.
* `Conversation`: Casual, supportive, and friendly exchange.
* `Engagement`: Gamified rhymes, interactive riddles, and play-based prompts.
* `Support`: Activated immediately if the child implies operational confusion or performance hesitation.

### 3. Social and Emotional Learning (SEL)
* **Persona:** Unconditionally supportive, cheerful, and enthusiastic.
* **Positive Reinforcement:** Immediate celebration of every learning attempt with highly expressive phrasing (*"Super!", "Magnificent! ⭐"*) and rich animated emojis to maximize psychological visual engagement.

### 4. Real-time Parent Dashboard
* Server-side dynamic rendering (`force-dynamic`) pulls fresh metrics from the Neon PostgreSQL server to visualize the child's active Level, current Chatbot Mode, and evaluated Emotional State.

---

## 🧠 Design Decisions & Technology Choices

* **Next.js 15 (App Router Monolith):** Chosen to bundle both native client views and backend API Routes into a single deployment unit, avoiding dual-repo synchronization friction while maintaining full Edge Compatibility.
* **Google Gemini 2.5 Flash (`responseMimeType: "application/json"`):** Utilized for ultra-low latency response processing (under 2 seconds) while enforcing explicit structural output constraints matching native TypeScript types.
* **Neon Serverless Postgres + Prisma ORM:** Leveraged connection-pooling HTTP drivers inside next-generation serverless API endpoints to bypass database zombie connection limits during rapid hot-reloads.
* **Server Component Injection:** Abandoned vulnerable global client state variables in favor of contextual server runtime request hooks, ensuring real-time `upsert` synchronization with the database.

---

## 📋 System Architecture

[ Client View / Chat UX ] <---> [ Next.js Serverless API Routs (/api/chat) ]
                                      |                       |
                                      v                       v
                           [ Google Gemini 2.5 ]    [ Neon Serverless DB ]
                           (JSON Output Mode)       (Prisma Client Driver)