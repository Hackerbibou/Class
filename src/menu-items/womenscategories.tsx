// third-party
import { FormattedMessage } from 'react-intl';

// types
import { NavItemType } from 'types';

// assets
import {
  IconApps,
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconFileInvoice,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc
} from '@tabler/icons-react';

// constant
const icons = {
  IconApps,
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconFileInvoice,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc
};

// ==============================|| MENU ITEMS - APPLICATION ||============================== //

const Women: NavItemType = {
  id: 'Women',
  title: <FormattedMessage id="Women" />,
  icon: icons.IconApps,
  type: 'group',
  children: [
    {
      id: 'Tops',
      title: <FormattedMessage id="Tops" />,
      type: 'collapse',
      icon: icons.IconBasket,
      children: [
        {
          id: 'Shirt',
          title: <FormattedMessage id="Shirt" />,
          type: 'item',
          url: '/apps/e-commerce/product-details/1',
          breadcrumbs: false
        },
        {
          id: 'Hoodies',
          title: <FormattedMessage id="Hoodies" />,
          type: 'item',
          url: '/apps/e-commerce/product-list'
        },
        {
          id: 'long-sleeve',
          title: <FormattedMessage id="Long-sleeve" />,
          type: 'item',
          url: '/apps/e-commerce/checkout'
        }
      ]},
      {
        id: 'bottom',
        title: <FormattedMessage id="Bottom" />,
        type: 'collapse',
        icon: icons.IconBasket,
        children: [
          {
            id: 'Pants',
            title: <FormattedMessage id="Pants" />,
            type: 'item',
            url: '/categories/menstops'
          },
          {
            id: 'Shorts',
            title: <FormattedMessage id="Shorts" />,
            type: 'item',
            url: '/categories/menstops'
          },
          {
            id: 'Sweatpants',
            title: <FormattedMessage id="Sweatpants" />,
            type: 'item',
            url: '/categories/menstops'
          },
          {
            id: 'Jeans',
            title: <FormattedMessage id="Jeans" />,
            type: 'item',
            url: '/categories/menstops'
          },
        ]},
        {
          id: 'accessories',
          title: <FormattedMessage id="Accessories" />,
          type: 'collapse',
          icon: icons.IconBasket,
          children: [
            {
              id: 'Shoes',
              title: <FormattedMessage id="Shoes" />,
              type: 'item',
              url: '/categories/menstops'
            },
            {
              id: 'Socks',
              title: <FormattedMessage id="Socks" />,
              type: 'item',
              url: '/categories/menstops'
            },
            {
              id: 'Hats',
              title: <FormattedMessage id="Hats" />,
              type: 'item',
              url: '/categories/menstops'
            },
          ]},
    ]
    }

export default Women;
