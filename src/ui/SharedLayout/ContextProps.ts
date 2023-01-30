import { User } from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import UserAdditionData from "../../data/model/Firebase/UserAdditionData";
import { media_type } from "../../data/Datasource/Config";

export default interface ContextProps {
    user: User | null;
    navController: NavigateFunction;
    footerInView: boolean;
    setSnackbarState: (newState: { text: string, undoAction?: (() => void), open: boolean}) => void,
    handleFavorite: (filmID: number, type: media_type) => void
}
