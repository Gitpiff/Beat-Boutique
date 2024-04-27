import DeleteProductModal from "./DeleteConfirmationModal"
import OpenModalButton from "./OpenModalButton";

const DeleteProductButton = ({ product }) => {

    return (
        <OpenModalButton
            buttonText="Delete"
            product={product}
            modalComponent={<DeleteProductModal product={product} />}
        />
    )
}

export default DeleteProductButton;
