# PuckSort: Hockey Team Manager

![PuckSort Banner](https://img.shields.io/badge/PuckSort-Ball%20Hockey%20Manager-0a4da8?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![License](https://img.shields.io/badge/License-MIT-green.svg)

PuckSort is a modern, React-based web application designed to simplify hockey team management. Perfect for league organizers who need to create balanced teams each week and distribute rosters with minimal hassle.

## Features

- **Landing Page**: A hockey-themed hero screen that leads straight into your roster
- **Player Management**: Easily add, remove, and track players in your league
- **Position-Organized Roster**: Players are grouped into four columns — Forwards, Defense, Goalies, and Spares
- **Team Assignment**: One-click buttons to assign players to Team Black or Team White
- **Auto-Distribution**: One-click team generation with a balanced-by-position algorithm
- **Export Functionality**: Save team rosters for easy sharing via email or messaging
- **Responsive Design**: Works on desktop and mobile devices
- **Persistent Storage**: Team and player data saved between sessions

## Technologies

- **React**: Built with functional components and hooks
- **Context API**: Centralized state management
- **Font Awesome**: Hockey-themed icon set
- **Local Storage API**: Data persistence between sessions

## Usage

### Getting Started

1. Open the app to the PuckSort landing page
2. Click "Enter Roster" to jump into the player roster

### Adding Players

1. Enter a player name, pick a position, and click "Add Player" (or press Enter)
2. Players appear in the matching position column: Forwards, Defense, Goalies, or Spares

### Creating Teams

#### Manual Team Assignment

1. For each player, click "Black" or "White" to assign them to a team
2. To remove a player from a team, click "Unassign"

#### Automatic Team Distribution

1. Click the "Auto-Distribute" button
2. Players are shuffled and split evenly within each position to keep teams balanced (spares are excluded)

### Saving Team Lists

1. Click the "Save Teams" button
2. A text file will be downloaded with your team rosters
3. Share this file with your players via email or messaging apps

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Logan Oram - [@oram79](https://www.instagram.com/oram_7913/) - logansjoram7922@gmail.com

---

Made with ❤️ for hockey enthusiasts
