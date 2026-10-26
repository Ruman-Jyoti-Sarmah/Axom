import test from "node:test";
import assert from "node:assert/strict";
import ASSAM_HANDICRAFTS from "../src/data/culture/assam/handicrafts.js";

test("Assam handicrafts catalogue has complete, unique detail cards", () => {
  assert.equal(ASSAM_HANDICRAFTS.length, 12);

  const ids = ASSAM_HANDICRAFTS.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);

  for (const item of ASSAM_HANDICRAFTS) {
    assert.ok(item.name);
    assert.ok(item.kind);
    assert.ok(item.region);
    assert.ok(item.image.startsWith("/images/culture/"));
    assert.ok(item.imageSearchUrl.startsWith("https://www.google.com/search?tbm=isch"));
    assert.ok(item.materials.length > 0);
    assert.ok(item.process.length > 0);
    assert.ok(item.uses.length > 0);
    assert.ok(item.traditions.length > 0);
    assert.ok(item.places.length > 0);
  }
});
