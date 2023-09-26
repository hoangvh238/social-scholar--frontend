import { db } from '@/lib/db'
import PostFeed from '../PostFeed'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { ExtendedPost } from '@/types/db';

const GeneralFeed = async () => {
  // const posts =   db.post.findMany({
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  //   include: {
  //     votes: true,
  //     author: true,
  //     comments: true,
  //     subreddit: true,
  //   },
  //   take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
  // })

 const posts: ExtendedPost[] =[];

  return <PostFeed initialPosts={posts} />
}

export default GeneralFeed
