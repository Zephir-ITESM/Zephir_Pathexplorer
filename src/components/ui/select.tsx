"use client"

import React, { useState, useRef, useEffect, useId, type KeyboardEvent } from "react"
import { cn } from "@/lib/utils"
import { inputLabelVariants, inputVariants, inputWrapperVariants } from "./input"
import { Icon } from "@/components/ui/icons"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectGroup {
  label: string
  options: SelectOption[]
}

export type SelectOptions = SelectOption[] | SelectGroup[]

export interface CustomSelectProps {
  options: SelectOptions
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  multiple?: boolean
  fullWidth?: boolean
  wrapperClassName?: string
  labelClassName?: string
  selectClassName?: string
  errorClassName?: string
  id?: string
}

const isGroup = (option: SelectOption | SelectGroup): option is SelectGroup => {
  return (option as SelectGroup).options !== undefined
}

// Helper function to flatten options for keyboard navigation
const flattenOptions = (options: SelectOptions): SelectOption[] => {
  const flattened: SelectOption[] = []

  options.forEach((option) => {
    if (isGroup(option)) {
      option.options.forEach((groupOption) => {
        if (!groupOption.disabled) {
          flattened.push(groupOption)
        }
      })
    } else if (!option.disabled) {
      flattened.push(option)
    }
  })

  return flattened
}

const CustomSelect = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      placeholder = "Select an option",
      error,
      disabled,
      required,
      multiple = false,
      fullWidth = true,
      wrapperClassName,
      labelClassName,
      selectClassName,
      errorClassName,
      id,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<string[]>(
      multiple
        ? Array.isArray(value)
          ? value.map(String)
          : value
            ? [String(value)]
            : []
        : value
          ? [String(value)]
          : [],
    )
    const [focusedIndex, setFocusedIndex] = useState<number>(-1)
    const [displayText, setDisplayText] = useState<string>(placeholder)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const optionsRef = useRef<HTMLUListElement>(null)
    const inputId = useId()
    const finalId = id || inputId

    // Flatten options for keyboard navigation
    const flattenedOptions = useRef<SelectOption[]>([])

    useEffect(() => {
      flattenedOptions.current = flattenOptions(options)
    }, [options])

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setFocusedIndex(-1)
          setDisplayText(placeholder)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [placeholder])

    // Update internal state when value prop changes
    useEffect(() => {
      if (multiple) {
        setSelectedValues(Array.isArray(value) ? value : value ? [value] : [])
      } else {
        setSelectedValues(value ? (Array.isArray(value) ? value : [value]) : [])
      }
    }, [value, multiple])

    // Reset display text when dropdown closes
    useEffect(() => {
      if (!isOpen) {
        setDisplayText(placeholder)
        setFocusedIndex(-1)
      }
    }, [isOpen, placeholder])

    // Scroll focused option into view
    useEffect(() => {
      if (isOpen && focusedIndex >= 0 && optionsRef.current) {
        const focusedElement = optionsRef.current.querySelector(`[data-index="${focusedIndex}"]`) as HTMLElement
        if (focusedElement) {
          focusedElement.scrollIntoView({ block: "nearest" })
        }
      }
    }, [focusedIndex, isOpen])

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen)
        if (!isOpen) {
          setFocusedIndex(-1)
        }
      }
    }

    const handleOptionClick = (optionValue: string, optionLabel: string) => {
      let newValues: string[]

      if (multiple) {
        if (selectedValues.includes(optionValue)) {
          newValues = selectedValues.filter((val) => val !== optionValue)
        } else {
          newValues = [...selectedValues, optionValue]
        }
      } else {
        newValues = [optionValue]
        setIsOpen(false)
      }

      setSelectedValues(newValues)
      setDisplayText(placeholder)

      if (onChange) {
        onChange(multiple ? newValues : newValues[0])
      }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return

      const optionsCount = flattenedOptions.current.length

      switch (e.key) {
        case "Enter":
          e.preventDefault()
          if (isOpen && focusedIndex >= 0 && focusedIndex < optionsCount) {
            const option = flattenedOptions.current[focusedIndex]
            handleOptionClick(option.value, option.label)
          } else {
            toggleDropdown()
          }
          break

        case " ":
          if (!isOpen) {
            e.preventDefault()
            toggleDropdown()
          }
          break

        case "Escape":
          if (isOpen) {
            e.preventDefault()
            setIsOpen(false)
          }
          break

        case "ArrowDown":
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            setFocusedIndex(0)
            if (optionsCount > 0) {
              setDisplayText(flattenedOptions.current[0].label)
            }
          } else if (optionsCount > 0) {
            const nextIndex = (focusedIndex + 1) % optionsCount
            setFocusedIndex(nextIndex)
            setDisplayText(flattenedOptions.current[nextIndex].label)
          }
          break

        case "ArrowUp":
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            setFocusedIndex(optionsCount - 1)
            if (optionsCount > 0) {
              setDisplayText(flattenedOptions.current[optionsCount - 1].label)
            }
          } else if (optionsCount > 0) {
            const prevIndex = (focusedIndex - 1 + optionsCount) % optionsCount
            setFocusedIndex(prevIndex)
            setDisplayText(flattenedOptions.current[prevIndex].label)
          }
          break

        case "Home":
          if (isOpen && optionsCount > 0) {
            e.preventDefault()
            setFocusedIndex(0)
            setDisplayText(flattenedOptions.current[0].label)
          }
          break

        case "End":
          if (isOpen && optionsCount > 0) {
            e.preventDefault()
            setFocusedIndex(optionsCount - 1)
            setDisplayText(flattenedOptions.current[optionsCount - 1].label)
          }
          break
      }
    }

    // Track option index for keyboard navigation
    let optionIndex = -1

    return (
      <div className={cn(inputWrapperVariants({ fullWidth }), wrapperClassName)} ref={ref}>
        {label && (
          <label htmlFor={finalId} className={cn(inputLabelVariants({ error: !!error, disabled }), labelClassName)}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative" ref={dropdownRef}>
          <div
            id={finalId}
            className={cn(inputVariants({ error: !!error }), "cursor-pointer select-none pr-12", selectClassName)}
            onClick={toggleDropdown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={`${finalId}-listbox`}
            aria-disabled={disabled}
            role="combobox"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={handleKeyDown}
          >
            <div className="text-gray-400">{displayText}</div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon
                name="icon-chevron-right"
                className={cn("w-5 h-5 text-gray-500 transition-transform", isOpen && "transform rotate-90")}
              />
            </div>
          </div>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-[9px] border border-gray-300 shadow-lg max-h-60 overflow-auto">
              <ul id={`${finalId}-listbox`} role="listbox" aria-multiselectable={multiple} ref={optionsRef}>
                {options.map((option, index) => {
                  if (isGroup(option)) {
                    return (
                      <li key={index} className="group">
                        <div className="px-4 py-2 font-medium text-[14px] text-gray-500 bg-gray-50">{option.label}</div>
                        <ul>
                          {option.options.map((groupOption, groupIndex) => {
                            if (!groupOption.disabled) optionIndex++
                            const currentOptionIndex = optionIndex

                            return (
                              <li
                                key={`${index}-${groupIndex}`}
                                role="option"
                                aria-selected={selectedValues.includes(groupOption.value)}
                                data-index={!groupOption.disabled ? currentOptionIndex : undefined}
                                className={cn(
                                  "px-4 py-3 text-[14px] cursor-pointer hover:bg-gray-100",
                                  selectedValues.includes(groupOption.value) && "bg-[#9747ff]/10",
                                  focusedIndex === currentOptionIndex && "bg-gray-100",
                                  groupOption.disabled && "opacity-50 cursor-not-allowed",
                                )}
                                onClick={() => {
                                  if (!groupOption.disabled) {
                                    handleOptionClick(groupOption.value, groupOption.label)
                                  }
                                }}
                                onMouseEnter={() => {
                                  if (!groupOption.disabled) {
                                    setFocusedIndex(currentOptionIndex)
                                    setDisplayText(groupOption.label)
                                  }
                                }}
                              >
                                <div className="flex items-center">
                                  {multiple && (
                                    <div
                                      className={cn(
                                        "w-5 h-5 mr-3 border rounded flex items-center justify-center",
                                        selectedValues.includes(groupOption.value)
                                          ? "bg-[#9747ff] border-[#9747ff]"
                                          : "border-gray-300",
                                      )}
                                    >
                                      {selectedValues.includes(groupOption.value) && (
                                        <svg
                                          className="w-3 h-3 text-white"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M10 3L4.5 8.5L2 6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                  )}
                                  {groupOption.label}
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    )
                  } else {
                    if (!option.disabled) optionIndex++
                    const currentOptionIndex = optionIndex

                    return (
                      <li
                        key={index}
                        role="option"
                        aria-selected={selectedValues.includes(option.value)}
                        data-index={!option.disabled ? currentOptionIndex : undefined}
                        className={cn(
                          "px-4 py-3 text-[14px] cursor-pointer hover:bg-gray-100",
                          selectedValues.includes(option.value) && "bg-[#9747ff]/10",
                          focusedIndex === currentOptionIndex && "bg-gray-100",
                          option.disabled && "opacity-50 cursor-not-allowed",
                        )}
                        onClick={() => {
                          if (!option.disabled) {
                            handleOptionClick(option.value, option.label)
                          }
                        }}
                        onMouseEnter={() => {
                          if (!option.disabled) {
                            setFocusedIndex(currentOptionIndex)
                            setDisplayText(option.label)
                          }
                        }}
                      >
                        <div className="flex items-center">
                          {multiple && (
                            <div
                              className={cn(
                                "w-5 h-5 mr-3 border rounded flex items-center justify-center",
                                selectedValues.includes(option.value)
                                  ? "bg-[#9747ff] border-[#9747ff]"
                                  : "border-gray-300",
                              )}
                            >
                              {selectedValues.includes(option.value) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>
                          )}
                          {option.label}
                        </div>
                      </li>
                    )
                  }
                })}
              </ul>
            </div>
          )}
        </div>
        {error && <p className={cn("mt-2 text-sm text-red-500", errorClassName)}>{error}</p>}
      </div>
    )
  },
)
CustomSelect.displayName = "CustomSelect"

export { CustomSelect }
