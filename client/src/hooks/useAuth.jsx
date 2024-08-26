import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from local storage or API
    const loadUser = async () => {
      // Fetch user data from API or local storage
      const response = await fetch("/api/auth/me"); // Example endpoint
      const data = await response.json();
      setUser(data.user);
    };

    loadUser();
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }); // Example endpoint
    setUser(null);
  };

  return { user, logout };
};
