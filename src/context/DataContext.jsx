import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const value = useMemo(() => ({}), []);

  const [Data, setData] = useState("");
  const [sheetId, setSheedId] = useState(""); // for link of spreadsheet
  const [sheetName, setSheetName] = useState(""); // for name of schools

  const getCsvUrl = (id, name) => {
    return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
      name
    )}`;
  };

  const loadData = useCallback(async () => {
    if (!sheetId.trim()) {
      return;
    }

    try {
      const url = getCsvUrl(sheetId, sheetName);
      const respone = await fetch(url);
      const csvText = await respone.text();

      if (!respone.ok) {
        return;
      }

      const data = parse();
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Completed");
    }
  });

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
