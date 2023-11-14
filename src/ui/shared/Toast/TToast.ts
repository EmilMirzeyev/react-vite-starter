import { EToast } from "@/data/enum/toast.enum"

export type TToast = {
    id?: number
    message: string
    type?: EToast
}