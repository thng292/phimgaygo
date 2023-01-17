import {User} from "firebase/auth";
import {NavigateFunction} from "react-router-dom";
import UserAdditionData from "../../data/model/Firebase/UserAdditionData";

export default interface ContextProps {
    user: User | null,
    additionalUserInfo: UserAdditionData,
    navController: NavigateFunction,
}