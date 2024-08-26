import { useAuth } from "./useAuth"; // Import useAuth to get user info

export const useRole = () => {
  const { user } = useAuth();

  return {
    role: user ? user.role : null,
  };
};
