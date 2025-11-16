import { useLocalStorage } from './useLocalStorage';

export const useStorage = () => {
  // Auth storage
  const [token, setToken] = useLocalStorage('auth_token', null);
  const [refreshToken, setRefreshToken] = useLocalStorage('auth_refresh_token', null);
  const [user, setUser] = useLocalStorage('auth_user', null);
  const [expiresAt, setExpiresAt] = useLocalStorage('auth_expires_at', null);

  // Preferences
  const [theme, setTheme] = useLocalStorage<'light' | 'dark' | null>('user_theme', null);

  // Cart
  const [cartItems, setCartItems] = useLocalStorage('cart_items', []);
  const [cartTotal, setCartTotal] = useLocalStorage('cart_total', 0);

  const clear = (category: string) => {
    const categoryKeys: Record<string, string[]> = {
      AUTH: ['auth_token', 'auth_refresh_token', 'auth_user', 'auth_expires_at'],
      USER: ['user_theme'],
      CART: ['cart_items', 'cart_total'],
    };

    categoryKeys[category]?.forEach((key) => localStorage.removeItem(key));
  };

  const clearAll = () => {
    localStorage.clear();
  };

  return {
    token, setToken,
    refreshToken, setRefreshToken,
    user, setUser,
    expiresAt, setExpiresAt,
    theme, setTheme,
    cartItems, setCartItems,
    cartTotal, setCartTotal,
    clear,
    clearAll,
  };
};


