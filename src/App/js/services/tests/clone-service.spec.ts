import clone from '../clone-service';

test('object with array', () => {
  const garfield = {
    name: 'Garfield',
    date: Date.now(),
    regex: /a/
  } as any;

  garfield.favoriteFoods = ['lasagna', 'hamburgers', 'doughnuts', 'cake'];
  const garfieldClone = clone(garfield);
  expect(garfield).toEqual(garfieldClone);

  garfield.name = 'Dopy';
  garfield.favoriteFoods[0] = 'candy';
  expect(garfield).not.toEqual(garfieldClone)
})

test('cyclic test', () => {
  var copyme = {} as any;
  var child = {} as any;
  var grandchild = {} as any;

  child.parent = null;
  grandchild.child = null;

  child.child = grandchild;
  grandchild.parent = child;

  copyme.thing = child;
  const copied = clone(copyme);

  expect(copyme).toEqual(copied);
})