'use client';

import { useEffect, useState, ReactElement } from 'react';
import util from '../../../../api/womenproduct';
import utils from '../../../../api/products1';

// material-ui
import { styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SortOptions from 'components/application/e-commerce/Products/SortOptions';
import ProductEmpty from 'components/application/e-commerce/Products/ProductEmpty';
import ProductFilter from 'components/application/e-commerce/Products/ProductFilter';
import ProductFilterView from 'components/application/e-commerce/Products/ProductFilterView';

import Loader from 'ui-component/Loader';
import ProductCard from 'ui-component/cards/ProductCard';
import FloatingCart from 'ui-component/cards/FloatingCart';
import SkeletonProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';
import useConfig from 'hooks/useConfig';

import { resetCart } from 'store/slices/cart';
import { dispatch, useSelector } from 'store';
import { appDrawerWidth, gridSpacing } from 'store/constant';
import { getProducts, filterProducts } from 'store/slices/product';

// assets
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// types
import { Products as ProductsTypo, ProductsFilter } from 'types/e-commerce';
import UtilitiesShadow from 'views/utils/util-shadow';

// product list container
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter
  }),
  marginRight: -appDrawerWidth,
  [theme.breakpoints.down('xl')]: {
    paddingRight: 0,
    marginRight: 0
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter
    }),
    marginRight: 0
  })
}));

const filterIsEqual = (a1: ProductsFilter, a2: ProductsFilter) =>
  a1 === a2 ||
  (a1.length === a2.length &&
    a1.search === a2.search &&
    a1.sort === a2.sort &&
    a1.price === a2.price &&
    a1.rating === a2.rating &&
    JSON.stringify(a1.gender) === JSON.stringify(a2.gender) &&
    JSON.stringify(a1.categories) === JSON.stringify(a2.categories) &&
    JSON.stringify(a1.colors) === JSON.stringify(a2.colors));

// ==============================|| E-COMMERCE - PRODUCT GRID ||============================== //

const ProductsList = () => {
  const { borderRadius } = useConfig();

  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const matchDownLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));

  const [loading, setLoading] = useState<boolean>(true);
  const [productLoading, setProductLoading] = useState(true);

  useEffect(() => {
    setProductLoading(false);
  }, []);

  // drawer
  const [open, setOpen] = useState(productLoading);
  const handleDrawerOpen = () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setOpen(!matchDownLG);
  }, [matchDownLG]);

  const cart = useSelector((state) => state.cart);

  // product data
  // const { products } = useSelector((state) => state.product);
  const [products, SetProduct] = useState<ProductsTypo[]>([])

  useEffect(() => {
    (async ()=> {
      const prod : any = await util.getWomensHats();
      SetProduct(prod)
    })()
    setLoading(false);
  },[])

  useEffect(() =>{
    // clear cart if complete order
    if (cart.checkout.step > 2) {
      dispatch(resetCart());
    }
  }, [cart.checkout.step]);

  // filter
  const initialState: ProductsFilter = {
    search: '',
    sort: 'low',
    gender: [],
    categories: ['all'],
    colors: [],
    price: '',
    rating: 0
  };
  const [filter, setFilter] = useState(initialState);

  // search filter
  const handleSearch = async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    const newString = event?.target.value;
    setFilter({ ...filter, search: newString! });
  };

  // sort options
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openSort = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelFilter = (type: string, params: string, rating?: number) => {
    setProductLoading(true);
    let updatedFilter = { ...filter };
  
    switch (type) {
      case 'gender':
        updatedFilter.gender = updatedFilter.gender.some((item) => item === params)
          ? updatedFilter.gender.filter((item) => item !== params)
          : [...updatedFilter.gender, params];
        break;
      case 'categories':
        updatedFilter.categories = updatedFilter.categories.some((item) => item === params)
          ? updatedFilter.categories.filter((item) => item !== params)
          : updatedFilter.categories.some((item) => item === 'all') || params === 'all'
          ? [params]
          : [...updatedFilter.categories, params];
        break;
      case 'colors':
        updatedFilter.colors = updatedFilter.colors.some((item) => item === params)
          ? updatedFilter.colors.filter((item) => item !== params)
          : [...updatedFilter.colors, params];
        break;
      case 'price':
        updatedFilter.price = params;
        break;
      case 'search':
        updatedFilter.search = params;
        break;
      case 'sort':
        updatedFilter.sort = params;
        break;
      case 'rating':
        updatedFilter.rating = rating!;
        break;
      case 'reset':
        updatedFilter = initialState;
        break;
      default:
      // no options
    }
  
    setFilter(updatedFilter);
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setProductLoading(true)
      const filteredProducts: any = await utils.filterProducts(filter,'Womenshats');
      SetProduct(filteredProducts);
      setProductLoading(false);
    };
  
    fetchFilteredProducts();
  }, [filter]);
  

  // sort filter
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: string) => {
    setFilter({ ...filter, sort: index });
    setAnchorEl(null);
  };

  const sortLabel = SortOptions.filter((items) => items.value === filter.sort);

  let productResult: ReactElement | ReactElement[] = <></>;

  if (!productLoading) {
    if (products && products.length > 0) {
      productResult = products.map((product: ProductsTypo, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <ProductCard
            id={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            offerPrice={product.offerPrice}
            salePrice={product.salePrice}
            rating={product.rating}
            color={product.colors ? product.colors[0] : undefined}
            table={'Womenshats'}
          />
        </Grid>
      ));
    } else {
      productResult = (
        <Grid item xs={12} sx={{ mt: 3 }}>
          <ProductEmpty />
        </Grid>
      );
    }
  }

  const spacingMD = matchDownMD ? 1 : 1.5;

  if (loading) return <Loader />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between" spacing={matchDownMD ? 0.5 : 2}>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h4">Shop</Typography>
              <IconButton size="large" aria-label="forward">
                <ArrowForwardIosIcon sx={{ width: '0.875rem', height: '0.875rem', fontWeight: 500, color: 'grey.500' }} />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={matchDownSM ? 0.5 : spacingMD}>
              <TextField
                sx={{ width: { xs: 140, md: 'auto' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
                value={filter.search}
                placeholder="Search Product"
                size="small"
                onChange={handleSearch}
              />

              <Typography sx={{ pl: 1.5, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>|</Typography>

              <Button
                disableRipple
                onClick={handleDrawerOpen}
                color="secondary"
                startIcon={<FilterAltIcon sx={{ fontWeight: 500, color: 'secondary.200' }} />}
              >
                Filter
              </Button>

              <Typography sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>|</Typography>
              <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Typography variant="h5">Sort by: </Typography>
                <Button
                  id="demo-positioned-button"
                  aria-controls="demo-positioned-menu"
                  aria-haspopup="true"
                  aria-expanded={openSort ? 'true' : undefined}
                  onClick={handleClickListItem}
                  sx={{ color: 'grey.500', fontWeight: 400 }}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  {sortLabel.length > 0 && sortLabel[0].label}
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={openSort}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  {SortOptions.map((option, index) => (
                    <MenuItem
                      sx={{ p: 1.5 }}
                      key={index}
                      selected={option.value === filter.sort}
                      onClick={(event) => handleMenuItemClick(event, option.value)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex' }}>
          <Main open={open}>
            <ProductFilterView filter={filter} filterIsEqual={filterIsEqual} handelFilter={handelFilter} initialState={initialState} />
            <Grid container spacing={gridSpacing}>
              {productLoading
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                      <SkeletonProductPlaceholder />
                    </Grid>
                  ))
                : productResult}
            </Grid>
          </Main>
          <Drawer
            sx={{
              ml: open ? 3 : 0,
              height: matchDownLG ? '100vh' : 'auto',
              flexShrink: 0,
              zIndex: { xs: 1200, lg: open ? 1000 : -1 },
              overflowX: 'hidden',
              width: appDrawerWidth,
              '& .MuiDrawer-paper': {
                height: 'auto',
                width: appDrawerWidth,
                position: matchDownLG ? 'fixed' : 'relative',
                border: 'none',
                borderRadius: matchDownLG ? 0 : `${borderRadius}px`
              }
            }}
            variant={matchDownLG ? 'temporary' : 'persistent'}
            anchor="right"
            open={open}
            ModalProps={{ keepMounted: true }}
            onClose={handleDrawerOpen}
          >
            {open && (
              <PerfectScrollbar>
                <ProductFilter filter={filter} handelFilter={handelFilter} />
              </PerfectScrollbar>
            )}
          </Drawer>
        </Box>
      </Grid>
      <FloatingCart />
    </Grid>
  );
};

export default ProductsList;