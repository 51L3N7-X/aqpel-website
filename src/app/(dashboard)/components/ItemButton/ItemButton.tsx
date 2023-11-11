import React from 'react'
import { useRouter } from 'next/navigation'

export default function ItemButton({ data }: { data: any }) {
    const router = useRouter();
    return (
        <button onClick={e => {
            return router.push("/" + data._id)
        }}>{data.name}</button>
    )
}
