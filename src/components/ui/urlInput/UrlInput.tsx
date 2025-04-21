"use client"

import type { ChangeEvent, KeyboardEvent } from "react"
import styles from "./urlInput.module.css"

interface UrlInputProps {
  id?: string
  label?: string
  value: string
  onChange: (value: string) => void
  onEnter?: () => void
  placeholder?: string
  className?: string
  labelClassName?: string
  inputClassName?: string
  prefixClassName?: string
  containerClassName?: string
  required?: boolean
  disabled?: boolean
  ariaLabelledBy?: string
}

export function UrlInput({
  id = "url-input",
  label = "URL to preview",
  value,
  onChange,
  onEnter,
  placeholder = "example.com",
  className,
  labelClassName,
  inputClassName,
  prefixClassName,
  containerClassName,
  required = false,
  disabled = false,
  ariaLabelledBy,
}: UrlInputProps) {
  // Remove https:// from the value if it exists
  const sanitizedValue = value.replace(/^https?:\/\//, "")
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Remove https:// if the user tries to type it
    const newValue = e.target.value.replace(/^https?:\/\//, "")
    onChange(newValue)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && onEnter) onEnter()
  }

  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      {label && <label htmlFor={id} className={`${styles.label} ${labelClassName || ""}`}>{label}</label>}
      <div className={`${styles.inputContainer} ${containerClassName || ""}`}>
        <span className={`${styles.prefix} ${prefixClassName || ""}`}>https://</span>
        <input
          id={id}
          type="text"
          className={`${styles.input} ${inputClassName || ""}`}
          placeholder={placeholder}
          value={sanitizedValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-labelledby={ariaLabelledBy}
          required={required}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
