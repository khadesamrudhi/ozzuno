export function initClock() {
    const clock = document.querySelector(".clock-display");
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.toString().padStart(2, "0"); // wait, fixed below
        minutes = now.getMinutes().toString().padStart(2, "0");
        let seconds = now.getSeconds().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }
    updateClock();
    setInterval(updateClock, 1000);
}