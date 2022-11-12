import {FilmOverview} from '../../data/model/FilmModel'

export default interface HomeDataModel {
    trending: FilmOverview[],
    nowPlaying: FilmOverview[],
    upcoming: FilmOverview[],
    discover: FilmOverview[]
}