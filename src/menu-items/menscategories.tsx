// third-party
import { FormattedMessage } from "react-intl";

// types
import { NavItemType } from "types";
// import BoyIcon from "@mui/icons-material/Boy";
import BoyIcon from '../../public/assets/images/e-commerce/001-man.png'
import Babyboy from '../../public/assets/images/e-commerce/babyboy.png'

// import Pants from '../../public/assets/images/e-commerce/005-pants.png'

// import Sneakers from '../../public/assets/images/e-commerce/003-sneakers.png'

// import Shirt from '../../public/assets/images/e-commerce/004-shirt.png'
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
//   IconNfc,
// } from "@tabler/icons-react";
import Image from "next/image";

// constant
// const icons = {
//   IconApps,
//   IconUserCheck,
//   IconBasket,
//   IconMessages,
//   BoyIcon,
//   IconFileInvoice,
//   IconLayoutKanban,
//   IconMail,
//   IconCalendar,
//   IconNfc,
// };

// ==============================|| MENU ITEMS - APPLICATION ||============================== //

const Men: NavItemType = {
  id: "Men",
  title: <FormattedMessage id="Garcon" />,
  icon: (()=><Image src={BoyIcon} height={24} alt=''/>),
  type: "group",
  children: [
     
        {
          id: "0-2m",
          title: <FormattedMessage id="0 à 2 ans" />,
          icon: (()=><Image src={Babyboy} height={24} alt=''/>),
          type: "item",
          url: "/categories/EnsembleGarcon02",
        },
        {
          id: "2-4m",
          title: <FormattedMessage id="2 à 4 ans" />,
          icon: (()=><Image src={BoyIcon} height={24} alt=''/>),
          type: "item",
          url: "/categories/EnsembleGarcon24",
        }
      
     
    // ,
    // {
    //   id: "bottom",
    //   title: <FormattedMessage id="Bottom" />,
    //   type: "collapse",
    //   icon:  (()=><Image src={Pants} height={24} alt=''/>),
    //   children: [
    //     {
    //       id: "pants",
    //       title: <FormattedMessage id="Pants" />,
    //       type: "item",
    //       url: "/categories/mensPants",
    //     },
    //     {
    //       id: "Shorts",
    //       title: <FormattedMessage id="Shorts" />,
    //       type: "item",
    //       url: "/categories/mensShorts",
    //     },
    //     {
    //       id: "sweatpants",
    //       title: <FormattedMessage id="Sweatpants" />,
    //       type: "item",
    //       url: "/categories/mensSweatpants",
    //     },
    //     {
    //       id: "jeans",
    //       title: <FormattedMessage id="Jeans" />,
    //       type: "item",
    //       url: "/categories/mensJeans",
    //     },
    //   ],
    // },
    // {
    //   id: "accessories",
    //   title: <FormattedMessage id="Accessories" />,
    //   type: "collapse",
    //   icon:  (()=><Image src={Sneakers} height={24} alt=''/>),
    //   children: [
    //     {
    //       id: "shoes",
    //       title: <FormattedMessage id="Shoes" />,
    //       type: "item",
    //       url: "/categories/mensShoes",
    //     },
    //     {
    //       id: "socks",
    //       title: <FormattedMessage id="Socks" />,
    //       type: "item",
    //       url: "/categories/mensSocks",
    //     },
    //     {
    //       id: "hats",
    //       title: <FormattedMessage id="Hats" />,
    //       type: "item",
    //       url: "/categories/mensHats",
    //     },
    //   ],
    // },
  ],
};

export default Men;
