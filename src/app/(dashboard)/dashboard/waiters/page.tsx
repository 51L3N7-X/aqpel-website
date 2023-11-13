"use client";
import React, { Fragment } from 'react'
import { useState } from 'react'
import WaiterInputs from '../../components/waiterInputs/WaiterInputs';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Waiter {
    restaurant_name: string | null,
    username: string,
    password: string,
    name?: string,
    photoUrl?: string,
    active?: boolean,
    _id?: string
}

export default function Waiters() {
    const [waiters, setWaiters] = useState<Waiter[]>([]);
    const router = useRouter()

    const getWaiters = async (): Promise<Waiter | void> => {
        const token: any = localStorage.getItem("token");
        if (!token) return router.push("/signin");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waiters`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        });
        const data = await response.json();

        if (!data?.success && data?.message == "Unauthorized") {
            localStorage.clear();
            return router.push("/signin");
        }

        setWaiters(data)
        return data;
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['waiters'],
        queryFn: getWaiters,
        // retry: false,
        // retryOnMount: false,
        // retryDelay: 0,
        // refetchOnWindowFocus: false,
        // refetchInterval: false,
        // refetchOnReconnect: true,
        // refetchIntervalInBackground: false,
        // refetchOnMount: false,
    })

    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            <p><Link href="/dashboard">Back To The Dashboard</Link></p>
            <WaiterContainer waiters={waiters} newWaiter={true} setWaiters={setWaiters}></WaiterContainer>
            {waiters.map((waiter, index) => {
                return (
                    <Fragment key={index}>
                        <br />
                        <WaiterContainer id={waiter._id} waiters={waiters} newWaiter={false} setWaiters={setWaiters} waiter={waiter}></WaiterContainer>
                    </Fragment>
                )
            })}
        </div>
    )
}

function WaiterContainer({ waiter, newWaiter, setWaiters, waiters, id }: { newWaiter: boolean, waiter?: Waiter, setWaiters: any, waiters: any, id?: string }) {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div>
            <button onClick={() => setIsAdding(val => !val)}>{newWaiter ? isAdding ? "X close" : "+ Add Waiter" : waiter?.username}</button>
            {isAdding && <WaiterInputs id={id} waiter={waiter} setWaiters={setWaiters} newWaiter={newWaiter} waiters={waiters}></WaiterInputs>}
        </div>
    )

}
