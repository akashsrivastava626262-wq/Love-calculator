// Deterministic, playful "love score" computation shared by the API.
// The same pair of names always yields the same result.

function normalize(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

// A small stable hash (FNV-1a style) so results are deterministic across runs.
function hashString(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function messageFor(score) {
  if (score >= 90) return "A match written in the stars!";
  if (score >= 75) return "Sparks are definitely flying.";
  if (score >= 60) return "Great potential — give it a shot!";
  if (score >= 40) return "There's something worth exploring here.";
  if (score >= 20) return "It might take a little work.";
  return "Perhaps just good friends.";
}

export function calculateLove(nameA, nameB) {
  const a = normalize(nameA);
  const b = normalize(nameB);

  if (!a || !b) {
    const error = new Error("Both names are required.");
    error.statusCode = 400;
    throw error;
  }

  // Order-independent: "Alice + Bob" == "Bob + Alice".
  const pair = [a, b].sort().join("&");
  const score = hashString(pair) % 101; // 0..100

  return {
    nameA: String(nameA).trim(),
    nameB: String(nameB).trim(),
    score,
    message: messageFor(score),
  };
}
