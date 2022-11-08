import React, { useState, FC, useEffect, useMemo } from 'react'
import Film from '../../data/model/FilmModel'
import TitlesRow from '../common/TitlesRow'
import BigBanner from '../common/BigBanner'
import HomeController from './HomeController'

const HomeScreen: FC<{
    homeController: HomeController,
}> = (props) => {
    let [data, updateData] = useState(props.homeController.getData())
    useEffect(() => {
        let updateDataInterval = setInterval(() => {
            updateData(props.homeController.getData())
        })
        return () => clearInterval(updateDataInterval)
    }, [])
    let TitleRows = useMemo(() => {
        let ans: JSX.Element[] = []
        data.forEach((value: Film[], key: string) => {
            if (key != 'recommend')
                ans.push(
                    <TitlesRow
                        key={key}
                        title={key}
                        films={value}
                        onPlay={() => { }}
                        onFavorite={() => { }}
                        onInfo={() => { }}
                    />
                )
        })
        return ans
    }, [data])
    let recommendations: Film[] = data.get('recommend') ?? []
    return <div>
        <BigBanner films={recommendations} />
        {TitleRows}
    </div>
}

export default HomeScreen;