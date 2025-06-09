// src/components/SliderComponent.jsx
import React from 'react';
import Slider from 'react-slick';
import './Slider.css';

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
};

// Slide data
const slides = [
  {
    image: 'https://st5.depositphotos.com/1258191/62650/i/450/depositphotos_626500202-stock-photo-hand-holding-shopping-cart-icon.jpg',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpfKQDlcZLJyFN6l9kEN1mmN-D_9drEViOqAidQiCbxWlfD7PRXPv1qRw1dabH6m2PrPk&usqp=CAU',
  },
  {
    image: 'https://www.shutterstock.com/image-photo/woman-pushing-shopping-cart-full-260nw-2139606297.jpg',
  },
  {
    image: 'https://www.shutterstock.com/image-photo/banner-different-groceries-food-donations-260nw-1852537183.jpg',
  },
  {
    image: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/61775218f4487fe8.jpg?q=20',
  },
  {
    image: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/9e9aa250dfecdbc3.jpg?q=20',
  },
];

function SliderComponent() {
  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide-item">
            <img src={slide.image} alt={`Slide ${index + 1}`} className="slide-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderComponent;
