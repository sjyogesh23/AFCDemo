"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Users, Mic, MessageSquare, Send, FileText } from "lucide-react"

export function Hero() {
  const [openForm, setOpenForm] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
  })

  const isFormComplete = Object.values(form).every(val => val.trim() !== "")

  const handleSubmit = async () => {
    try {
      await fetch("https://n8n.rbdesigntech.com/webhook/afcwebdemo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      setOpenForm(false)
      setShowConfirm(true)
    } catch (error) {
      console.error("Submission error:", error)
    }
  }

  return (
    <>
      {/* Main Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Compassionate Care for <span className="text-primary">Massachusetts</span> Residents
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  GIA's Adult Foster Care program provides personalized healthcare services with HIPAA-compliant digital
                  workflows for streamlined patient care.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-muted-foreground">Patients Served</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-muted-foreground">Healthcare Providers</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-muted-foreground">HIPAA Compliant</div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-semibold">Get Started with AI Agents</h2>
                <p className="text-muted-foreground">Register Now by choosing your preferred option.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-48 flex flex-col items-center justify-center gap-6 hover:bg-primary/10"
                  onClick={() => setOpenForm(true)}
                >
                  <Mic className="!h-[50px] !w-[50px] text-primary" />
                  <span className="text-2xl font-bold">Talk</span>
                </Button>

                <Button variant="outline" size="lg" className="h-48 flex flex-col items-center justify-center gap-6 hover:bg-primary/10">
                  <MessageSquare className="!h-[50px] !w-[50px] text-primary" />
                  <span className="text-2xl font-bold">Chat</span>
                </Button>

                <Button variant="outline" size="lg" className="h-48 flex flex-col items-center justify-center gap-6 hover:bg-primary/10">
                  <Send className="!h-[50px] !w-[50px] text-primary" />
                  <span className="text-2xl font-bold">Telegram</span>
                </Button>

                <Button variant="outline" size="lg" className="h-48 flex flex-col items-center justify-center gap-6 hover:bg-primary/10">
                  <FileText className="!h-[50px] !w-[50px] text-primary" />
                  <span className="text-2xl font-bold">Form</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Modal */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Talk Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <Label>Time</Label>
              <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
            <div>
              <Label>Reason</Label>
              <Input value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
            </div>
            <Button disabled={!isFormComplete} onClick={handleSubmit} className="w-full mt-2">
              Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
          </DialogHeader>
          <p className="text-center text-lg">Lisa will call you now.</p>
        </DialogContent>
      </Dialog>
    </>
  )
}
