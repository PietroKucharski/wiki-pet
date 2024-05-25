// components/Loading.tsx

import React from "react"
import { Loader } from "lucide-react"

const Loading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent z-50">
      <Loader className="animate-spin text-black" />
    </div>
  )
}

export default Loading
