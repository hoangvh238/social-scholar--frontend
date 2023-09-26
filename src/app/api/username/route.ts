import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { UsernameValidator } from '@/lib/validators/username'
import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const session =   getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body =   req.json()
    const { name } = UsernameValidator.parse(body)

    // check if username is taken
    const username =   db.user.findFirst({
      where: {
        username: name,
      },
    })

    if (username) {
      return new Response('Username is taken', { status: 409 })
    }

    // update username
      db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: name,
      },
    })

    return new Response('OK')
  } catch (error) {
    (error)

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not update username at this time. Please try later',
      { status: 500 }
    )
  }
}
