# Next.js Starter Template

A comprehensive Next.js starter template with all the essentials for rapid development. This template includes everything you need to start building modern web applications without the setup overhead.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form** with **Zod** validation
- **Headless UI** for accessible components
- **Lucide React** for icons
- **Framer Motion** for animations
- **ESLint** and **Prettier** for code quality
- **Responsive design** system
- **Dark mode** support
- **Form validation** with error handling
- **Reusable UI components**
- **Utility functions** and helpers
- **Complete API layer** with React Query
- **Authentication** with token management
- **API proxy** for CORS handling
- **Loading/Error/Empty states**
- **Type-safe API calls**

## 📦 What's Included

### UI Components
- Button (with variants)
- Input
- Card
- Modal
- Badge
- Alert
- Spinner
- Form components with validation

### Layout Components
- Header with navigation
- Footer
- Responsive layout

### Pages
- Home page with hero section
- About page with features
- Contact page with form

### Utilities
- Date formatting
- Currency formatting
- Text utilities (slugify, truncate)
- Validation helpers
- Debounce and throttle functions

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd starter-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` to set your API base URL:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   └── ui/                # UI components
└── lib/                   # Utility functions
    └── utils.ts           # Common utilities
```

## 🎨 Customization

### Colors
The template uses CSS custom properties for theming. You can customize colors in `src/app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... other colors */
}
```

### Components
All UI components are located in `src/components/ui/` and can be easily customized or extended.

### Styling
The project uses Tailwind CSS with custom design tokens. You can modify the configuration in `tailwind.config.ts`.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🧩 Adding New Components

1. Create your component in `src/components/ui/`
2. Follow the existing patterns for props and styling
3. Export from the component file
4. Import and use in your pages

Example:
```tsx
// src/components/ui/my-component.tsx
import { cn } from "@/lib/utils";

interface MyComponentProps {
  className?: string;
  children: React.ReactNode;
}

export function MyComponent({ className, children }: MyComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  );
}
```

## 📱 Responsive Design

The template is fully responsive and includes:
- Mobile-first approach
- Responsive navigation
- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions

## 🌙 Dark Mode

Dark mode is supported through CSS custom properties and can be toggled by adding the `dark` class to the HTML element.

## 🔧 Configuration

### ESLint
ESLint is configured with Next.js recommended rules. You can modify the configuration in `eslint.config.mjs`.

### Prettier
Prettier is configured for consistent code formatting. Configuration is in `.prettierrc`.

### TypeScript
TypeScript is configured with strict mode enabled. Configuration is in `tsconfig.json`.

## 🔌 API Integration

This starter includes a complete API layer for consuming backend services.

### Environment Configuration

Create a `.env.local` file with your API configuration:

```env
# Required: Your backend API base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Optional: Enable API proxy for CORS handling
NEXT_PUBLIC_USE_PROXY=false

# Optional: API timeout in milliseconds
NEXT_PUBLIC_API_TIMEOUT=10000
```

### API Structure

```
src/
├── lib/
│   ├── api/           # API functions
│   │   ├── auth.ts    # Authentication endpoints
│   │   ├── users.ts   # User management
│   │   ├── logos.ts   # Logo CRUD operations
│   │   └── index.ts   # Export all APIs
│   ├── query/         # React Query hooks
│   │   ├── client.ts  # Query client setup
│   │   ├── auth.ts    # Auth hooks
│   │   ├── users.ts   # User hooks
│   │   └── logos.ts   # Logo hooks
│   └── http.ts        # HTTP client with interceptors
├── types/
│   └── api.ts         # API type definitions
└── app/
    └── api-demo/      # Example API usage
```

### Adding a New Endpoint (60 seconds)

1. **Add types** in `src/types/api.ts`:
   ```typescript
   export interface Product {
     id: string;
     name: string;
     price: number;
   }
   ```

2. **Create API function** in `src/lib/api/products.ts`:
   ```typescript
   import { api } from '../http';
   import type { Product } from '@/types/api';

   export const productsApi = {
     getAll: async (): Promise<Product[]> => {
       const response = await api.get<Product[]>('/products');
       return response.data;
     },
   };
   ```

3. **Create React Query hook** in `src/lib/query/products.ts`:
   ```typescript
   import { useQuery } from '@tanstack/react-query';
   import { productsApi } from '@/lib/api';

   export function useProducts() {
     return useQuery({
       queryKey: ['products'],
       queryFn: productsApi.getAll,
     });
   }
   ```

4. **Use in component**:
   ```typescript
   import { useProducts } from '@/lib/query/products';

   export function ProductsList() {
     const { data: products, isLoading, error } = useProducts();
     
     if (isLoading) return <LoadingState />;
     if (error) return <ErrorState />;
     
     return (
       <div>
         {products?.map(product => (
           <div key={product.id}>{product.name}</div>
         ))}
       </div>
     );
   }
   ```

### Using React Query Hooks

```typescript
// Queries (GET requests)
const { data, isLoading, error, refetch } = useUsers();
const { data: user } = useUser(userId);

// Mutations (POST/PUT/DELETE requests)
const createUser = useCreateUser();
const updateUser = useUpdateUser();
const deleteUser = useDeleteUser();

// Usage
const handleCreate = async () => {
  await createUser.mutateAsync({ name: 'John', email: 'john@example.com' });
};
```

### API Proxy for CORS

Enable the API proxy in `.env.local`:
```env
NEXT_PUBLIC_USE_PROXY=true
```

This routes all API calls through `/api/proxy/*` to avoid CORS issues during development.

### Authentication

The HTTP client automatically handles authentication tokens:

```typescript
// Login and store token
const { mutate: login } = useLogin();
login({ email: 'user@example.com', password: 'password' });

// Token is automatically added to requests
const { data: user } = useMe(); // Uses stored token
```

### Error Handling

All API calls include proper error handling:

```typescript
const { data, error, isLoading } = useUsers();

if (error) {
  // Error is typed as ApiError
  console.log(error.message, error.status, error.code);
}
```

### Demo Page

Visit `/api-demo` to see the API layer in action with:
- Authentication flow
- CRUD operations
- Loading/error states
- Real-time updates

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [React Query Documentation](https://tanstack.com/query/latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Headless UI](https://headlessui.com/) for accessible components
- [Lucide](https://lucide.dev/) for the beautiful icons

---

**Happy coding! 🚀**