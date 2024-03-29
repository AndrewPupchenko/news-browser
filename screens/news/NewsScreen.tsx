import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FC, useMemo, useState } from "react"
import { SafeAreaView } from "react-native"
import useSWR from "swr"
import { RootStackParamList } from "../../App"
import NewsList from "../../components/NewsList"
import SearchBar from "../../components/SearchBar"
import { fetchNewsData } from "../../services/api/fetchNewsData"
import { ApiResponse, ApiSortBy, Article } from "../../services/api/type"
import { fetcher } from "../../utils/fetcher"

const DEFAULT_SEARCH_KEY = "криптовалюты"
const DEFAULT_SORT_KEY = "popularity"

export const NewsScreen: FC<
  NativeStackScreenProps<RootStackParamList, "News">
> = ({ navigation }) => {
  const [sortBy, setSortBy] = useState<ApiSortBy>(DEFAULT_SORT_KEY)
  const [submittedSearch, setSubmittedSearch] = useState(DEFAULT_SEARCH_KEY)

  const URL = useMemo(
    () => fetchNewsData(sortBy, submittedSearch),
    [sortBy, submittedSearch]
  )
  // TODO: Add lazy load (swr/infinite) if necessary
  const { data, error, isLoading } = useSWR<ApiResponse>(URL, fetcher)

  const handlePressItem = (article: Article) => {
    navigation.navigate("Details", article)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
