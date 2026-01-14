"use client"

import * as React from "react"
import { codeToHtml } from "shiki"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeSnippetProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeSnippet({
  code,
  language = "typescript",
  showLineNumbers = false,
  className,
}: CodeSnippetProps) {
  const [html, setHtml] = React.useState<string>("")
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    const highlightCode = async () => {
      try {
        // Shiki's codeToHtml produces safe, sanitized HTML output
        const highlighted = await codeToHtml(code, {
          lang: language,
          theme: "github-dark",
        })
        setHtml(highlighted)
      } catch (error) {
        console.error("Failed to highlight code:", error)
        // Fallback to plain code
        setHtml(`<pre><code>${code}</code></pre>`)
      }
    }

    highlightCode()
  }, [code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy code:", error)
    }
  }

  return (
    <div className={cn("relative group", className)}>
      {/* Copy button */}
      <div className="absolute top-3 right-3 z-10">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card"
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </Button>
      </div>

      {/* Code container */}
      <div
        className={cn(
          "rounded-lg overflow-hidden",
          "bg-[#0d1117] border border-border/50",
          "shadow-lg",
          showLineNumbers && "[&_pre]:pl-12"
        )}
      >
        {/* Safe to use dangerouslySetInnerHTML here as Shiki produces sanitized HTML */}
        <div
          className={cn(
            "overflow-x-auto",
            "[&_pre]:p-4 [&_pre]:!bg-transparent",
            "[&_pre]:text-sm [&_pre]:leading-relaxed",
            "[&_code]:font-mono"
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
