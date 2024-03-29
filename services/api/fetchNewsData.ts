import dayjs from "dayjs"
import { decodeBase64URI } from "../../utils/decodeBase64URI"
import { ApiSortBy } from "./type"

const API_KEY = "1e1c0044745243b480fa172326d83cc7"
const URL_LINK = "https://newsapi.org/v2/everything"

const currentDate = dayjs()
const oneWeekAgo = currentDate.subtract(1, "week")

export const fetchNewsData = (
  sortBy: ApiSortBy,
  submittedSearch: string
): string => {
  const urlParams = new URLSearchParams()
  urlParams.set("apiKey", API_KEY)
  urlParams.set("sortBy", sortBy)
  urlParams.set("from", oneWeekAgo.format("YYYY-MM-DD"))
  urlParams.set("q", submittedSearch)

  const URL = `${URL_LINK}?${decodeBase64URI(urlParams.toString())}`
  return URL
}
