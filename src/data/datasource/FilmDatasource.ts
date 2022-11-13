import Film, { FilmDiscover } from "../model/Film"; 
import config from "./config";
import DatasourcInstance from './DatasourceInstance'

class FilmDatasource {
    constructor() {
        // TODO
    }
    //Get movies details shouldn't load the translation when the user don't need them, they are very large
    // https://api.themoviedb.org/3/movie/550?api_key=728e0b4bf88803b54b1b501869064c0e&language=vi&append_to_response=keywords,credits,recommendations,similar,translations,release_dates
    //Certification lay AU
    //Lay san danh sach cac certification
    //Lay video rieng bang tieng anh

    getUpcoming(page: number, language: string, region: string) {
        return DatasourcInstance.get(`/movie/popular?api_key=${config.key}&language=${language}&page=${page}&region=${region}`)
    }    

    getTrending(timeWindow: 'day' | 'week', language: string) {
        return DatasourcInstance
            .get(
                `/trending/movie/${timeWindow}?api_key=${config.key}&language=${language}`
            )
    }

    getNowPlaying(page: number = 1, language: string = 'vi', region: string = 'VN') {
        return DatasourcInstance.get(`/movie/now_playing?api_key=${config.key}&language=${language}&page=${page}&region=${region}`)
    }
    
    getDiscover(
        page: number,
        sortedBy: string,
        includeAdult: boolean,
        //year: number,
        //genres: string,
        //keywords: string,
        language: string,
    ) {
        return DatasourcInstance.get(
            `/discover/movie?api_key=${config.key}&language=vi&sort_by=${sortedBy}&include_adult=${includeAdult}&page=${page}&language=${language}`, 
        )
    }

    getGenres(
        language: string,
    ) {
        return DatasourcInstance.get(
            `/genre/movie/list?api_key=${config.key}&language=${language}`
        )
    }
}

export default FilmDatasource