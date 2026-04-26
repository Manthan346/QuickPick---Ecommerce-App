import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {Link} from 'react-router-dom'

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
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Add Items",
    url: "/additems",
    icon: Inbox,
  },
  {
    title: "list items",
    url: "/listitems",
    icon: Calendar,
  },
  {
    title: "orders",
    url: "/allorders",
    icon: Search,
  },

]

export default function SideBar() {
  return (
    <Sidebar collapsible="offcanvas"  className="z-100">
       
      
      <SidebarContent className="bg-background">
        
        <SidebarGroup>
          <SidebarHeader>QuickPick Admin</SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="" key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}