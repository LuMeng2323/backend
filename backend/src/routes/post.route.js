import { Router } from "express";

import { createPost,getPosts } from "../controllers/post.controller.js";

const router = Router();

router.route('/create').post(createPost);
router.route('/').post(getPosts);

export default router;