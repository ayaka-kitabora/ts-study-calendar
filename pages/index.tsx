import Head from 'next/head'
import React, { useState, FC, useEffect} from 'react'
import Calendar from 'react-calendar'

interface kame {
  taiju: string,
  megusuri: boolean,
  esa: string,
}

const App: FC = () => {
  const kameTemplate = {
    taiju: '',
    megusuri: false,
    esa: '',
  }
  const [date, setDate] = useState(new Date())
  const [kame, setKame] = useState({})
  const [currentKame, setCurrentKame] = useState(kameTemplate)
  const [localKameGetFlag, setLocalKameGetFlag] = useState(false)

    useEffect(() => {
      if (!localKameGetFlag) {
        // localStorageからkameをセットする
        let localKame = JSON.parse(localStorage.getItem('kame'))
        setLocalKameGetFlag(true)
        setKame(localKame)
        const dateFormat = getDateFormat(date)
        const currentKameData = localKame[dateFormat] || kameTemplate
        setCurrentKame(currentKameData)
      }
    })

  // 日付をkey用に整形
  const getDateFormat = (date: Date): string => {
    const YY = date.getFullYear()
    const MM = date.getMonth() + 1 >= 10 ? String(date.getMonth() + 1) : `0${date.getMonth() + 1}`
    const DD = date.getDate() >= 10 ? String(date.getDate()) : `0${date.getDate()}`
    return `${YY}${MM}${DD}`
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
    localStorage.setItem('kame',  JSON.stringify(kame))
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
    localStorage.setItem('kame',  JSON.stringify(kame))
  }

  const handleChangeKameEsa = (event) => {
    let tmpCurrentKame = {...currentKame}
    tmpCurrentKame.esa = event.target.value
    setCurrentKame(tmpCurrentKame)
    const dateFormat = getDateFormat(date)
    let tmpKame = kame
    tmpKame[dateFormat] = tmpCurrentKame 
    setKame(tmpKame)
    localStorage.setItem('kame',  JSON.stringify(kame))
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
