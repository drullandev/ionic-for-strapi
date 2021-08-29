
// MAIN DEFAULTS !!
import { logIn, logOut, person, personAdd, calendarOutline, peopleOutline, mapOutline, informationCircleOutline, help} from 'ionicons/icons'

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

export const APP_ROUTES = {
    appPages: [
        { title: 'Schedule', path: HOME, icon: calendarOutline },
        { title: 'Speakers', path: '/tabs/speakers', icon: peopleOutline },
        { title: 'Map', path: '/tabs/map', icon: mapOutline },
        { title: 'About', path: '/tabs/about', icon: informationCircleOutline },
        { title: 'Support', path: '/support', icon: help },
    ],
    loggedInPages: [
        { title: 'Logout', path: '/logout', icon: logOut },
        { title: 'Account', path: '/account', icon: person },
    ],
    loggedOutPages: [
        { title: 'Login', path: '/login', icon: logIn },
        { title: 'Signup', path: '/signup', icon: personAdd }
    ]
}
