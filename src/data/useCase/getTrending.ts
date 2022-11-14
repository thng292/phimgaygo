import DatasourceInstance from "../datasource/DatasourceInstance"
import config from "../datasource/config"
import FilmDiscover from "../model/FilmDiscover"

export default function getTrending(
    timeWindow: 'day' | 'week' = config.timeWindow,
    language: string = config.language
) {

    return new Promise((resolve: (val: FilmDiscover) => void, reject: (e: string) => void) => {
        DatasourceInstance
            .get(
                `/trending/movie/${timeWindow}?api_key=${config.key}&language=${language}`
            )
            .then(response => {
                resolve(response.data as FilmDiscover)
            })
            .catch(error => {
                console.log("From getTrending useCase", error)
                reject(error)
            })
    })
}