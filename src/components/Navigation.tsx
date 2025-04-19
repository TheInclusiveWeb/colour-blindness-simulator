import { useLayoutEffect, useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    setIsOpen(false);
  }, [])

  return (
    isOpen ? (
      <div>Open</div>
    ) : (
      <div>closed</div>
    )
  )
}

export default Navigation