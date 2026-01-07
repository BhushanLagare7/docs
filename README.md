# Docs Clone

A modern, real-time collaborative document editor built with Next.js, inspired by Google Docs. This project features a rich text editor, real-time user presence, and seamless authentication, providing a premium document editing experience.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- **Real-time Collaboration**: Multiple users can edit the same document simultaneously with live cursor tracking (powered by [Liveblocks](https://liveblocks.io/)).
- **Rich Text Editing**: Advanced text formatting options including headers, lists, links, and text styles using [Tiptap](https://tiptap.dev/).
- **Authentication**: Secure user sign-up and login via [Clerk](https://clerk.com/).
- **Real-time Database**: Instant data syncing and updates using [Convex](https://www.convex.dev/).
- **Modern UI/UX**: clean, responsive interface built with [Shadcn/UI](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/).
- **Dark Mode**: Native support for light and dark themes.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Auth**: Clerk
- **Database**: Convex
- **Real-time Engine**: Liveblocks
- **Editor**: Tiptap

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm, yarn, pnpm, or bun

### Environment Setup

1.  Clone the repository:

    ```bash
    git clone https://github.com/BhushanLagare7/docs.git
    cd docs
    ```

2.  Create a `.env.local` file in the root directory:

    ```bash
    touch .env.local
    ```

3.  Add the following environment variables to `.env.local`. You will need to obtain these keys from your [Convex](https://dashboard.convex.dev/), [Clerk](https://dashboard.clerk.com/), and [Liveblocks](https://liveblocks.io/dashboard) dashboards.

    ```bash
    # Convex
    NEXT_PUBLIC_CONVEX_URL=your_convex_url_here

    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    CLERK_JWT_ISSUER_DOMAIN=your_clerk_jwt_issuer_domain

    # Liveblocks
    LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
    ```

### Installation

Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running the App

You need to run both the Next.js development server and the Convex back-end server.

1.  Start the development server:

    ```bash
    npm run dev
    ```

2.  In a separate terminal, run the Convex development command to sync your schema and functions:

    ```bash
    npx convex dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Contributing

Contributions are welcome! If you'd like to improve this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
