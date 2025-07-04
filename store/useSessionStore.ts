import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../db/supabase-client";
import { Session } from "@supabase/supabase-js";

type SessionState = {
  session: Session | null;
  setSession: (session: Session | null) => void;
  fetchSession: () => Promise<void>;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,

      setSession: (session) => set({ session }),

      fetchSession: async () => {
        const currentSession = await supabase.auth.getSession();
        console.log(currentSession);
        set({ session: currentSession.data.session });
      },
    }),
    {
      name: "session-store",
    }
  )
);
