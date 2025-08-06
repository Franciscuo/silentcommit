import React from 'react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const renderContent = (text: string) => {
    // Basic markdown parsing - headers
    text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>')
    text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>')
    text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>')
    
    // Bold and italic
    text = text.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    text = text.replace(/\*(.*?)\*/gim, '<em>$1</em>')
    
    // Code blocks
    text = text.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    text = text.replace(/`(.*?)`/gim, '<code>$1</code>')
    
    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    
    // Line breaks
    text = text.replace(/\n\n/gim, '</p><p>')
    text = text.replace(/\n/gim, '<br>')
    
    // Wrap in paragraphs
    text = '<p>' + text + '</p>'
    
    // Clean up empty paragraphs
    text = text.replace(/<p><\/p>/gim, '')
    text = text.replace(/<p><h([1-6])>/gim, '<h$1>')
    text = text.replace(/<\/h([1-6])><\/p>/gim, '</h$1>')
    text = text.replace(/<p><pre>/gim, '<pre>')
    text = text.replace(/<\/pre><\/p>/gim, '</pre>')
    
    return text
  }

  return (
    <div 
      className={`prose ${className}`}
      dangerouslySetInnerHTML={{ __html: renderContent(content) }}
    />
  )
}