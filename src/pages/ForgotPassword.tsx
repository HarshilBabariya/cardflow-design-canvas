
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // This is a mock password reset - replace with actual implementation
      // For now, we'll simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSent(true);
      toast({
        title: "Reset link sent",
        description: "Check your email for the password reset link.",
      });
    } catch (error) {
      toast({
        title: "Request failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Reset your password" 
      subtitle={sent ? "Check your email for a reset link" : "We'll send you a link to reset your password"}
    >
      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending link...' : 'Send reset link'}
          </Button>
          
          <div className="text-center">
            <Link to="/login" className="text-sm text-trello-blue hover:underline inline-flex items-center">
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back to login
            </Link>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 text-blue-700 p-4 rounded-md text-sm">
            We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
          </div>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => {
              setEmail('');
              setSent(false);
            }}
          >
            Send another link
          </Button>
          
          <div className="text-center">
            <Link to="/login" className="text-sm text-trello-blue hover:underline inline-flex items-center">
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back to login
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
