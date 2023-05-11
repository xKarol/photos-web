<p align="center">
  <a href="#">
    <img alt="Photos Web" src="./apps/web/public/assets/logo.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Photos Web
</h1>

<p align="center">

<a href="https://github.com/xKarol/photos-web/actions/workflows/main.yml" target="blank">
<img src="https://github.com/xKarol/photos-web/actions/workflows/main.yml/badge.svg?branch=main&event=push" alt="code quality" />
</a>

<a href="https://github.com/xKarol/photos-web/actions/workflows/test.yml" target="blank">
<img src="https://github.com/xKarol/photos-web/actions/workflows/test.yml/badge.svg?branch=main&event=push" alt="testing" />
</a>

<a href="https://img.shields.io/snyk/vulnerabilities/github/xkarol/photos-web?style=flat-badge" target="blank">
<img src="https://img.shields.io/snyk/vulnerabilities/github/xkarol/photos-web?style=flat-badge" alt="vulnerabilities" />
</a>

</p>

## ❔ About

This project is a monorepo that contains a frontend and a backend application for a photo portfolio website. The frontend application is built with Next.js. The backend is built with Express.js.

### 🔍 Prerequisites

- NodeJS
- Docker (optional)

## 📁 Folder structure

- /apps
  - [/backend](./apps/backend)
  - [/web](./apps/web)
- /packages
  - [/eslint-config](./packages/eslint-config)
  - [/prettier-config](./packages/prettier-config)
  - [/schemas](./packages/schemas)
  - [/tsconfig](./packages/tsconfig)
  - [/types](./packages/types)

## 🚀 Demo

<a href="https://photos-web-web.vercel.app/" target="blank">
<img src="https://img.shields.io/website?style=flat-square&url=https%3A%2F%2Fphotos-web-web.vercel.app%2F" />
</a>

<a href="https://magenta-harmony-production.up.railway.app" target="blank">
<img src="https://img.shields.io/website?label=backend&style=flat-square&url=https%3A%2F%2Fmagenta-harmony-production.up.railway.app%2Fhealth-check" />
</a>

## 🛠️ Installation Steps

1. Clone the repository

```bash
git clone https://github.com/xkarol/photos-web.git
```

2. Change the working directory

```bash
cd photos-web
```

3. Install dependencies

```bash
npm install
```

4. Run the app

```bash
npm run dev
```

## 💻 Built with

- [Lerna](https://lerna.js.org/)
- [Typescript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [React Query](https://tanstack.com/query/latest/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- ... and many more
