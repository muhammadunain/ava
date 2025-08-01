import { DataTable } from '@/components/side-bar/data-table'
import React from 'react'
import data from "../../../public/data.json";
const page = () => {
  return (
    <div>
      <DataTable data={data} />
    </div>
  )
}

export default page
