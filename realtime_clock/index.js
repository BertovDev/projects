const hoursDisplay = document.querySelector("[data-hour]");
const minsDisplay = document.querySelector("[data-min]");
const secsDisplay = document.querySelector("[data-sec]");
const btn = document.querySelector(".btn");
const img = document.querySelector(".img-dog");
const partyImg = "https://64.media.tumblr.com/a5171915a406680dc7251fcbd270b251/tumblr_njd9z5ZXCm1rsxqqio1_500.jpg";
const party = document.querySelector(".party");
const c_down = document.querySelector(".countdown");
const select = document.querySelector("#cdown")
const btnStart = document.querySelector(".btn-start");

const h_down = document.querySelector("[data-hour-down]");
const m_down = document.querySelector("[data-min-down]");
const s_down = document.querySelector("[data-sec-down]");

const showTime = () => {
    const time = new Date();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    hoursDisplay.innerHTML = h;
    minsDisplay.innerHTML = m;
    secsDisplay.innerHTML = s;
}

const updateTime = () => {
    setInterval(showTime, 1000);
}

btn.addEventListener("click", () => {
    if (img.src === partyImg) {
        img.src = "https://i.pinimg.com/originals/55/44/ed/5544ed3e6b581869c0b0c8f19c9c2aba.jpg";
        party.innerHTML = "";
    } else {
        img.src = partyImg;
        party.innerHTML = "PARTYYYYYYYYY";
    }
})

btnStart.addEventListener("click", () => {
    startCountdown();
    btnStart.disabled = true;
})


const startCountdown = () => {
    let secs = 3;
    let min = 0;
    let end = 0;
        setInterval(() => {
            showCountdown(secs,min);
            secs--;
            if(secs === 0){
                if(min === 0){
                    end = 1;
                } else {
                    min--;
                    secs = 59;
                }
            }
        }, 1000);
}

const showCountdown = (secs,min) => {
    m_down.innerHTML = min;
    s_down.innerHTML = secs;
}

updateTime();
