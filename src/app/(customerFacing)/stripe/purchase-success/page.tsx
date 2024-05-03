import { Button } from '@/components/ui/button'
import db from '@/db/db'
import { formatCurrenncy } from '@/lib/formatters'
import { HomeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
export default async function SuccessPage({ searchParams }: { searchParams: { payment_intent: string } }) {
  const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)

  if (paymentIntent.metadata.productId === null) return notFound()

  const product = await db.product.findUnique({ where: { id: paymentIntent.metadata.productId } })

  if (product == null) return notFound()

  const isSuccess = paymentIntent.status === 'succeeded'

  return (
    <div className='max-w-5xl w-full mx-auto space-y-8'>
      <h1 className={`text-4xl font-bold bg-gray-700 p-5 rounded-lg ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
        {isSuccess ? 'SUCCESS :)' : 'ERROR !'}
      </h1>
      <div className='flex gap-4 items-center'>
        <div className='aspect-video flex-shrink-0 w-1/3 relative'>
          <Image src={product.imagePath} alt={product.name} fill className='object-cover' />
        </div>
        <div>
          <div className='text-lg'>{formatCurrenncy(product.priceInCents / 100)}</div>
          <h1 className='text-2xl font-bold'>{product.name}</h1>
          <div className='line-clamp-3 text-muted-foreground'>{product.description}</div>
        </div>
        <Button className='mt-6' size={'lg'} asChild>
          {isSuccess ? (
            <a href={`/products/download/${await createDownloadVerification(product.id)}`}>Download</a>
          ) : (
            <Link href={`/products/${product.id}/purchase`} className='text-red-600 text-4xl'>
              Try Again
            </Link>
          )}
        </Button>
        {/*  */}
        {/*  */}
      </div>
      {isSuccess && (
        <div className='text-center'>
          <Button asChild className='w-1/2  text-5xl p-10 bg-green-500 tracking-widest'>
            <Link href={'/'} className='flex'>
              <HomeIcon size={50} className='mr-10' /> HOME
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

async function createDownloadVerification(productId: string) {
  return (await db.downloadVerification.create({ data: { productId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) } })).id
}
