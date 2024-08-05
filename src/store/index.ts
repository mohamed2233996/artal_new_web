import { Product } from "@/types/Product";
import { StateCreator, createStore } from "zustand/vanilla";
import { PersistOptions, persist } from "zustand/middleware";
import { Checkout } from "@/types";

export type Cart = (Product & { quantity: number })[];

export type AppState = {
  cart: Cart;
  favourites: Product[];
  payment: Checkout | null;
};

export type AppActions = {
  emptyState: () => void;
  populateState: (
    products: (Product & { quantity: number })[],
    favourites: Product[]
  ) => void;
  addToCart: (product: Product, quantity?: number) => void;
  addToCartWithQuantity: (product: Product, quantity: number) => void;
  removeFromCart: (cartId: string) => void;
  checkInCart: (pid: string) => boolean;
  removeAllFromCart: () => void;
  increaseQuantity: (pid: string) => void;
  decreaseQuantity: (pid: string) => void;
  getQuantity: (pid: string) => number | undefined;
  addToFavourites: (product: Product) => void;
  checkInFavourites: (pid: string) => boolean;
  removeFromFavourites: (pid: string) => void;
  removeAllFromFavourites: () => void;
  addPaymentData: (data: Checkout) => void;
  getPaymentData: () => void;
};

export type AppStore = AppState & AppActions;

export const defaultInitState: AppState = {
  cart: [],
  favourites: [],
  payment: null,
};

type MyPersist = (
  config: StateCreator<AppStore>,
  options: PersistOptions<AppStore>
) => StateCreator<AppStore>;

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>(
    (persist as MyPersist)(
      (set, get) => ({
        ...initState,
        emptyState: () => set({ cart: [], favourites: [], payment: null }),
        populateState: (
          cart: (Product & { quantity: number })[],
          favourites: Product[]
        ) => {
          const newState = { cart, favourites };
          set(newState);
        },
        addToCart: (product: Product, quantity = 1) => {
          const cart = get().cart;
          if (cart.find((p) => p.id === product.id)) {
            cart.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            );
          } else {
            cart.push({ ...product, quantity });
          }
          set({ cart });
        },
        addToCartWithQuantity: (product: Product, quantity: number) => {
          const cart = get().cart;
          cart.push({ ...product, quantity });
          set({ cart });
        },
        checkInCart: (pid) => {
          const cart = get().cart;
          return !!cart.find((p) => p.id === pid);
        },
        removeFromCart: (productId) => {
          let cart = get().cart;
          set({
            cart: cart.filter((p) => p.id !== productId),
          });
        },
        removeAllFromCart: () => {
          const cart = get().cart;
          set({ cart: [] });
        },
        increaseQuantity: (pid) => {
          const cart = get().cart;
          set({
            cart: cart.map((p) =>
              p.id === pid ? { ...p, quantity: p.quantity + 1 } : p
            ),
          });
        },
        decreaseQuantity: (pid) => {
          const cart = get().cart;
          set({
            cart: cart.map((p) =>
              p.id === pid ? { ...p, quantity: p.quantity - 1 } : p
            ),
          });
        },
        getQuantity: (pid) => {
          const cart = get().cart;
          return cart.find((p) => p.id === pid)?.quantity;
        },
        addToFavourites: (product: Product) => {
          const favourites = get().favourites;
          favourites.push({ ...product });
          set({ favourites });
        },
        checkInFavourites: (pid) => {
          const wishlist = get().favourites;
          return !!wishlist.find((p) => p.id === pid);
        },
        removeFromFavourites: (pid) => {
          let favourites = get().favourites;
          favourites = favourites.filter((p) => p.id !== pid);
          set({ favourites });
        },
        removeAllFromFavourites: () => {},
        addPaymentData: (data: Checkout) => {
          set({ payment: data });
        },
        getPaymentData: () => {
          let payment = get().payment;
          return payment;
        },
      }),
      {
        name: "persist",
      }
    )
  );
};
