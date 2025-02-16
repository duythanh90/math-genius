# 🧮 Math Game - Vite + React + TailwindCSS

A fun **educational math game** built with **React, Vite, and TailwindCSS**! 🎮  
Perfect for children and students to practice their math skills through interactive challenges.

## 🌐 Demo

Try the live demo at: [http://beo.motconvit.com/](http://beo.motconvit.com/)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://beo.motconvit.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🎯 Overview

This game helps kids practice **addition, subtraction, multiplication, and division** with an interactive UI and timer-based challenges. Built with modern web technologies, it provides a smooth and engaging learning experience.

## 🚀 Features

✨ **Multiple Game Modes**
- Addition ➕ - Practice basic to advanced addition
- Subtraction ➖ - Master number differences
- Multiplication ✖ - Learn times tables interactively
- Division ➗ - Understand number division

🎮 **Game Features**
- ⏱️ Countdown Timer: 20 seconds to answer each question
- 📝 Answer History: Track your progress and review past answers
- 🔊 Sound Effects: Engaging audio feedback for correct & wrong answers
- 📱 Responsive Design: Play on any device - mobile, tablet, or desktop
- ⚡ Lightweight & Fast: Optimized performance with Vite

## 🖼️ Screenshots

![Math Game - Screenshot 1](https://github.com/duythanh90/math-genius/blob/main/demo.png?raw=true)

## 🛠️ Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Analytics**: Firebase
- **Containerization**: Docker

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Docker (optional)
- Firebase project (for analytics)

### Local Development

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/math-game.git
cd math-game
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up Environment Variables**
Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

4. **Build for Production**
```bash
npm run build
# or
yarn build
```

### Docker Deployment

```bash
# Build Docker image
docker build -t math-game .

# Run container
docker run -p 80:80 math-game
```

Access the application at http://localhost

### Using Docker Compose

For production:
```bash
# Start the application
docker compose up -d

# Stop the application
docker compose down
```

For development with hot-reloading:
```bash
# Start development server
docker compose --profile dev up math-game-dev

# Stop development server
docker compose --profile dev down
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Nguyen Duy Thanh**
- Email: nguyenduythanh25790@gmail.com
- GitHub: [@duythanh90](https://github.com/duythanh90)

## 🌟 Support

If you find this project helpful, please consider giving it a ⭐️ on GitHub!

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Analytics in your Firebase project
3. Copy your Firebase configuration to the `.env` file
4. The app will automatically track game usage and user interactions

### Production Deployment
The game is currently deployed and running at:
- Production URL: [http://beo.motconvit.com/](http://beo.motconvit.com/)
- Features full analytics integration
- Optimized for performance

---

Made with ❤️ by Nguyen Duy Thanh

