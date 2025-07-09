import { useState } from "react"
import { Home, Heart, User, ShoppingBag, Gift, Star } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Inicio", url: "/", icon: Home },
  { title: "Femeninos", url: "#femeninos", icon: Heart },
  { title: "Masculinos", url: "#masculinos", icon: User },
  { title: "Unisex", url: "#unisex", icon: Star },
]

const actionItems = [
  { title: "Mi Carrito", url: "#carrito", icon: ShoppingBag },
  { title: "Ofertas", url: "#ofertas", icon: Gift },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#')) {
      const element = document.getElementById(sectionId.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <Sidebar
      className="bg-gradient-elegant border-r border-gold/20"
      collapsible="icon"
    >
      <SidebarContent className="pt-6">
        {/* Brand Header */}
        <div className="px-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-foreground">Fraganza</h1>
                <p className="text-xs text-muted-foreground">Perfumes de Aceite</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gold font-semibold">
            Catálogo
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => scrollToSection(item.url)}
                    className="hover:bg-champagne/50 text-foreground rounded-lg transition-all duration-300"
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gold font-semibold">
            Acciones
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {actionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => scrollToSection(item.url)}
                    className="hover:bg-champagne/50 text-foreground rounded-lg transition-all duration-300"
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {!isCollapsed && <span>{item.title}</span>}
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