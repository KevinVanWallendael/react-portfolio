import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ExternalLink, Loader2 } from "lucide-react"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  demoUrl: string
}

export const DemoModal = ({ isOpen, onClose, title, demoUrl }: DemoModalProps) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [iframeError, setIframeError] = React.useState(false)
  const [showFallback, setShowFallback] = React.useState(false)

  // Reset states when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setIframeError(false)
      setShowFallback(false)
    }
  }, [isOpen])

  // Set timeout to show fallback if iframe doesn't load
  React.useEffect(() => {
    if (isOpen && isLoading) {
      const timeout = setTimeout(() => {
        if (isLoading) {
          setShowFallback(true)
          setIsLoading(false)
        }
      }, 10000) // 10 second timeout

      return () => clearTimeout(timeout)
    }
  }, [isOpen, isLoading])

  const handleIframeLoad = () => {
    setIsLoading(false)
    setIframeError(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setIframeError(true)
    setShowFallback(true)
  }

  const openInNewTab = () => {
    window.open(demoUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 gap-0 flex flex-col [&>button]:hidden">
        <DialogHeader className="px-4 py-2 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{title} - Live Demo</DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={openInNewTab}>
                <ExternalLink size={16} />
                Open in New Tab
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X size={16} />
                Close
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 relative">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading demo...</p>
              </div>
            </div>
          )}

          {/* Fallback State */}
          {showFallback && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="flex flex-col items-center gap-4 text-center max-w-md mx-auto p-6">
                <ExternalLink className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Demo cannot be embedded</h3>
                <p className="text-sm text-muted-foreground">
                  This demo uses security settings that prevent it from being displayed in an embedded frame. 
                  Click the button below to open it in a new tab for the full experience.
                </p>
                <Button onClick={openInNewTab} className="mt-2">
                  <ExternalLink size={16} className="mr-2" />
                  Open {title} Demo
                </Button>
              </div>
            </div>
          )}

          {/* Iframe */}
          <iframe
            src={demoUrl}
            className="w-full h-full"
            title={`${title} Demo`}
            frameBorder="0"
            allowFullScreen
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            style={{ display: showFallback ? 'none' : 'block' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}