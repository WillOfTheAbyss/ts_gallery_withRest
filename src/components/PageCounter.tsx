import { Pagination } from 'antd'
import React from 'react'

interface PageCounterProps {
  itemCount: number
  page: number
  error: boolean
  loading: boolean
  setPage: (page: number) => void
}

const PageCounter: React.FC<PageCounterProps> = ({ setPage, itemCount, page, loading, error }) => {
  if (loading) return null
  if (error) return null

  return (
    <>
      {itemCount ? (
        <Pagination
          className='layout-content-page'
          showSizeChanger={false}
          defaultCurrent={1}
          current={page}
          pageSize={15}
          total={itemCount}
          onChange={(page) => {
            setPage(page)
          }}
        />
      ) : null}
    </>
  )
}

export default React.memo(PageCounter)
