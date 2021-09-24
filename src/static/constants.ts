// MAIN DEFAULTS !!
import {
  location,
  calendar,
  informationCircle,
  people,
} from 'ionicons/icons';

// The default language for the app
export const DefaultLanguage = 'en';

// Cors seted: none!!
export const corsSetted = false;

// App main user data!!
export const appSuperUser = 'system-app-user@maindomain.xyz';
export const appSuperPass = 'Qwer1234';

// The origin of backoffice stuff for the app
export const MyIP = 'localhost';

// MAIN DEFAULTS !!

export const RestAPI = 'http://' + MyIP + ':1337';
export const RestStorage = RestAPI;
export const PHOTO_STORAGE = RestAPI + '/uploads';

export const pagesOrigin = RestAPI + '/forms?slug=';
export const formsOrigin = RestAPI + '/forms?slug=';
export const fieldsOrigin = RestAPI + '/fields?slug=';
export const menusOrigin = RestAPI + '/menus?slug=';

// OVERRIDE FROM THE CMS!!!! TODO TODO TODO TODO

export const HOME = '/tabs/home';
export const TUTORIAL = '/tutorial';
export const LOGIN = '/login';

export const APP_ROUTES = [
  { path: '/', component: 'HomeOrWelcome' },
  { path: '/account', component: 'Account' },
  { path: '/tutorial', component: 'Tutorial' },
];

export const TABS = [
  {
    element: 'schedule',
    label: 'Schedule',
    icon: calendar,
    path: '/tabs/home',
    endpoints: [
      {
        component: 'Home',
        path: '',
        exact: true,
        main: true,
      },
      {
        component: 'SessionDetail',
        path: '/:id',
        exact: false,
        main: true,
      },
    ],
  },
  {
    element: 'speakers',
    label: 'Speakers',
    icon: people,
    path: '/tabs/speakers',
    endpoints: [
      {
        component: 'SpeakerList',
        path: '',
        exact: true,
        main: true,
      },
      {
        component: 'SpeakerDetail',
        path: '/:id',
        exact: true,
        main: false,
      },
      {
        component: 'SessionDetail',
        path: '/sessions/:id',
        exact: false,
        main: false,
      },
    ],
  },
  {
    element: 'map',
    label: 'Map',
    icon: location,
    path: '/tabs/map',
    component: 'MapView',
    exact: true,
  },
  {
    element: 'about',
    label: 'About',
    icon: informationCircle,
    path: '/tabs/about',
    component: 'About',
    exact: true,
  },
];
