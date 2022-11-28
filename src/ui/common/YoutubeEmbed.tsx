import {FC} from "react";

const YoutubeEmbed: FC<{
    url: string,
}> = ({url}) => {
    return <div>
        <iframe
            src={"https://www.youtube.com/embed/" + url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>

        </iframe>
    </div>
}

export default YoutubeEmbed