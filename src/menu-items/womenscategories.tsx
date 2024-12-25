// third-party
import { FormattedMessage } from 'react-intl';

// types
import { NavItemType } from 'types';
// import Dress from '../../public/assets/images/e-commerce/006-woman-clothes.png'
// import Pant from '../../public/assets/images/e-commerce/007-flare-pants.png'
import Woman from '../../public/assets/images/e-commerce/008-summer-clothing.png'
// import Shoes from '../../public/assets/images/e-commerce/002-shoes.png'
import Babygirl from '../../public/assets/images/e-commerce/babygirl.png'
// assets
// import {
//   IconApps,
//   IconUserCheck,
//   IconBasket,
//   IconMessages,
//   IconFileInvoice,
//   IconLayoutKanban,
//   IconMail,
//   IconCalendar,
//   IconNfc
// } from '@tabler/icons-react';
import Image from 'next/image';

// constant
// const icons = {
//   IconApps,
//   IconUserCheck,
//   IconBasket,
//   IconMessages,
//   IconFileInvoice,
//   IconLayoutKanban,
//   IconMail,
//   IconCalendar,
//   IconNfc
// };

// ==============================|| womenU ITEMS - APPLICATION ||============================== //

const Women: NavItemType = {
  id: 'women',
  title: <FormattedMessage id="Fille" />,
  icon: (()=><Image src={Woman} height={24} alt=''/>),
  type: 'group',
  children: [
        {
          id: '0-2f',
          title: <FormattedMessage id="0 à 2 ans" />,
          icon: (()=><Image src={Babygirl} height={24} alt=''/>),
          type: 'item',
          url: '/categories/EnsembleFille02'
        },
        {
          id: '2-4f',
          title: <FormattedMessage id="2 à 4 ans" />,
          icon: (()=><Image src={Woman} height={24} alt=''/>),
          type: 'item',
          url: '/categories/EnsembleFille24',
          breadcrumbs: false
        }
 
    // {
    //   id: 'bottom',
    //   title: <FormattedMessage id="Bottom" />,
    //   type: 'collapse',
    //   icon:  (()=><Image src={Pant} height={24} alt=''/>),
    //   children: [
    //     {
    //       id: 'pants',
    //       title: <FormattedMessage id="Pants" />,
    //       type: 'item',
    //       url: '/categories/womenPants'
    //     },
    //     {
    //       id: 'shorts',
    //       title: <FormattedMessage id="Shorts" />,
    //       type: 'item',
    //       url: '/categories/womenShorts'
    //     },
    //     {
    //       id: 'sweatpants',
    //       title: <FormattedMessage id="Sweatpants" />,
    //       type: 'item',
    //       url: '/categories/womenSweatpants'
    //     },
    //     {
    //       id: 'jeans',
    //       title: <FormattedMessage id="Jeans" />,
    //       type: 'item',
    //       url: '/categories/womenJeans'
    //     },
    //   ]},
    // {
    //   id: 'accessories',
    //   title: <FormattedMessage id="Accessories" />,
    //   type: 'collapse',
    //   icon:  (()=><Image src={Shoes} height={24} alt=''/>),
    //   children: [
    //     {
    //       id: 'shoes',
    //       title: <FormattedMessage id="Shoes" />,
    //       type: 'item',
    //       url: '/categories/womenShoes'
    //     },
    //     {
    //       id: 'socks',
    //       title: <FormattedMessage id="Socks" />,
    //       type: 'item',
    //       url: '/categories/womenSocks'
    //     },
    //     {
    //       id: 'hats',
    //       title: <FormattedMessage id="Hats" />,
    //       type: 'item',
    //       url: '/categories/womenHats'
    //     },
    //   ]},
  ]
};

export default Women;
