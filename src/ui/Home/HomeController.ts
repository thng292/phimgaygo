import FilmProvider from "../../data/provider/FilmProvider";
import Film from "../../data/model/FilmModel";

export default class HomeController {
    #filmProvider: FilmProvider
    constructor(filmProvider: FilmProvider) {
        this.#filmProvider = filmProvider
    }

    getData(): Map<string, Film[]> {
        return this.#filmProvider.getFilms('all')
    }
}