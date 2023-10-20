import ExcelToJsonConverter from './Data.jsx';

export const getJsonData = () => {
  const { jsonData } = ExcelToJsonConverter.state;
  return jsonData;
};