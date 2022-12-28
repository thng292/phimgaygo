const enum WindowSize {
    SMALL = 0,
    MEDIUM = 640,
    BIG = 768,
    BIGGER = 1024,
    EXTENDED = 1280,
}

export function CalcWindowSize() {
    const ww = window.innerWidth
    if (ww > WindowSize.EXTENDED) return WindowSize.EXTENDED
    if (ww > WindowSize.BIGGER) return WindowSize.BIGGER
    if (ww > WindowSize.BIG) return WindowSize.BIG
    if (ww > WindowSize.MEDIUM) return WindowSize.MEDIUM
    if (ww >= WindowSize.SMALL) return WindowSize.SMALL
    return WindowSize.SMALL
}

export default WindowSize