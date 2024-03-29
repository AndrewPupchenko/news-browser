type Article = {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

type ApiResponse = {
  status: string
  totalResults: number
  message?: string
  articles: Article[]
}
type ApiSortBy = "relevancy" | "popularity" | "publishedAt"

export type { ApiResponse, Article, ApiSortBy }
