# User Registration Module - Course Management Platform (Frontend)

Modern web application developed with Next.js and React to provide user registration, authentication, and profile management interfaces for the Course and Training Management Platform of Véridia.

### ✒ Description

The city of Véridia aims to digitalize and organize the course and training offerings from public and private institutions. This module is responsible for the frontend user interface layer of the platform, providing intuitive forms and workflows for registration of students, instructors, and administrators with real-time validation and responsive design.

This registration frontend provides a user-friendly interface for user management functionality including multi-step registration forms, authentication flows, profile updates, and client-side data validation. The application follows modern React development best practices using Next.js App Router architecture and component-based design.

### ⚙ Architecture
The application is structured following the modern Next.js architecture pattern:

- App Router: Handles routing and page layouts using Next.js 14+ conventions
- Components Layer: Reusable UI components built with Shadcn UI
- API Layer: HTTP client for backend communication
- Types Layer: TypeScript definitions for type safety
- Utilities Layer: Helper functions and shared logic

### 💻 Technologies Used

* **Framework:** Next.js 14+
* **Language:** TypeScript
* **UI Library:** React 18
* **Styling:** Tailwind CSS
* **Component Library:** Shadcn UI
* **Form Management:** React Hook Form + Zod
* **Validation:** Zod Schema Validation
* **HTTP Client:** Fetch API
* **Package Manager:** npm

### 👨‍💻 Backend Repository
<table>
  <tr>
    <td valign="middle">
      <a href="https://github.com/Pedronovaesdev/Projeto_de_Programacao_N02_Grupo1.git" target="_blank">
      <img src="https://www.svgrepo.com/show/484158/web-page-browser-window.svg" height="50" width="50" alt="Web page icon">
      </a>
      </td>
      <td valign="middle">
      <a href="https://github.com/Pedronovaesdev/Projeto_de_Programacao_N02_Grupo1.git" target="_blank">
      Check out the application backend
      </a>
    </td>
  </tr>
</table>

### 🚀 How to Run

#### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

#### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Projeto_de_Programacao_N02_Grupo1_Front
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (if needed):
Create a `.env.local` file in the root directory and add your backend API URL:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/
```

4. Run the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

#### Available Scripts

- `npm run dev` - Starts the development server with Turbopack
- `npm run build` - Creates an optimized production build
- `npm start` - Runs the production build
- `npm run lint` - Runs ESLint to check code quality

#### Build for Production

```bash
npm run build
npm start
```

### 👨‍💻 Components
GROUP 01 - CLASS N02
