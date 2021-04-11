import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../environment'

export default function useRenderBlogPage(token, setFunction, currentPage, nameQuery, categoryQuery, changeRefresh, isRefresh) {
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogHasMore, setBlogHasMore] = useState(false);

  useEffect(() => {
    async function fetchThreads(pageFunction, page, blogName, blogCategory) {
      setBlogLoading(true)
      let secondResponse = [];
      let firstResponse = undefined;
      let index = 0;
      const settings = {
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
          }
      }
      
      if(token !== 'none') {
        firstResponse = await axios.get(API_URL + `/api/posts/search?category=${blogCategory}&title=${blogName}&page=${page}`,
        settings)
        .then(response => {
          setBlogHasMore(response.data.pages !== page)
          return response.data.posts
        }, (error) => {
          console.error(error)
          return []
        })

        if(firstResponse !== undefined) {
          firstResponse.forEach(thread => {
            secondResponse[index] = axios.get(API_URL + `/api/users/${thread.postBy}`, 
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
            } else {
              firstResponse[counter].postBy = responses[counter]
            }
          }

          changeRefresh(false);
          pageFunction(prevState => {
            let seen = new Set();
            let newState = prevState.concat(firstResponse)
            return newState.filter(thread => {
              let duplicate = seen.has(thread._id);
              seen.add(thread._id);
              return !duplicate;
            })
          })

          setBlogLoading(false) 
        })).catch(errors => {
          console.error(errors);
        })
    }
    }
    fetchThreads(setFunction, currentPage, nameQuery, categoryQuery);
  }, [currentPage, nameQuery, categoryQuery, token, isRefresh])
  return { blogLoading, blogHasMore }
}
