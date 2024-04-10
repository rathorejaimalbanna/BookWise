import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './CarouselImages';

// ControlledCarousel component renders a controlled carousel
function ControlledCarousel() {
  // State to track the index of the active carousel item
  const [index, setIndex] = useState(0);

  // Function to handle the selection of a carousel item
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {/* Render carousel items */}
      <Carousel.Item >
        {/* Render ExampleCarouselImage with specified image URL */}
        <ExampleCarouselImage text="https://www.bookswagon.com/bannerimages/79_inr.jpg?v=2.5" />
        <Carousel.Caption>
          {/* Optional caption */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        {/* Render ExampleCarouselImage with specified image URL */}
        <ExampleCarouselImage  text="https://www.bookswagon.com/bannerimages/80_inr.jpg?v=4.3" />
        <Carousel.Caption>
          {/* Optional caption */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        {/* Render ExampleCarouselImage with specified image URL */}
        <ExampleCarouselImage  text="https://www.bookswagon.com/bannerimages/84_inr.jpg?v=3.8https://www.bookswagon.com/bannerimages/85_inr.jpg?v=5.0" />
        <Carousel.Caption>
          {/* Optional caption */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
