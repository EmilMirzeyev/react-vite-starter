import { Listbox } from '@headlessui/react'
import { TOption } from './TSelect'

const Option = ({ children, value }: TOption) => {
    return (
        <Listbox.Option
            key={value.id}
            className={({ active }) =>
                ["relative cursor-default select-none py-2 pl-10 pr-4", active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'].join(" ")
            }
            value={value}
        >
                {children}
        </Listbox.Option>
  )
}

export default Option