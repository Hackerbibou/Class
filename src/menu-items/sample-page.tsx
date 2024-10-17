// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';
import {IconBasket} from '@tabler/icons-react';


// assets
import { IconBrandChrome } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const icons = {
  IconBrandChrome,
  IconBasket,
};
const samplePage: NavItemType = {
  id: 'e-commerce',
  title: <FormattedMessage id="e-commerce" />,
  type: 'collapse',
  icon: icons.IconBasket,
  children: [
    {
      id: 'products',
      title: <FormattedMessage id="products" />,
      type: 'item',
      url: '/apps/e-commerce/products'
    },
    {
      id: 'product-details',
      title: <FormattedMessage id="product-details" />,
      type: 'item',
      url: '/apps/e-commerce/product-details/1',
      breadcrumbs: false
    },
    {
      id: 'product-list',
      title: <FormattedMessage id="product-list" />,
      type: 'item',
      url: '/apps/e-commerce/product-list'
    },
    {
      id: 'checkout',
      title: <FormattedMessage id="checkout" />,
      type: 'item',
      url: '/apps/e-commerce/checkout'
    }
  ]

};

export default samplePage;
