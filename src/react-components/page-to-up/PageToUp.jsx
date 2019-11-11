import React, { Component } from 'react';
import debounce from 'lodash/debounce';

if (process.env.BROWSER) {
  require('../common/jquery-loader.js');
  require('./PageToUp.scss');
}

class ComponentPageToUp extends Component {

  componentRef = React.createRef();

  state = { visible: false };

  componentDidMount() {
    const $nodeComponent = $(this.componentRef.current);

    window.addEventListener('scroll', this.onWindowScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onWindowScroll.bind(this));
  }

  render() {
    let className = 'page-to-up ';

    if (this.state.visible) {
      className += 'fade-in';
    } else {
      className += 'fade-out';
    }

    return (
      <a
        href="#"
        className={className}
        ref={this.componentRef}
        onClick={this.onClick.bind(this)}
      >
        <div className="page-to-up-image"></div>

        {this.props.buttonLabel || 'Вгору'}
      </a>
    );
  }

  onWindowScroll = debounce(e => {
    const visible = window.pageYOffset > (this.props.showAfter || 200);

    this.setState({ visible: visible });
  }, 50);

  onClick(e) {
    e.preventDefault();

    $('body, html').animate({ scrollTop: 0 }, 300);
  }
}

export default ComponentPageToUp;
