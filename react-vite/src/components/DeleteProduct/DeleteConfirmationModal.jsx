import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteProductById } from '../../redux/products';

const DeleteProductModal = ({ product }) => {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProductById(product))
      .then(closeModal)
      .catch(async (response) => {
        const data = await response.json();
        return data;
      });
  };

  return (
    <div className="deleteProductModal">
      <h3>Confirmation</h3>
      <p>Are you sure you want to delete this product?</p>
      <button className="btn delete-btn" onClick={handleDelete}>
        Delete Product
      </button>
      <button className="btn confirm-btn" onClick={closeModal}>
        No (Keep Product)
      </button>
    </div>
  );
};

export default DeleteProductModal;
