'use client';

import { useEffect, useState, ReactElement } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import Slider, { Settings } from 'react-slick';

// project imports
import ProductCard from 'ui-component/cards/ProductCard';
import { dispatch } from 'store';
import { getRelatedProducts } from 'store/slices/product';

// types
import { Products } from 'types/e-commerce';
import util from 'api/menproduct'
// ==============================|| PRODUCT DETAILS - RELATED PRODUCTS ||============================== //

const RelatedProducts = ({ table, id }: { table?:string ,id?: string }) => {
  const [related, setRelated] = useState<Products[]>([]);
  const [itemsToShow, setItemsToShow] = useState<number>(5);
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const downXL = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));
  // const { relatedProducts } = useSelector((state) => state.product);

  useEffect(() => {
    (async()=>{
      const related:any= await util.getMensTable(table)
      setRelated(related);
    })()
    
  }, []);

  useEffect(() => {
    dispatch(getRelatedProducts(id));
  }, [id]);

  useEffect(() => {
    if (downSM) {
      setItemsToShow(1);
      return;
    }
    if (downMD) {
      setItemsToShow(2);
      return;
    }
    if (downLG) {
      setItemsToShow(3);
      return;
    }
    if (downXL) {
      setItemsToShow(4);
      return;
    } else {
      setItemsToShow(5);
    }
  }, [downSM, downMD, downLG, downXL, itemsToShow]);

  const settings: Settings = {
    dots: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    slidesToShow: itemsToShow
  };

  let productResult: ReactElement | ReactElement[] = <></>;
  if (related) {
    productResult = related.map((product: Products, index) => (
      <Box key={index} sx={{ p: 1.5 }}>
        <ProductCard
          key={index}
          id={product.id}
          image={product.image}
          name={product.name}
          offerPrice={product.offerPrice}
          salePrice={product.salePrice}
          rating={product.rating}
          table={product.route}
        />
      </Box>
    ));
  }

  return <Slider {...settings}>{productResult}</Slider>;
};

export default RelatedProducts;
