// menu import
// import dashboard from './dashboard';
import Men from './menscategories';
import application from './menscategories';
// import forms from './forms';
// import elements from './elements';
import samplePage from './sample-page';
// import pages from './pages';
// import utilities from './utilities';
// import support from './support';
// import other from './other';

// types
import { NavItemType } from 'types';
import Women from './womenscategories';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [Men, Women]
};
// items: [dashboard, application, forms, elements, samplePage, pages, utilities, support, other]

export default menuItems;
