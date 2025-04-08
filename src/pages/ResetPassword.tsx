
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import { useToast } from '@/hooks/use-toast';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      // This is a mock password reset - replace with actual implementation
      // For now, we'll simulate a successful reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password reset successful",
        description: "Your password has been updated. You can now log in with your new password.",
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        title: "Reset failed",
        description: "An error occurred. Please try again or request a new reset link.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if token is missing
  if (!token) {
    return (
      <AuthLayout title="Invalid or expired link" subtitle="Please request a new password reset link">
        <div className="space-y-4">
          <div className="bg-amber-50 text-amber-700 p-4 rounded-md text-sm">
            The password reset link is invalid or has expired.
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/forgot-password')}
          >
            Request new link
          </Button>
          
          <div className="text-center">
            <Link to="/login" className="text-sm text-trello-blue hover:underline inline-flex items-center">
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back to login
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Create new password" subtitle="Your new password must be different from previously used passwords.">
      <form onSubmit={handleReset} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Resetting password...' : 'Reset password'}
        </Button>
        
        <div className="text-center">
          <Link to="/login" className="text-sm text-trello-blue hover:underline inline-flex items-center">
            <ArrowLeft className="h-3 w-3 mr-1" />
            Back to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
