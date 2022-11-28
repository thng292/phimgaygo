import { User } from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import Authenticate from "../../data/datasource/UserDatasource";
import FilmOverview from "../../data/model/Film/FilmOverview";

export default interface ContextProps {
    addItemToCart: (item: FilmOverview) => void,
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    navController: NavigateFunction,
}