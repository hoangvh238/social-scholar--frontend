import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'

import PostFeed from '../PostFeed'
import { notFound } from 'next/navigation'
import { ExtendedPost } from '@/types/db'

const CustomFeed = async () => {
  const session =   getAuthSession()

  // only rendered if session exists, so this will not happen
  if (!session) return notFound()
  const posts: ExtendedPost[] = [];

  return <PostFeed initialPosts={posts} /> 
}

export default CustomFeed
