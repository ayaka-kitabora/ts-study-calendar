import Head from 'next/head'
import React, {Component} from 'react'
import Calendar from 'react-calendar'

interface kame {
  date: string,
  taiju: number,
  nomigusuri: boolean,
  medusuri: boolean,
  esa: number,
}

class Home extends React.Component {
  state = {
    date: new Date() as Date,
    kame: [{
      date: '20200618',
      taiju: 310,
      nomigusuri: true,
      medusuri: true,
      esa: 100,
    }] as kame[],
  }
  // 書き方あってないっぽいけどこういうことがやりたい
  currentKameData = this.state.kame.find((data: kame) => {
    const date: Date = new Date(this.state.date) 
    const dateFormat: string = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
    if (data.date === dateFormat) {
      return true
    }
  })
  onChange = (date: Date) => {
    this.setState({ date })
  }

  render() {
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
                value={this.state.date}
                onChange={this.onChange}
              />
            </div>
            <div className="box">
              <form>
                <div className="form-box">
                  <h2>カメ<span className="emoji">🐢</span></h2>
                  <div className="form-row">
                    <label>
                      <span className="input-label">体重</span>
                        <input className="input-number" type="number" value={this.currentKameData ? this.currentKameData.taiju : ''}></input>
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
}
export default Home
