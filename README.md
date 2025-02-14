## Social Learning Web Platform - EduXpert

## 📌 Overview

The Social Learning Web Platform is an interactive online platform that enables users to learn, share knowledge, and engage in discussions with peers and instructors. It combines e-learning features with social collaboration tools, providing a seamless and engaging learning experience.

## 🚀 Features

📚 Course Management: Create, edit, and manage courses with structured curriculums.

🎥 Video Lectures: Seamless video processing and playback using Mux.

💬 Real-time Chat: Instant messaging between users using Socket.IO.

🧑‍🏫 Instructor Dashboard: Performance tracking with analytical charts.

✅ Progress Tracking: Users can mark sections as completed and track their learning journey.

📂 Media Uploads: Upload images, videos, and documents using UploadThing.

🔒 Secure Authentication: User authentication and session management powered by Clerk.

💳 Payments & Subscriptions: Course purchases via Stripe integration.

🔎 Search & Filters: Find courses by title, category, or keywords.

🌐 SEO Optimized: Server-side rendering with Next.js for improved performance.

## 🛠️ Tech Stack

Frontend: React.js, TypeScript, Tailwind CSS

Backend: Next.js (API routes for server-side logic)

Database: MySQL with Prisma ORM (Managed on Aiven Cloud)

Real-time Communication: Socket.IO

Authentication: Clerk

Media Uploads: UploadThing (Images, Videos, Files)

Video Streaming: Mux

Payment Processing: Stripe

## 🏗️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Abishek0408/EduXpert.git
cd EduXpert
```

### 2️⃣ Install Dependencies
```sh
yarn install  # or npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```
DATABASE_URL=your_mysql_database_url
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_SECRET_KEY=your_clerk_secret_key
MUX_TOKEN_ID=your_mux_token_id
MUX_SECRET_KEY=your_mux_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
UPLOADTHING_SECRET=your_uploadthing_secret
```

### 4️⃣ Run the Development Server
```sh
yarn dev  # or npm run dev
```
The app will be available at `http://localhost:3000`

## 📜 Folder Structure
```
/social-learning-platform
│── app/                 # Application logic
│── components/          # Reusable UI components
│── lib/                 # Utility functions and libraries
│── prisma/              # Database schema & migrations
│── public/              # Static assets
│── scripts/             # Helper scripts
│── .eslintrc.json       # ESLint configuration
│── .gitignore           # Git ignore file
│── README.md            # Project documentation
│── components.json      # Component configuration
│── middleware.ts        # Middleware logic
│── next.config.mjs      # Next.js configuration
│── package-lock.json    # Dependency lock file
│── package.json         # Project dependencies
│── postcss.config.mjs   # PostCSS configuration
│── tailwind.config.ts   # Tailwind CSS configuration
│── tsconfig.json        # TypeScript configuration

```


## 📧 Contact
For any inquiries, reach out via:
- Email: [abishek0427@gmail.com](mailto:abishek0427@gmail.com)
- GitHub: [Abishek0408](https://github.com/Abishek0408)

---

## ✨ Happy Learning! 🚀

