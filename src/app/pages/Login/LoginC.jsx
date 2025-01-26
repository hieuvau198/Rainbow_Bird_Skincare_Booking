import React, { useState, useEffect } from 'react';

const LoginC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CLIENT_ID = "472695676845-p90k5n0bfbl730krba46c016htbckvrk.apps.googleusercontent.com";

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Sign-In
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { 
          theme: 'outline', 
          size: 'large',
          width: 350
        }
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = async (response) => {
    setLoading(true);
    setError(null);

    console.log("Google login response:", response); // Log the response from Google

    try {
      const serverResponse = await fetch('https://localhost/api/Auth/google-login', {
                                      // https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Auth/google-login
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          idToken: response.credential,
          clientId: CLIENT_ID 
        })
      });

      console.log("Server response:", serverResponse); // Log the response from the backend

      if (!serverResponse.ok) {
        const errorData = await serverResponse.json();
        console.error("Error response from server:", errorData); // Log any error response from the server
        throw new Error('Authentication failed');
      }

      const data = await serverResponse.json();

      console.log("Authentication successful, server data:", data); // Log the data received after successful login

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      window.location.href = '/dashboard';
    } catch (err) {
      console.error("Error during Google login:", err); // Log the error message
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to continue</p>

        <div className="flex justify-center mb-4">
          <div id="googleSignInButton"></div>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        {loading && (
          <div className="text-center text-blue-500">Signing in...</div>
        )}

        <div className="text-center mt-4 text-sm text-gray-600">
          Need an account? <a href="/signup" className="text-blue-500">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginC;
