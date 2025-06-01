import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  isAuthenticated: boolean;
  loginSaveToken: (token: string) => void;
  logoutDeleteToken: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const loginSaveToken = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    router.push("/home");
  };

  const logoutDeleteToken = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loginSaveToken, logoutDeleteToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
