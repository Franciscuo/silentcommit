import React from 'react'
import { CaretRight, LinkedinLogo, GithubLogo } from '@phosphor-icons/react'
import { useSEO } from '@/hooks/useSEO'
import { useAnalytics } from '@/hooks/useAnalytics'
import { siteConfig } from '@/config/site'

interface LandingPageProps {
  onEnterBlog: () => void
}

export function LandingPage({ onEnterBlog }: LandingPageProps) {
  const { trackSocialClick } = useAnalytics()
  
  // Set SEO for landing page
  useSEO({
    title: `${siteConfig.name} - Software Development Insights`,
    description: siteConfig.description,
    keywords: "software development, coding, programming, react, typescript, web development, engineering, tech blog",
    canonical: siteConfig.url
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-8 py-16">
        {/* Main Content */}
        <div className="space-y-16 mt-16">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-light tracking-tight text-foreground mb-6">
              {siteConfig.name}
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
              <CaretRight 
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
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('linkedin')}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <LinkedinLogo size={20} />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('github')}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <GithubLogo size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}