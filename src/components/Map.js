import React, { Component } from 'react'
import * as d3_all from 'd3'
import * as geo from 'd3-geo'
import * as topojson from "topojson";

import us from '../static/us-states.json'
import data from '../static/rand_data.json'
import './map.css'

const d3 = {...d3_all, ...geo}

class Map extends Component{
    componentDidMount() {
    }

    projection = () => {
        return d3.geoAlbersUsa()
            .scale(1000)
            .translate([ 800 / 2, 450 / 2 ])
    }

    render() {
        return (
            <svg className={'map'} width={ 800 } height={ 450 } viewBox="0 0 800 450">
                <g className={'states'}>
                    {
                        topojson.feature(us, us.objects.states).features.map((d, i) => (
                            <path
                                key={ `path-${ i }` }
                                d={ d3.geoPath().projection(this.projection())(d) }
                                className="states"
                                stroke="#000"
                                strokeWidth={ 0.5 }
                            />
                        ))
                    }
                </g>
                <g className={'emoji'}>
                    {
                        Object.entries(data).map((d, i) => {
                            const [state, {latitude, longitude, emoji, count}] = d
                            const coords = [Number(latitude), Number(longitude)]
                            const offsets = this.projection()(coords)
                            return (
                                <text
                                    x={offsets[0]}
                                    y={offsets[1]}
                                    textAnchor={'middle'}
                                    fontSize={24}
                                    key={i}
                                >
                                    {emoji}
                                </text>
                            )
                        })
                    }
                </g>
            </svg>
        )
    }


}

export default Map
