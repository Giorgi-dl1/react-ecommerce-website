export const isEqual = (obj1, obj2) => {
  if (obj1 === null) {
    return false;
  }
  let props = Object.getOwnPropertyNames(obj1);
  for (var i = 0; i < props.length; i++) {
    let val1 = obj1[props[i]];
    let val2 = obj2[props[i]];

    if (val1?.id !== val2?.id) {
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

export const getTotalPrice = (items, activeCurrency) => {
  let totalPrice = 0;
  items.map((item) => {
    item.product.prices.map((price) => {
      if (price.currency.label == activeCurrency.label) {
        totalPrice += price.amount * item.quantity;
      }
    });
  });
  return Math.round(totalPrice * 100 + Number.EPSILON) / 100;
};
