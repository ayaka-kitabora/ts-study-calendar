import Head from 'next/head'
import React, { useState, FC } from 'react'
import Calendar from 'react-calendar'

interface kame {
  taiju: string,
  megusuri: boolean,
  esa: string,
}

const App: FC = () => {
  let localKame = localStorage.getItem('kame') || {}
  const [date, setDate] = useState(new Date())
  const [kame, setKame] = useState(localKame)
  const [currentKame, setCurrentKame] = useState({ 
    taiju: '',
    megusuri: false,
    esa: '',
  })

  const kameTemplate = {
    taiju: '',
    megusuri: false,
    esa: '',
  }

  // 日付をkey用に整形
  const getDateFormat = (date: Date): string => {
    return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
  }

  // 選択した日付のカメデータを取得する
  const getCurrentKameData = (date: Date): kame | null => {
    const dateFormat = getDateFormat(date)
    return kame[dateFormat] || kameTemplate
  }

  const onChange = (date: Date) => {
    const formatDate = new Date (date)
    setDate(formatDate)
    const currentKameData = getCurrentKameData(formatDate)
    setCurrentKame(currentKameData)
  }

  const handleChangeKameTaiju = (event) => {
    let tmpCurrentKame = {...currentKame}
    tmpCurrentKame.taiju = event.target.value
    setCurrentKame(tmpCurrentKame)
    const dateFormat = getDateFormat(date)
    let tmpKame = kame
    tmpKame[dateFormat] = tmpCurrentKame 
    setKame(tmpKame)
  }

  const handleChangeKameMegusuri = (event) => {
    let tmpCurrentKame = {...currentKame}
    tmpCurrentKame.megusuri = event.target.checked
    setCurrentKame(tmpCurrentKame)
    console.log(tmpCurrentKame)
    const dateFormat = getDateFormat(date)
    let tmpKame = kame
    tmpKame[dateFormat] = tmpCurrentKame 
    setKame(tmpKame)
  }

  const handleChangeKameEsa = (event) => {
    let tmpCurrentKame = {...currentKame}
    tmpCurrentKame.esa = event.target.value
    setCurrentKame(tmpCurrentKame)
    const dateFormat = getDateFormat(date)
    let tmpKame = kame
    tmpKame[dateFormat] = tmpCurrentKame 
    setKame(tmpKame)
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
                      <input className="input-number" type="number" value={currentKame && currentKame.taiju} onChange={handleChangeKameTaiju}></input>
                    <span className="input-unit">g</span>
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    <span className="input-label">えさ</span>
                      <input className="input-number" type="number" value={currentKame && currentKame.esa} onChange={handleChangeKameEsa}></input>
                    <span className="input-unit">g</span>
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    <input className="input-number" type="checkbox" checked={currentKame && currentKame.megusuri} onChange={handleChangeKameMegusuri}></input>
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
