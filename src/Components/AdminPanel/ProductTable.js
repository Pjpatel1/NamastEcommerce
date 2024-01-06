// ProductTable.js
import { Http } from '@mui/icons-material';
import React from 'react';
import DataTable from 'react-data-table-component';

const ProductTable = ({ data, onEdit, onRemove }) => {
    const isBase64Image = (str) => {
        // Regular expression to check if the string is a base64 image
        const base64Regex = /^data:image\/([a-zA-Z]*);base64,([^\s]*)$/;
        return base64Regex.test(str);
      };
      const renderImage = (image) => {
        if (image && (image.startsWith('http') || image.startsWith('https'))) {
          // If the image is a URL
          return <img src={image} alt="Product" style={{ width: '50px' }} />;
        } else if (image && image.startsWith('data:image')) {
          // If the image is a base64 string
          return <img src={image} alt="Product" style={{ width: '50px' }} />;
        }
        return null;
      };
  const columns = [
    { name: 'Name', selector: 'Name', sortable: true },
    { name: 'Price', selector: 'Price', sortable: true },
    { name: 'Description', selector: 'Description', sortable: true },
    { name: 'Quantity', selector: 'Quantity', sortable: true },
    { name: 'Category', selector: 'Category', sortable: true },
    { name: 'Stock', selector: 'Stock', sortable: true },
    { name: 'Brand', selector: 'Brand', sortable: true },
    { 
        name: 'ProductImage1', 
        selector: 'ProductImage1', 
        sortable: true, 
        cell: row => renderImage(row.ProductImage1),
    },
    {
      Name: 'Start Date', selector:'Start Date', sortable: true
    },
    {
      Name:'End Date',selector:'End Date', sortable:true
    },
    {
      Tag:'Tag',selector:'Tag', sortable:true
    },
    {name:'Actions',
     cell: row =>(
        <div>
            <button onClick={() => onEdit(row)}>Edit</button>
            <button onClick={() => onRemove(row)}>Remove</button>
        </div>
     )   
},
  ];

  return <DataTable columns={columns} data={data} />;
};

export default ProductTable;
