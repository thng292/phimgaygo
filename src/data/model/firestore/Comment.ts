export default interface Comment {
    author: string,
    comments: string[],
    content: string,
    time: string,
    down_vote_count: number,
    up_vote_count: number,
    id: string,
}