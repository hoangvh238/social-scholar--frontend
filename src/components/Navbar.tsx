import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Icons } from './Icons'
import { buttonVariants } from './ui/Button'
import { UserAccountNav } from './UserAccountNav'
import SearchBar from './SearchBar'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { getCookie } from "cookies-next";
const Navbar =  () => {
  const session =  getCookie("token");
  const user = useSelector((state: RootState) => state.userInfor.currentUser);
  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        {/* logo */}
        <Link href='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
          <p className='hidden text-zinc-700 text-sm font-medium md:block'>Breadit</p>
        </Link>

        {/* search bar */}
        <SearchBar />

        {/* actions */}
        {session ? (
          <UserAccountNav user={user} />
        ) : (
          <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar