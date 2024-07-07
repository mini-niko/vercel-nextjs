import { useState } from "react"
import Game from "../components/Game"
import Join from "../components/Join"
import { socket } from "../socket"

function index() {

    const [username, setUsername] = useState()
    const [logged, setLogged] = useState(false)

    return (
        <div className="p-8 bg-slate-800 flex flex-col align-center justify-center items-center gap-8 w-full h-screen">
            {
                logged ? <Game username={username} socket={socket} /> : <Join setUsername={setUsername} setLogged={setLogged} />
            }
        </div>
    )
}

export default index