import axios from "axios"
import { ApiResponse } from "../services/api/type"

export const fetcher = (url: string): Promise<ApiResponse> =>
  axios.get(url).then((res) => res.data)
