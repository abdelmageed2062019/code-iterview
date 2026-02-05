import { LoaderIcon } from "lucide-react";

const LoadingUi = () => {
  return (
    <div className="h-[calc(100vh-4rem-1px)] flex items-center justify-center">
      <LoaderIcon className="w-12 h-12 text-muted-foreground animate-spin" />
    </div>
  )
}

export default LoadingUi