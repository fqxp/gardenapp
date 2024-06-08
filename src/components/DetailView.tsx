import { Feature } from "@prisma/client"
import { FaXmark } from 'react-icons/fa6'
import classNames from 'classnames'

interface Props {
  feature: Feature | null,
  onClose: () => void
}

export default function DetailView({ feature, onClose }: Props) {
  return (
    <div
      className={
        classNames(
          "absolute right-0 top-0 transition-transform flex flex-col bottom-0 max-w-40 w-1/6 bg-white",
          { "translate-x-full": feature === null }
        )}
    >
      <div
        className="self-end p-2 cursor-pointer hover:bg-gray-100 rounded-full m-1"
        onClick={onClose}
      >
        <FaXmark />
      </div>
      <div className="text-wrap overflow-hidden">
        <div className="font-bold">
          {feature?.name}
        </div>
        <div>
          {feature?.notes}
        </div>
      </div>
    </div >
  )
}
