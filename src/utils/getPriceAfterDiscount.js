const getPriceAfterDiscount = (price, discount = 0) =>
  ((price * (100 - discount)) / 100).toFixed(2)

export default getPriceAfterDiscount
