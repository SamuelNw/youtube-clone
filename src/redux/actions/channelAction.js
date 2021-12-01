import { CHANNEL_DETAILS_FAILED, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, SET_SUBSCRIPTION_STATUS, SUBSCRIPTION_STATUS_CHECK_SUCCESS } from "../actionTypes"
import request from "../../api";

export const getChannelDetails = id => async dispatch => {
    try {
        dispatch({
            type: CHANNEL_DETAILS_REQUEST,
        })

        const { data } = await request("/channels", {
            params: {
                part: "statistics, snippet",
                id
            }
        })

        dispatch({
            type: CHANNEL_DETAILS_SUCCESS,
            payload: data.items[0]
        })


    } catch (error) {
        dispatch({
            type: CHANNEL_DETAILS_FAILED,
            payload: error.message
        })
    }
}

//action to check a user's subscription status
export const checkUserSubscriptionStatus = id => async (dispatch, getState) => {
    try {

        const { data } = await request("/subscriptions", {
            params: {
                part: "contentDetails, snippet",
                mine: true,
                forChannelId: id
            },
            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`
            }
        })

        dispatch({
            type: SET_SUBSCRIPTION_STATUS,
            payload: data.items.length !== 0
        })
        console.log(data);


    } catch (error) {
        console.log(error.message)
    }
}
