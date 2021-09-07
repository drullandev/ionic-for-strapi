
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
    help,
    keySharp,
    home,
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

export const formsOrigin = RestAPI+'/forms?slug='


// OVERRIDE FROM THE CMS!!!! TODO TODO TODO TODO

export const HOME = '/tabs/schedule'
export const TUTORIAL = '/tutorial'


export const APP_ROUTES = [
  {
    title: 'Main Menu',
    features: [
      {
          title: 'Schedule',
          path: HOME,
          icon: calendarOutline,
          roles:[
            {name:'Public' , allowed: true},
            {name: 'Authenticated', allowed: true}
          ]
      },
      {
          title: 'Speakers',
          path: '/tabs/speakers',
          icon: peopleOutline,
          roles:[
            {name:'Public' , allowed: true},
            {name: 'Authenticated', allowed: true}
          ]
      },
      { 
          title: 'Map',
          path: '/tabs/map',
          icon: mapOutline,
          roles:[
            {name:'Public' , allowed: true},
            {name: 'Authenticated', allowed: true}
          ]
      },
      { 
          title: 'About',
          path: '/tabs/about',
          icon: informationCircleOutline,
          roles:[
            {name:'Public' , allowed: true},
            {name: 'Authenticated', allowed: true}
          ]
      },
      {   
          title: 'Support',
          path: '/form/support',
          icon: help,
          roles:[
            {name:'Public' , allowed: true},
            {name: 'Authenticated', allowed: true}
          ]
      },
    ],
  },
  {
    title: 'User Menu',
    features: [
      { 
          title: 'Logout', 
          path: '/logout', 
          icon: logOut,
          roles:[
            {name:'Public' , allowed: false},
            {name: 'Authenticated', allowed: true}
          ]
      },
      { 
          title: 'Account', 
          path: '/account', 
          icon: person,
          roles:[
            {name:'Public' , allowed: true},
            {name: 'Authenticated', allowed: true}
          ]
      },
      { 
          title: 'Login', 
          path: '/form/login', 
          icon: logIn,
          roles:[
            {name:'Public' , allowed: true},
            {name: 'Authenticated', allowed: false}
          ]
      },
      { 
          title: 'Signup', 
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


export const TABS =
  [{
      tab: 'schedule',
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
      tab: 'speakers',
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
      tab: 'map',
      label: 'Map',
      icon: location,
      path: '/tabs/map', 
      component: 'MapView',
      exact: true,
    },
    {
      tab: 'about',
      label: 'About',
      icon: informationCircle,
      path: '/tabs/about', 
      component: 'About',
      exact: true,
  }]