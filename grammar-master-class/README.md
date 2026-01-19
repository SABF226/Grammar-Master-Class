# Grammar Master Class - JKD English Quiz

A comprehensive grammar training application for BIT English Club's JKD Language Network competition format.

## Features

- 📚 Grammar Warm-Up (10 timed MCQs)
- 🎯 Core Grammar Drills (6 domains)
- ⚡ Speed Challenge (Team vs Clock)
- 📊 Error Analysis
- 📱 Fully Responsive Design

## Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project directory
cd grammar-master-class

# Login to Vercel (first time only)
vercel login

# Deploy
vercel
```

### Option 2: Vercel Dashboard (No CLI)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import from GitHub or drag-and-drop the `grammar-master-class` folder
4. Vercel will auto-detect the Vite configuration
5. Click "Deploy"

### Option 3: Vercel for GitHub

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and click "Add GitHub Repository"
3. Select the repository
4. Vercel will deploy automatically on every push

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Tech Stack

- React 19 + Vite
- Tailwind CSS 4
- Lucide React Icons
- Font Awesome Icons

## Project Structure

```
grammar-master-class/
├── src/
│   ├── App.jsx      # Main application component
│   ├── main.jsx     # Entry point
│   ├── index.css    # Global styles
│   └── App.css      # Component styles
├── index.html       # HTML template
├── vite.config.js   # Vite configuration
├── tailwind.config.js
├── postcss.config.js
└── vercel.json      # Vercel deployment config
```

## License

&copy; {new Date().getFullYear()} BIT English Club. All rights reserved.
