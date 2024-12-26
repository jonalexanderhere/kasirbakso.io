import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../types';

interface MenuContextType {
  menu: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const savedMenu = localStorage.getItem('menu');
    return savedMenu ? JSON.parse(savedMenu) : [];
  });

  useEffect(() => {
    localStorage.setItem('menu', JSON.stringify(menu));
  }, [menu]);

  const addMenuItem = (item: MenuItem) => {
    setMenu([...menu, item]);
  };

  const removeMenuItem = (id: string) => {
    setMenu(menu.filter(item => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menu, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};