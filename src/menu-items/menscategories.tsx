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

const Men: NavItemType = {
  id: 'Men',
  title: <FormattedMessage id="Men" />,
  icon: icons.IconApps,
  type: 'group',
  children: [
    {
      id: 'tops',
      title: <FormattedMessage id="Tops" />,
      type: 'collapse',
      icon: icons.IconBasket,
      children: [
        {
          id: 'shirt',
          title: <FormattedMessage id="Shirt" />,
          type: 'item',
          url: '/categories/menstops'
        },
        {
          id: 'hoodies',
          title: <FormattedMessage id="Hoodies" />,
          type: 'item',
          url: '/categories/menstops',
          breadcrumbs: false
        },
        {
          id: 'long-sleeve',
          title: <FormattedMessage id="Long-sleeve" />,
          type: 'item',
          url: '/categories/menstops'
        }
      ]
    },
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
          url: '/categories/mensPants'
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
};

export default Men;
