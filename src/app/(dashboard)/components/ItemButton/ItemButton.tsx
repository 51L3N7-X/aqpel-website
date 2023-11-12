import React from 'react'
import { useRouter, usePathname } from 'next/navigation'


export default function ItemButton({ data }: { data: any }) {
    const path = usePathname();
    const router = useRouter();
    console.log(path)

    return (
        <button onClick={e => {
            return router.push(`${path}/${data._id}`)
        }}>{data.name}</button>
    )
}