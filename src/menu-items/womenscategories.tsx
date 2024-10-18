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

// ==============================|| womenU ITEMS - APPLICATION ||============================== //

const Women: NavItemType = {
  id: 'women',
  title: <FormattedMessage id="women" />,
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
          url: '/categories/womensShirt'
        },
        {
          id: 'hoodies',
          title: <FormattedMessage id="Hoodies" />,
          type: 'item',
          url: '/categories/womensHoodies',
          breadcrumbs: false
        },
        {
          id: 'long-sleeve',
          title: <FormattedMessage id="Long-sleeve" />,
          type: 'item',
          url: '/categories/womensLongsleeve'
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
          url: '/categories/womensPants'
        },
        {
          id: 'Shorts',
          title: <FormattedMessage id="Shorts" />,
          type: 'item',
          url: '/categories/womensShorts'
        },
        {
          id: 'Sweatpants',
          title: <FormattedMessage id="Sweatpants" />,
          type: 'item',
          url: '/categories/womensSweatpants'
        },
        {
          id: 'Jeans',
          title: <FormattedMessage id="Jeans" />,
          type: 'item',
          url: '/categories/womensJeans'
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
          url: '/categories/womensShoes'
        },
        {
          id: 'Socks',
          title: <FormattedMessage id="Socks" />,
          type: 'item',
          url: '/categories/womensSocks'
        },
        {
          id: 'Hats',
          title: <FormattedMessage id="Hats" />,
          type: 'item',
          url: '/categories/womensHats'
        },
      ]},
  ]
};

export default Women;
