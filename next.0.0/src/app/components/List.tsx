import React from 'react'

type Props = {}

function List({}: Props) {
  return (
    <ul className="my-4">
    <li className="inline-block bg-orange-200 rounded-full px-4 py-1 mr-2">CSS</li>
    <li className="inline-block bg-orange-200 rounded-full px-4 py-1 mr-2">HTML</li>
    <li className="inline-block bg-orange-200 rounded-full px-4 py-1 mr-2">Javascript</li>
</ul>
  )
}

export default List