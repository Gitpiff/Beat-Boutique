import { useState } from 'react';

function CreateProduct() {
    const [prodData, setProdData] = useState({
        name: '',
        description: '',
        price: '',
        inventory: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProdData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
}

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prodData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Product Created:', data)
            setProdData({ name: '', description: '', price: '', inventory: '' })
        } else {
            throw new Error('Failed to create product')
        }
    }
    catch (error) {
        console.error('Error creating product: ', error)
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
            <label>Inventory</label>
            <input
            type="number" //HELP
            name="inventory"
            value={prodData.inventory}
            onChange={handleChange}
            required
            />
        </div>
        <button type="submit">Create Product</button>

    </form>
)
