import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategoriesMap } from '../../store/categories/categories.action'
import './shop.styles.scss';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoryMap = async () => {
        const categoriesArray = await getCategoriesAndDocuments();
        console.log(categoriesArray)
        dispatch(setCategoriesMap(categoriesArray));
    }

    getCategoryMap();
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>} />
      <Route path=":category" element={<Category/>} />
    </Routes>
  );
};

export default Shop;