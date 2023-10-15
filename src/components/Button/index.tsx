import { Loader2 } from "lucide-react"
 
import { Button as UiButton, ButtonProps } from "@/components/ui/button"

interface IButtonProps extends ButtonProps {
  loading?: boolean
}

export function Button(props: IButtonProps) {
  const { children, loading, ...rest} = props
  return (
    <UiButton {...rest}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </UiButton>
  )
}