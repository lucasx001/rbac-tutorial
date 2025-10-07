import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import z from "zod"
import { Skeleton } from "./ui/skeleton"
import { PlusIcon } from "lucide-react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const respSchema = z.array(
        z.object({
          id: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
          title: z.string(),
          userId: z.string(),
        })
      )
      const resp = await axios.get("/chat/list")

      const data = respSchema.parse(resp.data)
      return data
    },
  })
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuItem>
          <h1 className="font-bold text-2xl">Chat Bot</h1>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <PlusIcon />
            <span className="text-lg">New chat</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent chat</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data ? (
                data.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton>{item.title}</SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <Skeleton />
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
