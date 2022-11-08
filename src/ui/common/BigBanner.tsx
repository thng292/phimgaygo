import React, {FC, useEffect, useState} from 'react'
import Film from '../../data/model/FilmModel'
import FilmInfo from './FilmInfo'

const BigBanner: FC<{ films: Film[] }> = (props) => {
    if (props.films.length==0) return <></>
    let [currentIndex, setIndex] = useState(0)
    let [willChangeBg, setWillChangeBg] = useState(true)
    useEffect(() => {
        const autoChangeBannerTimer = setInterval(() => {
                setIndex((prevState: number) =>
                    willChangeBg ? (prevState + 1) % props.films.length : prevState
                )
        }, 5000)
        return () => {
            clearInterval(autoChangeBannerTimer)
        }
    }, [])
//linear-gradient(0deg,#181818 0,hsla(0,0%,9%,.987) 1.62%,hsla(0,0%,9%,.951) 3.1%,hsla(0,0%,9%,.896) 4.5%,hsla(0,0%,9%,.825) 5.8%,hsla(0,0%,9%,.741) 7.06%,hsla(0,0%,9%,.648) 8.24%,hsla(0,0%,9%,.55) 9.42%,hsla(0,0%,9%,.45) 10.58%,hsla(0,0%,9%,.352) 11.76%,hsla(0,0%,9%,.259) 12.94%,hsla(0,0%,9%,.175) 14.2%,hsla(0,0%,9%,.104) 15.5%,hsla(0,0%,9%,.049) 16.9%,hsla(0,0%,9%,.013) 18.38%,hsla(0,0%,9%,0) 20%), 
    return <div style={{
        backgroundImage: 'url("' + props.films[currentIndex].banner + '")',
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '60vh',
        cursor: 'pointer'
    }}
        onPointerEnter={() => {
                setWillChangeBg(false)
                console.log("Pointer enter")
            }
        }
        onPointerLeave={() =>  {
                setWillChangeBg(true)
                console.log("Pointer leave")
            }
        }
    >
        {
            // TODO
            // Film Info
            // Arrow Button
        }
        <FilmInfo
            name={props.films[currentIndex].name}
            desc={props.films[currentIndex].description}
            cast={props.films[currentIndex].casts.join(', ')}
            length={props.films[currentIndex].length}
            year={props.films[currentIndex].year}
            imdb={props.films[currentIndex].imdbRating}
            category={props.films[currentIndex].category}
            thumbUrl={props.films[currentIndex].thumb}
            style={{
                background: 'linear-gradient(to right, #333, #43434300)',
                height: '100%',
                width: '100%',
                padding: '0 60px'
            }}
            onClick={() => { }}
            onCart={() => { }}
        ></FilmInfo>

    </div>
}
export default BigBanner;