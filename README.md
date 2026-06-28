# 🧸 KidsBot: AI-Powered English Learning Chatbot for Children

KidsBot is an advanced, AI-powered full-stack English learning chatbot designed specifically for children under 7 years old. Built using **Next.js 15/16 (App Router)**, **Google Gemini 2.5 Flash**, and **Prisma ORM with Neon PostgreSQL**, this application provides an adaptive, emotionally aware, and high-performance learning environment.

---

## 🚀 Live Links & Assignment Deliverables

* **Live Deployed URL:** [https://ai-kids-chatbot-client.vercel.app](https://ai-kids-chatbot-client.vercel.app)
* **GitHub Repository:** [https://github.com/SHARIFA-AKHTER/ai-kids-chatbot.git](https://github.com/SHARIFA-AKHTER/ai-kids-chatbot.git)

---

## 🛠️ Core Features

### 1. Progressive Learning System
The chatbot automatically tracks, adapts, and updates the linguistic difficulty based on the child's progressive capability:
* **Level 1 (L1 - Words & Phonics):** Focuses on isolated words, basic letter sounds, and repetitive phonics (e.g., *"A for Apple! 🍎 C-A-T spells cat! 🐱"*).
* **Level 2 (L2 - Phrases):** Uses 2-3 word pairings, highly descriptive yet short (e.g., *"Happy small bird! 🐦"*, *"Run fast! 🏃‍♂️"*).
* **Level 3 (L3 - Simple Sentences):** Introduces basic full sentences without complex subordinate clauses (e.g., *"The butterfly sits on a big flower. 🦋"*).

### 2. Intelligent Child Mode & Mood Detection
KidsBot dynamically switches communication profiles based on the child's real-time interaction token analysis:
* **Learning:** Active structural language mechanics instruction.
* **Conversation:** Casual, supportive, and friendly exchange.
* **Engagement:** Gamified rhymes, interactive riddles, and play-based prompts.
* **Support:** Activated immediately if the child implies operational confusion, performance hesitation, or emotional distress.

### 3. Social and Emotional Learning (SEL)
* **Persona:** Unconditionally supportive, cheerful, and enthusiastic.
* **Positive Reinforcement:** Immediate celebration of every learning attempt with highly expressive phrasing (*"Super!", "Magnificent! ⭐"*) and rich animated emojis to maximize psychological visual engagement and confidence building.

### 4. Real-time Parent Dashboard
* Server-side dynamic rendering (`force-dynamic`) pulls fresh metrics from the Neon PostgreSQL database to visualize the child's active Learning Level, current Chatbot Mode, and evaluated Emotional State without infinite client-side loading states.

---

## 🧠 Design Decisions & Technology Choices

* **Next.js (App Router Monolith):** Chosen to bundle both native client views and backend API Routes into a single deployment unit, avoiding dual-repo synchronization friction while maintaining full Edge Compatibility.
* **Google Gemini 2.5 Flash (`responseMimeType: "application/json"`):** Utilized for ultra-low latency response processing (under 2 seconds) while enforcing explicit structural output constraints matching native TypeScript types.
* **Neon Serverless Postgres + Prisma ORM:** Leveraged connection-pooling HTTP drivers inside serverless API endpoints to bypass database zombie connection limits during rapid hot-reloads and production scale.
* **Robust Offline Fallback System:** Integrated a reliable runtime fallback mechanism within the API route. If the Google Gemini free-tier quota is exceeded (Error 429), the system automatically intercepts the crash, generates age-appropriate offline educational responses, and safely syncs progress to the database ensuring zero UI disruption.

---

## 📋 System Architecture & Flow

           +----------------------+
           |       Browser        |
           |     Next.js UI       |
           +----------+-----------+
                      |
                      v
           +----------------------+
           |   Next.js API Route  |
           |       /api/chat      |
           +----------+-----------+
                      |
      +---------------+---------------+
      |                               |
      v                               v
+----------------------+       +------------------------+
| Google Gemini 2.5 AI |       | Neon PostgreSQL (Pool) |
| (JSON Mode Output)   |       | Prisma ORM Driver      |
+----------------------+       +------------------------+


### 🏛️ Data Lifecycle Design
1. User sends a message via the Next.js frontend.
2. Frontend triggers a `POST` request to `/api/chat` passing user message, current level, and history context.
3. The API Route structures the advanced system instructions and requests a strict JSON block from Gemini.
4. Response is parsed; child mode is dynamically evaluated and the current learning level updates.
5. Conversation history and computed states are transactionally saved into Neon PostgreSQL via Prisma.
6. Clean JSON payload is safely returned back to the UI view.

---

## 🛠️ Technology Stack

* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
* **Backend:** Next.js Serverless API Routes, Google Generative AI SDK
* **Database & ORM:** Neon Serverless PostgreSQL, Prisma ORM
* **Deployment & CI/CD:** Vercel Cloud Platform

---

## 📂 Project Structure

ai-kids-chatbot-client/
├── app/
│   ├── api/
│   │   └── chat/          # Main Chatbot AI processing core
│   ├── dashboard/         # Parent Analytics & Monitoring Screen
│   ├── models/            # Database abstraction models (UserProgress)
│   ├── types/             # Shared TypeScript Type declarations
│   ├── page.tsx           # Interactive Kids Chat UX Interface
│   └── layout.tsx
├── prisma/
│   └── schema.prisma      # Prisma schema for database structure
├── .env.example           # Reference environment variables
└── package.json


---

## ⚙️ Environment Variables

Create a `.env` file in the root directory of your project and configure the following variables:

```env
GEMINI_API_KEY="YOUR_GOOGLE_AI_STUDIO_API_KEY"
DATABASE_URL="postgresql://neondb_owner:...@ep-...pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"

📦 Installation & Setup
Clone the Repository

git clone [https://github.com/SHARIFA-AKHTER/ai-kids-chatbot.git](https://github.com/SHARIFA-AKHTER/ai-kids-chatbot.git)
cd ai-kids-chatbot
Install Dependencies

npm install
Generate Prisma Client Artifacts

npx prisma generate
Run the Local Development Server

npm run dev
Open http://localhost:3000 inside your browser to test the local build.

Production Deployment Build

npm run build
📋 Assignment Deliverables Checklist
[x] Live Cloud Deployment (Vercel Production Pipelines)

[x] Source Code Management (Structured GitHub Repository)

[x] Progressive Learning Engine (L1, L2, L3 Adaptive Content)

[x] Child Mode Detection Protocol (Linguistic behavior routing)

[x] Social & Emotional Learning Compliance (Praise & SEL Empathy)

[x] Context-Aware Historical Responses (Database state persistence)

[x] Architecture and System Design Overview (Documented workflows)

[x] Comprehensive README Guide & Deployment Instructions

🚧 Known Limitations & Future Roadmap
🎙️ Voice & Speech Input: Integrating Web Speech API for native voice interactions.

🔊 Text-to-Speech Output: Audio readouts for Level 1 words and sound phonics.

📊 Parent Analytics Charts: Rich visual progress diagrams using Recharts.

👥 Multi-child Profiles: Supporting separate progression states under a single parent login.

👩‍💻 Developer Profile
Developer: Sharifa Akhter

Role: Junior Full Stack Developer (AI SaaS)

Location: Rajshahi, Bangladesh

GitHub: @SHARIFA-AKHTER

This system was developed and optimized in compliance with the Technical Assessment criteria for Full Stack & AI SaaS application development.
