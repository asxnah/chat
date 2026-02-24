# Chat Application

## Description

The Chat Application is a feature-rich web app designed to provide a seamless and engaging chat experience for users.

## Features

- **User Authentication**: Secure login and registration handled through dedicated routes.
- **Chat Interface**: Dedicated sections for chats, enabling user interactions.
- **State Management**: Powered by Redux Toolkit for efficient global state handling.
- **Responsive Design**: Styled with Tailwind CSS for a modern, mobile-friendly UI.
- **Icons**: Integrated Lucide React icons for enhanced visual elements.
- **TypeScript Support**: Ensures robust code with static typing.

## Tech Stack

- **Framework**: Next.js 14.2.5
- **UI Library**: React 18 & React DOM 18
- **State Management**: Redux Toolkit 2.2.7 & React Redux 9.1.2
- **Styling**: Tailwind CSS 3.4.1 & PostCSS 8
- **Icons**: Lucide React 0.433.0
- **Language**: TypeScript 5
- **Linting**: ESLint with Next.js config
- **Other**: Node.js types for development

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/asxnah/chat.git
   ```
2. Navigate to the project directory:
   ```
   cd chat
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and visit `http://localhost:3000`.
3. For authentication, navigate to auth routes (e.g., `/login` or `/signup` assuming standard setup).
4. Access chat features via the `/chats` route.

To build for production:

```
npm run build
npm run start
```

## Project Structure

- **`app/`**: Contains Next.js app router files, including:
  - `(auth)`: Authentication-related pages and layouts.
  - `chats`: Chat functionality pages.
  - `layout.tsx`: Root layout.
  - `page.tsx`: Home page.
  - `reduxProvider.tsx`: Redux provider wrapper.
  - `globals.css`: Global styles.
- **`src/`**: Source code organization:
  - `shared`: Reusable components, hooks, or utilities.
  - `store`: Redux store configuration and slices.
  - `widgets`: UI widgets specific to the chat app.
- **`public/`**: Static assets like fonts.
- Configuration files: `next.config.ts` (default setup), `tsconfig.json`, `package.json`, etc.
