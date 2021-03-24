import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useRenderComments(token, setFunction, currentPage, userId) {
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        async function fetchItems(pageFunction, page, id) {
            setLoading(true)
            let secondResponse = []
            let index = 0
            const settings = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
            console.log(id)
            const firstResponse = await axios.get(`http://localhost:5000/api/items/${id}/comments?page=${page}`,
            settings)
            .then(response => {
                setHasMore(response.data.pages !== page)
                console.log(response.data.comments)
                return response.data.comments
            }, (error) => {
                console.error(error)
                return []
            })
    
            if(firstResponse !== undefined) {
                firstResponse.forEach(item => {
                secondResponse[index] = axios.get(`http://localhost:5000/api/users/${item.postBy}`,
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
                        firstResponse[counter].itemId = `${responses[counter].data.picture}`
                    } else {
                        firstResponse[counter].postBy = responses[counter]
                    }
                }
    
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
        
                setLoading(false)
            })).catch(errors => {
                console.error(errors)
            })
        }
        fetchItems(setFunction, currentPage, userId);
    }, [currentPage, userId])
    return { loading, hasMore }
}
