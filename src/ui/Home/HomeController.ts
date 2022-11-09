import Film from "../../data/model/FilmModel";
import getAllFilms from '../../useCases/getAllFilms'

export default class HomeController {
    #getAllFilmUseCase: getAllFilms
    constructor(getAllFilmUseCase: getAllFilms) {
        this.#getAllFilmUseCase = getAllFilmUseCase
    }

    getData(): Map<string, Film[]> {
        return this.#getAllFilmUseCase.exec(1, 5, 5)
    }
}