"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icons"

export interface BreadcrumbItem {
  label: string
  href: string
}

export interface ActionButton {
  label: string
  variant?: "purple" | "dark" | "white" | "red" | "green" | "transparent"
  icon?: string
  size?: "small" | "medium" | "large"
  onClick: () => void
  loading?: boolean
  requireConfirmation?: boolean
  confirmationMessage?: string
}

export interface PageHeaderProps {
  title: string
  breadcrumbs?: BreadcrumbItem[]
  searchPlaceholder?: string
  onSearch?: (searchTerm: string) => void
  showFilter?: boolean
  onFilterClick?: () => void
  actions?: ActionButton[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
  className?: string
}

export function PageHeader({
  title,
  breadcrumbs,
  searchPlaceholder = "Buscar empleados",
  onSearch,
  showFilter = false,
  onFilterClick,
  actions = [],
  activeTab,
  onTabChange,
  className,
}: PageHeaderProps) {
  // Handle confirmation dialog for actions that require it
  const handleActionClick = (action: ActionButton) => {
    if (action.requireConfirmation && action.confirmationMessage) {
      if (window.confirm(action.confirmationMessage)) {
        action.onClick()
      }
    } else {
      action.onClick()
    }
  }

  return (
    <header className={cn("sticky top-0 z-10 pt-4 pb-8 bg bg-[#f5f7f9]", className)}>
      <div className="container mx-auto px-4">
        {/* First row: Title, breadcrumbs, search, and actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="mb-4 md:mb-0">
            {/* Title and breadcrumbs */}
            <h1 className="text-2xl font-bold text-[#272329]">{title}</h1>
            
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Search and filter */}

          </div>
        </div>

        {/* Second row: Tabs */}
      </div>
    </header>
  )
}
