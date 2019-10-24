export function createSubscription(id) {
  return {
    type: '@subscription/CREATE',
    id,
  };
}

export function cancelSubscription(id) {
  return {
    type: '@subscription/CANCEL',
    id,
  };
}
