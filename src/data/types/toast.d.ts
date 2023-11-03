import { EToast } from "@/data/enum/e_toast"

export type ToastType = {
    id?: number
    message: string
    type?: EToast
}