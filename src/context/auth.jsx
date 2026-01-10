// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../lib/supabaseClient";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Get current session on load
//     supabase.auth.getSession().then(({ data }) => {
//       setUser(data?.session?.user ?? null);
//       setLoading(false);
//     });

//     // Listen for auth changes
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setUser(session?.user ?? null);
//         setLoading(false); // ✅ important so loading becomes false after login/logout
//       }
//     );

//     return () => {
//       listener?.subscription?.unsubscribe();
//     };
//   }, []);

//   const signOut = async () => {
//     await supabase.auth.signOut();
//   };

//   const value = { user, loading, signOut };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error("useAuth must be used inside <AuthProvider>");
//   }
//   return ctx;
// }


import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // ✅ NEW
  const [loading, setLoading] = useState(true);

  // ✅ helper to load role from profiles
  const loadProfileRole = async (userId) => {
    if (!userId) {
      setRole(null);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) {
      // If profile row doesn't exist yet, role will stay null
      console.warn("Load role:", error.message);
      setRole(null);
      return;
    }

    setRole(data?.role ?? null);
  };

  useEffect(() => {
    // Get current session on load
    supabase.auth.getSession().then(async ({ data }) => {
      const currentUser = data?.session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await loadProfileRole(currentUser.id);
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const nextUser = session?.user ?? null;
        setUser(nextUser);

        if (nextUser) {
          await loadProfileRole(nextUser.id);
        } else {
          setRole(null);
        }

        setLoading(false);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    // auth listener will clear user + role
  };

  const value = { user, role, loading, signOut }; // ✅ expose role

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
