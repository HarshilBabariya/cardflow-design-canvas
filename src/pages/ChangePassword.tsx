
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import { useToast } from '@/hooks/use-toast';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure your new password and confirmation match.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      // This is a mock password change - replace with actual implementation
      // For now, we'll simulate a successful password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password changed successfully",
        description: "Your password has been updated.",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Failed to change password",
        description: "An error occurred. Please check your current password and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  return (
    <AuthLayout title="Change your password" subtitle="Update your password to keep your account secure.">
      <form onSubmit={handleChangePassword} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="currentPassword"
              type={showPasswords.current ? 'text' : 'password'}
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="pl-10"
              required
            />
            <button
              type="button"
              onClick={() => toggleShowPassword('current')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="newPassword">New password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="newPassword"
              type={showPasswords.new ? 'text' : 'password'}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pl-10"
              required
            />
            <button
              type="button"
              onClick={() => toggleShowPassword('new')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showPasswords.confirm ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10"
              required
            />
            <button
              type="button"
              onClick={() => toggleShowPassword('confirm')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Updating password...' : 'Update password'}
          </Button>
        </div>
        
        <div className="text-center">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ChangePassword;
