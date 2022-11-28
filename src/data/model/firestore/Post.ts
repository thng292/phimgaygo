export default interface Post {
    author: string,
    title: string,
    body: string,
    comments: string[],
    down_vote_count: number,
    up_vote_count: number,
    time: string,
    id: string,
}