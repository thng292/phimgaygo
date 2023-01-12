const SVG_Send: FC<{ fill?: string }> = ({fill = '#ffffff'}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={fill}>
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path
                d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z"/>
        </svg>)
}
export default SVG_Send
import {FC} from "react";