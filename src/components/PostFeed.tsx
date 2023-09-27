"use client"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import Post from './Post'
import { useSession } from 'next-auth/react'
import { getAllPost } from '../../apis/posts'
import { ValidationError } from 'yup'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


type Posts = {
   posts : CurrPost[]
}

type CurrPost = { 
  postId : number,
  content : string,
  time : Date,
  imageURL : string,
  author : string,
  groupName : string,
  comments : Comment[],
  reports : [],
  likes : Like[]
}

type Comment = { 
  commentId: number,
  postId : number,
  commentParentId : number;
  content: string,
  time: Date,
  author : string,
  reports: [],
  likes: Like[]
}

type Like = {
  author : string,
  likeId : number,
  status : number , 
  time : Date
}   

const PostFeed = () => {
  const [posts, setPosts] = useState<Posts>({ posts: [] });
  const user = useSelector((state: RootState) => state.userInfor.currentUser.userName);

  const fetchPost = async () => {
    try {
      const postData = await getAllPost();
      setPosts({ posts: postData.data });
    } catch (error: unknown) {

    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <ul className='flex flex-col col-span-2 space-y-6'>
      {posts.posts.map((post, index) => {
        const votesAmt = post.likes.reduce((acc, vote) => {
          if (vote.status === 1) return acc + 1
          if (vote.status === -1) return acc - 1
          return acc
        }, 0)

        const currentVote = post.likes.find(
          (vote) => vote.author === user
        )

        return (
          <Post
            key={post.postId}
            post={post}
            commentAmt={post.comments.length}
            subredditName={post.groupName}
            votesAmt={votesAmt}
            currentVote={currentVote}
          />
        )
      })}
    </ul>
  )
}

export default PostFeed
