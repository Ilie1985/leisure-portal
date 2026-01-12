import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("USER");

  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingRole, setLoadingRole] = useState(false);

  const fetchRole = async (userId) => {
    if (!userId) {
      setRole("USER");
      return;
    }

    setLoadingRole(true);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) {
        console.warn("fetchRole error:", error.message);
        setRole("USER");
        return;
      }

      setRole(data?.role ?? "USER");
    } catch (e) {
      console.warn("fetchRole exception:", e?.message);
      setRole("USER");
    } finally {
      setLoadingRole(false);
    }
  };

  useEffect(() => {
    let alive = true;

    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.warn("getSession error:", error.message);

        const sessionUser = data?.session?.user ?? null;
        if (!alive) return;

        setUser(sessionUser);

        // IMPORTANT: don't block session loading forever
        if (sessionUser) fetchRole(sessionUser.id);
        else setRole("USER");
      } catch (e) {
        console.warn("init exception:", e?.message);
        if (!alive) return;
        setUser(null);
        setRole("USER");
      } finally {
        if (alive) setLoadingSession(false);
      }
    };

    init();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!alive) return;

      const sessionUser = session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) fetchRole(sessionUser.id);
      else setRole("USER");
    });

    return () => {
      alive = false;
      data?.subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const loading = loadingSession || loadingRole;

  return (
    <AuthContext.Provider value={{ user, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
