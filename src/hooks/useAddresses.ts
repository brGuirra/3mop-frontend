import useSWR from "swr";

export const useAddresses = (zipCode: string) => {
  const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/v1/addresses/search`;
  const fecther = async (url: string) => {
    return fetch(url, {
      headers: {
        "X-API-KEY": import.meta.env.VITE_BACKEND_API_KEY,
      },
    }).then<API.Address>((res) => res.json());
  };
  const { data, isLoading, error } = useSWR(`${BASE_URL}/${zipCode}`, fecther);

  return {
    data,
    isLoading,
    error,
  };
};
