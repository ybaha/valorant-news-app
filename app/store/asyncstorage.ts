import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const setData = async (key: string, data: any) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("error on setdata");
  }
};

const getFilters = async (): Promise<string[]> => getData("@feed-filters");

const toggleFilters = async (filter: string) => {
  const filters = (await getData("@feed-filters")) as string[];

  return filters.includes(filter)
    ? filters.filter((i) => i !== filter)
    : [...filters, filter];
};

const setFilters = async (filters: string[]) => {
  await setData("@feed-filters", filters);
};

export const useAsyncStore = () => ({ getFilters, setFilters, toggleFilters });
