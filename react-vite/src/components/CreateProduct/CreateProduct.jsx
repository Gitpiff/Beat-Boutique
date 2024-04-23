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
        

    </form>
)
