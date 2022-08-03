import React from "react";

export default function SignForm({title, btnText}) {
    return (
        <form className="sign">
            <h2 className="sign__title">{title}</h2>
            <div className="sign__"></div>
            <input type="email" name="email" placeholder="email" />
            <input type="pass" name="pass" placeholder="password" />
            <button>{btnText}</button>
        </form>
    )
}