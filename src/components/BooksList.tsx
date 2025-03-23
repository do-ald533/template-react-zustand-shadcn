import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useBookStore } from '@/store/bookStore';
import { BookForm } from './BookForm';

export function BooksList() {
  const { books, deleteBook } = useBookStore();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<{
    id: string;
    title: string;
    author: string;
    publishedYear: number;
  } | null>(null);

  const handleDelete = (id: string) => {
    try {
      deleteBook(id);
      toast({
        title: 'Success',
        description: 'Book deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete book',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Books</h1>
        <Button onClick={() => setIsOpen(true)}>Add Book</Button>
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-4 border rounded-lg flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
              <p className="text-sm text-gray-500">
                Published: {book.publishedYear}
              </p>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingBook(book);
                  setIsOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </DialogTitle>
          </DialogHeader>
          <BookForm
            book={editingBook}
            onClose={() => {
              setIsOpen(false);
              setEditingBook(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
