import { useState, useEffect } from 'react';
import { UserInfo } from '../UserInfoContext';
import axios from 'axios';

export default function useRenderBlogPage(token, setFunction, currentPage, nameQuery, categoryQuery) {
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogHasMore, setBlogHasMore] = useState(false);

  useEffect(() => {
    async function fetchThreads(pageFunction, page, blogName, blogCategory) {
      setBlogLoading(true)
      let secondResponse = []
      let index = 0
      const settings = {
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
          }
      }

      const firstResponse = await axios.get(`http://localhost:5000/api/posts/search?category=${blogCategory}&name=${blogName}&page=${page}`,
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
          secondResponse[index] = axios.get(`http://localhost:5000/api/users/${thread.postBy}`, 
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
    fetchThreads(setFunction, currentPage);
  }, [currentPage])
  return { blogLoading, blogHasMore }
}
