import { validCategories } from '../../utils/constants';
import { Request } from 'express'; // Assuming you're using Express or a similar framework

// Mocked response object for testing
export const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

// Function to create a mock post object
export const createPostObject = (options: Partial<PostObject> = {}): PostObject => {
  return {
    title: options.title || 'Test Post',
    authorName: options.authorName || 'Test Author',
    imageLink: options.imageLink || 'https://www.forTestingPurposeOnly/my-image.jpg',
    categories: options.categories || [validCategories[0]],
    description: options.description || 'This is a test post.',
    isFeaturedPost: options.isFeaturedPost || false,
    ...options,
  };
};

// Interface for the mock post object
interface PostObject {
  title: string;
  authorName: string;
  imageLink: string;
  categories: string[];
  description: string;
  isFeaturedPost: boolean;
}

// Function to create a mock request object
export const createRequestObject = (options: CreateRequestOptions = {}): Request => {
  return {
    body: options.body || {},
    params: options.params || {},
  } as Request; // Type assertion for compatibility with Express Request type
};

// Interface for createRequestObject options
interface CreateRequestOptions {
  body?: any;
  params?: any;
}
