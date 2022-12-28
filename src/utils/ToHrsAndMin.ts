export default function ToHrsAndMin(mins: number) {
    if (mins > 60)
        return `${Math.floor(mins / 60)}h ${mins % 60}m`
    else
        return `${mins}m`
}