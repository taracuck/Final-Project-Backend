"use strict";

const express = require("express");

const exercises = express.Router();

const pool = require("./connection");

exercises.get("/exercises", (req, res) => {
  let name = req.query.name;
  let body_part = req.query.bodyPart;
  let difficulty = req.query.difficulty;
  let query = `SELECT * FROM exercise LEFT JOIN body_parts ON exercise.body_part_id = body_parts.body_part_id`;
  if (name && body_part && difficulty) {
    query += ` WHERE lower(exercise.name) LIKE lower('%${name}%') AND exercise.body_part_id=${body_part} AND exercise.difficulty <= ${difficulty}`;
  } else if (name && body_part) {
    query += ` WHERE lower(exercise.name) LIKE lower('%${name}%') AND exercise.body_part_id=${body_part}`;
  } else if (name && difficulty) {
    query += ` WHERE lower(exercise.name) LIKE lower('%${name}%') AND exercise.difficulty <= ${difficulty}`;
  } else if (body_part && difficulty) {
    query += ` WHERE exercise.body_part_id=${body_part} AND exercise.difficulty <= ${difficulty}`;
  } else if (name) {
    query += ` WHERE lower(exercise.name) LIKE lower('%${name}%')`;
  } else if (body_part) {
    query += ` WHERE exercise.body_part_id=${body_part}`;
  } else if (difficulty) {
    query += ` WHERE exercise.difficulty <= ${difficulty}`;
  }
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

module.exports = exercises;
