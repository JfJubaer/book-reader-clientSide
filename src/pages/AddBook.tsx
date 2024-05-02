
import { toast } from '@/components/ui/use-toast';
import { usePostBookMutation } from '@/redux/features/books/booksApi';
import React, { useState } from 'react';

const AddBook: React.FC = () => {

  type IBook2 = {
        title: string;
        author: string;
        genre: string;
        authorEmail: string;
        publicationDate: string;
        reviews: string[];
      };


  const [book, setBook] = useState<IBook2>({
    title: '',
    author: '',
    genre: '',
    authorEmail: '',
    publicationDate: '',
    reviews:[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  

  const [postBook] = usePostBookMutation();

  const handleLogBookData = () => {
    console.log(book);
    postBook(book);
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={book.title} onChange={handleChange} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={book.author} onChange={handleChange} />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" name="genre" value={book.genre} onChange={handleChange} />
        </div>
        <div>
          <label>Author Email:</label>
          <input type="email" name="authorEmail" value={book.authorEmail} onChange={handleChange} />
        </div>
        <div>
          <label>Publication Date:</label>
          <input type="text" name="publicationDate" value={book.publicationDate} onChange={handleChange} />
        </div>
      </form>
      <button onClick={handleLogBookData}>Log Book Data</button>
    </div>
  );
};

export default AddBook;
