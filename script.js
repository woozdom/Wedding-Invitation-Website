const cover = document.getElementById("cover");
const seal = document.getElementById("seal");
const weddingMusic = document.getElementById("weddingMusic");

if (cover && seal) {
    document.body.style.overflow = "hidden";

    seal.addEventListener("click", function() {

    document.body.classList.add("invitation-open");
    cover.classList.add("open");

    if (weddingMusic) {
        weddingMusic.volume = 0.35;

        weddingMusic.play().catch(function(error) {
            console.warn("Musik gagal diputar:", error);
        });
    }

    document.body.style.overflow = "";

    setTimeout(function() {
        cover.classList.add("gone");
    }, 1500);
});
}

const form = document.getElementById("rsvpForm");

form.addEventListener("input", function() {
    clearRsvpMessage();
    clearRsvpError();
});

form.addEventListener("change", function(event) {
    if (event.target.name === "attendance") {
        guestsWrap.hidden = event.target.value !== "attend";
    }

    clearRsvpMessage();
    clearRsvpError();
});

form.addEventListener("submit", function(event) {
    event.preventDefault();
    clearRsvpMessage();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name === "") {
        showRsvpError("Please enter your full name.");
        nameInput.focus();
        return;
    }

    if (email === "") {
        showRsvpError("Please enter your email address.");
        emailInput.focus();
        return;
    }

    if (!emailInput.checkValidity()) {
        showRsvpError("Please enter a valid email address.");
        emailInput.focus();
        return;
    }

    const attendance = document.querySelector(
        'input[name="attendance"]:checked'
    );

    if (!attendance) {
        showRsvpError("Please select your attendance.");
        return;
    }

    const responseText = getResponseText(attendance.value);
    const guestInfo = getGuestInfo(attendance.value);

    rsvpMessage.textContent =
        `Thank you, ${name}! Your response: ${responseText}${guestInfo}`;

    rsvpMessage.classList.add("show");

    form.reset();
    guestsWrap.hidden = true;

    console.log("Nama:", name);
    console.log("Email:", email);
});

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const guestsWrap = document.getElementById("guestsWrap");

const guestsSelect = document.getElementById("guests");
guestsSelect.addEventListener("change", function() {
    console.log("Jumlah tamu:", guestsSelect.value);
});

const rsvpError = document.getElementById("rsvpError");

const rsvpMessage = document.getElementById("rsvpMessage");

console.log(rsvpMessage);

function showRsvpError(message) {
    rsvpError.textContent = message;
    rsvpError.hidden = false;
}

function clearRsvpError() {
    rsvpError.textContent = "";
    rsvpError.hidden = true;
}

function getResponseText(attendanceValue) {
    if (attendanceValue === "attend") {
        return "Yes, I will attend.";
    }

    return "Regrets only, I cannot attend.";
}

function getGuestInfo(attendanceValue) {
    if (attendanceValue === "attend") {
        return ` Number of guests: ${guestsSelect.value}`;
    }

    return "";
}

function clearRsvpMessage() {
    rsvpMessage.textContent = "";
    rsvpMessage.classList.remove("show");
}

// Wedding countdown: 27 July 2027 at 00:00 local time.
const countdownDate = new Date(2027, 6, 27, 0, 0, 0).getTime();
const countdownUnits = [
    { id: "c-d", duration: 24 * 60 * 60 * 1000 },
    { id: "c-h", duration: 60 * 60 * 1000 },
    { id: "c-m", duration: 60 * 1000 },
    { id: "c-s", duration: 1000 }
];

function updateCountdown() {
    let remaining = Math.max(0, countdownDate - Date.now());

    countdownUnits.forEach(function(unit) {
        const element = document.getElementById(unit.id);
        if (!element) return;

        const value = Math.floor(remaining / unit.duration);
        element.textContent = String(value).padStart(2, "0");
        remaining %= unit.duration;
    });
}

updateCountdown();
setInterval(updateCountdown, 1000);
