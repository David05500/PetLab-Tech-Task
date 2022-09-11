import { createContext, useReducer, useContext, useEffect } from "react"
import productsReducer from "./productsReducer"

const ProductsContext = createContext()

export const ProductsProvider = ({children}) => {
    const [{ 
        data,
        isLoading,
        isSubscription,
        searchQuery,
        priceValue,
        debouncedSearchQuery,
        page,
        perPage,
        next,
        totalCount
    }, dispatch] = useReducer(productsReducer, {
        data: null,
        isLoading: true,
        isSubscription: false,
        searchQuery: "",
        debouncedSearchQuery: "",
        priceValue: "",
        page: 1,
        // I am setting 12 items per page as the first requirement is to have 12 items in the table and the pagination, 
        // but we only have 12 items in the data set, therefore the pagination will not have more pages in it. 
        // Unless I got it wrong and it should be 10 per page, plus 2 on the second page 
        // 
        // AND I expect to see "12" products in a table
        // AND I expect to see products pagination
        perPage: 12,
        next: true,
        totalCount: 0
    })

    // This useEffect is responsible for fetching initial data as well as making requests based on selected filters
    useEffect(() => {
        dispatch({type: "UPDATE_VALUE", key: "isLoading", payload: true})
        let query = ""
        if (isSubscription)  query = query + "&subscription=true" 
        if (searchQuery) query = query + "&q=" + searchQuery 
        if(priceValue) query = query + `&price_gte=${parseInt(priceValue) - 1}&price_lte=${parseInt(priceValue) + 1}`
        fetch(`http://localhost:3010/products?_page=${page}&_limit=${perPage}${query}`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            }})
            .then(r =>  r.json().then(data => ({total: r.headers.get('x-total-count'), data: data})))
            .then(({data, total}) => {
                dispatch({type: "UPDATE_VALUE", key: "data", payload: data ? data : []})
                dispatch({type: "UPDATE_VALUE", key: "totalCount", payload: total})
                dispatch({type: "UPDATE_VALUE", key: "isLoading", payload: false})
                dispatch({type: "UPDATE_VALUE", key: "next", payload: totalCount - page * perPage > 0 ? true : false})
           })
           .catch(err => {
                throw new Error(err)
            });
    }, [debouncedSearchQuery, isSubscription, page, priceValue])

    // Debounce for the user input query, to start making requests only if 3 or more chars have been entered
    useEffect(() => {
        if (searchQuery.length >= 3 || searchQuery.length === 0) dispatch({type: "UPDATE_VALUE", key: "debouncedSearchQuery", payload: searchQuery})
    }, [searchQuery])

    return <ProductsContext.Provider value={{
        data,
        isLoading,
        isSubscription,
        setIsSubscription: (val) => dispatch({type: "UPDATE_VALUE", key: "isSubscription", payload: val}),
        searchQuery,
        setSearchQuery: (val) => dispatch({type: "UPDATE_VALUE", key: "searchQuery", payload: val}),
        priceValue,
        setPriceValue: (val) => dispatch({type: "UPDATE_VALUE", key: "priceValue", payload: val}),
        prevPage: () => dispatch({type: "UPDATE_VALUE", key: "page", payload: page - 1}),
        nextPage: () => dispatch({type: "UPDATE_VALUE", key: "page", payload: page + 1}),
        page,
        next,
        totalCount
    }}>{children}</ProductsContext.Provider>
}

const useProducts = () => {
    const context = useContext(ProductsContext)

    if (!context) throw new Error("useProducts must be used within ProductsContext")

    return context
}

export default useProducts