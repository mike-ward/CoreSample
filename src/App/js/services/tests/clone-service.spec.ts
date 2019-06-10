import o from 'mithril/ospec';
import clone from '../clone-service';

o('object with array', () => {
  const garfield = {
    name: 'Garfield',
    date: Date.now(),
    regex: /a/
  } as any;

  garfield.favoriteFoods = ['lasagna', 'hamburgers', 'doughnuts', 'cake'];
  const garfieldClone = clone(garfield);
  o(garfield).notEquals(garfieldClone);

  garfield.name = 'Dopy';
  garfield.favoriteFoods[0] = 'candy';
  o(garfield).notEquals(garfieldClone)
})

o('cyclic test', () => {
  var copyme = {} as any;
  var child = {} as any;
  var grandchild = {} as any;

  child.parent = null;
  grandchild.child = null;

  child.child = grandchild;
  grandchild.parent = child;

  copyme.thing = child;
  const copied = clone(copyme);

  // deepEquals can't handle recursion
  o(copied.thing.child.parent).notEquals(null);
})