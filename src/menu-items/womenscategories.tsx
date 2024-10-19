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
          url: '/categories/womenShirts'
        },
        {
          id: 'hoodies',
          title: <FormattedMessage id="Hoodies" />,
          type: 'item',
          url: '/categories/womenHoodies',
          breadcrumbs: false
        },
        {
          id: 'long-sleeves',
          title: <FormattedMessage id="Long-sleeves" />,
          type: 'item',
          url: '/categories/womenLongsleeves'
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
          url: '/categories/womenPants'
        },
        {
          id: 'Shorts',
          title: <FormattedMessage id="Shorts" />,
          type: 'item',
          url: '/categories/womenShorts'
        },
        {
          id: 'Sweatpants',
          title: <FormattedMessage id="Sweatpants" />,
          type: 'item',
          url: '/categories/womenSweatpants'
        },
        {
          id: 'Jeans',
          title: <FormattedMessage id="Jeans" />,
          type: 'item',
          url: '/categories/womenJeans'
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
          url: '/categories/womenShoes'
        },
        {
          id: 'Socks',
          title: <FormattedMessage id="Socks" />,
          type: 'item',
          url: '/categories/womenSocks'
        },
        {
          id: 'Hats',
          title: <FormattedMessage id="Hats" />,
          type: 'item',
          url: '/categories/womenHats'
        },
      ]},
  ]
};

export default Women;
