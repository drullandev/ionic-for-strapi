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

export const RestAPI = 'http://' + MyIP + ':1337'
export const RestStorage = RestAPI
export const PHOTO_STORAGE = RestAPI + '/uploads'

export const pagesOrigin = RestAPI + '/forms?slug='
export const formsOrigin = RestAPI + '/forms?slug='
export const fieldsOrigin = RestAPI + '/fields?slug='
export const menusOrigin = RestAPI + '/menus?slug='

// OVERRIDE FROM THE CMS!!!! TODO TODO TODO TODO

export const HOME = '/tabs/home'
export const TUTORIAL = '/tutorial'
export const LOGIN = '/login'


export const dataUrl           = '/assets/data/data.json'
export const locationsUrl      = '/assets/data/locations.json'

// Stored constants...
export const NICKNAME          = 'nickname'
export const USERDATA          = 'userData'
export const USEREMAIL         = 'useremail'
export const USERJWT           = 'userjwt'
export const USERID            = 'userId'
export const USER_ROLE         = 'userRole'
export const USER_AVATAR       = 'userAvatar'

export const HAS_LOGGED_IN     = 'hasLoggedIn'
export const HAS_SEEN_TUTORIAL = 'hasSeenTutorial'
export const USER_DARK_MODE    = 'userDarkMode'

export const IS_LOADING        = 'isLoading'
