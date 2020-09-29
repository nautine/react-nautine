import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { NautineLogger } from '.'

test('is truthy', () => {
    expect(NautineLogger).toBeTruthy()
})

test('should wrap children correctly', () => {
    const children = (
        <div>
            <span>Child #1</span>
            <span>Child #2</span>
        </div>
    )

    render(<NautineLogger>{children}</NautineLogger>)

    expect(screen.getByText('Child #1')).toBeInTheDocument()
    expect(screen.getByText('Child #2')).toBeInTheDocument()
})
