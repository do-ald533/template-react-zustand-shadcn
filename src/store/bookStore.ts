import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { z } from 'zod';

const bookSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  author: z.string().min(1),
  publishedYear: z.number().min(1000).max(2025),
});

type Book = z.infer<typeof bookSchema>;

export const useBookStore = create(
  persist(
    (set) => ({
      books: [] as Book[],
      addBook: (book: Omit<Book, 'id'>) =>
        set((state) => ({
          books: [...state.books, { ...book, id: crypto.randomUUID() }],
        })),
      updateBook: (book: Book) =>
        set((state) => ({
          books: state.books.map((b) => (b.id === book.id ? book : b)),
        })),
      deleteBook: (id: string) =>
        set((state) => ({
          books: state.books.filter((book) => book.id !== id),
        })),
    }),
    {
      name: 'books-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
