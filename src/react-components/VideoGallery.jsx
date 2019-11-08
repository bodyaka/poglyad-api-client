import React, { Component } from 'react';

if (process.env.BROWSER) {
  require('../common/jquery-loader.js');
  require('fotorama/fotorama.js');
  require('./VideoGallery.scss');
}

class ComponentVideoGallery extends Component {

  galleryContainerRef = React.createRef();

  fotoramaInstance = null;

  componentDidMount() {
    const $nodeGallery = $(this.galleryContainerRef.current);

    $nodeGallery.fotorama({
      width: '100%',
      maxheight: 500,
      arrows: 'always',
      loop: true,
      nav: 'thumbs',
      thumbmargin: 15,
      thumbheight: 90,
      thumbwidth: 120,
      thumbfit: 'scaledown',
      thumbborderwidth: 3,
    });

    this.fotoramaInstance = $nodeGallery.data('fotorama');
  }

  componentWillUnmount() {
    if (this.fotoramaInstance) {
      this.fotoramaInstance.destroy();
    }

    this.fotoramaInstance = null;
  }

  render() {
    const videos = [];

    this.props.items.forEach(item => {
      videos.push(
        <a key={item.id} href={'http://www.youtube.com/embed/' + item.videoId}></a>
      );
    });

    return (
      <div className="video-gallery" ref={this.galleryContainerRef}>
        {videos}
      </div>
    );
  }
}

export default ComponentVideoGallery;
