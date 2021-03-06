import React, { useState } from "react";
import "./TabsList.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useDispatch } from "react-redux";
import { getPopularVideos, getVideosByCategory } from "../../redux/actions/videosAction";

const TabsListData = [
    "All",
    "Python programming language",
    "Tech with Tim",
    "Django Web Framework",
    "Flutter",
    "Go Programming",
    "Typescript",
    "Kalle Halden",
    "Fireship",
    "Web Dev Simplified",
    "Dennis Ivy",
    "React",
    "Redux",
    "B1M",
    "Tomorrow's Build",
    "Tech Vision",
    "Fifa 22",
    "Neal Guides",
    "Frying Pan",
    "Leo Messi",
    "Man City",
    "Ronaldo",
    "Formula1",
    "Full-stack",
    "Bully juice",
    "Trevor Noah",
    "Lofi Music",
    "Zendaya",
    "World Cup 2022",
    "National Geographic",
];

function TabsList() {
    const [activeDiv, setActiveDiv] = useState("All");

    const dispatch = useDispatch()

    const handleClick = (val) => {
        setActiveDiv(val)
        
        val !== "All" 
            ? dispatch(getVideosByCategory(val)) 
            : dispatch(getPopularVideos())        
    }

    return (
        <div className="tabsList">
            <div className="tabsList__textBar">
                {TabsListData.map((item, index) => (
                    <div 
                        className={activeDiv === item ? "tabsList__div active" : "tabsList__div"} 
                        title={item} 
                        onClick={() => handleClick(item)}
                        key={index}
                    >
                        <h3 
                            key={item}
                            className="tabsList__text"
                        >
                            {item}
                        </h3>
                    </div>
                ))}
            </div>
            <div className="right__arrow">
                <div className="right__arrow--fadeleft"></div>
                <div className="arrow__div">
                    <ArrowForwardIosIcon className="arrow" />
                </div>
            </div>
        </div>
    );
}

export default TabsList;
