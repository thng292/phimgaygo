import {FilmOverview} from '../../data/model/Film'

export default interface HomeDataModel {
    trending: FilmOverview[],
    nowPlaying: FilmOverview[],
    upcoming: FilmOverview[],
    discover: FilmOverview[]
}