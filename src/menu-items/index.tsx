// menu import
// import dashboard from './dashboard';
'use client'
import Men from './menscategories';
// import application from './menscategories';
// import forms from './forms';
// import elements from './elements';
// import pages from './pages';
// import utilities from './utilities';
// import support from './support';
// import other from './other';
// import Profile from './profile';
// import Other from './other'
// types
import { NavItemType } from 'types';
import Women from './womenscategories';
// import util from 'api/clientuser'
// import { useEffect } from 'react';

// ==============================|| MENU ITEMS ||============================== //
let menuItems: { items: NavItemType[] } ={
    items: [Men, Women]

};





// items: [dashboard, application, forms, elements, samplePage, pages, utilities, support, other]

export default menuItems;
