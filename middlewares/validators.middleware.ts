import { check } from 'express-validator';

// Validation middleware for creating a reply
export const validateCreateReply = [
  check('content').isString().isLength({ min: 1, max: 300 }).trim().escape().withMessage('Content is required and must be between 1 to 3 characters'),
  check('threadId').isMongoId().withMessage('Invalid thread ID'),
];

// Validation middleware for creating a thread
export const validateThreadCreation = [
    check("title").isString().isLength({ min: 1, max: 100 }).trim().escape().withMessage("Title is required and must be between 1 to 100 characters"),
  check('userId').isMongoId().withMessage('Invalid user ID'),
];

export const validateThreadUpdate = [
    check("title").isString().isLength({ min: 1, max: 100 }).trim().escape().withMessage("Title is required and must be between 1 to 100 characters"),
    check('threadId').isMongoId().withMessage('Invalid threadId'),
]
