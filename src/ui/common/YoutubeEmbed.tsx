import React, {FC} from "react";
import '../tailwindTemplate.css'

const YoutubeEmbed: FC<{
    url?: string,
    classname?: string,
    style?: React.CSSProperties,
}> = ({url, classname, style}) => {
    if (url===undefined) return <></>
    return <div className={'w-full flex justify-center items-center'}>
        <iframe
            className={classname} style={style}
            src={"https://www.youtube.com/embed/" + url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>
}

export default YoutubeEmbed