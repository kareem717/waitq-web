"use client"

import { ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
import { Account } from '@/lib/sdk';

export type AuthContextType = {
  user: SupabaseUser | undefined
  account: Account | undefined
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  account: undefined,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children, user, account }: { children: ReactNode, user: SupabaseUser | undefined, account: Account | undefined }) {
  return <AuthContext.Provider value={{ user, account }}>{children}</AuthContext.Provider>;
}