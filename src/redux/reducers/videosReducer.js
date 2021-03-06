import { 
    HOME_VIDEOS_FAILED, 
    HOME_VIDEOS_REQUEST, 
    HOME_VIDEOS_SUCCESS, 
    SELECTED_VIDEO_FAILED, 
    SELECTED_VIDEO_REQUEST, 
    SELECTED_VIDEO_SUCCESS, 
    SIMILAR_VIDEOS_REQUEST, 
    SIMILAR_VIDEOS_SUCCESS, 
    SIMILAR_VIDEOS_FAILED, 
    USER_SEARCH_INPUT_REQUEST,
    USER_SEARCH_INPUT_SUCCESS,
    USER_SEARCH_INPUT_FAILED} from "../actionTypes";

const prevState = {
    videos: [],
    nextPageToken: "",
    loading: false,
    activeVideoCategory: "All"
}

export const homeVideosReducer = (state={prevState}, action) => {
    const {type, payload} = action;

    switch(type) {
        case HOME_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case HOME_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: 
                    state.videos      //this statement returns true if the array is NOT empty
                        ? state.activeVideoCategory === payload.category 
                            ? [...state.videos,...payload.videos]
                            : payload.videos
                        : payload.videos
                ,
                loading: false,
                nextPageToken: payload.nextPageToken,
                activeVideoCategory: payload.category
            }
            case HOME_VIDEOS_FAILED:
                return {
                    ...state,
                    loading: false,
                    error: payload
                }
        default: 
            return state;
    }
}

// reducer for a selected video
export const selectedVideoReducer = (state={
    loading: false,
    video: null
}, action) => {
    const {payload, type} = action;

    switch(type) {
        case SELECTED_VIDEO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SELECTED_VIDEO_SUCCESS:
            return {
                ...state,
                loading: false,
                video: payload
            }

        case SELECTED_VIDEO_FAILED:
            return {
                ...state,
                loading: false,
                video: null,
                error: payload.message
            }
        default:
            return state
    }
}

// similar videos reducer
export const similarVideosReducer = (state={
        loading: false,
        videos: [],
        videoId: "state-default"
    }, action) => {
        const {payload, type} = action;

    switch(type) {
        case SIMILAR_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SIMILAR_VIDEOS_SUCCESS:
            return {
                ...state,
                loading: false,
                videos: 
                    /*
                        if the array is not empty, 
                        check if the id(unique id to which the selected video is related to) 
                        is similar to that whose similar videos are already in the array.
                    */
                    state.videos.length !== 0
                        ? state.videoId === payload.videoId
                            ? [...state.videos, ...payload.videos]
                            : payload.videos
                        : payload.videos
                ,
                videoId: payload.videoId
            }

        case SIMILAR_VIDEOS_FAILED:
            return {
                ...state,
                loading: false,
                error: payload.message,
                videos: []
            }
        default:
            return state
    }
}

// Search results reducer
export const searchResultsReducer = (state={
    loading: false,
    videos : [],
    nextPageToken : "",
    keyword: "state-keyword"
}, action) => {

    const {type, payload} = action;
    
    switch (type) {
        case USER_SEARCH_INPUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_SEARCH_INPUT_SUCCESS:
            return {
                ...state,
                loading: false,
                videos: 
                    state.videos.length !== 0
                        ? state.keyword === payload.keyword
                            ? [...state.videos, ...payload.videos]
                            : payload.videos
                        : payload.videos
                    ,
                nextPageToken: payload.nextPageToken,
                keyword: payload.keyword
            }
        case USER_SEARCH_INPUT_FAILED:
            return {
                ...state,
                loading: false,
                videos: [],
                error: payload
            }
        default:
            return state
    }
}
