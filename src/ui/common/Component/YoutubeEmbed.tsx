import React, {FC} from "react";

const YoutubeEmbed: FC<{
    url?: string,
    className?: string,
    style?: React.CSSProperties,
}> = ({url, className, style}) => {
    if (url===undefined) return <></>
    return <div className={'w-full flex justify-center items-center'}>
        <iframe
            className={className} style={style}
            src={"https://www.youtube.com/embed/" + url + '?rel=0'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
        />
    </div>
}

export default YoutubeEmbed