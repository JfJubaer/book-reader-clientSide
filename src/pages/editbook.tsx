import { toast } from '@/components/ui/use-toast'; // Assuming there's a `usePatchProductMutation` hook for updating books
import { useSinglebooksQuery } from '@/redux/features/books/booksApi';
import { usePatchProductMutation } from '@/redux/features/products/productApi';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './files.css';

interface IBook {
  _id: string; // Assuming the book has an _id field for identification
  title: string;
  author: string;
  genre: string;
  authorEmail: string;
  publicationDate: string;
  reviews: string[];
}

const EditBook: React.FC = () => {
  const { id } = useParams();

  const [patchProduct, { isSuccess }] = usePatchProductMutation();
  const { data, isLoading } = useSinglebooksQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const [editedBook, setEditedBook] = useState<IBook>(data?.data);
  console.log(editedBook);
  useEffect(() => {
    if (isSuccess) {
      toast({ description: 'Edited Successfully' });
    }
  }, [isSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleUpdateBook = () => {
    console.log(editedBook);
    patchProduct({
      id,
      data: editedBook,
    });
  };

  return (
    <div className="edit-book-container">
      <h2>Edit Book</h2>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {' '}
          <form className="edit-book-form">
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={editedBook?.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Author:</label>
              <input
                type="text"
                name="author"
                value={editedBook.author}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Genre:</label>
              <input
                type="text"
                name="genre"
                value={editedBook.genre}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Author Email:</label>
              <input
                type="email"
                name="authorEmail"
                value={editedBook.authorEmail}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Publication Date:</label>
              <input
                type="text"
                name="publicationDate"
                value={editedBook.publicationDate}
                onChange={handleChange}
              />
            </div>
          </form>
          <button className="edit-book-submit" onClick={handleUpdateBook}>
            Update Book
          </button>
        </>
      )}
    </div>
  );
};

export default EditBook;
