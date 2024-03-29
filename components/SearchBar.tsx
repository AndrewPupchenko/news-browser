import React, { FC } from "react"
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native"
import { ApiSortBy } from "../services/api/type"
import SearchInput from "./SearchInput"

type SearchBarItem = { title: string; key: ApiSortBy }

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
  const onPress = (key: ApiSortBy) => () => handleChangeSort(key)

  const renderItem: ListRenderItem<SearchBarItem> = ({ item }) => (
    <TouchableOpacity
      children={<Text style={styles.text}>{item.title}</Text>}
      onPress={onPress(item.key)}
      disabled={sortBy === item.key}
      style={[styles.button, sortBy === item.key && styles.disabledButton]}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput
        defaultValue={defaultSearchKey}
        onChangeText={setSearchKey}
      />
      <FlatList
        data={DEFAULT_SORT_VALUES}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#008DDA",
    padding: 10,
    margin: 2,
    borderRadius: 20,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
  container: {
    padding: 5,
  },
})

export default SearchBar
