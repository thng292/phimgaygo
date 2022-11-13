import FilmDatasource from '../datasource/FilmDatasource'
import Film from '../model/Film'
import FilmOverview from '../model/FilmOverview'
import FilmDiscover from '../model/FilmDiscover'
import HomeDataModel from '../../ui/Home/HomeDataModel'

class FilmRepo {
    #filmDatasource = new FilmDatasource()
    #language = 'vi'
    #region = 'VN'

    getUpcoming(
        page: number = 1,
        language: string = this.#language,
        region: string = this.#region 
    ) {
        return this.#filmDatasource.getUpcoming(page, language, region)
    }

    getNowPlaying(
        page: number = 1,
        language: string = this.#language,
        region: string = this.#region 
    ) {
        return this.#filmDatasource.getNowPlaying(page, language, region)
    }

    getTrending(
        timeWindow: 'day' | 'week' = 'day',
        language: string = this.#language
    ) {
        return this.#filmDatasource.getTrending(timeWindow, language)
    }

    getDiscover(
        page: number = 1,
        sortedBy: string = 'popularity.desc',
        includeAdult: boolean = false,
        language: string = this.#language
    ) {
        return this.#filmDatasource.getDiscover(page, sortedBy, includeAdult, language)
    }

    getHomeData() {
        return Promise.all([
            this.getTrending(),
            this.getNowPlaying(),
            this.getUpcoming(),
            this.getDiscover(),
        ]).then((value) => {
            return new Promise((resolve: (data: HomeDataModel) => void,
                reject) => {
                resolve({
                    trending: (value[0].data as FilmDiscover).results,
                    nowPlaying: (value[1].data as FilmDiscover).results,
                    upcoming: (value[2].data as FilmDiscover).results,
                    discover: (value[3].data as FilmDiscover).results,
                })
            })
        })
    }

    getGenres(
        language: string = this.#language
    ) {
        return this.#filmDatasource.getGenres(language)
    }
}

export default FilmRepo