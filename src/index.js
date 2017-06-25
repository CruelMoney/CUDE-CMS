import AdminOverlay from './pages/AdminOverlay/index'
import cursorPoistion from './higher-order-components/CursorPosition'
import editor from './higher-order-components/Editor'
import fetcher from './higher-order-components/fetcher'
import DBImage from './components/DBImage'
import DBText from './components/DBText'
import LoadingImage from './components/LoadingImage'
import PandaPlaceholder from './components/PandaPlaceholder'
import Facebook from './assets/icons/facebook.svg'
import Instagram from './assets/icons/instagram.svg'
import Twitter from './assets/icons/twitter.svg'
import Snapchat from './assets/icons/snapchat.svg'
import apiData from './higher-order-components/Fetcher/reducer';
import adminOverlay from './pages/AdminOverlay/reducer'; 
import * as helperFunctions from './utils/helperFunctions'

const Icons = {
    Facebook,
    Instagram,
    Twitter,
    Snapchat
}
const reducers = {
    apiData,
    adminOverlay
}

export {

    AdminOverlay,
    cursorPoistion,
    editor,
    fetcher,
    DBImage,
    DBText,
    LoadingImage,
    PandaPlaceholder,
    Icons,
    reducers,
    helperFunctions
}