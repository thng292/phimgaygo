import {FC} from "react";
const SVG_CopiedToClipBoard: FC<{ fill?: string }> = ({fill = '#ffffff'}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24"
             width="24px" fill={fill}>
            <g>
                <rect fill="none" height="24" width="24"/>
            </g>
            <g>
                <g>
                    <path
                        d="M5,5h2v3h10V5h2v5h2V5c0-1.1-0.9-2-2-2h-4.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H5C3.9,3,3,3.9,3,5v14 c0,1.1,0.9,2,2,2h6v-2H5V5z M12,3c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,3,12,3z"/>
                    <polygon points="21,11.5 15.51,17 12.5,14 11,15.5 15.51,20 22.5,13"/>
                </g>
            </g>
        </svg>)
}

export default SVG_CopiedToClipBoard