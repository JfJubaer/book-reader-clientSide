import { useSinglebooksQuery } from '@/redux/features/books/booksApi';
import { useAppSelector } from '@/redux/hook';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './files.css';
import { usePatchProductMutation } from '@/redux/features/products/productApi';

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);

  const [patchProduct] = usePatchProductMutation();
  const { data } = useSinglebooksQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  console.log(user.email, 'user');
  console.log(data?.data?.authorEmail, 'author');
  const [review, setReview] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track the index of the review being edited
  const [editedReview, setEditedReview] = useState('');

  const handleAddReview = () => {
    if (user) {
      const updatedReviews = [...data.data.reviews, review];
      const updatedBook = { ...data.data, reviews: updatedReviews };
      console.log('Book with added review:', updatedBook);
      patchProduct({
        id,
        data: updatedBook,
      });
      setReview('');
    }
  };

  const handleEditReview = (index: number) => {
    if (user) {
      const updatedReviews = [...data.data.reviews];
      updatedReviews[index] = editedReview;
      const updatedBook = { ...data.data, reviews: updatedReviews };
      console.log('Book with edited review:', updatedBook);
      patchProduct({
        id,
        data: updatedBook,
      });
      setEditingIndex(null); // Reset editing index
      setEditedReview('');
    }
  };

  const handleDeleteReview = (reviewToDelete: string) => {
    if (user) {
      const updatedReviews = data?.data?.reviews.filter(
        (r: string) => r !== reviewToDelete
      );
      const updatedBook = { ...data.data, reviews: updatedReviews };
      console.log('Book with deleted review:', updatedBook);
      patchProduct({
        id,
        data: updatedBook,
      });
    }
  };

  return (
    <div className="book-details">
      <h2>{data?.data?.title}</h2>
      <p>
        <strong>Author:</strong> {data?.data?.author}
      </p>
      <p>
        <strong>Genre:</strong> {data?.data?.genre}
      </p>
      <p>
        <strong>Publication Date:</strong> {data?.data?.publicationDate}
      </p>
      <p>
        <strong>Reviews:</strong>
      </p>
      <ul>
        {data?.data?.reviews.map((review: string, index: number) => (
          <li key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                value={editedReview}
                onChange={(e) => setEditedReview(e.target.value)}
              />
            ) : (
              review
            )}
            <button onClick={() => handleDeleteReview(review)}>Delete</button>
            {editingIndex === index ? (
              <button onClick={() => handleEditReview(index)}>Save</button>
            ) : (
              <button
                onClick={() => {
                  setEditedReview(review);
                  setEditingIndex(index);
                }}
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Add a review"
        />
        <button onClick={handleAddReview}>Add Review</button>
      </div>

      {data?.data?.authorEmail === user?.email ? (
        <div>
          <button>
            {' '}
            <Link to={`/edit-product/${data?.data?._id}`}>Edit Book</Link>
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default BookDetails;
