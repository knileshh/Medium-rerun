import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
import { SignupInput } from "@avglinuxguy/common"


export const Auth = ({type}: {type: "signup" | "signin"}) => {


    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    return <div className="h-screen ">
        <div>
            I'm auth
            <div className="bg-red-500 h-8 w-10">

            <Link to={"/signin"} >Login</Link>
            </div>
        </div>
        <LabelledInput label="Name" placeholder="Enter name" onChange={(e) => {
            setPostInputs({
                ...postInputs,
                name: e.target.value
            })
        }}/>
        <LabelledInput label="Username" placeholder="Enter username" onChange={(e) => {
            setPostInputs({
                ...postInputs,
                username: e.target.value
            })
        }}/>
        <LabelledInput label="password" type={"password"} placeholder="Enter password" onChange={(e) => {
            setPostInputs({
                ...postInputs,
                password: e.target.value
            })
        }}/>

        <button>
            {type === "signup" ? "Sign Up": "Sign in"}
        </button>

    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export const LabelledInput = ({ label, placeholder, onChange, type}: LabelledInputType) => {
    return <div>
        <label>{label}</label>
        <input onChange={onChange} type={type || "text"} className="p-4 m-5 bg-red-200 text-blue-600" placeholder={placeholder} required/>

    </div>
}