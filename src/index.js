import AdminOverlay from './pages/AdminOverlay/index'
import cursorPoistion from './higher-order-components/CursorPosition'
import editor from './higher-order-components/Editor'
import fetcher from './higher-order-components/Fetcher'
import configurationProvider from './higher-order-components/ConfigurationProvider'
import DBImage from './components/DBImage'
import DBText from './components/DBText'
import DBWysiwyg from './components/DBWysiwyg'
import {EditableText} from './components/DBText'
import LoadingImage from './components/LoadingImage'
import PandaPlaceholder from './components/PandaPlaceholder'
import Facebook from './assets/icons/facebook.svg'
import Instagram from './assets/icons/instagram.svg'
import Twitter from './assets/icons/twitter.svg'
import Github from './assets/icons/github.svg'
import Cross from './assets/icons/cross.svg'
import Arrow from './assets/icons/arrow.svg'
import GooglePlay from './assets/icons/google-play-badge.png'
import AppStore from './assets/icons/app-store-badge.png'
import InstaHeart from './assets/icons/instaheart.png'
import InstaComment from './assets/icons/instacomment.png'
import InstaCommentFilled from './assets/icons/instacomment-filled.png'
import InstaHeartFilled from './assets/icons/instaheart-filled.png'
import Snapchat from './assets/icons/snapchat.svg'
import apiData from './higher-order-components/Fetcher/reducer';
import adminOverlay from './pages/AdminOverlay/reducer'; 
import * as helperFunctions from './utils/helperFunctions'

const Icons = {
    Facebook,
    Instagram,
    Twitter,
    Snapchat,
    GooglePlay,
    AppStore,
    InstaHeart,
    InstaComment,
    InstaCommentFilled,
    InstaHeartFilled,
    Cross,
    Arrow,
    Github
}

const reducers = {
    apiData,
    adminOverlay,
}

export {
    AdminOverlay,
    cursorPoistion,
    editor,
    fetcher,
    configurationProvider,
    DBImage,
    DBText,
    DBWysiwyg,
    EditableText,
    LoadingImage,
    PandaPlaceholder,
    Icons,
    reducers,
    helperFunctions
}