import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () => {

    
    return (
        <div className="grid cols-span-2">

            <div>
                <Auth type="signup"/>
            </div>
            Hi There what do you need
            <Quote/>
        </div>
    )
}