"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Edit } from "lucide-react"
import Link from "next/link"
import { EditProfileModal } from "@/components/edit-profile-modal"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <div className="container py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Professional Profile</h1>
            <p className="text-muted-foreground">Your professional information</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{user?.name}</h3>
                <p className="text-muted-foreground">{user?.specialization || "Doctor"}</p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-sm">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-sm">{user?.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Professional Information</CardTitle>
                    <CardDescription>Your professional details</CardDescription>
                  </div>
                  <Button onClick={() => setIsEditModalOpen(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                      <p className="text-lg">{user?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                      <p className="text-lg">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                      <p className="text-lg">{user?.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Specialization</p>
                      <p className="text-lg">{user?.specialization || "Internal Medicine"}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Professional Bio</p>
                    <p className="text-base mt-1">
                      {user?.bio || "No bio available. Click edit to add your professional background."}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Experience</p>
                    <p className="text-base mt-1">
                      {user?.experience || "No experience details available. Click edit to add your experience."}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Education</p>
                    <p className="text-base mt-1">
                      {user?.education || "No education details available. Click edit to add your qualifications."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={user} />
      </div>
    </div>
  )
}
