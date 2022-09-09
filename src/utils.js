export const isEqual = (obj1, obj2) => {
  let props = Object.getOwnPropertyNames(obj1);
  for (var i = 0; i < props.length; i++) {
    let val1 = obj1[props[i]];
    let val2 = obj2[props[i]];
    if (val1 !== val2) {
      return false;
    }
  }
  return true;
};
