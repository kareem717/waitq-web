"use client"

import { ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
import { Account, AccountSubscription } from '@/lib/sdk';

export type AuthContextType = {
  user: SupabaseUser | undefined
  account: Account | undefined
  subscription: AccountSubscription | undefined
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  account: undefined,
  subscription: undefined
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children, user, account, subscription }: { children: ReactNode, user: SupabaseUser | undefined, account: Account | undefined, subscription: AccountSubscription | undefined }) {
  return <AuthContext.Provider value={{ user, account, subscription }}>{children}</AuthContext.Provider>;
}