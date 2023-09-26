"use client"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import Post from './Post'

interface PostFeedProps {
  initialPosts: ExtendedPost[]
  subredditName?: string
}

interface ExtendedPost {
  votes: any
  comments: any
  subreddit: any
  id: string;
  // Thêm các trường khác của ExtendedPost tại đây
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subredditName }) => {
  const [posts, setPosts] = useState<ExtendedPost[]>(initialPosts)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const lastPostRef = useRef<HTMLLIElement | null>(null)

  const fetchMorePosts =  () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)

    try {
      const query = `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${page}` +
        (!!subredditName ? `&subredditName=${subredditName}` : '')

      const { data } =  axios.get(query)
      const newPosts = data as ExtendedPost[]

      if (newPosts.length > 0) {
        setPosts([...posts, ...newPosts])
        setPage(page + 1)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error fetching more posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      fetchMorePosts()
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection)
    if (lastPostRef.current) {
      observer.observe(lastPostRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <ul className='flex flex-col col-span-2 space-y-6'>
      {posts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc: number, vote: { type: string }) => {
          if (vote.type === 'UP') return acc + 1
          if (vote.type === 'DOWN') return acc - 1
          return acc
        }, 0)

        // Sử dụng dữ liệu mẫu cho currentVote
        const currentVote = {
          userId: "1", //session?.user.id
          type: "UP", // Hoặc "DOWN" hoặc "OTHER"
        }

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={lastPostRef}>
              {/* <Post
                post={post}
                commentAmt={post.comments.length}
                subredditName={post.subreddit.name}
                votesAmt={votesAmt}
                currentVote={currentVote}
              /> */}
            </li>
          )
        } else {
          return (
            // <Post
            //   key={post.id}
            //   post={post}
            //   commentAmt={post.comments.length}
            //   subredditName={post.subreddit.name}
            //   votesAmt={votesAmt}
            //   currentVote={currentVote}
            // />
            <></>
          )
        }
      })}

      {isLoading && (
        <li className='flex justify-center'>
          <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
        </li>
      )}

      {!isLoading && !hasMore && (
        <li className='flex justify-center text-gray-500'>
          No more posts to load.
        </li>
      )}
    </ul>
  )
}

export default PostFeed
