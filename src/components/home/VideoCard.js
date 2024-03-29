import React, { useEffect, useState } from "react";
import "./VideoCard.css";
import { Avatar } from "@material-ui/core";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { useHistory } from "react-router";

/*
        This function "decodes" the html hexcodes for apostrophe and quotation
        marks present in the data fetched from the youtube api.
    */
export const stringFormatter = (str, n) => {
    //checking for both occurrences at the same time
    if(str.includes("&#39;") || (str.includes("&quot;"))) {
        let newStr = str.replace(/&#39;/g, "'")
        newStr = newStr.replace(/&quot;/g, '"')
        
        if (newStr.length > n) {
            let str2 = newStr.substring(0, n - 1) + "...";
            return str2;
        } else {
            return newStr;
        }
    
    } else {
        if (str.length > n) {
            str = str.substring(0, n - 1) + "...";
            return str;
        } else {
            return str;
        }
    }
}


function VideoCard({ video }) {
    const history = useHistory()

    const {
        id, 
        snippet: {
            channelId, 
            channelTitle,
            title, 
            publishedAt, 
            thumbnails,}
        } = video;

        const [views, setViews] = useState(null);
        const [duration, setDuration] = useState(null);
        const [channelIcon, setChannelIcon] = useState(null);
    
        const videoTimeInSec = moment.duration(duration).asSeconds();
        const _duration = moment.utc(videoTimeInSec * 1000).format("mm:ss");

        /*
        I found out that the youtube data api sometimes returns the id as
        an object instead of just a single variable, so this line here checks 
        for the type of the returned id.
        */
        const everFunctionalId = id?.videoId || id          //if the id is an object, grab the videoId, else just the given value
        

    useEffect(() => {
        const get_video_details = async () => {
            const {data: {items}} = await request("/videos", {
                params: {
                    part: "contentDetails, statistics",
                    id: everFunctionalId
                }
            })
            setDuration(items[0].contentDetails.duration);
            setViews(items[0].statistics.viewCount);
        }

        get_video_details()
    }, [everFunctionalId])

    useEffect(() => {
        const get_channel_icon = async () => {
            const {data: {items}} = await request("/channels", {
                params: {
                    part: "snippet",
                    id: channelId
                }
            })
            setChannelIcon(items[0].snippet.thumbnails.default)
        }

        get_channel_icon()
    }, [channelId])

    const handleClick = () => {
        history.push(`/video/${everFunctionalId}`)
    }



    return (
        <div className="videoCard" onClick={handleClick}>
            <div className="videoCard__image">
                <img 
                    className="videoCard__picture" 
                    src={
                        thumbnails.maxres
                        ? thumbnails.maxres.url
                        : thumbnails.medium.url
                    } 
                    alt="" 
                />
                <span className="vid__duration">{_duration}</span>
            </div>
            <div className="videoCard__otherDetails">
                <Avatar
                    className="videoCard__avatar"
                    src={channelIcon ? channelIcon.url : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                    alt=""
                />
                <div className="videoCard__channel">
                    <div className="videoCard__channel__title">
                        <h4 className="channel__title" title={title}>
                            {stringFormatter(title, 50)}
                        </h4>
                        <h4 className="channel__name">{stringFormatter(channelTitle, 20)}</h4>
                    </div>

                    <div className="channel__views__timestamp">
                        <p className="views">{numeral(views).format("0.a")} views</p>
                        <span className="the-dot"> • </span>
                        <p className="timestamp">{moment(publishedAt).fromNow()}</p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
