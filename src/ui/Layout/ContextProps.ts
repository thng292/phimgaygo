import {User} from "firebase/auth";
import {NavigateFunction} from "react-router-dom";
import FilmOverview from "../../data/model/Film/FilmOverview";
import CartItem from "../../data/model/CartItem";
import ProductOption from "../../data/model/firestore/ProductOption";
import UserAdditionData from "../../data/model/firestore/UserAdditionData";

export default interface ContextProps {
    addItemToCart: (item: FilmOverview, option: number, quantity: number, productOptions?: ProductOption[]) => void,
    clearAllCartItem: () => void,
    cart: CartItem<FilmOverview>[],
    checkoutStuff: CartItem<FilmOverview>[],
    setCheckoutStuff: React.Dispatch<React.SetStateAction<CartItem<FilmOverview>[]>>,
    user: User | null,
    additionalUserInfo: UserAdditionData,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    navController: NavigateFunction,
    displayToast: (text: string) => void,
}