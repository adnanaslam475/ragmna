export enum StorageItem {
  Auth = 'App/auth',
  Theme = 'App/theme',
}

export const getItem = (itemName: StorageItem): any | null => {
  const item = localStorage.getItem(itemName);
  return item ? JSON.parse(item) : null;
};

export const setItem = (itemName: StorageItem, value: any): void => {
  localStorage.setItem(itemName, JSON.stringify(value));
};

export const removeItem = (itemName: StorageItem): void => {
  localStorage.removeItem(itemName);
};
