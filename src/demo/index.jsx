import React from 'react';
import ReactDOM from 'react-dom';
import { ComponentPagination } from '../react-components';

ReactDOM.render(
  <div>
    <hr />
    <ComponentPagination
      paging={{ page: 2, limit: 10, pages: 3, total: 25}}
      handleTogglePage={() => {}}
    />
    <hr />
  </div>,


document.getElementById('main-container')
);
