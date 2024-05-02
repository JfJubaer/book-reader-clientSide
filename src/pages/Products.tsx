import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useGetbooksQuery } from '@/redux/features/books/booksApi';
import {
  setPriceRange,
  toggleState,
} from '@/redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';

export default function Products() {
  const { data } = useGetbooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IBook[]>(data?.data);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  // Filter books based on genre and publication year
  const filterBooks = (books: IBook[]) => {
    let filteredBooks = books;

    // Filter by genre
    if (selectedGenres.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        selectedGenres.includes(book.genre)
      );
    }

    // Filter by publication year
    if (startYear !== null) {
      filteredBooks = filteredBooks.filter(
        (book) => Number(book.publicationDate.slice(-4)) >= startYear
      );
    }
    if (endYear !== null) {
      filteredBooks = filteredBooks.filter(
        (book) => Number(book.publicationDate.slice(-4)) <= endYear
      );
    }

    return filteredBooks;
  };

  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Filter search results based on query
    const filteredResults = data?.data?.filter((book: IBook) => {
      const { title, author, genre } = book;
      const normalizedQuery = query.toLowerCase();
      return (
        title.toLowerCase().includes(normalizedQuery) ||
        author.toLowerCase().includes(normalizedQuery) ||
        genre.toLowerCase().includes(normalizedQuery)
      );
    });
    setSearchResults(filteredResults || []);
  };

  // Handle genre filter change
  const handleGenreChange = (genre: string) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
  };

  // Handle year range change
  const handleStartYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value);
    setStartYear(year);
  };

  const handleEndYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value);
    setEndYear(year);
  };

  // Filter books when genre or year range changes
  const filteredBooks = filterBooks(searchResults || []);

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div
            onClick={() => dispatch(toggleState())}
            className="flex items-center space-x-2 mt-3"
          >
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div>
          <h1 className="text-2xl uppercase">Search</h1>
          <input
            type="text"
            placeholder="Search by title, author, or genre"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded px-2 py-1 mt-3 w-full"
          />
        </div>
        <div>
          <h1 className="text-2xl uppercase">Filter by Genre</h1>
          <div className="flex flex-col mt-3">
            <label>
              <input
                type="checkbox"
                checked={selectedGenres.includes('Fiction')}
                onChange={() => handleGenreChange('Fiction')}
              />
              Fiction
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedGenres.includes('Drama')}
                onChange={() => handleGenreChange('Drama')}
              />
              Drama
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedGenres.includes('Horror')}
                onChange={() => handleGenreChange('Horror')}
              />
              Horror
            </label>
          </div>
        </div>
        <div>
          <h1 className="text-2xl uppercase">Filter by Publication Year</h1>
          <div className="flex mt-3">
            <input
              type="number"
              placeholder="Start Year"
              value={startYear || ''}
              onChange={handleStartYearChange}
              className="border rounded px-2 py-1 mr-2"
            />
            <input
              type="number"
              placeholder="End Year"
              value={endYear || ''}
              onChange={handleEndYearChange}
              className="border rounded px-2 py-1"
            />
          </div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {filteredBooks?.map((product: IBook) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
