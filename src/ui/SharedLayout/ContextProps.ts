import {User} from "firebase/auth";
import {NavigateFunction} from "react-router-dom";
import MovieOverview from "../../data/model/Movie/MovieOverview";
import CartItem from "../../data/model/Cart/CartItem";
import ProductOption from "../../data/model/Firebase/ProductOption";
import UserAdditionData from "../../data/model/Firebase/UserAdditionData";

export default interface ContextProps {
    addItemToCart: (item: MovieOverview, option: number, quantity: number, productOptions?: ProductOption[]) => void,
    clearAllCartItem: () => void,
    cart: CartItem<MovieOverview>[],
    checkoutStuff: CartItem<MovieOverview>[],
    setCheckoutStuff: React.Dispatch<React.SetStateAction<CartItem<MovieOverview>[]>>,
    user: User | null,
    additionalUserInfo: UserAdditionData,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    navController: NavigateFunction,
    displayToast: (text: string) => void,
}