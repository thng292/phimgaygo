import {media_type} from "../data/Datasource/Config";

const Screens = {
    Home: '/',
    MovieDiscover: '/discover/movie',
    TVDiscover: '/discover/tv',
    Detail: '/detail/:id',
    DetailStatic: '/detail',
    Search: '/search',
    About: '/about',
    Contact: '/contact',
    FAQ: '/FAQ',
    Forum: '/forum',
    Auth: '/auth',
    SignUp: '/signup',
    SignIn: '/signin'
} as const

export default Screens

export const MediaType = {
    Movie: 'movie',
    TVShow: 'tv'
} as {
    Movie: media_type,
    TVShow: media_type
}