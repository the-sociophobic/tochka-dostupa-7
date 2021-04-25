

interface ContentfulItem {
  id: string
  type: string
}

interface File extends ContentfulItem {
  id: string
  title: string
  file: {
    contentType: string
    details: {
      size: number
      image?: {
        width: number
        height: number
      }
    }
    fileName: string
    url: string
  }
}


export type {
  ContentfulItem,
  File
}
