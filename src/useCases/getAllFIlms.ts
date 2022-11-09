import Film from "../data/model/FilmModel";
import FilmRepo from "../data/repo/FilmRepo";

class getAllFilms {
    #filmRepo: FilmRepo
    constructor(filmRepo: FilmRepo) {
        this.#filmRepo = filmRepo
    }

    exec(start: number, end: number, noCategory: number): Map<string, Film[]> {
        return this.#filmRepo.getAllFilm(start, end, noCategory)
    }
}

export default getAllFilms