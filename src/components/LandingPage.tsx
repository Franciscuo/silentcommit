import React from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ArrowRight, LinkedinLogo, GithubLogo, TwitterLogo } from '@phosphor-icons/react'

interface LandingPageProps {
  onEnterBlog: () => void
}

export function LandingPage({ onEnterBlog }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-8 py-16">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-16">
          <ThemeToggle />
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-light tracking-tight text-foreground mb-6">
              Developer Blog
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Thoughts on software architecture, development practices, and building 
              systems that scale. Written for developers who care about craft.
            </p>
          </div>

          {/* Enter Blog */}
          <div>
            <button
              onClick={onEnterBlog}
              className="group flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors duration-200"
            >
              <span className="text-lg">Read posts</span>
              <ArrowRight 
                size={18} 
                className="group-hover:translate-x-1 transition-transform duration-200" 
              />
            </button>
          </div>

          {/* Topics */}
          <div>
            <h2 className="text-xl font-light text-foreground mb-4">Topics I write about</h2>
            <div className="text-muted-foreground space-y-1">
              <div>• System architecture and design patterns</div>
              <div>• Development workflows and tooling</div>
              <div>• Code quality and maintainability</div>
              <div>• Performance and scalability</div>
              <div>• Team practices and technical leadership</div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-xl font-light text-foreground mb-4">Connect</h2>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={(e) => e.preventDefault()}
              >
                <LinkedinLogo size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={(e) => e.preventDefault()}
              >
                <GithubLogo size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={(e) => e.preventDefault()}
              >
                <TwitterLogo size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}