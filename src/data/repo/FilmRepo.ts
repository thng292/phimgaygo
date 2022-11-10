import FilmDatasource from '../datasource/FilmDatasource'
import Film from '../model/FilmModel'

class FilmRepo {
    #filmDatasource: FilmDatasource
    #filmDataResults: { Req: string, Data: Map<string, Film[]> }[] = []
    constructor(filmDatasource: FilmDatasource) {
        this.#filmDatasource = filmDatasource
        //this.getAllFilm(1, 5, 20);
    }

    #cache(req: string, data: Map<string, Film[]>) {
        this.#filmDataResults.push({
            Req: req,
            Data: data
        })
        while (this.#filmDataResults.length > 10) this.#filmDataResults.pop()
    }

    getAllFilm(start: number, end: number, numberOfGenre: number): Map<string, Film[]> {
        for (let i of this.#filmDataResults) {
            if (i.Req === `genre=all&start=${start}&end=${end}&numberOfGenre=${numberOfGenre}`) return i.Data
        }
        this.#cache(`genre=all&start=${start}&end=${end}&numberOfGenre=${numberOfGenre}` ,this.#filmDatasource.getFilms('all'))
        return this.#filmDataResults[this.#filmDataResults.length-1].Data
    }
}

export default FilmRepo