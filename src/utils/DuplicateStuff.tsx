export default function DuplicateStuff<T>(stuff: T, times: number): T[] {
    let res: T[] = []
    while (times--) {
        res.push(stuff)
    }
    return res;
}