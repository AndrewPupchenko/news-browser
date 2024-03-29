import React, { FC } from "react"
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native"
import { Article } from "../services/api/type"

type NewsListProps = {
  data: Article[] | undefined
  isLoading: boolean
  error?: string
  onPressItem: (article: Article) => void
}

const NewsItem: FC<{ item: Article; onPressItem: (article: Article) => void }> =
  React.memo(
    ({ item, onPressItem }) => (
      <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
        <ImageBackground
          source={{ uri: item?.urlToImage || undefined }}
          style={styles.img}
        >
          <Text style={styles.text}>{item?.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    ),
    (prevProps, nextProps) => {
      return (
        prevProps.item === nextProps.item &&
        prevProps.onPressItem === nextProps.onPressItem
      )
    }
  )

const NewsList: FC<NewsListProps> = ({
  data,
  isLoading,
  error,
  onPressItem,
}) => {
  const renderItem: ListRenderItem<Article> = ({ item }) => (
    <NewsItem item={item} onPressItem={onPressItem} />
  )

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      ListEmptyComponent={() =>
        isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.messageText}>{error || "Empty"}</Text>
        )
      }
      contentContainerStyle={styles.container}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  item: {
    flex: 1,
    padding: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    marginTop: "auto",
    backgroundColor: "#000000c0",
  },
  messageText: {
    fontSize: 15,
    textAlign: "center",
  },
  img: {
    width: "100%",
    backgroundColor: "#DDDDDD",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
})

export default NewsList
