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
          id: 'pants',
          title: <FormattedMessage id="Pants" />,
          type: 'item',
          url: '/categories/womenPants'
        },
        {
          id: 'shorts',
          title: <FormattedMessage id="Shorts" />,
          type: 'item',
          url: '/categories/womenShorts'
        },
        {
          id: 'sweatpants',
          title: <FormattedMessage id="Sweatpants" />,
          type: 'item',
          url: '/categories/womenSweatpants'
        },
        {
          id: 'jeans',
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
          id: 'shoes',
          title: <FormattedMessage id="Shoes" />,
          type: 'item',
          url: '/categories/womenShoes'
        },
        {
          id: 'socks',
          title: <FormattedMessage id="Socks" />,
          type: 'item',
          url: '/categories/womenSocks'
        },
        {
          id: 'hats',
          title: <FormattedMessage id="Hats" />,
          type: 'item',
          url: '/categories/womenHats'
        },
      ]},
  ]
};

export default Women;
