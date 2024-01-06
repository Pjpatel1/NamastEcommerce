import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';
import Dropdown from 'react-bootstrap/Dropdown';
import Tagify from '@yaireo/tagify';
import Arrow from '../../Images/Arrow.svg';
import EditForm from './EditForm';
import "./AddProduct.css"
import '@yaireo/tagify/dist/tagify.css';
const AddProductForm = () => {
  const [productList, setProductList] = useState([]);
  const [selectedCategory,setSelectedcategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const formRef = useRef(null);
  const [percentageOffer, setpercentageOffer] = useState(false);
  const [editPopup, setEditPopup] =  useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleDiscountToggle = () => {
    setpercentageOffer((prev) => !prev);    
  };
  const [productData, setProductData] = useState({
    Name: '',
    Price: '',
    DiscountedPrice: '',
    Taxable:true,
    Description: '',
    Quantity: '',
    Category: '',
    Stock: 0,
    Brand: '',
    DiscountPercentage:'',
    percentageOffer,
    OfferStartDate:'',
    OfferEndDate:'',
    Tag:[],
    ProductImage1: null,
    ProductImage2: null,
    ProductImage3: null,
    ProductImage1Url: '',
    ProductImage2Url: '',
    ProductImage3Url: '',
  });

  const inputRef = useRef();
  useEffect(() => {
    const tagify = new Tagify(inputRef.current, {
      // Any configuration options you want to pass
    });
    tagify.on('add', (e) => {
      console.log('Tag added:', e.detail.data.value);
      const newTag = e.detail.data.value;
      setProductData((prevData) => ({ ...prevData, Tag: [...prevData.Tag, newTag] }));
    });
    return () => {
      tagify.destroy();
    };
  }, []);

  
  
  const handleCheckboxChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.checked });
    console.log(productData)
  };
  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
    console.log('Offer Start Date:', productData.OfferStartDate);
    console.log('Product Price', productData.Price);

  };
  const handleImageChange = (e, index) => {
    const imageFile = e.target.files[0];
    setProductData({ ...productData, [`ProductImage${index}`]: imageFile });
  };
  const handleImageUrlChange = (e, index) => {
    setProductData({ ...productData, [`ProductImage${index}Url`]: e.target.value });
  };
  const HandleCustomeChange = (e) => {
    const customValue = e.target.value;
    setCustomCategory(customValue);
    setProductData((prevData) => ({ ...prevData, Category: customValue }));
  };
  const HandleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedcategory(selectedValue);
    setProductData((prevData) => ({ ...prevData, Category: selectedValue }));
   
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Optionally, you can add logic to handle Enter key press without submitting the form
      // For example, you can add the entered text as a new item to your data
    }
  };
  //This function handle submit
  const HandleSubmit = async (e) => {
    e.preventDefault()
    console.log(productData)
    console.log(percentageOffer);
    let discountedPrice
    if (percentageOffer)
    {
        const cleanedValue = productData.Price.replace(/[^0-9.]/g, '');
        const price = parseFloat(cleanedValue);
        console.log(price)
        const discountPercentage = parseFloat(productData.DiscountPercentage);
        console.log(discountPercentage)
        discountedPrice = price - (price * (discountPercentage / 100));
        console.log(discountedPrice);
    }
    else
    {
        const cleanedValue = productData.Price.replace(/[^0-9.]/g, '');
        const price = parseFloat(cleanedValue);
        const discountPercentage = parseFloat(productData.DiscountPercentage);
        discountedPrice = price - discountPercentage;
        console.log(discountedPrice);
    }  
    
    
   
    try {
      const formData = new FormData();
      formData.append('DiscountedPrice', discountedPrice.toFixed(2));
      console.log(typeof(discountedPrice.toFixed(2)));
      formData.append('percentageOffer',percentageOffer);
      for (const key in productData) {
        if(key === 'Tags')
        {
          formData.append('Tags', productData.Tag.join(', ')); // Convert array to comma-separated string
        }
        else if (key === 'OfferStartDate' || key === 'OfferEndDate') {
          formData.append(key, productData[key]);
        }
        else if (key === 'Taxable') {
          formData.append('Taxable', productData.Taxable.toString()); // Convert boolean to string
        }
        else if (productData[key]) 
        {
          formData.append(key, productData[key]);
        }
      }
      console.log(formData);
      await axios.post('https://urlnamastebackend.onrender.com/add/product', formData);  
      fetchProducts();
      // Handle success or redirect as needed
      //I am deleting the 
      setSelectedcategory('');
      setCustomCategory('');
      formRef.current.reset();
      setProductData({
        Name: '',
        Price: '',
        DiscountedPrice:'',
        Description: '',
        Quantity: '',
        Category: '',
        Stock: 0,
        Brand: '',
        DiscountPercentage:'',
        OfferStartDate:'',
        OfferEndDate:'',
        Tag:[],
        customCategory,
        ProductImage1: null,
        ProductImage2: null,
        ProductImage3: null,
        ProductImage1Url: '',
        ProductImage2Url: '',
        ProductImage3Url: '',
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
   
  };
const fetchProducts = async () =>
{
  try{
    const response = await axios.get("https://urlnamastebackend.onrender.com/getProducts");
    setProductList(response.data);
  }
  catch(error)
  {
    console.error('Error fetching Products', error);
  }
};
useEffect(()=>{
  fetchProducts();
},[productData]);
const handleEdit = (product) => {
  // Implement your edit logic here
  console.log('Edit product:', product);
  setEditPopup(true);
  setSelectedProduct(product);
};
const handleEditClose = ()=>
{
  setEditPopup(false);
}

const handleRemove = async (product) => {
  // Implement your remove logic here

  // Implement your remove logic here
  console.log('Remove product:', product);

  // Log the value of product._id
  console.log('Product ID:', product._id);
  try{
    await axios.delete(`https://urlnamastebackend.onrender.com/remove/product/${product._id}`);
    fetchProducts();
  }
  catch(error)
  {
    console.log('Error removing product:',error);
  }
 
};
useEffect(() => {
  console.log(productData);
}, [productData]);
  return (
    <>
    <form ref={formRef} className='AddProducts' onSubmit={HandleSubmit}>
      {/* Your input fields for other data */}
      <div>
      <label>
        Name:
        <input type="text" name="Name" value={productData.Name} onChange={handleInputChange} />
      </label>
      </div>
      <div>
      <label>
        Price:
        <input type="text" name="Price" value={productData.Price} onChange={handleInputChange} />
      </label>
      </div>
      <div >
      <label>
         Taxable:
          <input
            type="checkbox"
            name="Taxable"
            checked={productData.Taxable}
            onChange={handleCheckboxChange}
          />
      </label>
      </div>
      <div>
      <label>
        Description:
        <textarea name="Description" value={productData.Description} onChange={handleInputChange} />
      </label>
      </div>
      <div>
      <label>
        Quantity:
        <input type="text" name="Quantity" value={productData.Quantity} onChange={handleInputChange} />
      </label>
      </div>
      <div>
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
      </div>
      <div>
      <label>
        Stock:
        <input type="number" name="Stock" value={productData.Stock} onChange={handleInputChange} />
      </label>
      </div>
      <div>
      <label>
        Brand:
        <input type="text" name="Brand" value={productData.Brand} onChange={handleInputChange} />
      </label>
      </div>
      <div>
      <input ref={inputRef} placeholder="Type and press Enter to add tags" />
        {/* <label>
          Tags:
          <Tagify
            value={productData.Tags} // Set the initial tags
            onChange={(e) => setProductData({ ...productData, Tags: e.detail.value })}
          />
        </label> */}
      </div>
      <div>
          <label>
            Enter the discount percentage
          </label>
          <input type="number" name="DiscountPercentage" value={productData.DiscountPercentage} onChange={handleInputChange} />
          <input
            type="checkbox"
            checked={percentageOffer}
            onChange={handleDiscountToggle}
          />
      </div>
      <div>
        <label>
          Offer Start Date
        </label>
        <input type="date" name='OfferStartDate' value = {productData.OfferStartDate} onChange = {handleInputChange}/>
      </div>
      <div>
        <label>
          Offer End Date
        </label>
        <input type="date" name='OfferEndDate' value = {productData.OfferEndDate} onChange = {handleInputChange}/>
      </div>
      {/* Your file input fields */}
      <div>
      <label>
        Product Image 1:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 1)}
        />
        URL
        <input
          type="text"
          name="ProductImage1Url"
          value={productData.ProductImage1Url}
          onChange={(e) => handleImageUrlChange(e, 1)}
        />
      </label>
      </div>
      <div>
      <label>
        Product Image 2:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 2)}
        />
        URL
        <input
          type="text"
          name="ProductImage2Url"
          value={productData.ProductImage2Url}
          onChange={(e) => handleImageUrlChange(e, 2)}
        />
      </label>
      </div>
      <div>
      <label>
        Product Image 3:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 3)}
        />
        URL
        <input
          type="text"
          name="ProductImage3Url"
          value={productData.ProductImage3Url}
          onChange={(e) => handleImageUrlChange(e, 3)}
        />
      </label>
      </div>
      <button type="submit">Submit</button>
    </form>
    <div className='displayDatabase'> 
      <ProductTable data={productList}  onRemove={handleRemove} onEdit={handleEdit}/>
    </div>
   {editPopup && selectedProduct && (
        <div className='EditPopup'>

          <div className='Tittlebar'>
            <div className='section'>
              
            </div>
            <div className='section'>
              Edit Product
            </div>
            <div className='section'>
              <button onClick={()=>handleEditClose()}>
                  Close Button
              </button>
            </div>
          </div>
            <div className='EditForm'>
              <EditForm product={selectedProduct}/>
            </div>
        </div>
    )}
    </>
  );
};

export default AddProductForm;
