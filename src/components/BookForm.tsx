import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useBookStore } from '@/store/bookStore';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  publishedYear: z
    .number()
    .min(1000, 'Year must be after 1000')
    .max(2025, 'Year must be before 2025'),
});

type BookFormValues = z.infer<typeof bookSchema>;

interface BookFormProps {
  book?: { id: string; title: string; author: string; publishedYear: number };
  onClose: () => void;
}

export function BookForm({ book, onClose }: BookFormProps) {
  const { addBook, updateBook } = useBookStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: book
      ? { title: book.title, author: book.author, publishedYear: book.publishedYear }
      : { title: '', author: '', publishedYear: 2024 },
  });

  const onSubmit = async (data: BookFormValues) => {
    try {
      setIsLoading(true);
      if (book) {
        updateBook({ ...data, id: book.id });
        toast({
          title: 'Success',
          description: 'Book updated successfully',
        });
      } else {
        addBook(data);
        toast({
          title: 'Success',
          description: 'Book created successfully',
        });
      }
      onClose();
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save book',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title')}
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          {...register('author')}
          disabled={isLoading}
        />
        {errors.author && (
          <p className="text-sm text-red-500">{errors.author.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="publishedYear">Published Year</Label>
        <Input
          id="publishedYear"
          type="number"
          {...register('publishedYear')}
          disabled={isLoading}
        />
        {errors.publishedYear && (
          <p className="text-sm text-red-500">{errors.publishedYear.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : book ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}
