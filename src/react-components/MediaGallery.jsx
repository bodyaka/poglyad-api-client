import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

if (process.env.BROWSER) {
  require('./MediaGallery.scss');
}

class ComponentMediaGallery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showVideo: {},
    };
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });
  }

  _renderVideo(item) {
    return (
      <div className='image-gallery-image'>
        {
          this.state.showVideo[item.embedUrl] ?
            <div className='video-wrapper'>
              <a
                className='close-video'
                onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
              >
              </a>
              <iframe
                width='560'
                height='315'
                src={item.embedUrl}
                frameBorder='0'
                allowFullScreen
              >
              </iframe>
            </div>
            :
            <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='play-button'></div>
              <img src={item.original}/>
              {
                item.description &&
                <span
                  className='image-gallery-description'
                  style={{right: '0', left: 'initial'}}
                >
                    {item.description}
                  </span>
              }
            </a>
        }
      </div>
    );
  }

  render() {
    const images = [];

    this.props.items.forEach(item => {
      images.push({
        original: item.pathPreview,
        thumbnail: item.pathThumb,
        // originalClass: 'media-gallery-preview',
        // thumbnailClass: 'media-gallery-thumb',
        // bulletClass: 'media-gallery-arrow',
      });
    });

    return (
      <div className="media-gallery">
        <ImageGallery
          items={images}
          lazyLoad={true}
        />
      </div>
    );
  }
}

export default ComponentMediaGallery;
