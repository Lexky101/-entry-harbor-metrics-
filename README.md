# Entry Harbor Metrics

A modern analytics dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- Modern UI with Tailwind CSS and shadcn/ui components
- Responsive design
- Type-safe development with TypeScript
- Fast development with Vite
- Production-ready build configuration

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Deployment

This project is configured for deployment on Netlify.

### Netlify Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Sign up for a Netlify account
3. Click "New site from Git"
4. Choose your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Netlify dashboard
7. Deploy!

### Environment Variables

Required environment variables:
- `VITE_APP_TITLE`: Application title
- `VITE_API_URL`: API endpoint URL
- `VITE_APP_ENV`: Environment (development/production)

## License

MIT
