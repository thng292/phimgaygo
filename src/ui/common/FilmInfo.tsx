import React, { FC } from "react"
import './css/typography.css'

const FilmInfo: FC<{
    name: string,
    length: string,
    year: number,
    category: string,
    desc: string,
    cast: string,
    imdb: number,
    thumbUrl: string,
    onClick: () => void,
    onCart: () => void,
    style: React.CSSProperties | null
}> = (props) => {
    return <div style={props.style ? props.style : {}} onClick={() => props.onClick()}>
        <div style={{
            position: "absolute",
            bottom: '20px',
            display: 'flex',
            flexDirection: 'row',
        }}>
            <img className="p10" src={props.thumbUrl} alt={props.name} style={{
                maxWidth: '20vw',
                maxHeight: '30vh',
            }} />
            <div style={{
                position: 'relative',
            }}>
                <p className="title p10">{props.name}</p>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: 'auto auto',
                    gridTemplateRows: 'auto auto',
                    width: 'fit-content',
                }}>
                    <p className="desc fade p10">{props.year}</p>
                    <p className="desc fade p10">{props.length}</p>
                    <p className="desc fade p10">{props.category}</p>
                    <p className="desc fade p10">{props.imdb} on IMDb</p>
                </div>
                <p className="p10 desc" style={{
                    maxHeight: '45px',
                    overflow: 'hidden'
                }}>{props.desc}</p>
                <p className="p10 desc"><span className="fade">Starring: </span>{props.cast}</p>
                <button onClick={() => props.onCart()} style={{
                    background: 'linear-gradient(to right, #da22ff, #9733ee)',
                    position: 'absolute',
                    width: '114px',
                    border: '0',
                    padding: '10px 15px',
                    margin: '10px',
                    borderRadius: '3px',
                    bottom: '0'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z" /></svg>
                </button>
            </div>
        </div>
    </div>
}

export default FilmInfo