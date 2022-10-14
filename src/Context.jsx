import { createContext, useEffect, useState } from "react"

const Context = createContext()

function ContextProvider({children}) {
    const [allPhotos,setAllPhotos] = useState([])
    const [cartItems,setCartItems] = useState([])

    function toggleFavorite(id) {
        const updatedArr = allPhotos.map(photo => {
            if(photo.id === id) {
                return {...photo, isFavorite: !photo.isFavorite}
            }
            return photo
        })
        setAllPhotos(updatedArr)
    }

    function addToCart(obj){
        setCartItems(prevCartItems => [...prevCartItems, obj])
    }

    function removeFromCart(id){
        setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== id))
    }

    function emptyCart() {
        setCartItems([])
    }

    useEffect(()=>{
        fetch("https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json")
            .then(res => res.json())
            .then(data => setAllPhotos(data))
    }, [])

    return (
        <Context.Provider value={{allPhotos, toggleFavorite, addToCart, cartItems, removeFromCart, emptyCart}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}