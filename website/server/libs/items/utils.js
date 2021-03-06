import shared from '../../../common';
import { model as User } from '../../models/user';
import { last } from 'lodash';

// Build a list of gear items owned by default
const defaultOwnedGear = {};

Object.keys(shared.content.gear.flat).forEach(key => {
  const item = shared.content.gear.flat[key];
  if (item.key.match(/(armor|head|shield)_warrior_0/) || item.gearSet === 'glasses' || item.gearSet === 'headband') {
    defaultOwnedGear[item.key] = true;
  }
});

export function getDefaultOwnedGear () {
  // Clone to avoid modifications to the original object
  return Object.assign({}, defaultOwnedGear);
}

// When passed a path to an item in the user object it'll return true if
// it's valid, false otherwsie
// Example of an item path: `items.gear.owned.head_warrior_0`
export function validateItemPath (itemPath) {
  // The item path must start with `items.`
  if (itemPath.indexOf('items.') !== 0) return false;
  if (User.schema.paths[itemPath]) return true;

  const key = last(itemPath.split('.'));

  if (itemPath.indexOf('items.gear.owned') === 0) {
    return Boolean(shared.content.gear.flat[key]);
  }

  if (itemPath.indexOf('items.pets') === 0) {
    return Boolean(shared.content.petInfo[key]);
  }

  if (itemPath.indexOf('items.eggs') === 0) {
    return Boolean(shared.content.eggs[key]);
  }

  if (itemPath.indexOf('items.hatchingPotions') === 0) {
    return Boolean(shared.content.hatchingPotions[key]);
  }

  if (itemPath.indexOf('items.food') === 0) {
    return Boolean(shared.content.food[key]);
  }

  if (itemPath.indexOf('items.mounts') === 0) {
    return Boolean(shared.content.mountInfo[key]);
  }

  if (itemPath.indexOf('items.quests') === 0) {
    return Boolean(shared.content.quests[key]);
  }
}