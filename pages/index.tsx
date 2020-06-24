import Head from 'next/head'
import React, {Component} from 'react'
import Calendar from 'react-calendar'

interface kame {
  taiju: number | null,
  nomigusuri: boolean,
  megusuri: boolean,
  esa: number | null,
}

class Home extends React.Component {
  state = {
    date: new Date() as Date,
    kame: {
      '20200618': {
      taiju: 310,
      nomigusuri: true,
      megusuri: true,
      esa: 100,
    }} as {[key: string]: kame},
    currentKame: {
      date: null,
      taiju: null,
      nomigusuri: false,
      megusuri: false,
      esa: null,
    }
  }
  onChange = (date: Date) => {
    const formatDate = new Date (date)
    this.setState({ date: formatDate })
    if (this.currentKameData) {
      this.setState({currentKame: this.currentKameData})
    } else {
      this.setState({currentKame: this.kameTemplate})
    }
  }

  kameTemplate = {
    taiju: null,
    nomigusuri: false,
    megusuri: false,
    esa: null,
  }

  handleChangeKameTaiju = (event) => {
    console.log(event.target.value)
    let kame = this.state.kame
    console.log(this.currentKameData)
    if (this.currentKameData) {
      kame[this.dateFormat].taiju = event.target.value
    } else {
      let kameTemplate = this.kameTemplate
      kameTemplate.taiju = event.target.value
      kame[this.dateFormat] = kameTemplate
    }
    console.log(kame)
    this.setState({kame: kame})
    console.log(this.state.kame)
  }

  date: Date = new Date(this.state.date) 
  dateFormat: string = `${this.date.getFullYear()}${this.date.getMonth() + 1}${this.date.getDate()}`
  currentKameData = this.state.kame[this.dateFormat] || null

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
                        <input className="input-number" type="number" value={this.state.currentKame.taiju }  onChange={this.handleChangeKameTaiju}></input>
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
