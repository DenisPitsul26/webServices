/** Example file/folder data. */
export const files = [
  {
    name: 'electronics',
    type: 'folder',
    children: [
      {
        name: 'computers',
        type: 'folder',
        children: [
          {
            name: 'laptops',
            type: 'folder',
            children: [
              { name: 'acer', type: 'cart-plus' },
              { name: 'dell', type: 'cart-plus' },
            ]
          },
          {
            name: 'PC',
            type: 'folder',
            children: [
              { name: 'acer', type: 'cart-plus' },
              { name: 'dell', type: 'cart-plus' },
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'closes',
    type: 'folder',
    children: [
      {
        name: 'coats',
        type: 'cart-plus',
      },
      { name: 'suits', type: 'cart-plus' },
      { name: 'shoes', type: 'cart-plus' }
    ]
  }
];
