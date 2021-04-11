import React, { useContext, useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import jwt_decode from "jwt-decode";
import useRenderStorePage from './hooks/useRenderStorePage'
import useRenderBlogPage from './hooks/useRenderBlogPage'

const UserInfoContext = React.createContext();
const UserInfoUpdateContext = React.createContext();
const PageFilterUpdateContext = React.createContext();
const PageNumberUpdateContext = React.createContext();
const RefreshPageContext = React.createContext();
const NameQueryUpdateContext = React.createContext();
const PageUpdateContext = React.createContext();
const SetPageContext = React.createContext();
const LogoutContext = React.createContext();

export function UserInfo() {
    return useContext(UserInfoContext);
}

export function UserInfoUpdate() {
    return useContext(UserInfoUpdateContext);
}

export function PageFilterUpdate() {
    return useContext(PageFilterUpdateContext);
}

export function PageNumberUpdate() {
    return useContext(PageNumberUpdateContext);
}

export function RefreshPage() {
    return useContext(RefreshPageContext);
}

export function NameQueryUpdate() {
    return useContext(NameQueryUpdateContext);
}

export function PageUpdate() {
    return useContext(PageUpdateContext);
}

export function SetPage() {
    return useContext(SetPageContext);
}

export function Logout() {
    return useContext(LogoutContext);
}


export function UserInfoProvider({ children }) {

    //Object array representing the filters and their given states
    const homeObjectArray = [
        {
            category: "Apparel",
            checked: false,
            id: 0
        },
        {
            category: "Electronics",
            checked: false,
            id: 1
        },
        {
            category: "Books",
            checked: false,
            id: 2
        },
        {
            category: "Lab Equipment",
            checked: false,
            id: 3
        },
        {
            category: "Others",
            checked: false,
            id: 4
        }
    ]

    const blogObjectArray = [
        {
            category: "Housing",
            checked: false,
            id: 0
        },
        {
            category: "Classes",
            checked: false,
            id: 1
        },
        {
            category: "Items",
            checked: false,
            id: 2
        },
        {
            category: "Events",
            checked: false,
            id: 3
        },
        {
            category: "Others",
            checked: false,
            id: 4
        }
    ]

    const [token, setToken] = useLocalStorage('token');
    const [name, setName] = useLocalStorage('name');
    const [id, setId] = useLocalStorage('id');
    const [storeFilter, setStoreFilter] = useState(homeObjectArray);
    const [blogFilter, setBlogFilter] = useState(blogObjectArray);
    const [pageRefresh, setPageRefresh] = useState(false)
    const [currentPage, setCurrentPage] = useState("store");
    //Home Page states
    const [items, setItems] = useState([]);
    const [storePageNumber, setStorePageNumber] = useState(1);
    const [storeName, setStoreName] = useState("");
    const [storeCategory, setStoreCategory] = useState("");
    //Blog Page states
    const [threads, setThreads] = useState([]);
    const [blogPageNumber, setBlogPageNumber] = useState(1);
    const [blogName, setBlogName] = useState("");
    const [blogCategory, setBlogCategory] = useState("");

    const { storeLoading, storeHasMore } = useRenderStorePage(token, setItems, storePageNumber, storeName, storeCategory, setPageRefresh, pageRefresh);
    const { blogLoading, blogHasMore } = useRenderBlogPage(token, setThreads, blogPageNumber, blogName, blogCategory, setPageRefresh, pageRefresh);




    useEffect(() => {
        let arrayCheck = false;
        storeFilter.forEach(filter => {
            if(filter.checked === true) {
                setStoreCategory(filter.category);
                arrayCheck = true;
            }
        })
        if(!arrayCheck) {
            setStoreCategory("")
        }
        setItems([]);
        setStorePageNumber(1);
    }, [storeFilter])

    function refreshPage() {
        if(currentPage === "store") {
            setItems([]);
            setStoreName("");
            setStoreCategory("");
            setStorePageNumber(1);
        } else {
            setThreads([]);
            setBlogName("");
            setBlogCategory("");
            setBlogPageNumber(1);
        }
        setPageRefresh(true);
    }

    function updateUser(data) { 
        let decodedToken = jwt_decode(data.token);
        setToken(data.token);
        setName(`${decodedToken.firstName} ${decodedToken.lastName}`);
        setId(decodedToken.id);
    }

    function updatePageFilter(filter) {
        if(currentPage === "store") {
            setStoreFilter(filter);
        } else {
            setBlogFilter(filter);
        }
    }

    function updatePageNumber(page) {
        if(currentPage === "store") {
            setStorePageNumber(page);
        } else {
            setBlogPageNumber(page);
        }
    }

    function updateNameQuery(pageType, nameQuery) {
        if(pageType === "store") {
            setItems([]);
            setStoreName(nameQuery);
        } else {
            setThreads([]);
            setBlogName(nameQuery);
        }
    }

    function changePage(pageType) {
        setCurrentPage(pageType);
        refreshPage();
    }

    function logout() {
        console.log('works');
        setToken('none');
        setName('none');
        setId('none');
    }

    function setPage(pageType) {
        setCurrentPage(pageType);
    }

    return (
        <UserInfoContext.Provider value={{ token, name, id, storeFilter, blogFilter, storePageNumber, items, storeLoading, storeHasMore, threads, blogLoading, blogHasMore, currentPage}}>
            <UserInfoUpdateContext.Provider value={updateUser}>
                <PageFilterUpdateContext.Provider value={updatePageFilter}>
                    <PageNumberUpdateContext.Provider value={updatePageNumber}>
                        <RefreshPageContext.Provider value={refreshPage}>
                            <NameQueryUpdateContext.Provider value={updateNameQuery}>
                                <PageNumberUpdateContext.Provider value={updatePageNumber}>
                                    <PageUpdateContext.Provider value={changePage}>
                                        <SetPageContext.Provider value={setPage}>
                                            <LogoutContext.Provider value={logout}>
                                                {children}
                                            </LogoutContext.Provider>
                                        </SetPageContext.Provider>
                                    </PageUpdateContext.Provider>
                                </PageNumberUpdateContext.Provider>
                            </NameQueryUpdateContext.Provider>
                        </RefreshPageContext.Provider>
                    </PageNumberUpdateContext.Provider>
                </PageFilterUpdateContext.Provider>
            </UserInfoUpdateContext.Provider>
        </UserInfoContext.Provider>
    )
}