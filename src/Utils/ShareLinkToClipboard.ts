export default function ShareLinkToClipboard(movieID: number) {
    return navigator.clipboard.writeText(window.location.origin + `/detail/${movieID}`)
}