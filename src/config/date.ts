type Option = {
  hour: "numeric";
  minute: "numeric";
};
let options: Option = { hour: "numeric", minute: "numeric" };

export const toLocaleDate = (data: Date) => {
  return data.toLocaleString("ru-RU", options);
};
