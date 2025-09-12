# 🃏 Sprint Poker App

A real-time planning poker application for agile teams to estimate story points collaboratively. Built with React, TypeScript, and Appwrite.

## ✨ Features

- 🎴 Real-time voting with planning poker cards
- 👥 Multi-user collaboration in shared rooms
- 🌓 Light/Dark mode support
- 📱 Responsive design for all devices
- ⚡ Built with Vite for fast development

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ (LTS recommended)
- npm or yarn
- Appwrite instance (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sprint-poker-app.git
   cd sprint-poker-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your Appwrite configuration.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## ⚙️ Environment Variables

Create a `.env` file in the project root with:

```
VITE_APPWRITE_ENDPOINT=https://YOUR-APPWRITE-ENDPOINT/v1
VITE_APPWRITE_PROJECT_ID=YOUR_PROJECT_ID
VITE_DATABASE_ID=YOUR_DATABASE_ID
```

You can rename collections in Appwrite, but by default this app expects the following IDs in `src/config/appwrite.ts`:

```
rooms
users
votes
```

If your collection IDs differ, update them in `src/config/appwrite.ts` under `collectionIds`.

## 🗄️ Appwrite Setup

1) Create a Project
- Create a new project in Appwrite.

2) Create a Database
- Create a database and note its ID (use this for `VITE_DATABASE_ID`).

3) Create Collections and Attributes

- `rooms` collection
  - Attributes
    - `roomId` (string, required)
    - `status` (integer, required) — values: 1=Waiting, 2=Voting, 3=Revealed
    - `expireDate` (datetime, required)
  - Indexes
    - `roomId_idx` on `roomId` (key)

- `users` collection
  - Attributes
    - `roomId` (string, required)
    - `username` (string, required)
    - `score` (string, optional or nullable)
    - `online` (boolean, optional; used to show presence)
  - Indexes
    - `roomId_idx` on `roomId`
    - `room_user_idx` on `(roomId, username)`

- `votes` collection
  - Attributes
    - `userId` (string, required)
    - `roomId` (string, required)
    - `score` (string, required)
  - Indexes
    - `room_idx` on `roomId`

4) Authentication
- Enable Anonymous Authentication in your Appwrite project (used for realtime subscriptions and writes).

5) Permissions
- For development, you can allow the following on `rooms`, `users`, `votes` for the `role:guests` and/or `role:users` (anonymous sessions count as authenticated):
  - Create, Read, Update (Delete optional)
- In production, tighten rules as needed (e.g., restrict by room or owner).

6) Realtime & CORS
- CORS: Add your frontend origin (e.g., `http://localhost:5173`) in the Appwrite console under Project Settings → Platforms.
- Realtime: No extra setup needed beyond permissions; the app subscribes to `rooms` and `users` collections.

## 🔧 Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## ❓ Troubleshooting

- Blank lists or no realtime updates:
  - Verify `VITE_*` env vars and `src/config/appwrite.ts` IDs
  - Ensure CORS is configured for your frontend origin
  - Confirm Anonymous Auth is enabled and collection permissions allow read/write

- Presence (online/offline) not updating as expected:
  - Ensure `online` boolean exists on `users` collection
  - Tab-close updates can be browser-limited; consider server-side lastSeen if needed

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Appwrite (Database, Authentication, Realtime)
- **State Management**: React Context API
- **Routing**: React Router
- **Icons**: react-icons

## 📂 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
├── config/          # App configuration
├── contexts/        # React contexts
├── models/          # TypeScript interfaces/types
├── pages/           # Page components
├── services/        # API and service layers
├── utils/           # Utility functions and constants
└── App.tsx          # Main application component
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) for the awesome backend services
- [Vite](https://vitejs.dev/) for the amazing development experience
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
