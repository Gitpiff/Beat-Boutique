import { useDispatch } from 'react-redux';
import { deleteProductById } from "../../redux/products";

const DeleteConfirmationModal = ({ productId, onClose }) => {
  const dispatch = useDispatch();

  const handleDeleteConfirmation = () => {
    dispatch(deleteProductById(productId));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div>
      <h3>Confirmation</h3>
      <p>Are you sure you want to delete this product?</p>
      <button onClick={handleDeleteConfirmation}>Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default DeleteConfirmationModal;
