import express from 'express';
const router = express.Router();
import {
  getRandomQuestions
} from '../../controllers/questionController.js';

router.route('/random').get(getRandomQuestions);
console.log('questionRoutes loaded');

export default router;
