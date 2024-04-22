import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById  } from "../../redux/products";

const ProductPage = () => {

    const dispatch = useDispatch();
    // Get Product Id
    const { productId } = useParams();

    // Get Product from redux store
    const product = useSelector(state => state.products ? state.products[productId] : null);
    
    // Get selected Product
    useEffect(() => {
        dispatch(getProductById(product))
    }, [dispatch, product])


    return (
        <>
            <h1>{product.name}</h1>
            <h2>{product.description}</h2>
            <h2>{product.price}</h2>
            <h3>{product.inventory}</h3>
            <img src={product.image_url} alt={product.name} />
        </>
    )
}

export default ProductPage;