import React, { FC } from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { ApiSortBy } from "../services/api/type"
import SearchInput from "./SearchInput"
import { SearchBarItem, SortBar } from "./SortBar"

type SearchBarProps = {
  defaultSearchKey: string
  setSearchKey: (key: string) => void
  sortBy: string
  handleChangeSort: (key: ApiSortBy) => void
}

const DEFAULT_SORT_VALUES: SearchBarItem[] = [
  { key: "popularity", title: "Popularity" },
  { key: "relevancy", title: "Relevancy" },
  { key: "publishedAt", title: "Published At" },
]

const SearchBar: FC<SearchBarProps> = ({
  defaultSearchKey,
  setSearchKey,
  sortBy,
  handleChangeSort,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <SearchInput
        defaultValue={defaultSearchKey}
        onChangeText={setSearchKey}
      />
      <SortBar
        data={DEFAULT_SORT_VALUES}
        handleChangeSort={handleChangeSort}
        sortBy={sortBy}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
})

export default SearchBar
