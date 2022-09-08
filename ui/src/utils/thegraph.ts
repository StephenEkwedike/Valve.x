import axios from "axios";

type GraphVariables = { [key: string]: string | number | string[] | boolean };

export const fetchQuery = (
  query: string,
  variables: GraphVariables,
  endpoint: string
) => {
  return axios.post(endpoint, { query, variables });
};
