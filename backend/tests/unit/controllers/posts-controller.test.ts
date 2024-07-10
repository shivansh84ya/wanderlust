// Import necessary modules and types
import {
  createPostHandler,
  deletePostByIdHandler,
  getAllPostsHandler,
  getFeaturedPostsHandler,
  getLatestPostsHandler,
  getPostByCategoryHandler,
  getPostByIdHandler,
  updatePostHandler,
} from '../../../controllers/posts-controller';

import Post, { PostDocument } from '../../../models/post';
import { expect, it, describe } from '@jest/globals';
import { validCategories, HTTP_STATUS, RESPONSE_MESSAGES } from '../../../utils/constants';
import { createPostObject, createRequestObject, res } from '../../utils/helper-objects';

// Mock Post model for testing purposes
jest.mock('../../../models/post', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Begin describing the test suite for createPostHandler
describe('createPostHandler', () => {
  // Test case for successful post creation
  it('Post creation: Success - All fields are valid', async () => {
    const postObject = createPostObject();
    const req = createRequestObject({ body: postObject });

    // Mock Post's save method to resolve with postObject
    (Post as jest.MockedFunction<typeof Post>).mockImplementationOnce(() => ({
      save: jest.fn().mockResolvedValueOnce(postObject),
    }));

    await createPostHandler(req, res);

    expect(Post).toHaveBeenCalledTimes(1);
    expect(Post).toHaveBeenCalledWith(postObject);
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith(postObject);
  });

  // Test case for invalid image URL
  it('Post creation: Failure - Invalid image url', async () => {
    const postObject = createPostObject({
      imageLink: 'https://www.forTestingPurposeOnly/my-image.gif', // Invalid image URL
    });
    const req = createRequestObject({ body: postObject });

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGES.POSTS.INVALID_IMAGE_URL,
    });
  });

  // Test case for missing required fields
  it('Post creation: Failure - Some fields are missing', async () => {
    const postObject = createPostObject();
    delete postObject.title;
    delete postObject.authorName;

    const req = createRequestObject({ body: postObject });

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS });
  });

  // Test case for too many categories
  it('Post creation: Failure - Too Many Categories', async () => {
    const postObject = createPostObject({
      categories: [validCategories[0], validCategories[1], validCategories[2], validCategories[3]], // 4 categories
    });
    const req = createRequestObject({ body: postObject });

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGES.POSTS.MAX_CATEGORIES,
    });
  });

  // Test case for internal server error during post creation
  it('Post creation: Failure - Internal server error', async () => {
    const postObject = createPostObject();
    const req = createRequestObject({ body: postObject });

    // Mock Post's save method to reject with an error
    (Post as jest.MockedFunction<typeof Post>).mockImplementationOnce(() => ({
      save: jest
        .fn()
        .mockRejectedValueOnce(new Error(RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR)),
    }));

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  });
});

// Describe the test suite for getAllPostsHandler
describe('getAllPostsHandler', () => {
  // Test case for successful retrieval of all posts
  it('Get all posts: Success - Retrieving all posts list', async () => {
    const req = createRequestObject();

    const mockPosts = [
      createPostObject({ title: 'Test Post - 1' }),
      createPostObject({ title: 'Test Post - 2', isFeaturedPost: true }),
      createPostObject({ title: 'Test Post - 3' }),
    ];

    // Mock Post's find method to resolve with mockPosts
    (Post as jest.MockedFunction<typeof Post>).find = jest.fn().mockResolvedValueOnce(mockPosts);

    await getAllPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  // Test case for internal server error during retrieval of all posts
  it('Get all posts: Failure - Internal Server Error', async () => {
    const req = createRequestObject();

    // Mock Post's find method to reject with an error
    (Post as jest.MockedFunction<typeof Post>).find = jest
      .fn()
      .mockRejectedValueOnce(new Error(RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR));

    await getAllPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  });
});

// Similar test suites for other handlers (getFeaturedPostsHandler, getLatestPostsHandler, getPostByCategoryHandler, getPostByIdHandler, updatePostHandler, deletePostByIdHandler) follow the same pattern.

// Describe the test suite for getFeaturedPostsHandler
describe('getFeaturedPostsHandler', () => {
  // Test cases for getFeaturedPostsHandler
});

// Describe the test suite for getLatestPostsHandler
describe('getLatestPostsHandler', () => {
  // Test cases for getLatestPostsHandler
});

// Describe the test suite for getPostByCategoryHandler
describe('getPostByCategoryHandler', () => {
  // Test cases for getPostByCategoryHandler
});

// Describe the test suite for getPostByIdHandler
describe('getPostByIdHandler', () => {
  // Test cases for getPostByIdHandler
});

// Describe the test suite for updatePostHandler
describe('updatePostHandler', () => {
  // Test cases for updatePostHandler
});

// Describe the test suite for deletePostByIdHandler
describe('deletePostByIdHandler', () => {
  // Test cases for deletePostByIdHandler
});
