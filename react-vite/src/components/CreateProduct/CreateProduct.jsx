import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewProduct } from '../../redux/products'

function CreateProduct() {
  const dispatch = useDispatch();
  const [prodData, setProdData] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '',
    type: '',
  });

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
      await dispatch(createNewProduct(prodData));
      setProdData({
        name: '',
        description: '',
        price: '',
        inventory: '',
        type: '',
      });
    } catch (error) {
      console.error('Error creating product: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={prodData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={prodData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Type</label>
        <select name="type" value={prodData.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Musical Instruments">Musical Instruments</option>
          <option value="Clothing">Clothing</option>
          <option value="Tapes">Tapes</option>
          <option value="CDs">CDs</option>
          <option value="Pins">Pins</option>
        </select>
      </div>
      <div>
        <label>Inventory</label>
        <input
          type="number"
          name="inventory"
          value={prodData.inventory}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={prodData.price}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
}

export default CreateProduct;
