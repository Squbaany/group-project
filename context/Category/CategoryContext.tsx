"use client";

import { createContext, useContext, useState } from "react";

interface ICategoryContextValue {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryContext = createContext<ICategoryContextValue>({
  category: "",
  setCategory: () => {},
});

export const useCategory = () => {
  return useContext(CategoryContext);
};

type Props = {
  children: React.ReactNode;
};

export const CategoryProvider = ({ children }: Props) => {
  const [category, setCategory] = useState("");

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
