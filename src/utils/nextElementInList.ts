const nextElementInList = <T>(list: T[], value: T) => {
  const length = list.length
  const currentActionIndex = list.indexOf(value);
  const nexyActionIndex = (currentActionIndex + 1) % length;
  const nextAction = list[nexyActionIndex];
  return nextAction
};

export default nextElementInList;
