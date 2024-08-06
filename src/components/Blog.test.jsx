import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders content', () => {

  const blog = {
    title: 'testi otsikko',
    author: 'testi kirjoittaja',
  }

  render(<Blog blog={blog} />)
  screen.debug()

  screen.getByText('testi otsikko')
  screen.getByText('testi kirjoittaja')
})