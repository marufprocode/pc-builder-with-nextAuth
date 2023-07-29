import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import useSWR from 'swr'
import Link from 'next/link';


const fetcher = (...args) => fetch(...args).then((res) => res.json())

const items = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
    key: '0',
  },
];
const CategoriesMenu = () => {
  const { data } = useSWR('/api/products/categories', fetcher)
  
  const items = data?.map((category) => ({
    label: <Link href={`/category/${category?._id}`}>
    {category?.title}
  </Link>,
    key: category._id,
  })) || [];

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Categories
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
};

export default CategoriesMenu;