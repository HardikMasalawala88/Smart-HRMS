"use client"

import { useState, useRef, useEffect } from "react"
import { Hash, MoreHorizontal, Paperclip, Phone, Plus, Search, Send, Settings, Smile, Users, Video } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type ChatType = "direct" | "channel"

interface ChatContact {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline" | "away"
  type: ChatType
  lastMessage?: string
  lastMessageTime?: string
  unreadCount?: number
  members?: number
}

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: string
  isOwn: boolean
}

const mockContacts: ChatContact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    status: "online",
    type: "direct",
    lastMessage: "Let me know when you're ready for the meeting",
    lastMessageTime: "2 min ago",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Michael Chen",
    status: "online",
    type: "direct",
    lastMessage: "The code review is done",
    lastMessageTime: "15 min ago",
  },
  {
    id: "3",
    name: "Engineering",
    status: "online",
    type: "channel",
    lastMessage: "New deployment scheduled for tonight",
    lastMessageTime: "1 hour ago",
    members: 45,
    unreadCount: 5,
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    status: "away",
    type: "direct",
    lastMessage: "I'll send the designs tomorrow",
    lastMessageTime: "3 hours ago",
  },
  {
    id: "5",
    name: "General",
    status: "online",
    type: "channel",
    lastMessage: "Welcome to the team chat!",
    lastMessageTime: "5 hours ago",
    members: 156,
  },
  {
    id: "6",
    name: "Product Launch",
    status: "online",
    type: "channel",
    lastMessage: "Timeline updated for Q2",
    lastMessageTime: "Yesterday",
    members: 24,
  },
  {
    id: "7",
    name: "James Wilson",
    status: "offline",
    type: "direct",
    lastMessage: "Thanks for the update!",
    lastMessageTime: "Yesterday",
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "sarah",
    senderName: "Sarah Johnson",
    content: "Hi! How's the project coming along?",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    senderId: "me",
    senderName: "You",
    content: "Going well! Just finished the main components. Working on the API integration now.",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: "3",
    senderId: "sarah",
    senderName: "Sarah Johnson",
    content: "That's great progress! Do you need any help with the API?",
    timestamp: "10:33 AM",
    isOwn: false,
  },
  {
    id: "4",
    senderId: "me",
    senderName: "You",
    content: "I think I'm good for now. The documentation is pretty clear. I'll let you know if I run into any issues.",
    timestamp: "10:35 AM",
    isOwn: true,
  },
  {
    id: "5",
    senderId: "sarah",
    senderName: "Sarah Johnson",
    content: "Perfect! We have a team sync at 2pm today. Can you give a quick update on your progress?",
    timestamp: "10:36 AM",
    isOwn: false,
  },
  {
    id: "6",
    senderId: "me",
    senderName: "You",
    content: "Sure thing! I'll prepare a quick demo as well.",
    timestamp: "10:37 AM",
    isOwn: true,
  },
  {
    id: "7",
    senderId: "sarah",
    senderName: "Sarah Johnson",
    content: "Let me know when you're ready for the meeting",
    timestamp: "10:45 AM",
    isOwn: false,
  },
]

const statusColors = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-muted-foreground",
}

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<ChatContact>(mockContacts[0])
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage: Message = {
      id: String(messages.length + 1),
      senderId: "me",
      senderName: "You",
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    }

    setMessages([...messages, newMessage])
    setMessageInput("")
  }

  const directMessages = mockContacts.filter((c) => c.type === "direct")
  const channels = mockContacts.filter((c) => c.type === "channel")

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Messages" },
        ]}
      />
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 border-r border-border flex flex-col bg-muted/30">
          {/* Search */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-8 h-9 bg-background" />
            </div>
          </div>

          <ScrollArea className="flex-1">
            {/* Channels */}
            <div className="p-2">
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Channels</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-0.5">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChat(channel)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors",
                      selectedChat.id === channel.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    <Hash className="h-4 w-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{channel.name}</p>
                    </div>
                    {channel.unreadCount && channel.unreadCount > 0 && (
                      <Badge className="h-5 w-5 p-0 justify-center bg-primary text-primary-foreground text-xs">
                        {channel.unreadCount}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Separator className="my-2" />

            {/* Direct Messages */}
            <div className="p-2">
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Direct Messages</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-0.5">
                {directMessages.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedChat(contact)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors",
                      selectedChat.id === contact.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={cn(
                          "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background",
                          statusColors[contact.status]
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{contact.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unreadCount && contact.unreadCount > 0 && (
                      <Badge className="h-5 w-5 p-0 justify-center bg-primary text-primary-foreground text-xs">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-14 border-b border-border flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              {selectedChat.type === "channel" ? (
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Hash className="h-5 w-5 text-primary" />
                </div>
              ) : (
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedChat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background",
                      statusColors[selectedChat.status]
                    )}
                  />
                </div>
              )}
              <div>
                <p className="font-medium">{selectedChat.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedChat.type === "channel"
                    ? `${selectedChat.members} members`
                    : selectedChat.status}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {selectedChat.type === "direct" && (
                <>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Video className="h-4 w-4" />
                  </Button>
                </>
              )}
              {selectedChat.type === "channel" && (
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Users className="h-4 w-4" />
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-3", message.isOwn && "justify-end")}
                >
                  {!message.isOwn && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {message.senderName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-2",
                      message.isOwn
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm"
                    )}
                  >
                    {!message.isOwn && (
                      <p className="text-xs font-medium mb-1">{message.senderName}</p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={cn(
                        "text-xs mt-1",
                        message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                <Smile className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
