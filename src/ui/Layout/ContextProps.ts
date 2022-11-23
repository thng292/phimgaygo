import FilmOverview from "../../data/model/FilmOverview";

export default interface ContextProps {
    addItemToCart: (item: FilmOverview, price: number, quantity: number) => void,
}