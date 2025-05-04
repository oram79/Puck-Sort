# TeamSlap: Ball Hockey Team Manager

![TeamSlap Banner](https://img.shields.io/badge/TeamSlap-Ball%20Hockey%20Manager-0a4da8?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![License](https://img.shields.io/badge/License-MIT-green.svg)

TeamSlap is a modern, React-based web application designed to simplify ball hockey team management. Perfect for league organizers who need to create balanced teams each week and distribute rosters with minimal hassle.

![TeamSlap Screenshot](https://via.placeholder.com/800x400?text=TeamSlap+Screenshot)

## 🏒 Features

- **Player Management**: Easily add, remove, and track players in your league
- **Team Assignment**: Drag-and-drop interface to assign players to Team Black or Team White
- **Auto-Distribution**: One-click team generation with balanced team algorithm
- **Export Functionality**: Save team rosters for easy sharing via email or messaging
- **Responsive Design**: Works on desktop and mobile devices
- **Persistent Storage**: Team and player data saved between sessions
- **Hockey-Themed UI**: Attractive interface with animations and effects

## 🛠️ Technologies

- **React**: Built with functional components and hooks
- **Context API**: Centralized state management
- **CSS Modules**: Component-scoped styling
- **Framer Motion**: Smooth animations and transitions
- **React Icons**: Hockey-themed icon set
- **Local Storage API**: Data persistence between sessions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/teamslap.git
   cd teamslap
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

### Adding Players

1. Enter player names in the input field
2. Click "Add Player" or press Enter
3. Players will appear in the Available Players list

### Creating Teams

#### Manual Team Assignment

1. For each player, click "Team Black" or "Team White" to assign them
2. To remove a player from a team, click "Remove"

#### Automatic Team Distribution

1. Click the "Auto-Distribute Teams" button
2. Players will be randomly assigned to ensure balanced teams

### Saving Team Lists

1. Click the "Save Teams" button
2. A text file will be downloaded with your team rosters
3. Share this file with your players via email or messaging apps

## 🧩 Project Structure

```
src/
├── components/         # React components
│   ├── AddPlayerForm/  # Form for adding new players
│   ├── Controls/       # Buttons for team operations
│   ├── Header/         # App header
│   ├── PlayerList/     # List of players and individual player cards
│   ├── TeamList/       # Team displays and team player components
│   └── NotificationMessage/ # Reusable message component
├── context/            # React Context for state management
│   └── TeamContext.js  # Centralized state management
├── utils/              # Utility functions
│   └── teamUtils.js    # Helper functions
├── App.js              # Main app component
├── App.css             # Global styles
└── index.js            # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [React Icons](https://react-icons.github.io/react-icons/) for the hockey-themed icons
- [Framer Motion](https://www.framer.com/motion/) for the animation library
- [CSS-Tricks](https://css-tricks.com/) for inspiration on the ice-themed design

## 📱 Contact

Your Name - [@yourusername](https://twitter.com/yourusername) - email@example.com

Project Link: [https://github.com/yourusername/teamslap](https://github.com/yourusername/teamslap)

---

Made with ❤️ for ball hockey enthusiasts
