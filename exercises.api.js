"use strict";


const express = require("express");

const exercises = express.Router();

const pool = require("./connection");

exercises.get("/exercises", (req, res)=>{
    let query = `SELECT * FROM exercise LEFT JOIN body_parts ON exercise.body_part_id = body_parts.body_part_id`;
    pool.query(query).then((response)=>{
        res.json(response.rows);
    })
})



module.exports = exercises;