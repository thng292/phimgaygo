import React from "react";
import { useLocation } from "react-router-dom";

function stringToObject(inp: string): any {
    let tmp = decodeURIComponent(inp).replace('?', '').split('&')
    const result = {}
    for (let i of tmp) {
        let [name, value] = i.split('=').slice(0, 2)
        //@ts-ignore
        result[name] = value
    }
    return result
}

export default function useUrlParams() {
    const { search } = useLocation()
    return React.useMemo(() => stringToObject(search), [search])
}