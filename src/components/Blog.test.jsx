import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content title and author', () => {

  const blog = {
    title: 'testi otsikko',
    author: 'testi kirjoittaja',
  }

  render(<Blog blog={blog} />)
  

  screen.getByText('testi otsikko')
  screen.getByText('testi kirjoittaja')
})

test('click button to show all content', async () => { 
  const blog = {
    title: 'testi otsikko',
    author: 'testi kirjoittaja',
    url: 'testi url',
    likes: 0
  }


  render(<Blog blog={blog}/>)
  screen.debug()

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  screen.getByText('testi url')
  screen.getByText('likes: 0')

})