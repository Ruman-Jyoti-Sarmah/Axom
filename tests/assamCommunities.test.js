import test from "node:test";
import assert from "node:assert/strict";
import ASSAM_COMMUNITIES from "../src/data/culture/assam/communities.js";

test("Assam communities catalogue has complete, unique cards", () => {
  assert.equal(ASSAM_COMMUNITIES.length, 12);

  const ids = ASSAM_COMMUNITIES.map((community) => community.id);
  assert.equal(new Set(ids).size, ids.length);

  for (const community of ASSAM_COMMUNITIES) {
    assert.ok(community.name);
    assert.ok(community.region);
    assert.ok(community.craft);
    assert.ok(community.imageUrl.startsWith("https://commons.wikimedia.org/"));
    assert.ok(community.imageSearchUrl.startsWith("https://www.google.com/search?tbm=isch"));
    assert.ok(community.foods.length > 0);
    assert.ok(community.traditions.length > 0);
    assert.ok(community.places.length > 0);
  }
});
