import {media_type} from "../data/Datasource/Config";

const Screens = {
    Home: '',
    Discover: 'discover',
    Detail: 'detail/:id',
    Search: 'search',
    About: 'about',
    Checkout: 'checkout',
    Bill: 'bill/:billId',
    Contact: 'contact',
    FAQ: 'FAQ',
    Forum: 'forum',
    Auth: 'auth'
}

export default Screens

export const MediaType = {
    Movie: 'movie',
    TVShow: 'tv'
} as {
    Movie: media_type,
    TVShow: media_type
}