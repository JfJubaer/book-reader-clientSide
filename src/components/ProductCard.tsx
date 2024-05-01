import { IBook } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';

interface IProps {
  product: IBook;
}

export default function ProductCard({ product }: IProps) {
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IBook) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/product-details/${product._id}`} className="w-full">
        
          <h1 className="text-xl font-semibold">Title : { product?.title}</h1>
        </Link>
        <p>Author: {product?.author}</p>
        <p className="text-sm">
        Genre: {product?.genre}
        </p>
        <p className="text-sm">Publication Date: {product?.publicationDate}</p>
        {/* <Button variant="default" onClick={() => handleAddProduct(product)}>
          Add to cart
        </Button> */}
      </div>
    </div>
  );
}