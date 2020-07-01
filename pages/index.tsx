import Head from 'next/head'
import React, { useState, FC } from 'react'
import Calendar from 'react-calendar'

interface kame {
  taiju: number | null,
  nomigusuri: boolean,
  megusuri: boolean,
  esa: number | null,
}

const App: FC = () => {
  const [date, setDate] = useState(new Date())
  const [kame, setKame] = useState({
    '20200618': {
      taiju: 310,
      nomigusuri: true,
      megusuri: true,
      esa: 100,
    }
  })
  const [currentKame, setCurrentKame] = useState({ 
    taiju: null,
    nomigusuri: false,
    megusuri: false,
    esa: null,
  })

  const kameTemplate = {
    taiju: null,
    nomigusuri: false,
    megusuri: false,
    esa: null,
  }
  const dateFormat: string = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
  const currentKameData = kame[dateFormat] || null

  const onChange = (date: Date) => {
    const formatDate = new Date (date)
    setDate(formatDate)
    if (currentKameData) {
      setCurrentKame(currentKameData)
    } else {
      setCurrentKame(kameTemplate)
    }
  }

  const handleChangeKameTaiju = (event) => {
    console.log(event.target.value)
    let tmpkame = kame
    console.log(currentKameData)
    if (currentKameData) {
      tmpkame[dateFormat].taiju = event.target.value
    } else {
      let tmpkameTemplate = kameTemplate
      tmpkameTemplate.taiju = event.target.value
      tmpkame[dateFormat] = kameTemplate
    }
    console.log(kame)
    setKame(tmpkame)
    console.log(kame)
  }


  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>飼育記録カレンダー</h1>
        <div className="contents">
          <div className="calendar">
            <Calendar
              locale="ja-JP"
              value={date}
              onChange={onChange}
            />
          </div>
          <div className="box">
            <form>
              <div className="form-box">
                <h2>カメ<span className="emoji">🐢</span></h2>
                <div className="form-row">
                  <label>
                    <span className="input-label">体重</span>
                      <input className="input-number" type="number" value={currentKame.taiju } onChange={handleChangeKameTaiju}></input>
                    <span className="input-unit">g</span>
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    <span className="input-label">えさ</span>
                      <input className="input-number" type="number"></input>
                    <span className="input-unit">g</span>
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    <input type="checkbox"></input>
                    <span className="input-label">飲み薬</span>
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    <input type="checkbox"></input>
                    <span className="input-label">目薬</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer>
      </footer>

      <style jsx>{`
        .contents {
          display: flex;
        }
        main {
          margin: 0 auto;
          width: 550px;
        }
        .box {
          padding: 10px;
          border: 1px solid #ccc;
          width: 200px;
        }
        .form-row {
          margin-bottom: 10px;
        }
        input {
          margin: 5px;
        }
        .input-number {
          width: 100px;
        }
        h1 {
          text-align: center;
        }
        .emoji {
          font-size: 30px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
export default App
