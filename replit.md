# Cursor Rules Generator

## Overview

This is a full-stack web application built as a Cursor Rules Generator - a tool that helps developers create customized cursor rules for their projects through an interactive wizard interface. The application generates AI-powered development assistance tailored to specific codebases, frameworks, and coding styles.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Context API for wizard state management
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js 20
- **Development**: tsx for TypeScript execution
- **API Structure**: RESTful API with `/api` prefix routing
- **Middleware**: Custom logging and error handling middleware

### Database Architecture
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL 16 (configured for production)
- **Schema Management**: Drizzle Kit for migrations
- **Connection**: Neon Database serverless connection (@neondatabase/serverless)

## Key Components

### Frontend Components
1. **Wizard System**: Multi-step form wizard for collecting user preferences
   - Framework selection (React, Vue, Next.js, Node.js)
   - Project structure configuration
   - Code style preferences
   - Task type selection
   - Documentation requirements
   - Review and generation

2. **Rule Generation Engine**: Client-side rule generation based on user selections
   - Static rules (always included)
   - Framework-specific templates
   - Dynamic rule composition

3. **UI Components**: Comprehensive shadcn/ui component library including:
   - Form controls, dialogs, modals
   - Progress indicators, buttons, cards
   - Toast notifications, tooltips

### Backend Components
1. **Storage Interface**: Abstracted storage layer with in-memory implementation
   - User management (CRUD operations)
   - Extensible interface for future database integration

2. **Route Registration**: Centralized route management system
3. **Development Tools**: Vite integration for HMR and development workflow

## Data Flow

1. **User Interaction**: User navigates through wizard steps, making selections
2. **State Management**: Wizard context manages form state across steps
3. **Rule Generation**: Client-side rule generator processes selections
4. **File Output**: Generated rules are formatted as `.mdc` files for `.cursor/rules/` directory
5. **Preview & Export**: Users can preview and copy generated rules

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React ecosystem (@radix-ui components, react-hook-form)
- **Styling**: Tailwind CSS with PostCSS
- **Utilities**: clsx, class-variance-authority for conditional styling
- **Icons**: Lucide React icon library
- **Date Handling**: date-fns for date utilities

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL adapter
- **Validation**: Zod for schema validation
- **Development**: Various TypeScript and build tools

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **Development**: tsx for TypeScript execution
- **Replit Integration**: Custom plugins for Replit environment

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with tsx for TypeScript execution
- **Port**: 5000 (configured in .replit)
- **Hot Reload**: Vite HMR integration
- **Database**: PostgreSQL 16 module in Replit

### Production Build
- **Frontend Build**: Vite builds to `dist/public`
- **Backend Build**: esbuild bundles server to `dist/index.js`
- **Deployment Target**: Autoscale deployment on Replit
- **Database**: Production PostgreSQL via DATABASE_URL environment variable

### Environment Configuration
- **Development**: `NODE_ENV=development` with development middleware
- **Production**: `NODE_ENV=production` with optimized static serving
- **Database**: Environment-based connection string configuration

## Recent Changes

### June 24, 2025
- ✓ Initial Cursor Rules Generator setup complete
- ✓ Interactive 6-step wizard implementation
- ✓ Framework selection (React, Vue, Next.js, Node.js)
- ✓ Project structure and code style configuration
- ✓ Task types and documentation setup
- ✓ Generated rules panel with copy functionality
- ✓ Rules preview modal for viewing .mdc files
- ✓ Download functionality added - users can download individual files or all rules at once
- ✓ Installation guide generation for proper .cursor/rules/ directory setup
- ✓ Toast notifications for download completion feedback
- ✓ Expanded technology selection with 40+ authentic technology icons
- ✓ Professional icon library integration using react-icons
- ✓ Improved scrollable UI for large technology selection list
- ✓ Redesigned technology selection with proper categorization
- ✓ Added popular preset configurations (Modern Full-Stack, MERN, Vue.js, Enterprise Monorepo)
- ✓ Organized technologies into 12 logical categories: Languages & Runtimes, Frontend/Backend Frameworks, Styling & UI, Database & ORM, Frontend State Management, API & Data Fetching, Build Tools, Testing, Code Quality, Validation, Monorepo Tools, Animation, Deployment, Real-time
- ✓ Comprehensive technology coverage: Deno, Bun, MySQL, SQLite, Playwright, shadcn/ui, Mantine, Zustand, Jotai, Zod, Valibot, Yup, Turborepo, Nx, Railway, PlanetScale, Neon, Drizzle ORM, Biome
- ✓ Streamlined user experience with preset selection that populates individual technologies
- ✓ Updated header with Supatest AI branding and logo
- ✓ Moved Node.js to Languages & Runtimes category
- ✓ Simplified main heading to "Choose Your Tech Stack" in navigation bar
- ✓ Removed redundant "Project Setup Wizard" heading to save space
- ✓ Removed hero section to display wizard directly
- ✓ Added beautiful gradient logo with Code2 icon and lightning bolt accent
- ✓ Added rounded corners to Supatest AI logo
- ✓ Created footer with "Made with ❤️ by Supatest AI"
- ✓ Added clickable links to both header logo and footer text pointing to https://supatest.ai

## Changelog

```
Changelog:
- June 24, 2025. Initial setup and full feature implementation
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```