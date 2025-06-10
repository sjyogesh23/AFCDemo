"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MessageSquare, ArrowLeft, Clock, MapPin, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ContactAdminPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    // In a real app, show success message
    alert("Message sent successfully! Admin will respond within 24 hours.")
    setFormData({ subject: "", category: "", message: "" })
  }

  return (
    <TooltipProvider>
      <div className="container py-8 max-w-6xl">
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard">
                  <Button variant="outline" size="icon" className="focus-ring">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Back to Dashboard</p>
              </TooltipContent>
            </Tooltip>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 bg-clip-text text-transparent">
                Contact Admin
              </h1>
              <p className="text-muted-foreground">Get help with your account or appointments</p>
            </div>
          </div>

          {/* Emergency Alert */}
          <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="tech-icon-container-error">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800 dark:text-red-300">Emergency Contact</h3>
                  <p className="text-red-700 dark:text-red-400">
                    For medical emergencies, call <span className="font-bold">(617) 555-HELP</span> or dial 911
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="tech-card tech-card-hover">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center">
                    <div className="tech-icon-container mr-3">
                      <Phone className="h-5 w-5" />
                    </div>
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">(617) 555-0123</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      <span className="text-sm text-slate-500 dark:text-slate-400">Mon-Fri: 8AM-6PM EST</span>
                    </div>
                  </div>
                  <Badge className="tech-badge-success">Available Now</Badge>
                </CardContent>
              </Card>

              <Card className="tech-card tech-card-hover">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center">
                    <div className="tech-icon-container mr-3">
                      <Mail className="h-5 w-5" />
                    </div>
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">support@giaafc.com</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      <span className="text-sm text-slate-500 dark:text-slate-400">Response within 24 hours</span>
                    </div>
                  </div>
                  <Badge className="tech-badge-warning">Business Hours</Badge>
                </CardContent>
              </Card>

              <Card className="tech-card tech-card-hover">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center">
                    <div className="tech-icon-container-secondary mr-3">
                      <MapPin className="h-5 w-5" />
                    </div>
                    Office Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium text-slate-800 dark:text-slate-200">GIA AFC Main Office</p>
                    <p className="text-slate-600 dark:text-slate-400">
                      123 Healthcare Ave
                      <br />
                      Boston, MA 02101
                    </p>
                    <div className="flex items-center space-x-2 mt-3">
                      <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      <span className="text-sm text-slate-500 dark:text-slate-400">Mon-Fri: 7AM-7PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="tech-card">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center text-2xl">
                    <div className="tech-icon-container mr-4">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    Send Message
                  </CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and we'll get back to you soon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Your Name
                        </Label>
                        <Input
                          id="name"
                          value={user?.name || ""}
                          disabled
                          className="bg-slate-50 dark:bg-slate-800/50 focus-ring"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Your Email
                        </Label>
                        <Input
                          id="email"
                          value={user?.email || ""}
                          disabled
                          className="bg-slate-50 dark:bg-slate-800/50 focus-ring"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium">
                        Category *
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                        <SelectTrigger className="focus-ring">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="appointment">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <span>Appointment Issues</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="billing">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>Billing Questions</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="technical">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                              <span>Technical Support</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="complaint">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                              <span>Complaint</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="general">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                              <span>General Inquiry</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={formData.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        required
                        className="focus-ring"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide details about your inquiry..."
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        rows={6}
                        required
                        className="focus-ring resize-none"
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Please include any relevant details to help us assist you better
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full tech-gradient text-white hover:shadow-md transition-shadow focus-ring h-12 text-base font-medium"
                      disabled={isSubmitting || !formData.subject || !formData.category || !formData.message}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending Message...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-5 w-5" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <Card className="tech-card">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">Quick Response</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Most inquiries are answered within 2-4 hours during business hours
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                    <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">Expert Support</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Our dedicated support team has extensive healthcare experience
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto">
                    <Phone className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">24/7 Emergency</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Emergency support available around the clock for urgent matters
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
