"use strict";

const express = require("express");

const exercises = express.Router();

const pool = require("./connection");

exercises.get("/exercises", (req, res) => {
  let query = `SELECT * FROM exercise LEFT JOIN body_parts ON exercise.body_part_id = body_parts.body_part_id`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });

  exercises.post("/exercises", (req, res) => {
    let query = `INSERT INTO exercise (name,body_part_id,difficulty,description) VALUES ($1::varchar,$2::smallint,$3::smallint,$4::text)`;
    pool
      .query(query, [
        req.body.name,
        req.body.bodyPart,
        req.body.difficulty,
        req.body.description,
      ])
      .then((response) => {
        res.json(req.body);
      });
  });
});

module.exports = exercises;
