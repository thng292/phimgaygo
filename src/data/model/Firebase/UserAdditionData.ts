export type TVShowState = {id: number, media_type: 'tv'}
export type MovieShowState = { id: number, media_type: 'movie' }
export type HistoryItem = (MovieShowState | TVShowState)
export type FavoriteItem = (MovieShowState | TVShowState)
export default interface UserAdditionData {
    favorites: FavoriteItem[],
    histories:  HistoryItem[]
}
