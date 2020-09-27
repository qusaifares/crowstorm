import { ProductType } from '../components/Product/Product';

const shoeSizes = [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];
const genSizes = ['Small', 'Medium', 'Large', 'XL', 'XXL'];
const liteSizes = ['Small', 'Medium', 'Large'];

type productSizeOptions = {
  [key in ProductType]: any[] | null;
};

const productOptions: productSizeOptions = {
  Jackets: genSizes,
  Sweaters: genSizes,
  Shirts: genSizes,
  Pants: genSizes,
  Watches: null,
  Footwear: shoeSizes,
  Socks: liteSizes,
  Underwear: liteSizes,
  Other: null
};

export default productOptions;
