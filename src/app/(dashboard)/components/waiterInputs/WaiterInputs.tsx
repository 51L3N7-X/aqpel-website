import React, { useEffect, useState } from 'react'

interface waiter {
    restaurant_name: string | null,
    username: string,
    password: string,
    name?: string,
    photoUrl?: string,
    active?: boolean
}

export default function WaiterInputs({ waiter, newWaiter: isNew, setWaiters, waiters, id }: { waiter?: waiter, newWaiter: boolean, setWaiters: any, waiters: any, id?: string }) {
    const [waiterData, setWaiterData] = useState<waiter>({
        restaurant_name: localStorage.getItem("restaurant_name"),
        username: "",
        password: ""
    });

    useEffect(() => {
        if (waiter && Object.keys(waiter).length != 0) setWaiterData(waiter);
    }, [waiter])
    // if(newWaiter) setWaiterData(waiterData)

    const addOrEditWaiter = async (e: any) => {
        e.preventDefault();
        const token: any = localStorage.getItem("token");

        if (isNew) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waiters`, {
                method: "POST",
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(waiterData)
            });
            const data = await response.json()
            console.log(data)
            if (data?.success == false) {
                return alert(data.message)
            }

            setWaiters([
                ...waiters,
                data
            ])

        } else {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waiters/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(waiterData)
            });
            const data = await response.json()
            if (data?.success == false) {
                return alert(data.message)
            }

            setWaiters(waiters.map(((waiter:any) => {
                if (waiter._id == id) return data;
                else return waiter;
            })))

        }
    }


    return (
        <div>
            <form onSubmit={addOrEditWaiter}>
                <label>Username : </label>
                <input type="text" onChange={e => {
                    setWaiterData({
                        ...waiterData,
                        username: e.target.value
                    })
                }} value={waiterData.username} required />
                <br />
                <label>Password : </label>
                <input type="text" onChange={e => {
                    setWaiterData({
                        ...waiterData,
                        password: e.target.value
                    })
                }} value={waiterData.password} required />
                <br />
                <label>Name : </label>
                <input type="text" onChange={e => {
                    setWaiterData({
                        ...waiterData,
                        name: e.target.value
                    })
                }} value={waiterData.name} />
                <br />
                <label>Is The Waiter Active?</label>
                <input type="checkBox" onChange={e => {
                    setWaiterData({
                        ...waiterData,
                        active: e.target.checked
                    })
                }} checked={waiterData.active} />
                <br />
                <label>PhotoURL : </label>
                <input type="text" onChange={e => {
                    setWaiterData({
                        ...waiterData,
                        photoUrl: e.target.value
                    })
                }} value={waiterData.photoUrl} />
                <br />

                <button type='submit'>Save</button>
                {!isNew && <button>Delete</button>}
            </form>
        </div>
    )
}
