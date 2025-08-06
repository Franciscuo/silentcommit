import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ArrowRight, Code, FileText, LinkedinLogo, GithubLogo, TwitterLogo } from '@phosphor-icons/react'

interface LandingPageProps {
  onEnterBlog: () => void
}

export function LandingPage({ onEnterBlog }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header with Theme Toggle */}
        <header className="mb-16 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Code size={32} className="text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold text-foreground">Dev Blog</h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Welcome to my corner of the internet. I write about software development, 
            system architecture, and the craft of building things that matter.
          </p>

          <Button 
            onClick={onEnterBlog} 
            size="lg" 
            className="flex items-center gap-2 mx-auto"
          >
            <FileText size={20} />
            Read My Posts
            <ArrowRight size={16} />
          </Button>
        </div>

        {/* About Section */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">About This Blog</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This is a curated collection of thoughts and insights from my journey in software development. 
              You'll find posts about modern web technologies, architectural patterns, development workflows, 
              and lessons learned from building real-world applications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Each post is written with the practicing developer in mind - focusing on practical insights 
              rather than surface-level tutorials.
            </p>
          </CardContent>
        </Card>

        {/* Quick Index */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">What You'll Find Here</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Code size={24} className="text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">Technical Deep Dives</h3>
                <p className="text-sm text-muted-foreground">
                  In-depth explorations of complex problems and their elegant solutions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <FileText size={24} className="text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">Architecture Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Thoughts on building scalable, maintainable software systems.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <ArrowRight size={24} className="text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">Development Process</h3>
                <p className="text-sm text-muted-foreground">
                  Best practices, tools, and workflows that improve developer productivity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h3 className="text-lg font-medium mb-6 text-foreground">Connect With Me</h3>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => window.open('#', '_blank')}
            >
              <LinkedinLogo size={16} />
              LinkedIn
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => window.open('#', '_blank')}
            >
              <GithubLogo size={16} />
              GitHub
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => window.open('#', '_blank')}
            >
              <TwitterLogo size={16} />
              Twitter
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Replace the '#' links above with your actual social media profiles
          </p>
        </div>
      </div>
    </div>
  )
}