"use client"

import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import styles from "./select.module.css"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps {
  options: SelectOption[]
  value: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void
  placeholder?: string
  label?: string
  id?: string
  name?: string
  disabled?: boolean
  required?: boolean
  error?: string
  className?: string
}

const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  id = "select-" + Math.random().toString(36).substring(2, 9),
  name,
  disabled = false,
  required = false,
  error,
  className = "",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const selectRef = useRef<HTMLDivElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)
  const selectedOption = options.find((option) => option.value === value)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    if (disabled) return

    switch (event.key) {
      case "Enter":
      case " ":
        if (!isOpen) {
          setIsOpen(true)
          setFocusedIndex(value ? options.findIndex((option) => option.value === value) : 0)
        } else if (focusedIndex >= 0) {
          const option = options[focusedIndex]
          if (!option.disabled) {
            onChange(option.value)
            setIsOpen(false)
          }
        }
        event.preventDefault()
        break
      case "Escape":
        setIsOpen(false)
        event.preventDefault()
        break
      case "ArrowDown":
        if (!isOpen) {
          setIsOpen(true)
          setFocusedIndex(value ? options.findIndex((option) => option.value === value) : 0)
        } else {
          let nextIndex = focusedIndex + 1
          while (nextIndex < options.length && options[nextIndex].disabled) {
            nextIndex++
          }
          if (nextIndex < options.length) {
            setFocusedIndex(nextIndex)
            scrollOptionIntoView(nextIndex)
          }
        }
        event.preventDefault()
        break
      case "ArrowUp":
        if (!isOpen) {
          setIsOpen(true)
          setFocusedIndex(value ? options.findIndex((option) => option.value === value) : 0)
        } else {
          let prevIndex = focusedIndex - 1
          while (prevIndex >= 0 && options[prevIndex].disabled) {
            prevIndex--
          }
          if (prevIndex >= 0) {
            setFocusedIndex(prevIndex)
            scrollOptionIntoView(prevIndex)
          }
        }
        event.preventDefault()
        break
      case "Home":
        if (isOpen) {
          let firstIndex = 0
          while (firstIndex < options.length && options[firstIndex].disabled) {
            firstIndex++
          }
          if (firstIndex < options.length) {
            setFocusedIndex(firstIndex)
            scrollOptionIntoView(firstIndex)
          }
        }
        event.preventDefault()
        break
      case "End":
        if (isOpen) {
          let lastIndex = options.length - 1
          while (lastIndex >= 0 && options[lastIndex].disabled) {
            lastIndex--
          }
          if (lastIndex >= 0) {
            setFocusedIndex(lastIndex)
            scrollOptionIntoView(lastIndex)
          }
        }
        event.preventDefault()
        break
      case "Tab":
        if (isOpen) {
          setIsOpen(false)
        }
        break
    }
  }

  const scrollOptionIntoView = (index: number) => {
    if (listboxRef.current && listboxRef.current.children[index]) {
      listboxRef.current.children[index].scrollIntoView({
        block: "nearest",
      })
    }
  }

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
      if (!isOpen) {
        setFocusedIndex(value ? options.findIndex((option) => option.value === value) : 0)
      }
    }
  }

  const selectOption = (option: SelectOption) => {
    if (!option.disabled) {
      onChange(option.value)
      setIsOpen(false)
    }
  }

  const SelectIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      className={isOpen ? styles.iconOpen : ''}
    >
      <polyline
        points="2,4 6,8 10,4"
        fill="none"
        stroke="var(--select-arrow)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <div className={`${styles.selectContainer} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.selectLabel} id={`${id}-label`}>
          {label}
          {required && (
            <span className={styles.requiredIndicator} aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}

      <div
        ref={selectRef}
        className={`${styles.select} ${isOpen ? styles.open : ""} ${disabled ? styles.disabled : ""} ${error ? styles.error : ""
          }`}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          id={id}
          className={styles.selectTrigger}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${id}-label ${id}` : undefined}
          aria-controls={`${id}-listbox`}
          aria-disabled={disabled}
          aria-required={required}
          aria-invalid={!!error}
          onClick={toggleDropdown}
          tabIndex={disabled ? -1 : 0}
          data-value={value}
          name={name}
        >
          <span className={styles.selectValue}>{selectedOption ? selectedOption.label : placeholder}</span>
          <span className={styles.selectIcon} aria-hidden="true"><SelectIcon /></span>
        </button>

        {isOpen && (
          <ul
            ref={listboxRef}
            id={`${id}-listbox`}
            role="listbox"
            className={styles.selectDropdown}
            aria-labelledby={label ? `${id}-label` : undefined}
            tabIndex={-1}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${id}-option-${option.value}`}
                role="option"
                className={`${styles.selectOption} ${option.value === value ? styles.selected : ""} ${focusedIndex === index ? styles.focused : ""
                  } ${option.disabled ? styles.disabled : ""}`}
                aria-selected={option.value === value}
                aria-disabled={option.disabled}
                onClick={() => selectOption(option)}
                onMouseEnter={() => !option.disabled && setFocusedIndex(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <div className={styles.selectError} id={`${id}-error`} aria-live="polite">
          {error}
        </div>
      )}
    </div>
  )
}

export default Select