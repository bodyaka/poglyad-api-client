import React, { Component } from 'react';
import './jquery-loader';
import 'fotorama/fotorama';

if (process.env.BROWSER) {
  require('./VideoGallery.scss');
}

class ComponentMediaGallery extends Component {

  constructor(props) {
    super(props);

    this.galleryContainerRef = React.createRef();
  }

  componentDidMount() {
    $(this.galleryContainerRef.current).fotorama({
      width: '100%',
      maxheight: 500,
      arrows: 'always',
      loop: true,
      nav: 'thumbs',
      thumbmargin: 15,
      thumbheight: 75,
      thumbwidth: 100,
      thumbfit: 'scaledown',
      thumbborderwidth: 3,
    });
  }

  componentWillUnmount() {

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

export default ComponentMediaGallery;
