# 🚌 School Bus Tracking System - Frontend

A modern, responsive frontend application for the School Bus Tracking System, built with Next.js 16, TypeScript, and Tailwind CSS. This application connects to the remote backend API at [https://web-project-sigma-two.vercel.app/](https://web-project-sigma-two.vercel.app/).

## ✨ Features

### 🔐 Authentication System
- **User Registration**: Create accounts for Admin, Driver, and Parent roles
- **User Login**: Secure JWT-based authentication
- **Role-based Access Control**: Different dashboards and permissions based on user role
- **Profile Management**: Update personal information and account settings

### 👨‍💼 Admin Dashboard
- **System Overview**: Total drivers, students, buses, and attendance statistics
- **User Management**: View, edit, and delete user accounts
- **Student Management**: Manage student records and information
- **Route Management**: Create and manage bus routes
- **Bus Management**: Monitor and control bus fleet

### 🚌 Driver Dashboard
- **Route Overview**: View assigned routes and schedules
- **Bus Management**: Update bus status and location
- **Attendance Tracking**: Record student attendance
- **Notifications**: Receive important updates and alerts

### 👨‍👩‍👧‍👦 Parent Dashboard
- **Child Tracking**: Monitor children's bus status and location
- **Attendance History**: View attendance records and history
- **Notifications**: Receive updates about children's transportation
- **Emergency Contacts**: Manage emergency contact information

### 📱 Responsive Design
- **Mobile-first**: Optimized for all device sizes
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Accessibility**: WCAG compliant design patterns
- **Real-time Updates**: Live data synchronization with backend

## 🛠️ Technology Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form handling and validation
- **Zod**: Schema validation
- **Axios**: HTTP client for API communication

### UI Components
- **Headless UI**: Accessible UI components
- **Lucide React**: Beautiful icons
- **Framer Motion**: Smooth animations
- **Class Variance Authority**: Component variants

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Tailwind Merge**: Utility class merging

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-bus-tracking-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── login/             # Authentication pages
│   ├── register/
│   ├── admin/             # Admin-specific pages
│   │   └── dashboard/
│   ├── driver/            # Driver-specific pages
│   │   └── dashboard/
│   ├── parent/            # Parent-specific pages
│   │   └── dashboard/
│   ├── profile/           # Profile management
│   └── unauthorized/      # Access denied page
├── components/            # Reusable React components
│   └── AuthLayout.tsx     # Authentication layout wrapper
├── lib/                   # Utility libraries
│   ├── api/              # API client modules
│   │   ├── auth.ts       # Authentication API
│   │   ├── remote.ts     # Remote API endpoints
│   │   └── index.ts      # API exports
│   └── http.ts            # HTTP client configuration
├── types/                 # TypeScript type definitions
│   └── api.ts            # API-related types
└── styles/               # Global styles
```

## 🔌 API Integration

The frontend connects to the remote School Bus Tracking System API:

**Base URL**: `https://web-project-sigma-two.vercel.app/api`

### Available Endpoints

#### Authentication
- `POST /login` - User login
- `POST /register` - User registration
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

#### User Management (Admin)
- `GET /users` - Get all users
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Student Management
- `GET /students` - Get all students
- `POST /students` - Create student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

#### Route Management
- `GET /routes` - Get all routes
- `POST /routes` - Create route
- `PUT /routes/:id` - Update route

#### Bus Management
- `GET /buses` - Get all buses
- `POST /buses` - Create bus
- `PATCH /buses/:id/status` - Update bus status

#### Attendance Tracking
- `POST /attendance` - Record attendance
- `GET /attendance/student/:id` - Get student attendance
- `GET /attendance/route/:id` - Get route attendance

#### Notifications
- `GET /notifications` - Get notifications
- `POST /notifications` - Send notification
- `PATCH /notifications/:id/read` - Mark as read

#### Dashboard Data
- `GET /dashboard/admin` - Admin dashboard data
- `GET /dashboard/driver` - Driver dashboard data
- `GET /dashboard/parent` - Parent dashboard data

## 🔒 Authentication Flow

1. **Login/Register**: Users authenticate with email and password
2. **JWT Token**: Backend returns JWT token for session management
3. **Token Storage**: Token stored in localStorage for persistence
4. **Role-based Routing**: Users redirected to appropriate dashboard
5. **Protected Routes**: AuthLayout component handles authentication checks
6. **Auto-logout**: Token expiration handled gracefully

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Professional blue and gray theme
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent spacing using Tailwind utilities
- **Components**: Reusable, accessible components

### Responsive Design
- **Mobile**: Optimized for smartphones
- **Tablet**: Adapted layout for medium screens
- **Desktop**: Full-featured desktop experience

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant
- **Focus Management**: Clear focus indicators

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://web-project-sigma-two.vercel.app/api

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom spacing scale
- Component-specific utilities
- Responsive breakpoints

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 📱 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation

## 🔄 Version History

- **v1.0.0**: Initial release with full functionality
- **v1.1.0**: Added real-time notifications
- **v1.2.0**: Enhanced mobile responsiveness
- **v1.3.0**: Improved accessibility features

---

**Built with ❤️ for better school transportation management**