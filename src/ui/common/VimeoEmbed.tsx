import {FC} from "react";

const VimeoEmbed: FC<{
    url: string,
}> = ({url}) => {
    return <div>
        <div style={{
            padding: '41.89 % 0 0 0',
            position: 'relative',
        }}
        >
            <iframe
                src={"https://player.vimeo.com/video/" + url}
                style={{
                    border: '0',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%'
                }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
}

export default VimeoEmbed