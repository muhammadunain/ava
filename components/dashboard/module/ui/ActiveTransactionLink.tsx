import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'
const ActiveTransactionLink = () => {
  return (
   <Accordion  type="single" collapsible className='mx-3'>
  <AccordionItem value="item-1" >
    <AccordionTrigger className='cursor-pointer ' >Active</AccordionTrigger>
    <AccordionContent>
    <Link href={'/transactions'}>
   410 FLAGSHIP DR # 501
   </Link>
    </AccordionContent>
  </AccordionItem>
   <AccordionItem value="item-1" >
    <AccordionTrigger className='cursor-pointer ' >Close</AccordionTrigger>
    <AccordionContent>
    {/* <Link href={'/transactions'}>
   410 FLAGSHIP DR # 501
   </Link> */}
    </AccordionContent>
  </AccordionItem>
   <AccordionItem value="item-1" >
    <AccordionTrigger className='cursor-pointer ' >Void</AccordionTrigger>
    <AccordionContent>
    {/* <Link href={'/transactions'}>
   410 FLAGSHIP DR # 501
   </Link> */}
    </AccordionContent>
  </AccordionItem>
</Accordion>
  )
}

export default ActiveTransactionLink
