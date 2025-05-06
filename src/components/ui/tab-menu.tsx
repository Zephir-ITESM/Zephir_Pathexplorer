"use client"

import type React from "react"
import { useState } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Icon, type IconName } from "@/components/ui/icons"

//${isActive ? "text-black" : "text-gray-500"}
const tabVariants = cva("flex items-center p-3 gap-1 rounded-full transition-all duration-200 cursor-pointer", {
  variants: {
    state: {
      inactive: "w-[60px] bg-white text-black",
      hover: "bg-white",
      active: "bg-[#a100ff] text-white",
    },
  },
  defaultVariants: {
    state: "inactive",
  },
})

export interface TabItem {
  id: string
  label: string
  icon: string
  width?: number // Custom width for specific tabs
}

export interface CustomTabMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function CustomTabMenu({ tabs, activeTab, onTabChange, className, ...props }: CustomTabMenuProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  // Get tab width based on its content and state
  const getTabWidth = (tab: TabItem, isActive: boolean, isHovered: boolean) => {
    if (isActive) {
      // Active state: base width + 20px
      return `${(tab.width || 140) + 20}px`
    } else if (isHovered) {
      // Hover state: base width
      return `${tab.width || 140}px`
    } else {
      // Inactive state: 60px
      return "60px"
    }
  }

  return (
    // 
    <div className={cn("flex items-left p-3 gap-2 bg-white rounded-full w-max", className)} {...props}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const isHovered = hoveredTab === tab.id
        // Get the appropriate icon component

        return (
          <motion.div
            key={tab.id}
            className={cn(
              tabVariants({
                state: isActive ? "active" : isHovered ? "hover" : "inactive",
              }),
              "h-10", 
            )}
            style={{ width: getTabWidth(tab, isActive, isHovered) }}
            onClick={() => onTabChange(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
            layout
            transition={{ duration: 0.2, type: "spring", stiffness: 500, damping: 30 }}
          >
            <Icon name={tab.icon as IconName} size="sm" variant={isActive ? "filled" : "stroke"} className="text-inherit" />
            {/* Only show the label if the tab is active or hovered */}
            {(isActive || isHovered) && (
              <span className={cn("ml-2 whitespace-nowrap", isActive ? "text-white" : "text-[#272329]")}>
                {tab.label}
              </span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
