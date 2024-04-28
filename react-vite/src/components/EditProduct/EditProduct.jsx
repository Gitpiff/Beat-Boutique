import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProductById } from '../../redux/products';
import './EditProduct.css';

function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products[id]);

  const [prodData, setProdData] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '',
    type: product?.type.value,
  });

  useEffect(() => {
    if (!sessionUser) navigate('/');
    dispatch(getProductById(id));
  }, [dispatch, id, sessionUser, navigate]);

  console.log(product.type)
  useEffect(() => {
    if (product) {
      setProdData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        inventory: product.inventory || '',
        type: product?.type,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProductData = {
        ...prodData,
        price: +prodData.price,
        inventory: +prodData.inventory,
      };
      await dispatch(updateProductById(id, updatedProductData));
      navigate(`/products/${id}`);
    } catch (error) {
      console.error('Error updating product: ', error);
    }
  };

  const handleCancel = () => {
    return navigate(`/products/current`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-form-container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>Name</label>
          <input className='data-input'
            type="text"
            name="name"
            value={prodData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className='data-input'
            name="description"
            value={prodData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={prodData.type} onChange={handleChange} className='data-input' required>
            <option value="">Select Type</option>
            <option value="MUSICAL_INSTRUMENTS">Musical Instruments</option>
            <option value="CLOTHING">Clothing</option>
            <option value="TAPES">Tapes</option>
            <option value="CDS">CDs</option>
            <option value="PINS">Pins</option>
          </select>
        </div>
        <div className="form-group">
          <label>Inventory</label>
          <input className='data-input'
            type="number"
            name="inventory"
            value={prodData.inventory}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input className='data-input'
            type="number"
            name="price"
            value={prodData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="button-group">
        <button type="submit" className="submit-button">Update Product</button>
        <button type="button" onClick={handleCancel} className="cancel-button">
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
