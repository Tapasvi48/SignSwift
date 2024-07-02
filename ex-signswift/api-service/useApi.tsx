import React from "react";
type ApiFunc = (...args: any[]) => Promise<{ data: any }>;
export const useApi = (apiFunc: any) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const request = async (...args: any) => {
    setLoading(true);
    try {
      const result = await apiFunc(...args);
      setData(result.data);
      return result;
    } catch (error: any) {
      // Sentry.Native.captureException(error);
      // console.log("Error is", error);
      setError(error.message || "Unexpeted Error!!");
      return error.message;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    error,
    request,
  };
};
