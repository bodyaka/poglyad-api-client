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
      showVideo: this.state.showVideo,
    });
  }

  _renderVideo(item) {
    // console.log('_renderVideo', item);
    return (
      <div className='image-gallery-image'>
        {
          this.state.showVideo[item.videoId] ?
            <div className='video-wrapper'>
              <a
                className='close-video'
                onClick={this._toggleShowVideo.bind(this, item.videoId)}
              >
              </a>
              <iframe
                // width='560'
                // height='315'
                width='auto'
                height='auto'
                src={'http://www.youtube.com/embed/' + item.videoId + 'autoplay=1'}
                frameBorder='0'
                allowFullScreen
              >
              </iframe>
            </div>
            :
            <a onClick={this._toggleShowVideo.bind(this, item.videoId)}>
              <div className='play-button'>
                <button className="mdc-icon-button">
                  <i className="material-icons">play_arrow</i>
                </button>
              </div>
              <img src={'http://img.youtube.com/vi/' + item.videoId + '/sddefault.jpg'}/>
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
      const props = {
        // original: item.pathPreview,
        // thumbnail: item.pathThumb,
        // originalClass: 'media-gallery-preview',
        // thumbnailClass: 'media-gallery-thumb',
        // bulletClass: 'media-gallery-arrow',
      };

      if (item.videoId) {
        props.videoId = item.videoId;
        props.renderItem = this._renderVideo.bind(this);
      } else {
        props.original = item.pathPreview;
        props.thumbnail = item.pathThumb;
      }

      images.push(props);
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
