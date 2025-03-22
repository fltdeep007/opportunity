# BlueMedix Dashboard

A React-based frontend application for managing users and products with full CRUD functionality.

## Features

- User Management: View, create, update, and delete users
- Product Management: View, create, update, and delete products
- Responsive Design: Works well on mobile, tablet, and desktop
- Clean UI: Built with Tailwind CSS for a modern look and feel
- Form Validation: Ensures data integrity with React Hook Form

## Tech Stack

- React.js (Functional Components with Hooks)
- React Router for navigation
- Context API for state management
- Axios for API requests
- React Hook Form for form handling and validation
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation


1. Install dependencies:
```bash
npm install
```



2. Set up Tailwind CSS:
```bash
npm install tailwindcss @tailwindcss/vite
```

3. Configure Tailwind CSS by updating `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

### Running the Application

Start the development server:
```bash
npm run dev
```




## API Integration

This project uses the FakeStore API as a data source. Since FakeStore API doesn't support full CRUD operations for all entities, the application maintains local state for changes while still making API calls to simulate a full backend.

## Notes

- User images are dynamically generated using the randomuser.me API
- Form validation ensures data integrity before submission
- The application uses optimistic UI updates for better user experience