// third-party
import { FormattedMessage } from 'react-intl';

// types
import { NavItemType } from 'types';

// assets
import {
  IconClipboardCheck,
  IconPictureInPicture,
  IconForms,
  IconBorderAll,
  IconChartDots,
  IconStairsUp,
  IconMapPin,
  IconTable
} from '@tabler/icons-react';

// constant
const icons = {
  IconClipboardCheck,
  IconPictureInPicture,
  IconForms,
  IconBorderAll,
  IconChartDots,
  IconStairsUp,
  IconMapPin,
  IconTable
};

// ==============================|| UI FORMS MENU ITEMS ||============================== //

const forms: NavItemType = {
  id: 'mon-compte',
  title: <FormattedMessage id="mon compte" />,
  icon: icons.IconPictureInPicture,
  type: 'group',
  children: [
    {
      id: 'profile',
      title: <FormattedMessage id="profile" />,
      type: 'item',
      icon: icons.IconPictureInPicture,
      url: '/profile',
    },
    {
      id: 'Commandes',
      title: <FormattedMessage id="Commandes" />,
      type: 'item',
      icon: icons.IconPictureInPicture,
      url: '/pastorders',
    },
    {
      id: 'Panier',
      title: <FormattedMessage id="Panier" />,
      type: 'item',
      icon: icons.IconPictureInPicture,
      url: '/checkout',
    },
    
  ]
};

export default forms;
