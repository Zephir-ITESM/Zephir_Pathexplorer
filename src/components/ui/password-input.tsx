"use client"

import React, { useState } from "react"
import { CustomInput, type CustomInputProps } from "./input"
import { Icon } from "@/components/ui/icons"

export interface CustomPasswordInputProps extends CustomInputProps {
  // Extending CustomInputProps without adding new properties is valid,
  // but we can add a comment to make the intention clear
  /**
   * Password input component that extends CustomInput with toggle visibility functionality.
   * All props from CustomInput are supported.
   */
}

const CustomPasswordInput = React.forwardRef<HTMLInputElement, CustomPasswordInputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <CustomInput
      type={showPassword ? "text" : "password"}
      iconRight={showPassword ? "icon-crossed-eye" : "icon-eye"}
      ref={ref}
      {...props}
      onIconRightClick={togglePasswordVisibility}
      renderIconRight={() =>
        showPassword ? (
          <Icon name="icon-crossed-eye" className="text-gray-500" />
        ) : (
          <Icon name="icon-eye" className="text-gray-500" />
        )
      }
    />
  )
})
CustomPasswordInput.displayName = "CustomPasswordInput"

export { CustomPasswordInput }
