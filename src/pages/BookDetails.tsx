import { useSinglebooksQuery } from '@/redux/features/books/booksApi';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';



const BookDetails: React.FC = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useSinglebooksQuery(id,{  refetchOnMountOrArgChange: true,
        pollingInterval: 50000,});
  const [review, setReview] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedReview, setEditedReview] = useState('');

  const handleAddReview = () => {
    const updatedReviews = [...data.data.reviews, review];
    const updatedBook = { ...data.data, reviews: updatedReviews };
    console.log('Book with added review:', updatedBook);
    setReview('');
  };

  const handleEditReview = (i:number) => {
    const updatedReviews = [...data.data.reviews];
    updatedReviews[i] = editedReview;
    const updatedBook = { ...data.data, reviews: updatedReviews };
    console.log('Book with edited review:', updatedBook);
    setEditedReview('');
    setEditMode(false);
  };

  const handleDeleteReview = (reviewToDelete: string) => {
    const updatedReviews = data?.data?.reviews.filter((r:string) => r !== reviewToDelete);
    const updatedBook = { ...data.data, reviews: updatedReviews };
    console.log('Book with deleted review:', updatedBook);
  };

  return (
    <div>
      <h2>{data?.data?.title}</h2>
      <p><strong>Author:</strong> {data?.data?.author}</p>
      <p><strong>Genre:</strong> {data?.data?.genre}</p>
      <p><strong>Publication Date:</strong> {data?.data?.publicationDate}</p>
      <p><strong>Reviews:</strong></p>
      <ul>
        {data?.data?.reviews.map(( index:number,review:string) => (
          <li key={index}>
            {editMode && editedReview === review ? (
              <input
                type="text"
                value={editedReview}
                onChange={(e) => setEditedReview(e.target.value)}
              />
            ) : (
              review
            )}
            <button onClick={() => handleDeleteReview(review)}>Delete</button>
            {editMode && editedReview === review ? (
              <button onClick={()=>handleEditReview(index)}>Save</button>
            ) : (
              <button onClick={() => {setEditedReview(review); setEditMode(true);}}>Edit</button>
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
    </div>
  );
};

export default BookDetails;
