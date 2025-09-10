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
