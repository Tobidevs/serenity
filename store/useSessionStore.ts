import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Session } from "@supabase/supabase-js";

type SessionState = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,

      setSession: (session) => set({ session }),
    }),
    {
      name: "session-store",
    }
  )
);
