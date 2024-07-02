import { Request, Response, NextFunction } from 'express';
import Post, { IPost } from '../models/post';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants';

interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}

export const isAuthorMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId = req.user?._id;
    const postId = req.params.id;

    const post: IPost | null = await Post.findById(postId);
    if (!post) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.POSTS.NOT_FOUND });
    }

    if (post.authorId.toString() !== userId) {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: RESPONSE_MESSAGES.POSTS.NOT_ALLOWED });
    }

    next();
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
