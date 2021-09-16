
// MAIN DEFAULTS !!
import {
    logIn,
    logOut,
    person,
    personAdd,
    calendarOutline,
    peopleOutline,
    mapOutline,
    informationCircleOutline,
    location,
    calendar,
    informationCircle,
    people,
    help
} from 'ionicons/icons'

    // The default language for the app
    export const DefaultLanguage = 'en'

    // Cors seted: none!!
    export const corsSetted = false

    // App main user data!!
    export const appSuperUser = 'system-app-user@maindomain.xyz'
    export const appSuperPass = 'Qwer1234'

    // The origin of backoffice stuff for the app
    export const MyIP = 'localhost'

// MAIN DEFAULTS !!

export const RestAPI = 'http://'+MyIP+':1337'
export const RestStorage = RestAPI
export const PHOTO_STORAGE = RestAPI + '/uploads'

export const pagesOrigin = RestAPI+'/forms?slug='
export const formsOrigin = RestAPI+'/forms?slug='
export const fieldsOrigin = RestAPI+'/fields?slug='


// OVERRIDE FROM THE CMS!!!! TODO TODO TODO TODO

export const HOME = '/tabs/schedule'
export const TUTORIAL = '/tutorial'


export const LEFT_MENU_ROUTES = [
  {
    title: 'Main Menu',
    features: [
      {
        element: 'schedule',
        title: 'Schedule',
        path: HOME,
        icon: calendarOutline,
        roles:[
          { name:'Public' , allowed: true},
          { name: 'Authenticated', allowed: true}
        ]
      },
      {
        element: 'speakers',
        title: 'Speakers',
        path: '/tabs/speakers',
        icon: peopleOutline,
        roles:[
          { name:'Public' , allowed: true},
          { name: 'Authenticated', allowed: true}
        ]
      },
      { 
        element: 'map',
        title: 'Map',
        path: '/tabs/map',
        icon: mapOutline,
        roles:[
          { name:'Public' , allowed: true},
          { name: 'Authenticated', allowed: true}
        ]
      },
      { 
        element: 'about',
        title: 'About',
        path: '/tabs/about',
        icon: informationCircleOutline,
        roles:[
          { name:'Public' , allowed: true},
          { name: 'Authenticated', allowed: true}
        ]
      },
      {   
        element: 'support',
        title: 'Support',
        path: '/form/support',
        icon: help,
        roles:[
          { name:'Public' , allowed: true},
          { name: 'Authenticated', allowed: true}
        ]
      },
    ],
  },
  {
    label: 'User Menu',
    features: [
      { 
        element: 'logout',
        label: 'Logout', 
        path: '/logout', 
        icon: logOut,
        roles:[
          { name:'Public' , allowed: false},
          { name: 'Authenticated', allowed: true}
        ]
      },
      { 
        element: 'account',
        label: 'Account', 
        path: '/account', 
        icon: person,
        roles:[
          { name:'Public' , allowed: true},
          { name: 'Authenticated', allowed: true}
        ]
      },
      { 
        element: 'login',
        label: 'Login', 
        path: '/form/login', 
        icon: logIn,
        roles:[
          {name:'Public' , allowed: true},
          {name: 'Authenticated', allowed: false}
        ]
      },
      { 
        element: 'signup',
        label: 'Signup', 
        path: '/form/signup', 
        icon: personAdd,
        roles:[
          {name:'Public' , allowed: true},
          {name: 'Authenticated', allowed: false}
        ]
      }
    ]
  }
]

export const APP_ROUTES = [
  { path:'/',         component: 'HomeOrTutorial' },
  { path:'/account',  component: 'Account' },
  { path:'/tutorial', component: 'Tutorial' },
  { path:'/form/:slug', component: 'FormPage' },
]

export const TABS = [{
  element: 'schedule',
  label: 'Schedule',
  icon: calendar,
  path: '/tabs/schedule',
  endpoints:[{
    component:  'SchedulePage',
    path: '',
    exact: true,
    main: true,
  },{
    component:  'SessionDetail',
    path: '/:id',
    exact: false,
    main: true,
  }],
},
{
  element: 'speakers',
  label: 'Speakers',
  icon: people,
  path: '/tabs/speakers',
  endpoints:[{
    component: 'SpeakerList',
    path: '',
    exact: true,
    main: true,
  },{
    component: 'SpeakerDetail',
    path: '/:id',
    exact: true,
    main: false,
  },{
    component: 'SessionDetail',
    path: '/sessions/:id',
    exact: false,
    main: false,
  }],
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
}]