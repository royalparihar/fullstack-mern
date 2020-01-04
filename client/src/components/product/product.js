import React, { useEffect, useState } from 'react';
import CenterCard from '../centerCard';
import {request} from '../../actions';


const ProductDetail = (props) => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)
  useEffect(() => {
    request.get(`/product/get/${props.match.params.id}`)
    .then((res) => {
      setProduct(res.data.product)
    })
    .catch(e => setError(true));
  },[]);
  const { name, price, description } = product;
  return (
    <CenterCard>
      {error ? <div>404</div> :
      <div>
        <h1>{name}</h1>
        <p>
          {description}
        </p>
        <div>
          {price}
        </div>
      </div>
      }
    </CenterCard>
  )
}


export default ProductDetail;
