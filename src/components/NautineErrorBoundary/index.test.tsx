import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { NautineErrorBoundary } from '.'

test('is truthy', () => {
    expect(NautineErrorBoundary).toBeTruthy()
})

test('should wrap children correctly', () => {
    const FaultyComponent: React.FC = () => {
        const items = [{ name: 'A' }, { name: 'B' }]
        return <span>{items[2].name}</span>
    }

    render(
        <NautineErrorBoundary fallback="Error">
            <FaultyComponent />
        </NautineErrorBoundary>,
    )

    expect(screen.getByText('Error')).toBeInTheDocument()
})
