import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'

import PostFeed from '../PostFeed'
import { notFound } from 'next/navigation'
import { ExtendedPost } from '@/types/db'

const CustomFeed = () => {

  return <PostFeed/> 
}

export default CustomFeed
