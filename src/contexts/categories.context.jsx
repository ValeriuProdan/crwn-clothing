import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCateoriesMap = async () =>{
      const categoriesMap = await getCategoriesAndDocuments();
      console.log(categoriesMap);
      setCategoriesMap(categoriesMap);
    };

    getCateoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
};
