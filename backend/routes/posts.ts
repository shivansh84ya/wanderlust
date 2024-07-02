import { Router, Request, Response, NextFunction } from 'express';
import {
  createPostHandler,
  deletePostByIdHandler,
  getAllPostsHandler,
  getFeaturedPostsHandler,
  getLatestPostsHandler,
  getPostByCategoryHandler,
  getPostByIdHandler,
  getRelatedPostsByCategories,
  updatePostHandler,
} from '../controllers/posts-controller.js';
import { REDIS_KEYS } from '../utils/constants.js';
import { cacheHandler } from '../utils/middleware.js';
import { isAdminMiddleware, authMiddleware } from '../middlewares/auth-middleware.js';
import { isAuthorMiddleware } from '../middlewares/post-middleware.js';

const router = Router();

// Create a new post
router.post('/', authMiddleware as RequestHandler, createPostHandler as RequestHandler);

// Get all posts
router.get('/', cacheHandler(REDIS_KEYS.ALL_POSTS), getAllPostsHandler as RequestHandler);

// Route to get featured posts
router.get(
  '/featured',
  cacheHandler(REDIS_KEYS.FEATURED_POSTS),
  getFeaturedPostsHandler as RequestHandler
);

// Route to get related category posts
router.get('/related-posts-by-category', getRelatedPostsByCategories as RequestHandler);

// Route to get posts by category
router.get('/categories/:category', getPostByCategoryHandler as RequestHandler);

// Route for fetching the latest posts
router.get(
  '/latest',
  cacheHandler(REDIS_KEYS.LATEST_POSTS),
  getLatestPostsHandler as RequestHandler
);

// Get a specific post by ID
router.get('/:id', getPostByIdHandler as RequestHandler);

// Update a post by ID (author)
router.patch(
  '/:id',
  authMiddleware as RequestHandler,
  isAuthorMiddleware as RequestHandler,
  updatePostHandler as RequestHandler
);

// Update a post by ID (admin)
router.patch(
  '/admin/:id',
  authMiddleware as RequestHandler,
  isAdminMiddleware as RequestHandler,
  updatePostHandler as RequestHandler
);

// Delete a post by ID (author)
router.delete(
  '/:id',
  authMiddleware as RequestHandler,
  isAuthorMiddleware as RequestHandler,
  deletePostByIdHandler as RequestHandler
);

// Delete a post by ID (admin)
router.delete(
  '/admin/:id',
  authMiddleware as RequestHandler,
  isAdminMiddleware as RequestHandler,
  deletePostByIdHandler as RequestHandler
);

// Define RequestHandler type for middleware and controller functions
type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

export default router;
