export default interface UserAdditionData {
    bills: string[],
    posts: string[],
    library: {
        id: number,
        option: string,
    }[],
    points: number,
    role: string,
    displayName: string,
    photoURL: string,
}