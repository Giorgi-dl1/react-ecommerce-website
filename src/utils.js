export const isEqual = (obj1, obj2) => {
  let props = Object.getOwnPropertyNames(obj1);
  for (var i = 0; i < props.length; i++) {
    let val1 = obj1[props[i]];
    let val2 = obj2[props[i]];
    if (val1.id !== val2.id) {
      return false;
    }
  }
  return true;
};

export const getPrice = (prices, activeCurrency) => {
  const price = prices?.filter(
    (item) => item.currency.label == activeCurrency.label
  )[0];
  return price;
};
