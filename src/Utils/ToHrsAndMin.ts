export default function ToHrsAndMin(mins: number) {
    return `${Math.floor(mins/60)}h ${mins%60}m`
}