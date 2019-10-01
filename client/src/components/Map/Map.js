import React, { Component } from 'react'
import * as d3_all from 'd3'
import * as geo from 'd3-geo'
import * as topojson from "topojson";

import us from '../../static/us-states.json'
import statesAbbr from '../../static/states-abbr.json'
import latlong from '../../static/latlong.json'
import emojisArray from '../../static/emoji.json'
import './map.css'

const d3 = {...d3_all, ...geo}
const fuzz = require('fuzzball');
const emojiset = new Set(emojisArray)


class Map extends Component{
    constructor(props) {
        super(props)
        for (const k of Object.keys(latlong)){
            latlong[k]['emoji'] = '⏱'
            latlong[k]['count'] = 0
        }
        this.state = {
            data: latlong,
        }
    }

    mapReduce = (tweets) => {
        if (!tweets || tweets.length === 0){
            return latlong
        }
        const abbreviations = Object.keys(statesAbbr)
        const emojiFreq =
            tweets
                .map(t => {
                    if (!t.location || t.location.length === 0){
                        return undefined
                    }
                    const likely = fuzz.extract(t.location, abbreviations, {scorer: fuzz.token_set_ratio})[0]
                    if (likely[1] > 90) {
                        const state = statesAbbr[abbreviations[likely[2]]]
                        return {
                            state,
                            text: t.text
                        }
                    }
                    else {
                        return undefined
                    }
                })
                .filter(t => !!t)
                .reduce((acc, cur) => {
                    const {state, text} = cur
                    const set = new Set()
                    for (const c of text) {
                        if (emojiset.has(c)){
                            set.add(c)
                        }
                    }
                    for (const emoji of set) {
                        if (!acc[state]['frequencies']){
                            acc[state]['frequencies'] = {}
                        }
                        if (acc[state]['frequencies'][emoji]) {
                            acc[state]['frequencies'][emoji]++
                        }
                        else {
                            acc[state]['frequencies'][emoji] = 1
                        }
                    }
                    return acc
                }, latlong)
        return Object.entries(emojiFreq)
            .filter(e => !!e && !!e[0] && !!e[1])
            .map(e => {
                const [state, properties] = e
                const frequencies = properties.frequencies || {}
                const [emoji, count] = Object.entries(frequencies)
                    .sort((a,b) => b[1] - a[1])[0] || ['',0]
                const data = {
                    emoji, count,
                    latitude: properties.latitude,
                    longitude: properties.longitude
                }
                return [state, data]
            })
            .reduce((acc, cur) => {
                const [state, data] = cur
                acc[state] = data
                return acc
            },{})
    }

    componentDidMount() {
        fetch('/api')
            .then(res => res.json())
            .then(tweets => {
                tweets = tweets || []
                const data = this.mapReduce(tweets)
                this.setState({data})
            })
            .catch(e => console.log(e))
    }

    projection = () => {
        return d3.geoAlbersUsa()
            .scale(1000)
            .translate([ 800 / 2, 450 / 2 ])
    }

    render() {
        const data = this.state.data
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
                                onClick={() => {
                                    console.log(d)
                                }}
                            />
                        ))
                    }
                </g>
                <g className={'emoji'}>
                    {
                        Object.entries(data).map((d, i) => {
                            const [state, {latitude, longitude, emoji, count, active}] = d
                            const coords = [Number(latitude), Number(longitude)]
                            const offsets = this.projection()(coords)
                            return (
                                <text
                                    x={offsets[0]}
                                    y={offsets[1]}
                                    textAnchor={'middle'}
                                    fontSize={24}
                                    key={i}
                                    onMouseEnter={()=>{
                                        const newState = this.state
                                        newState.data[state]['active'] = true
                                        this.setState(newState)}}
                                    onMouseLeave={()=>{
                                        const newState = this.state
                                        newState.data[state]['active'] = false
                                        this.setState(newState)}}
                                >
                                    {active ? count: emoji}
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
