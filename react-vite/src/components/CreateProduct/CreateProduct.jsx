import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct } from '../../redux/products';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  const [prodData, setProdData] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '',
    type: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!sessionUser) navigate('/');
  }, [sessionUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prodData.price > 100000) return alert("Price is too high!");
    if (sessionUser) {
      try {
        const newProductData = {
          ...prodData,
          price: +prodData.price,
          inventory: +prodData.inventory,
        };

        const newProduct = await dispatch(createNewProduct(newProductData));

        if (newProduct && selectedImage) {
          const formData = new FormData();
          formData.append('image', selectedImage);

          await fetch(`/api/products/images/${newProduct.id}`, {
            method: 'POST',
            body: formData,
          });
        }

        setProdData({
          name: '',
          description: '',
          price: '',
          inventory: '',
          type: '',
        });
        setSelectedImage(null);
        e.target.reset();
        navigate(`/products/current`);
      } catch (error) {
        console.error('Error creating product: ', error);
      }
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
          <option value="MUSICAL_INSTRUMENTS">Musical Instruments</option>
          <option value="CLOTHING">Clothing</option>
          <option value="TAPES">Tapes</option>
          <option value="CDS">CDs</option>
          <option value="PINS">Pins</option>
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
      <div>
        <label>Image</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
}

export default CreateProduct;
