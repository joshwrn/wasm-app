import { useEffect, useRef, useState } from "react"

import Head from "next/head"
import Image from "next/image"
import { DraggableCore } from "react-draggable"
import type { DraggableEvent } from "react-draggable"

import init, { add } from "../../wasm-lib/pkg"
import jsIcon from "../images/js.png"
import rustIcon from "../images/rust.png"
import styles from "@/styles/Home.module.css"

export default function Home(): React.ReactNode {
  const [ans, setAns] = useState(0)
  const [dis, setDis] = useState({ x: 0, y: 0 })
  const [useRust, setUseRust] = useState(true)
  const [time, setTime] = useState(`0`)

  const ref = useRef(null)
  useEffect(() => {
    init()
  }, [])

  const updatePosition = (e: DraggableEvent) => {
    if (e instanceof MouseEvent) {
      const { clientX, clientY } = e

      const t1 = performance.now()
      let added = 0
      if (!useRust) {
        // 10 million
        const arr = Array.from(Array(10000000).keys())
        for (const i of arr) {
          added += clientX + clientY
        }
      }

      if (useRust) {
        added = add(clientX, clientY)
      }
      const t2 = performance.now()
      const total = t2 - t1
      if (total > 0) {
        setTime(total.toFixed(2))
      }

      setAns(added)
      setDis({
        x: clientX,
        y: clientY,
      })
    }
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            time: <span>{time}ms</span>
          </p>
          <p>
            total: <span>{ans}</span>
          </p>
        </div>
        <div className={styles.description}>
          <button onClick={() => setUseRust((prev) => !prev)}>
            {!useRust ? `Switch To RUST` : `Switch To JS`}
          </button>
          <p>
            Looping through an array of{` `}
            <span>{useRust ? `1 billion in RUST` : `10 million in JS`}</span>
            {` `}
            before updating mouse position.
          </p>
        </div>
        <DraggableCore onDrag={updatePosition} ref={ref}>
          <div
            className={styles.box}
            style={{
              top: dis.y === 0 ? `50%` : dis.y,
              left: dis.x === 0 ? `50%` : dis.x,
            }}
          >
            {useRust ? (
              <Image
                src={rustIcon}
                alt="rust"
                draggable={false}
                className={styles.logo}
              />
            ) : (
              <Image
                draggable={false}
                src={jsIcon}
                alt="js"
                className={styles.logo}
              />
            )}
            {` `}
            drag me{` `}
          </div>
        </DraggableCore>
      </main>
    </>
  )
}
