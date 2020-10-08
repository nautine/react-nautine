import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { NautineErrorBoundary } from '.'

test('is truthy', () => {
    expect(NautineErrorBoundary).toBeTruthy()
})

test('should return the children when there is no error thrown', () => {
    const CorrectComponent: React.FC = () => <span>Success</span>

    render(
        <NautineErrorBoundary fallback="Error">
            <CorrectComponent />
        </NautineErrorBoundary>,
    )

    expect(screen.queryByText('Error')).not.toBeInTheDocument()
    expect(screen.queryByText('Success')).toBeInTheDocument()
})

test('should return fallback component when there is an error thrown in any of the children', () => {
    const FaultyComponent: React.FC = () => {
        const items = [{ name: 'A' }, { name: 'B' }]
        return <span>{items[2].name}</span>
    }

    render(
        <NautineErrorBoundary fallback="Error">
            <FaultyComponent />
        </NautineErrorBoundary>,
    )

    expect(screen.queryByText('Error')).toBeInTheDocument()
})
