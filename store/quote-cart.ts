import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuoteItem } from "@/types";
import { generateId } from "@/lib/utils";

interface QuoteCartState {
  items: QuoteItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<QuoteItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNotes: (id: string, notes: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed (derived helpers)
  getTotalItems: () => number;
  getItemById: (id: string) => QuoteItem | undefined;
}

export const useQuoteCart = create<QuoteCartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const items = get().items;
        // Check if exact same product+variant already in cart
        const existing = items.find(
          (item) =>
            item.productId === newItem.productId &&
            item.variantId === newItem.variantId &&
            item.selectedBrand === newItem.selectedBrand
        );

        if (existing) {
          // Increment quantity instead of adding duplicate
          set({
            items: items.map((item) =>
              item.id === existing.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...items, { ...newItem, id: generateId() }],
            isOpen: true,
          });
        }
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      updateNotes: (id, notes) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, notes } : item
          ),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () => get().items.length,
      getItemById: (id) => get().items.find((item) => item.id === id),
    }),
    {
      name: "alkawther-quote-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
