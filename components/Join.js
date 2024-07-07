import React, { useEffect, useRef, useState } from 'react'
import { socket } from '../socket'

function Join({setUsername, setLogged}) {

    const usernameRef = useRef()
    
    const [type, setType] = useState("login")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(name != "" && password != "") {
            socket.emit(type, { name, password })
            setUsername(name)
        }
    }

    const handleType = (event) => {
        setType(event.target.value)
    }

    useEffect(() => {
        socket.on("login", () => setLogged(true))

        return () => {
            socket.off("login", () => setLogged(true))   
        }
    }, [])

    return (
        <div className="bg-slate-300 p-4 rounded-md text-lg flex flex-col gap-4 items-center justify-center w-1/4">
            <form className='px-4 flex items-center flex-col gap-4 w-full' onSubmit={handleSubmit}>
                <div className='w-full flex flex-col-reverse'>
                    <input type='text' id='name' placeholder='Insira seu nome' onChange={(event) => setName(event.target.value)} />
                    <label htmlFor="name">Nome</label>
                </div>
                <div className='w-full flex flex-col-reverse'>
                    <input type='text' id='password' placeholder='Insira sua senha' onChange={(event) => setPassword(event.target.value)}/>
                    <label htmlFor="password">Senha</label>
                </div>
                <input className='bg-slate-500 rounded-sm w-min py-2 px-4' type='submit' value="Enviar" />
            </form>

            <fieldset className='w-full flex justify-around align-center'>
                <div className='flex gap-2 flex-col-reverse'>
                    <input type="radio" id="register" name='type' value="register" checked={type === "register"} onChange={handleType} />
                    <label htmlFor="register">Registrar</label>
                </div>
                <div className='flex gap-2 flex-col-reverse'>
                    <input type="radio" id="login" name='type' value="login" checked={type === "login"} onChange={handleType} />
                    <label htmlFor="login">Entrar</label>
                </div>
            </fieldset>
        </div>
    )
}

export default Join