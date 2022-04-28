// pemanggilan package express//
const express = require('express')

//menggunakan package express//
const app = express()

// atur template engine
app.set('view engine', 'hbs')

// gunakan static folder
app.use('/public', express.static(__dirname + '/public'))

// set body parser
app.use(express.urlencoded({ extended: false }))

//req = request = client -> server
// res = response = server -> client

const isLogin = false

const projects = [
    {
    title : 'Pasar Coding di Indonesia Dinilai Masih Menjanjikan',
    content : 'Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir.',
    author : '',
    posted_at : 'Terupload 5 menit lalu',
    }
]

//endpoint
app.get('/', function (req, res) {
    res.render('index')
})

app.get('/contact', function (req, res) {
    res.render('contact')
})

app.get('/add-project', function (req, res) {
    res.render('myProject')
})

app.post('/add-project', function (req, res) {
    let title = req.body.name
    let content = req.body.message
    let date = new Date()

    let project = {
        title : title,
        content : content,
        author : "",
        posted_at : getFullTime(date),
    }
    
    projects.push(project)

 console.log(`test`)
})

app.get('/project-detail/:id', function (req, res) {
    let id = req.params.id
    res.render('index', { dataId: id })
})
    
const port = 4000
app.listen(port, function() {
    console.log(`Server running on port : ${port}`);
})

function getFullTime(time){

    console.log(time)

    const date = time.getDate()
    const monthIndex = time.getMonth()
    const year = time.getFullYear()

    const hour = time.getHours()
    const minute = time.getMinutes()


    return`${date} ${month[monthIndex]} ${year} ${hour}:${minute} WIB`
  } 

function getDistanceTime(time) {
    //console.log(time);
    const distance = new Date() - new Date(time)
    
    const miliseconds = 1000
    const secondInMinute = 60
    const minuteInHour = 60
    const secondInHour = secondInMinute * minuteInHour
    const hourInDay = 23

    let dayDistance = distance / (miliseconds * secondInHour * hourInDay)
    if (dayDistance >= 1) {
        const time = Math.floor(dayDistance) + ' hari lalu '
        return time
    }   else{
        let hourDistance = Math.floor (distance / (miliseconds * secondInHour))
        if(hourDistance > 0){
            return hourDistance + ' jam lalu '
    }   else{
        let minuteDistance = Math.floor (distance / (miliseconds * secondInMinute))
        return minuteDistance + ' menit lalu '
    }
  }
}


const month = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]