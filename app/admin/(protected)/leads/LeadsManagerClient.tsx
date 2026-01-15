"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ConsultancyLead {
  id: string
  full_name: string
  email: string
  phone: string | null
  company_name: string | null
  service_interest: string | null
  message: string | null
  timeline: string | null
  budget_range: string | null
  read: boolean
  created_at: string
}

interface ContactMessage {
  id: string
  sender_name: string
  sender_email: string
  subject: string
  message: string
  message_type: string | null
  read: boolean
  created_at: string
}

type Lead = ConsultancyLead | ContactMessage

interface LeadsManagerClientProps {
  initialLeads: ConsultancyLead[]
  initialMessages: ContactMessage[]
}

export default function LeadsManagerClient({ initialLeads, initialMessages }: LeadsManagerClientProps) {
  const [leads, setLeads] = useState<ConsultancyLead[]>(initialLeads)
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages)
  const [activeTab, setActiveTab] = useState("consultancy")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const handleMarkAsRead = async (leadId: string) => {
    // Call API to mark as read
    await fetch(`/api/admin/leads/${leadId}/read`, { method: "POST" })
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, read: true } : l)))
  }

  const unreadLeads = leads.filter((l) => !l.read).length
  const unreadMessages = messages.filter((m) => !m.read).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Leads & Messages</h1>
        <p className="text-foreground/80">Manage consultancy leads and contact form submissions</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("consultancy")}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === "consultancy"
              ? "border-primary text-primary"
              : "border-transparent text-foreground/60 hover:text-foreground"
          }`}
        >
          Consultancy Leads {unreadLeads > 0 && `(${unreadLeads})`}
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === "messages"
              ? "border-primary text-primary"
              : "border-transparent text-foreground/60 hover:text-foreground"
          }`}
        >
          Contact Messages {unreadMessages > 0 && `(${unreadMessages})`}
        </button>
      </div>

      {/* Consultancy Leads Tab */}
      {activeTab === "consultancy" && (
        <div>
          {leads.length > 0 ? (
            <div className="space-y-4">
              {leads.map((lead) => (
                <Card
                  key={lead.id}
                  className={`border-border cursor-pointer hover:shadow-lg transition-shadow ${!lead.read ? "border-accent bg-accent/5" : ""}`}
                  onClick={() => setSelectedLead(lead)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{lead.full_name}</CardTitle>
                          {!lead.read && <Badge className="bg-accent">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{lead.email}</p>
                        {lead.company_name && <p className="text-sm text-foreground/70">{lead.company_name}</p>}
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {lead.service_interest && (
                        <p className="text-sm font-semibold text-primary">Service: {lead.service_interest}</p>
                      )}
                      {lead.message && (
                        <p className="text-sm text-foreground/80 line-clamp-2">{lead.message.substring(0, 150)}...</p>
                      )}
                      <div className="flex items-center gap-2 pt-2">
                        {lead.timeline && (
                          <Badge variant="outline" className="text-xs">
                            {lead.timeline}
                          </Badge>
                        )}
                        {lead.budget_range && (
                          <Badge variant="outline" className="text-xs">
                            {lead.budget_range}
                          </Badge>
                        )}
                        {!lead.read && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMarkAsRead(lead.id)
                            }}
                          >
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border text-center py-12">
              <p className="text-muted-foreground">No consultancy leads yet.</p>
            </Card>
          )}
        </div>
      )}

      {/* Contact Messages Tab */}
      {activeTab === "messages" && (
        <div>
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg) => (
                <Card
                  key={msg.id}
                  className={`border-border cursor-pointer hover:shadow-lg transition-shadow ${!msg.read ? "border-accent bg-accent/5" : ""}`}
                  onClick={() => setSelectedLead(msg)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{msg.sender_name}</CardTitle>
                          {!msg.read && <Badge className="bg-accent">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{msg.sender_email}</p>
                        <p className="text-sm font-semibold text-primary mt-1">{msg.subject}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80 line-clamp-2">{msg.message.substring(0, 150)}...</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border text-center py-12">
              <p className="text-muted-foreground">No contact messages yet.</p>
            </Card>
          )}
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <Card className="border-border fixed inset-4 z-50 overflow-y-auto max-h-[90vh]">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-2xl">
                {"full_name" in selectedLead ? selectedLead.full_name : selectedLead.sender_name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {"email" in selectedLead ? selectedLead.email : selectedLead.sender_email}
              </p>
            </div>
            <Button variant="outline" onClick={() => setSelectedLead(null)}>
              Close
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Consultancy Lead Details */}
            {"full_name" in selectedLead && (
              <>
                {selectedLead.company_name && (
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Company</h4>
                    <p className="text-foreground/80">{selectedLead.company_name}</p>
                  </div>
                )}
                {selectedLead.phone && (
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Phone</h4>
                    <p className="text-foreground/80">{selectedLead.phone}</p>
                  </div>
                )}
                {selectedLead.service_interest && (
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Service Interest</h4>
                    <p className="text-foreground/80">{selectedLead.service_interest}</p>
                  </div>
                )}
                {selectedLead.timeline && (
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Timeline</h4>
                    <p className="text-foreground/80">{selectedLead.timeline}</p>
                  </div>
                )}
                {selectedLead.budget_range && (
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Budget Range</h4>
                    <p className="text-foreground/80">{selectedLead.budget_range}</p>
                  </div>
                )}
              </>
            )}

            {/* Contact Message Details */}
            {"subject" in selectedLead && (
              <>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Subject</h4>
                  <p className="text-foreground/80">{selectedLead.subject}</p>
                </div>
                {selectedLead.message_type && (
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Message Type</h4>
                    <p className="text-foreground/80">{selectedLead.message_type}</p>
                  </div>
                )}
              </>
            )}

            {/* Message Content */}
            <div>
              <h4 className="font-semibold text-primary mb-1">Message</h4>
              <p className="text-foreground/80 whitespace-pre-wrap">{selectedLead.message}</p>
            </div>

            {/* Metadata */}
            <div className="text-xs text-muted-foreground border-t border-border pt-4">
              <p>Received: {new Date(selectedLead.created_at).toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
