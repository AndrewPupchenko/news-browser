import React, { FC } from "react"
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native"
import { ApiSortBy } from "../services/api/type"

export type SearchBarItem = { title: string; key: ApiSortBy }
type SortBarProps = {
  data: SearchBarItem[]
  sortBy: string
  handleChangeSort: (key: ApiSortBy) => void
}

export const SortBar: FC<SortBarProps> = ({
  sortBy,
  handleChangeSort,
  data,
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
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      horizontal
    />
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
})
