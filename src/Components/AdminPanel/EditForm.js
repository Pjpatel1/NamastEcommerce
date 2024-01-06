import React, { useEffect, useState, useRef } from 'react';
import { Form } from 'react-bootstrap';
const EditForm = ({ product }) => {
    const [selectedCategory,setSelectedcategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const HandleCustomeChange = (e) => {
        const customValue = e.target.value;
        setCustomCategory(customValue)
        console.log("I am in custome category:"+ customCategory);
        setFormData((prevData) => ({ ...prevData, Category: customValue }));
      };
      const HandleCategoryChange = (e) => {
        const selectedValue = e.target.value;
    
        setSelectedcategory(selectedValue);
        
          console.log("Selected category:"+selectedValue)
          setFormData((prevData) => ({ ...prevData, Category: selectedValue }));
       
      };
      console.log("Product Id"+product._id)
    const [formData, setFormData] = useState({
        Name: product.Name,
        Price: product.Price,
        Description: product.Description,
        Category: product.Category,
        Quantity: product.Quantity,
        Stock: product.Stock,
        Brand: product.Brand,
        DiscountPercentage: product.DiscountPercentage,
        OfferStartDate: product.OfferStartDate,
        OfferEndDate: product.OfferEndDate,
        ProductImage1Url: product.ProductImage1Url,
        // Add other fields as needed
      });
      useEffect(() => {
        console.log('Updated FormData:', formData);
      }, [formData]);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
      const handleEditFormSubmit = (e) => {
        e.preventDefault();
        // Pass the updated form data to the parent component for further processing
        // onSubmit(formData);
      };
      const handleEditSubmit = async()=>{
        try {
            const response = await fetch(`http://localhost:3001/editProduct/${product._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
        
            if (response.ok) {
              // Product updated successfully
            } else {
              // Handle error response
              const data = await response.json();
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error:', error.message);
          }
      }
  return (
    <div className="edit-product-modal">
            <form  className='AddProducts' onSubmit={handleEditFormSubmit}>
                {/* Your input fields for other data */}
                <div>
                    <label>
                        Name:
                        <input type="text" name="Name" value={formData.Name} onChange={handleInputChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input type="text" name="Price" value={formData.Price} onChange={handleInputChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea name="Description" value={formData.Description} onChange={handleInputChange}/>
                    </label>
                </div>
                <div>
                    <label>
                    Quantity:
                    <input type="text" name="Quantity" value={formData.Quantity}  onChange={handleInputChange}/>
                    </label>
                </div>
                    <label>
                        <select id = "categoryDropdown" value={selectedCategory} onChange={HandleCategoryChange}>
                            <option value="" disabled selected hidden>Select Category</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Indian_Snacks">Indian Snack</option>
                            <option value="Lentils">Lentils</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Flowers">Flowers</option>
                            <option value="Frozen_Food">Frozen Food</option>
                            <option value="Spices">Spices</option>
                            <option value="Instant_mix">Instant_mix</option>

                            <option value = "custom">Enter Custome value</option>
                        </select>
                        {selectedCategory === 'custom' && (
                        <input
                            type="text"
                            placeholder="Enter custom category"
                            value={customCategory}
                            onChange={HandleCustomeChange}
                        />
                        )}
                    </label>
                <div>
                    <label>
                    Stock:
                    <input type="number" name="Stock" value={formData.Stock} onChange={handleInputChange} />
                    </label>
                </div>
                <div>
                    <label>
                    Brand:
                    <input type="text" name="Brand" value={formData.Brand}  onChange={handleInputChange}/>
                    </label>
                </div>
              
                <div>
                    <label>
                    Enter the discount percentage
                    </label>
                    <input type="number" name="DiscountPercentage" value={formData.DiscountPercentage} onChange={handleInputChange} />
                    <input
                    type="checkbox"
                    checked={product.percentageOffer}
                    // onChange={handleDiscountToggle}
                    />
                </div>
                <div>
                    <label>
                    Offer Start Date
                    </label>
                    <input type="date" name='OfferStartDate' value={formData.OfferStartDate} onChange={handleInputChange} />
                </div>
                <div>
                    <label>
                    Offer End Date
                    </label>
                    <input type="date" name='OfferEndDate' value={formData.OfferEndDate}  onChange={handleInputChange} />
                </div>
        {/* Your file input fields */}
                <div>
                    <label>
                    Product Image 1:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                    />
                    URL
                    <input
                        type="text"
                        name="ProductImage1Url"
                        value={formData.ProductImage1Url}
                        onChange={handleInputChange}
                    />
                    </label>
                </div>
        {/* ... (other image inputs) */}
        <button type="submit" onClick={()=>{handleEditSubmit()}}>Submit</button>
        </form>

    </div>
  );
};

export default EditForm;
