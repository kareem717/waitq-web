"use client"

import { ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
import { Account } from '@/lib/sdk';

export type AuthContextType = {
  user: SupabaseUser | null
  account: Account | null
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  account: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children, user, account }: { children: ReactNode, user: SupabaseUser | null, account: Account | null }) {
  return <AuthContext.Provider value={{ user, account }}>{children}</AuthContext.Provider>;
}