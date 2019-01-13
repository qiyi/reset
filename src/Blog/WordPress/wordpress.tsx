
export class WPSite {
  name: string
  description: string
}

export class WPReply {

}
export class WPAuthor {
  id: number
  name: string
}

export class WPPostContent {
  protected: boolean
  rendered: string
}

export class WPPostExcerpt {
  protected: boolean
  rendered: string
}

export class WPTitleContent {
  rendered: string
}

export class WPPost {
  id: number
  author: number
  tags: number[]
  date: string
  status: string
  link: string
  title: WPTitleContent
  excerpt: WPPostExcerpt
  content: WPPostContent
  replies: WPReply[]
}
