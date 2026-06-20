import express from 'express';
const router = express.Router();
import { SQL } from "../utils/db.js";

router.get('/courses', async(req, res) => {
   const courses = await SQL `SELECT * FROM courses ORDER BY cid;`;
   res.status(200).json(courses);
});

router.get('/courses/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await SQL` SELECT * FROM courses WHERE cid = ${id};`;

        if (result.length === 0) {
            return res.status(404).send('Course not found');
        }

        res.json(result[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;