
const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

function firstDefined(...vals) {
  for (const v of vals) {
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function toArray(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === "string" && val.length) {
    return val.split(",").map((s) => s.trim());
  }
  return [];
}

export function normalizeWorkout(raw, index = 0) {
  const id = firstDefined(raw.id, raw._id, raw.workoutId, raw.slug, String(index));
  const category = toArray(
    firstDefined(raw.category, raw.categories, raw.tag, raw.tags, raw.muscleGroup)
  );
  const equipment = toArray(firstDefined(raw.equipment, raw.equipments, raw.gear));

  const instructionsRaw = firstDefined(raw.instructions, raw.steps, raw.howTo, []);
  const instructions = Array.isArray(instructionsRaw)
    ? instructionsRaw
    : typeof instructionsRaw === "string"
    ? instructionsRaw.split("\n").filter(Boolean)
    : [];

  return {
    id: String(id),
    name: firstDefined(raw.name, raw.title, raw.workoutName, "UNTITLED"),
    description: firstDefined(raw.description, raw.subtitle, raw.summary, ""),
    category,
    equipment,
    image: firstDefined(raw.image, raw.img, raw.thumbnail, raw.illustration, ""),
    duration: Number(firstDefined(raw.duration, raw.durationMinutes, raw.time, 0)),
    calories: Number(firstDefined(raw.calories, raw.kcal, 0)),
    rating: Number(firstDefined(raw.rating, raw.stars, 0)),
    difficulty: firstDefined(raw.difficulty, raw.level, "Beginner"),
    sets: firstDefined(raw.sets, raw.setCount, "-"),
    reps: firstDefined(raw.reps, raw.repRange, "-"),
    instructions,
  };
}

export async function getAllWorkouts() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load workouts");
  const data = await res.json();
  const list = Array.isArray(data) ? data : data.data || data.workouts || data.results || [];
  return list.map((raw, i) => normalizeWorkout(raw, i));
}

export async function getWorkoutById(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load workout");
  const data = await res.json();
  const raw = data.data || data.workout || data;
  return normalizeWorkout(raw, 0);
}
