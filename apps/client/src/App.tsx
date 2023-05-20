import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";

function App() {
    const [count, setCount] = useState(0);
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        fetch("/api")
            .then((res) => res.text())
            .then(setGreeting);
    }, []);

    return (
        // <>
        //     <div>
        //         <a href="https://vitejs.dev" target="_blank">
        //             <img src={viteLogo} className="logo" alt="Vite logo" />
        //         </a>
        //         <a href="https://react.dev" target="_blank">
        //             <img
        //                 src={reactLogo}
        //                 className="logo react"
        //                 alt="React logo"
        //             />
        //         </a>
        //         <a href="https://nestjs.com">
        //             <img
        //                 src="https://docs.nestjs.com/assets/logo-small.svg"
        //                 className="logo"
        //                 alt="Nest logo"
        //             />
        //         </a>
        //     </div>
        //     <h1>Vite + React + Nest</h1>
        //     <h1>{greeting} From NestJS API</h1>
        //     <div className="card">
        //         <button onClick={() => setCount((count) => count + 1)}>
        //             count is {count}
        //         </button>
        //         <p>
        //             Edit <code>src/App.tsx</code> and save to test HMR
        //         </p>
        //     </div>
        //     <p className="read-the-docs">
        //         Click on the Vite and React logos to learn more
        //     </p>
        // </>
        <Login />
    );
}

export default App;
