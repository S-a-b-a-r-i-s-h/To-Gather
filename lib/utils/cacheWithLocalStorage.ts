// utils/cacheWithLocalStorage.ts
// import type { ActionResponse } from "@/types"; // wherever your type is

export const cacheWithLocalStorage = async <T>(
  key: string,
  fetcher: () => Promise<ActionResponse<T>>
): Promise<T | undefined> => {
  if (typeof window === "undefined") {
    const res = await fetcher();
    return res.data;
  }

  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      console.log("CACHED DATA", key);
      return JSON.parse(cached);
    }

    const res = await fetcher();

    if (res.success && res.data) {
      localStorage.setItem(key, JSON.stringify(res.data));
      return res.data;
    }

    return undefined;
  } catch (error) {
    console.error("Error in cacheWithLocalStorage:", error);
    const res = await fetcher();
    return res.data;
  }
};
