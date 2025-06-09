import React from 'react';
import Header from './AllCategoryPage/Header';
import Navbar from './AllCategoryPage/Navbar';
import Slider from './AllCategoryPage/SliderComponent';
import ProductCardList from './AllCategoryPage/ProductCardList';
import CategoryProductSlider from './AllCategoryPage/CategoryProductSlider'
function AllCategoryItems() {
  return (
    <div>
      <Header/>
      <Navbar/>
      <Slider/>
      <ProductCardList/>
      <CategoryProductSlider/>
    </div>
  );
}
export default AllCategoryItems;
