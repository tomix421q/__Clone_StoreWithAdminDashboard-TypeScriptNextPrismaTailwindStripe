import { formatCurrenncy } from '@/lib/formatters'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'

type ProductCardProps = {
  id: string
  name: string
  priceInCents: number
  description: string
  imagePath: string
}

export function ProductCard({ id, name, priceInCents, description, imagePath }: ProductCardProps) {
  return (
    <Card className='flex overflow-hidden flex-col'>
      <div className='relative w-full h-auto aspect-video'>
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrenncy(priceInCents / 100)}</CardDescription>
      </CardHeader>

      <CardContent className='flex-grow'>
        <p className='line-clamp-4'>{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size={'lg'} className='w-full'>
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className='flex overflow-hidden flex-col'>
      <div className='relative w-full h-auto aspect-video bg-gray-300'></div>
      <CardHeader>
        <CardTitle>
          <div className='w-3/4 h-6 rounded-full bg-gray-300'></div>
        </CardTitle>
        <CardDescription>
          <div className='w-1/2 h-4 rounded-full bg-gray-300'></div>
        </CardDescription>
      </CardHeader>

      <CardContent className='flex-grow'>
        <div className='w-full h-4 rounded-full bg-gray-300'></div>
        <div className='w-full h-4 rounded-full bg-gray-300'></div>
        <div className='w-full h-4 rounded-full bg-gray-300'></div>
      </CardContent>
      <CardFooter>
        <Button size={'lg'} className='w-full'></Button>
      </CardFooter>
    </Card>
  )
}
