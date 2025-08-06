import React from 'react'
import { House, ArrowLeft } from '@phosphor-icons/react'

interface NotFoundPageProps {
  onGoHome: () => void
  onGoBack: () => void
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome, onGoBack }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-8">
      <div className="max-w-md text-center">
        {/* 404 Code */}
        <div className="mb-8">
          <h1 className="text-6xl font-light text-foreground mb-2">404</h1>
          <div className="w-16 h-px bg-muted-foreground mx-auto"></div>
        </div>

        {/* Message */}
        <div className="mb-12">
          <h2 className="text-xl font-light text-foreground mb-4">Page not found</h2>
          <p className="text-muted-foreground leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            It might be a typo in the URL or the content may have been removed.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onGoBack}
            className="flex items-center justify-center gap-2 px-6 py-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span>Go back</span>
          </button>
          
          <button
            onClick={onGoHome}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded hover:bg-opacity-90 transition-all duration-200"
          >
            <House size={16} />
            <span>Go home</span>
          </button>
        </div>

        {/* Subtle decoration */}
        <div className="mt-16 text-xs text-muted-foreground opacity-50">
          Silent Commit
        </div>
      </div>
    </div>
  )
}