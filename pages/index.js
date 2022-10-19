import Head from "next/head";
import React, { useState } from "react";
import styles from "./index.module.css";


export default function Home() {


  const [promptInput, setPromptInput] = useState("");
  const [poemStlyeInput, setPoemStyle] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptInput, poemStyle: poemStlyeInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setPromptInput("");
  }

  return (
    <div>
      <Head>
        <title>Poem-Bot</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/Poetry-bot.png" className={styles.icon} />
        <h3>Write a poem.</h3>
        <form>
          <select id = "myList" onChange={(e) => setPoemStyle(e.target.value)} >  
            <option value = ""> ---Choose poem type--- </option>  
            <option value = "Free Verse"> Free Verse </option>  
            <option value = "Limerick"> Limerick </option>  
            <option value = "Elegy"> Elegy </option>  
            <option value = "Haiku"> Haiku </option>  
            <option value = "Sonnet"> Sonnet </option>
            <option value = "Acrostic"> Acrostic </option>
            <option value = "Ode"> Ode </option>
            <option value = "Ballad"> Ballad </option>
          </select>  
          <input type="hidden" value = {poemStlyeInput} onChange={(e) => setPoemStyle(e.target.value)}/>
        </form>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Enter a word or two"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="Generate Poem" />
        </form>
        <p className={styles.result}>{result}</p>
      </main>
    </div>
  );
}
