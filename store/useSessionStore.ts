import { create } from "zustand";
import { supabase } from "../db/supabase-client";
import { Session } from "@supabase/supabase-js";

type SessionState = {
  session: Session | null;
  fetchSession: () => Promise<void>;
};

export const useSessionStore = create<SessionState>((set) => ({
  session: null,

  fetchSession: async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    set({ session: currentSession.data.session });
  },
}));
