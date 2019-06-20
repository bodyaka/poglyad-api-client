import React, { Component } from 'react';

if (process.env.BROWSER) {
  require('./Pagination.scs');
}

class ComponentPagination extends Component {
  getLink(page, title) {
    let key = String(page + title);
    let className = 'page';
    if (this.props.paging.page === page) {
      className += ' active';
    }

    return (
      <a
        key={key}
        onClick={this.props.handleTogglePage.bind(null, page)}
        href="javascript:void(0)"
        className={className}>
        {title}
      </a>
    );
  }

  render() {
    let pages = [];
    let paging = this.props.paging;

    if (paging.page > 1) {
      pages.push(this.getLink(paging.page - 1, '<'));
    }

    for (let i = 1; i <= paging.pages; i++) {
      pages.push(this.getLink(i, i));
    }

    if (paging.page < paging.pages) {
      pages.push(this.getLink(paging.page + 1, '>'));
    }

    return <div className="pagination">
      {pages}
    </div>;
  }
}

export default ComponentPagination;
