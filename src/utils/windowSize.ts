const WINDOW_SIZE_NUMBER =  {
    SMALL: 0,
    MEDIUM: 640,
    BIG: 768,
    BIGGER: 1024,
    EXTENDED: 1280,
} as const

const WINDOW_SIZE =  {
    SMALL: 'Small',
    MEDIUM: 'Medium',
    BIG: 'Big',
    BIGGER: 'Bigger',
    EXTENDED: 'Extended',
} as const

export type WindowSize = typeof WINDOW_SIZE[keyof (typeof WINDOW_SIZE)]

export default function CalcWindowSize(): WindowSize {
    const ww = window.innerWidth
    if (ww > WINDOW_SIZE_NUMBER.EXTENDED) return WINDOW_SIZE.EXTENDED
    if (ww > WINDOW_SIZE_NUMBER.BIGGER) return WINDOW_SIZE.BIGGER
    if (ww > WINDOW_SIZE_NUMBER.BIG) return WINDOW_SIZE.BIG
    if (ww > WINDOW_SIZE_NUMBER.MEDIUM) return WINDOW_SIZE.MEDIUM
    if (ww >= WINDOW_SIZE_NUMBER.SMALL) return WINDOW_SIZE.SMALL
    return WINDOW_SIZE.SMALL
}

export { WINDOW_SIZE, WINDOW_SIZE_NUMBER }