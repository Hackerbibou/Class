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
          id: 'shirts',
          title: <FormattedMessage id="Shirts" />,
          type: 'item',
          url: '/categories/mensShirts'
        },
        {
          id: 'hoodies',
          title: <FormattedMessage id="Hoodies" />,
          type: 'item',
          url: '/categories/mensHoodies',
        },
        {
          id: 'long-sleeve',
          title: <FormattedMessage id="Long-sleeve" />,
          type: 'item',
          url: '/categories/mensLongsleeves'
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
          url: '/categories/mensPants'
        },
        {
          id: 'Shorts',
          title: <FormattedMessage id="Shorts" />,
          type: 'item',
          url: '/categories/mensShorts'
        },
        {
          id: 'Sweatpants',
          title: <FormattedMessage id="Sweatpants" />,
          type: 'item',
          url: '/categories/mensSweatpants'
        },
        {
          id: 'Jeans',
          title: <FormattedMessage id="Jeans" />,
          type: 'item',
          url: '/categories/mensJeans'
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
          url: '/categories/mensShoes'
        },
        {
          id: 'Socks',
          title: <FormattedMessage id="Socks" />,
          type: 'item',
          url: '/categories/mensSocks'
        },
        {
          id: 'Hats',
          title: <FormattedMessage id="Hats" />,
          type: 'item',
          url: '/categories/mensHats'
        },
      ]},
  ]
};

export default Men;
