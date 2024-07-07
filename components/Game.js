import React, { useEffect, useState } from 'react'
import Column from "./Column"

function Game({ username, socket }) {

    const [clicks, setClicks] = useState(0)
    const [leaderboard, setLeaderboard] = useState()
    
    const handleClick = () => {
        setClicks(clicks + 1)
        socket.emit("clicked")
    }

    useEffect(() => {
        socket.on("update leaderboard", state => {

            let arrayState = []
            for(let user in state) {
                arrayState.push([user, state[user].clicks, state[user].active])
            }

            arrayState.sort(function(a, b) {
                return b[1] - a[1];
            });

            setClicks(state[username].clicks)

            setLeaderboard(
                <>
                    <p>Ranking de cliques:</p>
                    <ol>
                        {
                            arrayState.map((user) => (
                                <li className='ml-8'>{user[2] ? "✅" : "❌"} {user[0]}: {user[1]}</li>
                            ))
                        }
                    </ol>
                </>
            );
        })
    })

    return (
    <div className='flex h-full w-full gap-8'>
        <Column className="flex gap-8 flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Olá, {username}</h1>
            <p className="text-2xl text-center">
                Você clicou<br/>
                <span className='text-4xl font-semibold'>
                    {clicks}
                </span><br/>
                vezes!
            </p>
            <span className="text-sm font-semibold">Desenvolvido por Miniko</span>
        </Column>
        <Column className="items-center justify-center">
            <button 
                className="
                    aspect-square 
                    p-8 
                    rounded-full 
                    bg-red-600 
                    drop-shadow-button
                    text-xl
                    transition-all
                    duration-75
                    active:scale-95
                    active:drop-shadow-none"

                onClick={() => handleClick()}
            >
                <span>
                    Naum click<br/>nu butaun
                </span>
            </button>
        </Column>
        <Column>
            <ul>
                {
                    leaderboard
                }
            </ul>
        </Column>
    </div>
    )
}

export default Game