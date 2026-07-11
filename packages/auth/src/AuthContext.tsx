import {
  createContext,
  useContext,
  useEffect,
  useState,
  type JSX,
  type ReactNode,
} from "react";
import type { AuthUser, LoginBody } from "./types";
import { loginRequest, logoutRequest, meRequest } from "./api";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (values: LoginBody) => Promise<void>;
  logout: () => Promise<void>;
}

const authContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    meRequest()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const onUnauthorized = () => {
      setUser(null);
    };
    window.addEventListener("auth:unauthorized", onUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", onUnauthorized);
    };
  }, []);

  const login = async (values: LoginBody) => {
    const { user } = await loginRequest(values);
    setUser(user);
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  return (
    <authContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(authContext);
  if (!ctx) throw new Error("useUser used outside a AuthProvider");
  return ctx;
}

export function useAuthUser(): AuthUser {
  const { user } = useUser();
  if (!user) throw new Error(`useAuthUser outside an authenticated route`);
  return user;
}
