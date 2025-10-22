import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Code, Palette, Zap, Shield, Users } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              About This Starter
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A comprehensive Next.js starter template designed to accelerate your development process.
              Everything you need to build modern web applications.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What's Included
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Everything you need to start building your next project.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Modern Stack
                </CardTitle>
                <CardDescription>
                  Built with the latest technologies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Next.js 14 with App Router
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    TypeScript for type safety
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Tailwind CSS for styling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    React Hook Form + Zod validation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  UI Components
                </CardTitle>
                <CardDescription>
                  Pre-built, accessible components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Button, Input, Card components
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Modal and Alert components
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Form validation with Zod
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Responsive design system
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Performance
                </CardTitle>
                <CardDescription>
                  Optimized for speed and efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Server-side rendering
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Image optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Code splitting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Bundle optimization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Developer Experience
                </CardTitle>
                <CardDescription>
                  Tools for better development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    ESLint configuration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Prettier formatting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    TypeScript strict mode
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Hot reloading
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Technology Stack
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Carefully selected technologies for modern web development.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
                <CardDescription>Modern React ecosystem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js 14</Badge>
                  <Badge variant="secondary">React 18</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>UI & Icons</CardTitle>
                <CardDescription>Component libraries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Headless UI</Badge>
                  <Badge variant="secondary">Lucide Icons</Badge>
                  <Badge variant="secondary">Framer Motion</Badge>
                  <Badge variant="secondary">CVA</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forms & Validation</CardTitle>
                <CardDescription>Type-safe form handling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React Hook Form</Badge>
                  <Badge variant="secondary">Zod</Badge>
                  <Badge variant="secondary">@hookform/resolvers</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Getting Started
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Ready to start building? Here's how to get started with this template.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Quick Start Guide</CardTitle>
                <CardDescription>
                  Follow these steps to get your project running
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Install Dependencies</h4>
                    <p className="text-sm text-muted-foreground">
                      Run <code className="bg-muted px-1 rounded">npm install</code> to install all dependencies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Start Development Server</h4>
                    <p className="text-sm text-muted-foreground">
                      Run <code className="bg-muted px-1 rounded">npm run dev</code> to start the development server.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Start Building</h4>
                    <p className="text-sm text-muted-foreground">
                      Open <code className="bg-muted px-1 rounded">http://localhost:3000</code> and start building your app.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
