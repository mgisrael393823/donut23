import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';

export function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.hash.substring(1));
      const accessToken = params.get('access_token');
      
      if (accessToken) {
        localStorage.setItem('googleToken', accessToken);
        navigate('/calendar');
      } else {
        setError('No access token received');
        setTimeout(() => navigate('/calendar'), 2000);
      }
    } catch (err) {
      setError('Failed to process authentication');
      setTimeout(() => navigate('/calendar'), 2000);
    }
  }, [navigate, location]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-red-600">
          <AlertCircle className="w-8 h-8" />
          <p>{error}</p>
          <p className="text-sm text-gray-500">Redirecting back to calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}