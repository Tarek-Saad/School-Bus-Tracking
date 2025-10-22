'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';
import { EmptyState } from '@/components/ui/empty-state';
import { useMe, useLogin, useLogout } from '@/lib/query/auth';
import { useLogos, useCreateLogo, useDeleteLogo } from '@/lib/query/logos';
import { useUsers } from '@/lib/query/users';
import { RefreshCw, Plus, Trash2 } from 'lucide-react';

export default function ApiDemoPage() {
  const [loginEmail, setLoginEmail] = useState('demo@example.com');
  const [loginPassword, setLoginPassword] = useState('password');
  const [newLogoName, setNewLogoName] = useState('');
  const [newLogoUrl, setNewLogoUrl] = useState('');

  // Auth queries
  const { data: user, isLoading: userLoading, error: userError } = useMe();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  // Data queries
  const { data: logos, isLoading: logosLoading, error: logosError, refetch: refetchLogos } = useLogos();
  const { data: users, isLoading: usersLoading, error: usersError, refetch: refetchUsers } = useUsers();

  // Mutations
  const createLogoMutation = useCreateLogo();
  const deleteLogoMutation = useDeleteLogo();

  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({
        email: loginEmail,
        password: loginPassword,
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCreateLogo = async () => {
    if (!newLogoName || !newLogoUrl) return;
    
    try {
      await createLogoMutation.mutateAsync({
        name: newLogoName,
        url: newLogoUrl,
        tags: ['demo'],
      });
      setNewLogoName('');
      setNewLogoUrl('');
    } catch (error) {
      console.error('Create logo failed:', error);
    }
  };

  const handleDeleteLogo = async (id: string) => {
    try {
      await deleteLogoMutation.mutateAsync(id);
    } catch (error) {
      console.error('Delete logo failed:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">API Demo</h1>
        <p className="text-muted-foreground">
          This page demonstrates the API layer with React Query integration.
        </p>
      </div>

      {/* Authentication Section */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>
            Login/logout functionality with token management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userLoading ? (
            <LoadingState message="Loading user..." size="sm" />
          ) : userError ? (
            <ErrorState 
              message="Failed to load user data" 
              onRetry={() => window.location.reload()} 
            />
          ) : user ? (
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-semibold">Logged in as: {user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleLogin} 
                disabled={loginMutation.isPending}
                className="w-full"
              >
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Users Section */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Fetching users from the API
          </CardDescription>
        </CardHeader>
        <CardContent>
          {usersLoading ? (
            <LoadingState message="Loading users..." />
          ) : usersError ? (
            <ErrorState 
              message="Failed to load users" 
              onRetry={() => refetchUsers()} 
            />
          ) : users?.data?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.data.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Badge variant="secondary" className="mt-2">
                      User
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState message="No users found" />
          )}
        </CardContent>
      </Card>

      {/* Logos Section */}
      <Card>
        <CardHeader>
          <CardTitle>Logos</CardTitle>
          <CardDescription>
            CRUD operations with logos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Create Logo Form */}
          <div className="flex gap-4">
            <Input
              placeholder="Logo name"
              value={newLogoName}
              onChange={(e) => setNewLogoName(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Logo URL"
              value={newLogoUrl}
              onChange={(e) => setNewLogoUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleCreateLogo}
              disabled={createLogoMutation.isPending || !newLogoName || !newLogoUrl}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Logo
            </Button>
          </div>

          {/* Logos List */}
          {logosLoading ? (
            <LoadingState message="Loading logos..." />
          ) : logosError ? (
            <ErrorState 
              message="Failed to load logos" 
              onRetry={() => refetchLogos()} 
            />
          ) : logos?.data?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {logos.data.map((logo) => (
                <Card key={logo.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{logo.name}</h3>
                        <p className="text-sm text-muted-foreground">{logo.url}</p>
                        {logo.tags?.map((tag) => (
                          <Badge key={tag} variant="outline" className="mr-1 mt-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteLogo(logo.id)}
                        disabled={deleteLogoMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState 
              message="No logos found" 
              actionLabel="Add your first logo"
              onAction={() => {
                setNewLogoName('Sample Logo');
                setNewLogoUrl('https://example.com/logo.png');
              }}
            />
          )}
        </CardContent>
      </Card>

      {/* API Status */}
      <Card>
        <CardHeader>
          <CardTitle>API Status</CardTitle>
          <CardDescription>
            Current API configuration and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Base URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'Not configured'}</p>
            <p><strong>Timeout:</strong> {process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'}ms</p>
            <p><strong>Proxy:</strong> {process.env.NEXT_PUBLIC_USE_PROXY === 'true' ? 'Enabled' : 'Disabled'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
