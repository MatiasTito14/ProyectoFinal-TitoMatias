import { useState, useEffect, createContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from '@/firebase/firebaseConfig';

export const useCartDetails = createContext();

export default function CartProvider(props) {
    const [cartProducts, setCartProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsCollection = collection(db, 'products');
            const productsSnapshot = await getDocs(productsCollection);
            const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
        };

        fetchProducts();
    }, []);

    const addCartProducts = (product) => {
        if (cartProducts.length === 0) {
            return setCartProducts([...cartProducts, product]);
        }

        setCartProducts(
            cartProducts.map((item) => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + product.quantity,
                    };
                } else {
                    return item;
                }
            })
        );
    };

    const deleteCartProducts = (id) => {
        setCartProducts(cartProducts.filter((item) => item.id !== id));
    };

    const totalQuantityProduct = cartProducts.reduce(
        (acc, current) => current.quantity + acc,
        0
    );

    return (
        <useCartDetails.Provider
            value={{
                cartProducts,
                addCartProducts,
                deleteCartProducts,
                totalQuantityProduct,
                products,
            }}
        >
            {props.children}
        </useCartDetails.Provider>
    );
};