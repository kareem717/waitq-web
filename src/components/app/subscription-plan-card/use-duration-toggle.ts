import { create } from "zustand";

interface usePriceToggleProps {
	isAnnual: boolean;
	setIsAnnual: (isAnnual: boolean) => void;
	toggleAnnual: () => void;
}

export const usePriceToggle = create<usePriceToggleProps>((set) => ({
	isAnnual: true,
	setIsAnnual: (isAnnual: boolean) => set({ isAnnual }),
	toggleAnnual: () => set((state) => ({ isAnnual: !state.isAnnual })),
}));
