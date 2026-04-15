# DTEC - Denis Technology Entrepreneur Center

DTEC is a high-performance industrial platform designed to scale the technological potential of Cameroon. Built with the MERN stack (via Convex and React), it integrates multiple business sectors into a single, unified ecosystem.

## 🚀 The Ecosystem
* **DIIMATS Academy:** Elite technical training and career pathways.
* **Software Dev:** Custom web applications and MERN stack solutions.
* **Architecture:** Professional design and infrastructure layouts.
* **Media Production:** Creative content and music production (Enjebel10).

## 🛠️ Tech Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Convex (Real-time Serverless)
- **Authentication:** Clerk
- **PWA:** Service Worker integration for offline capabilities and mobile installation.

## 📦 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install



2. Set Up Environment Variables
Create a .env.local file in the root and add your keys.
Note: This file is ignored by Git for security.

Code snippet
VITE_CONVEX_URL=[https://your-deployment-name.convex.cloud](https://your-deployment-name.convex.cloud)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
3. Run Development Servers
Start the Convex backend and the Vite frontend simultaneously:

Bash
npx convex dev
🌐 Deployment & Infrastructure
Backend & Database: Hosted on Convex Cloud

Frontend Hosting: Vercel

PWA Status: Fully optimized with Service Workers for offline reliability.

🛡️ Admin Terminal
The dashboard at /admin is restricted to authorized personnel via Clerk.

Sector Control: Real-time updates to Academy and Media content.

Communications: Centralized messaging terminal for client inquiries.

SEO Engine: System-wide management of metadata and keywords.

Developed by DTEC Scaling potential through elite technical engineering.


---

### Final Reminder on Security:
Before you `git push` this to GitHub:
1.  Make sure your **`.gitignore`** file exists in the same folder.
2.  Make sure it contains the line `.env.local`.
3.  Once the repo is on GitHub, go to your **Vercel Project Settings** and add your `VITE_CONVEX_URL` and `VITE_CLERK_PUBLISHABLE_KEY` there as Environment Variables.

You are officially ready to go live! One last check—is the "Try Again" button on your `offline.html` working as expected before we ship?