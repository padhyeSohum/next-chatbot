import { render, screen } from '@testing-library/react'
import Home from '@/pages/index-mui'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Next\.js example/i,
    })

    expect(heading).toBeInTheDocument()
  })
})