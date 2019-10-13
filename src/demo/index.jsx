import React from 'react';
import ReactDOM from 'react-dom';
import { ComponentPagination, ComponentMediaGallery } from '../react-components';

const images = [
  {
    id: 1,
    pathPreview: 'http://res.cloudinary.com/dsorlhdrr/image/upload/t_preview_g5h0kv/pw1wjrwnnzqccgv9izbo.jpg',
    pathThumb: 'http://res.cloudinary.com/dsorlhdrr/image/upload/t_thumb/pw1wjrwnnzqccgv9izbo.jpg',
  },
  {
    id: 2,
    pathPreview: 'http://res.cloudinary.com/dsorlhdrr/image/upload/t_preview_9dg6kd/goijkftksl57bh80epmu.jpg',
    pathThumb: 'http://res.cloudinary.com/dsorlhdrr/image/upload/t_thumb/goijkftksl57bh80epmu.jpg',
  },
  {
    id: 3,
    pathPreview: 'http://res.cloudinary.com/dsorlhdrr/image/upload/t_preview_g5h0kv/vzvnzwnythappo189esi.png',
    pathThumb: 'http://res.cloudinary.com/dsorlhdrr/image/upload/t_thumb/vzvnzwnythappo189esi.png',
  },
  {
    id: 4,
    pathPreview: 'http://res.cloudinary.com/dsorlhdrr/image/upload/t_preview_g5h0kv/u5yvtixcyi5jmyipdzmn.png',
    pathThumb: 'http://res.cloudinary.com/dsorlhdrr/image/upload/t_thumb/u5yvtixcyi5jmyipdzmn.png',
  },
  {
    id: 5,
    pathPreview: 'http://res.cloudinary.com/dsorlhdrr/image/upload/t_preview_g5h0kv/ocs7mthtt5wyhdtcgvgi.png',
    pathThumb: 'http://res.cloudinary.com/dsorlhdrr/image/upload/t_thumb/ocs7mthtt5wyhdtcgvgi.png',
  },
];

ReactDOM.render(
  <div>
    <hr />
    <ComponentPagination
      paging={{ page: 2, limit: 10, pages: 3, total: 25}}
      handleTogglePage={() => {}}
    />
    <hr />
    <ComponentMediaGallery items={images}/>
    <hr />
  </div>,


document.getElementById('main-container')
);
