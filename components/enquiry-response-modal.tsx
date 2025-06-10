"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquare, Send } from "lucide-react"

interface EnquiryResponseModalProps {
  isOpen: boolean
  onClose: () => void
  enquiry: any
  onSendResponse: (response: string) => void
}

export function EnquiryResponseModal({ isOpen, onClose, enquiry, onSendResponse }: EnquiryResponseModalProps) {
  const [response, setResponse] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!response.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSendResponse(response)
    setResponse("")
    setIsSubmitting(false)
    onClose()
  }

  if (!enquiry) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Respond to Enquiry
          </DialogTitle>
          <DialogDescription>Send a response to this enquiry</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Original Enquiry */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Original Enquiry</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium">From: </span>
                <span className="text-sm">{enquiry.from}</span>
                {enquiry.email && (
                  <>
                    <span className="text-sm font-medium ml-4">Email: </span>
                    <span className="text-sm">{enquiry.email}</span>
                  </>
                )}
              </div>
              <div>
                <span className="text-sm font-medium">Subject: </span>
                <span className="text-sm">{enquiry.subject}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Message: </span>
                <p className="text-sm mt-1">{enquiry.message}</p>
              </div>
            </div>
          </div>

          {/* Response Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="response">Your Response</Label>
              <Textarea
                id="response"
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={6}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !response.trim()}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Response
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
