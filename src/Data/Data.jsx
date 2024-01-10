/**
 * Categories for quiz questions.
 * Each category has two properties a name and an associated ID.
 *
 * @type {Array<{ Name: string, id: number }>}
 */

export const Category = [
  { Name: "Science : Computers", id: 18 },
  { Name: "Science : Gadget", id: 30 },
  { Name: "Science : Mathematics", id: 19 },
  { Name: "Science : Nature", id: 17 },
  { Name: "Entertainment : Books", id: 10 },
  { Name: "Entertainment : Vedio Games", id: 15 },
  { Name: "Entertainment : Music", id: 12 },
  { Name: "General Knowledge", id: 9 },
  { Name: "Sports", id: 21 },
  { Name: "Animal", id: 27 },
];

/**
 * Difficulty levels for quiz questions.
 * Each difficulty level has a name property.
 *
 * @type {Array<{ Name: string }>}
 */

export const Difficulty = [
  { Name: "easy" },
  { Name: "medium" },
  { Name: "hard" },
];
