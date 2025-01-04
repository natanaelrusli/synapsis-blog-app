# Synapsis Blog

Synapsis Blog is a modern blogging platform built with [Next.js 13](https://nextjs.org/) using the Pages Router. This application is designed for fast performance, SEO optimization, and a seamless user experience.

---

## Table of Contents

- [Features](#features)
- [How to use the app](#how-to-use)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
- [Production Build](#production-build)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Dynamic Blogging:** Create, edit, and manage blog posts dynamically.
- **SEO Optimization:** Built-in SEO optimizations with meta tags and Open Graph support.
- **Responsive Design:** Fully responsive UI for all devices.
- **Dark Mode:** Toggle between light and dark themes.
- **Pagination:** Efficient pagination for handling large datasets.
- **Markdown Support:** Write blog posts using Markdown.
- **API Integration:** Uses Next.js API routes for server-side functionality.

---

## How To Use
- The first time you open the app, you will need to choose a user that you want to use from the dropdown.
- Enter the API key you get from https://gorest.co.in/

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (version 19 or later)
- **npm** or **yarn** (for package management)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/natanaelrusli/synapsis-blog-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd synapsis-blog
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

---

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Production Build

1. Build the application:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:

   ```bash
   npm start
   # or
   yarn start
   ```

---

## File Structure

```plaintext
synapsis-blog/
├── .eslintrc.json
├── .gitignore
├── .prettierrc.json
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── public/
├── README.md
├── src/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── hoc/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── providers/
│   ├── styles/
│   └── types/
├── tailwind.config.ts
└── tsconfig.json
```
---

## Technologies Used

- **Framework:** Next.js 13 (Pages Router)
- **Styling:** Tailwind CSS / CSS Modules
- **State Management:** React Context
- **UI Library:** Ant Design v5

---
