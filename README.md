# Cursor Rules Generator

A client-side web application for generating customized cursor rules based on your project preferences and tech stack.

## Features

- **Interactive Wizard**: Step-by-step interface to configure your cursor rules
- **Tech Stack Support**: Support for React, Next.js, Vue, Node.js, and more
- **Project Structure Options**: Monorepo, microservices, or single application
- **Code Quality Rules**: Customizable linting and quality standards
- **Documentation Templates**: Generate appropriate documentation requirements
- **Export Functionality**: Download generated rules as `.mdc` files

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cursor-rules-generator
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
cursor-rules-generator/
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   └── wizard/        # Wizard step components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and rule generation logic
│   ├── pages/             # Page components
│   └── types/             # TypeScript type definitions
├── index.html             # Main HTML template
├── pnpm-lock.yaml         # pnpm lockfile
└── package.json
```

## How It Works

1. **Tech Stack Selection**: Choose your primary framework and tools
2. **Project Structure**: Configure how your project is organized
3. **Code Style**: Set preferences for naming conventions and imports
4. **Task Types**: Select what kinds of tasks you'll be working on
5. **Documentation**: Configure documentation requirements
6. **Review & Export**: Review your settings and download the generated rules

The application generates multiple `.mdc` (Markdown Cursor) files based on your selections, which can be used directly with Cursor IDE.

## Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - UI component primitives
- **React Hook Form** - Form management
- **Wouter** - Lightweight routing
- **Lucide React** - Icons
- **pnpm** - Package manager

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 