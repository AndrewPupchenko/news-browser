import { NativeStackScreenProps } from "@react-navigation/native-stack"
import dayjs from "dayjs"
import { FC, useMemo, useState } from "react"
import { SafeAreaView } from "react-native"
import useSWR from "swr"
import { RootStackParamList } from "../../App"
import NewsList from "../../components/NewsList"
import SearchBar from "../../components/SearchBar"
import { ApiResponse, ApiSortBy, Article } from "../../services/api/type"
import { decodeBase64URI } from "../../utils/decodeBase64URI"
import { fetcher } from "../../utils/fetcher"

const API_KEY = "09d2088539bc4ab395d975972ad6ab83"
const URL_LINK = "https://newsapi.org/v2/everything"

const DEFAULT_SEARCH_KEY = "криптовалюты"
const DEFAULT_SORT_KEY = "popularity"

const currentDate = dayjs()
const oneWeekAgo = currentDate.subtract(1, "week")

export const NewsScreen: FC<
  NativeStackScreenProps<RootStackParamList, "News">
> = ({ navigation }) => {
  const [sortBy, setSortBy] = useState<ApiSortBy>(DEFAULT_SORT_KEY)
  const [submittedSearch, setSubmittedSearch] = useState(DEFAULT_SEARCH_KEY)

  const URL = useMemo(() => {
    const urlParams = new URLSearchParams()
    
    urlParams.set("apiKey", API_KEY)
    urlParams.set("sortBy", sortBy)
    urlParams.set("from", oneWeekAgo.format("YYYY-MM-DD"))
    urlParams.set("q", submittedSearch)

    return `${URL_LINK}?${decodeBase64URI(urlParams.toString())}`
  }, [sortBy, submittedSearch])

  const { data, error, isLoading } = useSWR<ApiResponse>(URL, fetcher)

  const handlePressItem = (article: Article) => {
    navigation.navigate("Details", article)
  }

  return (
    <SafeAreaView>
      <SearchBar
        defaultSearchKey={DEFAULT_SEARCH_KEY}
        setSearchKey={setSubmittedSearch}
        sortBy={sortBy}
        handleChangeSort={setSortBy}
      />
      <NewsList
        data={data?.articles}
        isLoading={isLoading}
        error={error || data?.message}
        onPressItem={handlePressItem}
      />
    </SafeAreaView>
  )
}
