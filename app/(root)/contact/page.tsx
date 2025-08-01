import { DataTable } from '@/components/side-bar/data-table'
import React from 'react'
import data from "../../../public/data.json";
import { ContactsSection } from '@/components/ContactSection';
const page = () => {
  return (
    <div className='my-5'>
      <ContactsSection/>
    </div>
  )
}

export default page
