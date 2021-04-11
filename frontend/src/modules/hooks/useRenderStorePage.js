import { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../../environment'

export default function useRenderStorePage(token, setFunction, currentPage, nameQuery, categoryQuery, changeRefresh, isRefresh) {
    const [storeLoading, setStoreLoading] = useState(true)
    const [storeHasMore, setStoreHasMore] = useState(false)

    useEffect(() => { //Grabs all items, grabs a user depending on each item's id and returns the name to the item
        async function fetchItems(pageFunction, page, storeName, storeCategory) {
            setStoreLoading(true)
            let firstResponse = undefined;
            let secondResponse = [];
            let index = 0;
            const settings = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }

            if(token !== 'none') {
                firstResponse = await axios.get(API_URL + `/api/items/search?category=${storeCategory}&name=${storeName}&page=${page}`,
                settings)
                .then(response => {
                    setStoreHasMore(response.data.pages !== page)
                    return response.data.items
                }, (error) => {
                    console.error(error)
                    return []
                })
        
                if(firstResponse !== undefined) {
                    firstResponse.forEach(item => {
                    secondResponse[index] = axios.get(API_URL + `/api/users/${item.seller}`,
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
                            firstResponse[counter].seller = `${responses[counter].data.firstName} ${responses[counter].data.lastName}`
                            firstResponse[counter].thumbnail.main = `${responses[counter].data.picture}`
                        } else {
                            firstResponse[counter].seller = responses[counter]
                        }
                    }
        
                    changeRefresh(false);
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
            
                    setStoreLoading(false)
                })).catch(errors => {
                    console.error(errors)
                })
            }
        }
        fetchItems(setFunction, currentPage, nameQuery, categoryQuery);
    }, [currentPage, nameQuery, categoryQuery, token, isRefresh])
    return { storeLoading, storeHasMore }
}
