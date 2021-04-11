import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../environment'

export default function useRenderComments(token, setFunction, currentPage, userId, setRefresh, refresh) {
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        async function fetchItems(pageFunction, page, id) {
            setCommentsLoading(true);
            let secondResponse = [];
            let index = 0;
            const settings = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
            const firstResponse = await axios.get(API_URL + `/api/items/${id}/comments?page=${page}`,
            settings)
            .then(response => {
                setHasMore(response.data.pages !== page)
                return response.data.comments
            }, (error) => {
                console.error(error)
                return []
            })
    
            if(firstResponse !== undefined) {
                firstResponse.forEach(item => {
                secondResponse[index] = axios.get(API_URL + `/api/users/${item.postBy}`,
                settings)
                .then(response => {
                    return response
                }, () => {
                    return "Deleted User"
                })
                index++
                })
            }
    
            axios.all(secondResponse).then(axios.spread((...responses) => {
                for(let counter = 0; counter < responses.length; counter++) {
                    if(responses[counter] !== "Deleted User") {
                        firstResponse[counter].postBy = `${responses[counter].data.firstName} ${responses[counter].data.lastName}`
                        firstResponse[counter].photo = `${responses[counter].data.picture}`
                    } else {
                        firstResponse[counter].postBy = responses[counter]
                    }
                }
    
                setRefresh(false);
                //Uses set function passed through parameter to update the items in the state
                pageFunction(prevState => {
                    let seen = new Set();
                    let newState = prevState.concat(firstResponse)
                    return newState.filter(item => {
                        let duplicate = seen.has(item._id);
                        seen.add(item._id);
                        return !duplicate;
                    })
                })
        
                setCommentsLoading(false)
            })).catch(errors => {
                console.error(errors)
            })
        }
        fetchItems(setFunction, currentPage, userId);
    }, [currentPage, userId, refresh])
    return { commentsLoading, hasMore }
}
