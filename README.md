# Chat App

A modern chat application built with **Next.js 13**, **React**, **Redux Toolkit**, and **Tailwind CSS**, featuring real-time UI components, user authentication, and a clean minimalist design.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Components](#components)
- [Utilities](#utilities)
- [Redux Store](#redux-store)
- [Styling](#styling)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

Not ready yet.

---

## Features

- User authentication: Sign up, Login, Email confirmation
- Chat interface with real-time UI updates
- Contacts and account management
- Interactive UI components:
  - Inputs, Buttons, Togglers
  - Popups and Confirm dialogs
  - Chat previews with counters
- Mobile and desktop responsive design
- Redux store for global state management

---

## Technologies

- **Next.js 13** (App Router)
- **React 18** (Functional components & Hooks)
- **Redux Toolkit**
- **Tailwind CSS**
- **TypeScript**
- **Lucide Icons**

---

## Folder Structure

```

├── app/
│   ├── layout.tsx          # Root layout with TabBar and ReduxProvider
│   ├── page.tsx            # Home page
│   ├── signup/
│   │   └── page.tsx        # Signup page
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── email-confirmation/
│   │   └── page.tsx        # Email confirmation page
│   ├── chats/
│   │   └── page.tsx        # Chat list page
│   └── globals.css         # Global styles
├── components/             # UI components
│   ├── Input.tsx
│   ├── Button.tsx
│   ├── Toggler.tsx
│   ├── Form.tsx
│   ├── Popup.tsx
│   ├── Confirm.tsx
│   └── Chat.tsx
├── widgets/                # Reusable widgets
│   ├── User.tsx
│   └── TabBar.tsx
├── store/                  # Redux store
│   ├── rootReducer.ts
│   ├── slices/userData.ts
│   └── slices/chats.ts
└── utils/
└── formatDateTime.ts   # Date & time formatting utilities

```

---

## Components

### Input

- Controlled input field
- Props: `id`, `type`, `placeholder`, `value`, `onChange`, `onKeyDown`

### Button

- Reusable button with string or ReactNode content
- Props: `type`, `content`, `disabled`, `onClick`

### Toggler

- Switch button component
- Props: `content`, `checked`, `onToggle`

### Form

- Simple user form with name and email
- Props: `buttonText`, `onSubmit`

### Popup

- Modal popup with heading and close button
- Props: `heading`, `children`, `onClose`

### Confirm

- Confirmation dialog with Yes/No buttons
- Props: `content`, `submit`, `onDecline`

### Chat

- Chat preview component with message and unread counter
- Props: `src`, `name`, `datetime`, `msg`, `counter`

### User

- User or contact card with avatar, name, and email
- Props: `type`, `name`, `avatar`, `email`, `onClick`

### TabBar

- Left sidebar navigation
- Hides on `/login`, `/signup`, `/email-confirmation`
- Shows tabs for Chats, Contacts, Settings

---

## Utilities

### formatTime

```ts
formatTime(isoString: string) => string
```

- Returns time in `HH:MM` format from ISO string.

### formatDateTime

```ts
formatDateTime(isoString: string) => string
```

- Formats date and time as:
  - `HH:MM` if today
  - `Yesterday` if previous day
  - `MM/DD` otherwise

---

## Redux Store

### userInfoSlice

- State: `{ data: { name: string; email: string } }`
- Actions:
  - `set(User)` – sets user data
  - `update({ key, value })` – updates `name` or `email`

### chatsSlice

- State: `{ chats: Chat[] }`
- Action:
  - `set(Chat)` – sets or updates a chat (to be implemented)

### ReduxProvider

- Wraps children in Redux `<Provider>` for global state

---

## Styling

- Tailwind CSS utility classes used throughout
- Global font: `Open Sans Variable`
- Custom color variables in `:root` and `@theme`
- Scrollbar styled for webkit browsers
- Minimalist, clean UI design

---

## Usage

1. Clone the repository:

```bash
git clone https://github.com/asxnah/chat.git
```

2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/YourFeature`
3. Commit changes (conventional commits): `git commit -m 'feat: Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request
