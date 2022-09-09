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
        next
    }, dispatch] = useReducer(productsReducer, {
        data: null,
        isLoading: true,
        isSubscription: false,
        searchQuery: "",
        debouncedSearchQuery: "",
        priceValue: "",
        page: 1,
        next: true
    })

    useEffect(() => {
        dispatch({type: "UPDATE_VALUE", key: "isLoading", payload: true})
        let query = ""
        if (isSubscription)  query = query + "&subscription=true" 
        if (searchQuery) query = query + "&q=" + searchQuery 
        if(priceValue) query = query + `&price_gte=${parseInt(priceValue) - 1}&price_lte=${parseInt(priceValue) + 1}`
        fetch(`http://localhost:3010/products?_page=${page}&_limit=12${query}`)
            .then((response) => response.json())
            .then((data) => {
                dispatch({type: "UPDATE_VALUE", key: "data", payload: data ? data : []})
                dispatch({type: "UPDATE_VALUE", key: "isLoading", payload: false})
                dispatch({type: "UPDATE_VALUE", key: "next", payload: data?.length !== 12 ? false : true})
    });
    }, [debouncedSearchQuery, isSubscription, page, priceValue])

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
        next
    }}>{children}</ProductsContext.Provider>
}

const useProducts = () => {
    const context = useContext(ProductsContext)

    if (!context) throw new Error("useProducts must be used within ProductsContext")

    return context
}

export default useProducts