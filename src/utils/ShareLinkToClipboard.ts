import {media_type} from "../data/Datasource/Config";

export default function ShareLinkToClipboard(movieID: number, prefix: media_type = "movie") {
    return navigator.clipboard.writeText(window.location.origin + `/${prefix}/detail/${movieID}`)
}