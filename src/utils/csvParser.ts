import * as Papa from 'papaparse';

export const parseCSV = async <T>(filePath: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse<T>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result: any) => resolve(result.data),
          error: (error: any) => reject(error),
        });
      });
  });
};


