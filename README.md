# Synapsis Blog

Synapsis Blog is a modern blogging platform built with [Next.js 13](https://nextjs.org/) using the Pages Router. This application is designed for fast performance, SEO optimization, and a seamless user experience.

#### Live URL:
https://synapsis-blog-app-gamma.vercel.app/

---

## Table of Contents

- [Features](#features)
- [How to use the app](#how-to-use)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
- [Production Build](#production-build)
- [CI/CD](#ci-cd)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)

---

## Features

- **Dynamic Blogging:** Create, edit, and manage blog posts.
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

### Pages:
1. Onboarding Page

   ![Onboarding page](/docs/assets/onboarding.png)

   In this page, there's a select component that will list down all users available and below there's an input to put in the API key to access resources in the API.

1. Home Page

   ![Home page](/docs/assets/home.png)

   "Home page" allows user to see 6 posts at a time, there are a pagination and above the grid there's an input that allows user to search for a post in that page based on the post's title.

1. Post detail Page

   ![Post detail page](/docs/assets/post-detail.png)

   "Post detail" page is a server generated page, it will shows post details that consists of post title, the author user ID and the post body. Below there are a list of comments of the post, consiting of the user name and the email of the commenter and the comment content.

1. Create new post Page

   ![Create new post page](/docs/assets/create-post.png)

   The "Create New Post" page provides a simple and intuitive interface for users to compose new blog posts. It includes fields for the title and body of the post, along with a "Submit" button to publish the post. The page is designed with a clean layout and includes a navigation header for accessing other sections, such as the profile page.


1. Profile Page

   ![Profile page](/docs/assets/profile.png)

   The "Profile" page showcases the user's profile details, such as their name, email, and gender. Below the profile information, it displays a list of posts created by the user with options to edit or delete each post. The layout emphasizes clarity and ease of use, with a consistent navigation header and responsive design.


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
   cd synapsis-blog-app
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

To run tests:

```bash
```

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

## CI CD
For CI CD of this project, I used Github workflows, which the configuration can be accessed in `./.github/workflows/ci.yml`

![CI CD workflows](/docs/assets/ci-cd-workflows.png)

The CI CD process consists of:
1. Run lint using eslint `npm run lint`
1. Run Cypress e2e tests `npm run e2e:headless`


   ###### Please note that this process can take up to 5 minutes.

## File Structure

```plaintext
synapsis-blog/
├── .eslintrc.json
├── .gitignore
├── .prettierrc.json
├── components.json
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
│   ├── lib/
│   ├── pages/
│   ├── providers/
│   ├── styles/
│   └── types/
├── tailwind.config.ts
└── tsconfig.json
```
---

- `context` contains the file for React Context API, store, state and the reducers, note that this directory will not contain any `Provider` for the context.
- `providers` contains all provider components used in the app.
- `hoc` contains Higher order component that are used in the app.

## Technologies Used

- **Framework:** Next.js 13 (Pages Router)
- **Styling:** Tailwind CSS v3
- **State Management:** React Context, Tanstack Query
- **UI Library:** Ant Design v5

---
