import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Slider.css"; // Import the CSS file

export default function Slider() {
  const imageArray = [
    "https://t4.ftcdn.net/jpg/04/71/35/53/360_F_471355337_eOdxJI5xYFtrU1Y6MoFDfWtN5gY9AeHv.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-shading-background-abstract-colorful-background-colorful-art-image_22644.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20230521/pngtree-artwave-of-colorful-waves-wallpaper-4k-image_2667726.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideshowInterval, setSlideshowInterval] = useState(null);

  const prevImage = () => {
    setCurrentIndex((index) =>
      index === 0 ? imageArray.length - 1 : index - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((index) =>
      index === imageArray.length - 1 ? 0 : index + 1
    );
  };

  const slideShow = () => {
    if (!slideshowInterval) {
      const interval = setInterval(() => {
        nextImage();
      }, 2000);
      setSlideshowInterval(interval);
    }
  };

  const stop = () => {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      setSlideshowInterval(null);
    }
  };

  useEffect(() => {
    return () => {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
      }
    };
  }, [slideshowInterval]);

  return (
    <div className="container mt-5 ">
      <div className="image-container text-center">
        <div>
          <img
            src={imageArray[currentIndex]}
            alt="slider"
            className="img-fluid rounded"
          />
        </div>
        <div className="mt-3 d-flex justify-content-between ">
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={prevImage}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={nextImage}
          >
            Next
          </button>
          <button
            type="button"
            className="btn btn-success mr-2"
            onClick={slideShow}
          >
            Start Slideshow
          </button>
          <button type="button" className="btn btn-danger" onClick={stop}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
