import React, { Component } from 'react';

if (process.env.BROWSER) {
  require('./common/jquery-loader.js');
  require('owl.carousel');
  require('magnific-popup');

  require('owl.carousel/dist/assets/owl.carousel.css');
  require('magnific-popup/dist/magnific-popup.css');

  require('./ImageGallerySlider.scss');
}

class ComponentImageGallerySlider extends Component {

  galleryContainerRef = React.createRef();

  componentDidMount() {
    const $nodeGallery = $(this.galleryContainerRef.current);
    const owlOptions = {
      center: false,
      loop: true,
      nav: false,
      autoplay: true,
      autoplayTimeout: 3000,
      responsiveClass: true,
      responsive: {
        300: {
          items: 1,
        },

        993: {
          items: 4,
        },
      },
    };

    // override options
    if (this.props.autoplay === false) {
      owlOptions.autoplay = false;
    }

    // init carousel
    $nodeGallery.owlCarousel(owlOptions);

    // init popup
    $nodeGallery.magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'завантаження...',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        delegate: '.slides: not (.slick-cloned) a',
        preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
      },
    });
  }

  componentWillUnmount() {
    const $nodeGallery = $(this.galleryContainerRef.current);

    $nodeGallery.owlCarousel('destroy');
  }

  render() {
    const images = [];

    this.props.items.forEach((item, i) => {
      images.push(
        <div key={item.id} className="image-gallery-slide" data-position={i}>
          <a href={item.pathPreview}>
            <img src={item.pathThumb} alt="" />
          </a>
        </div>
      );
    });

    return (
      <div className="image-gallery-slider owl-carousel" ref={this.galleryContainerRef}>
        {images}
      </div>
    );
  }
}

export default ComponentImageGallerySlider;
