class DigitalClock {
    constructor() {
        this.timeDisplay = document.getElementById('timeDisplay');
        this.dateDisplay = document.getElementById('dateDisplay');
        this.toggleFormatBtn = document.getElementById('toggleFormat');
        this.toggleThemeBtn = document.getElementById('toggleTheme');
        this.startStopBtn = document.getElementById('startStop');
        this.resetBtn = document.getElementById('reset');

        this.is24Hour = true;
        this.isRunning = true;
        this.clockInterval = null;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.start();
        this.loadTheme();
    }

    setupEventListeners() {
        this.toggleFormatBtn.addEventListener('click', () => this.toggleFormat());
        this.toggleThemeBtn.addEventListener('click', () => this.toggleTheme());
        this.startStopBtn.addEventListener('click', () => this.toggleClock());
        this.resetBtn.addEventListener('click', () => this.resetClock());
    }

    updateClock() {
        if (!this.isRunning) return;

        const now = new Date();
        const time = this.formatTime(now);
        const date = this.formatDate(now);

        this.timeDisplay.textContent = time;
        this.dateDisplay.textContent = date;
    }

    formatTime(date) {
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        if (!this.is24Hour) {
            const period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            return `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${period}`;
        }

        return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    }

    formatDate(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    }

    toggleFormat() {
        this.is24Hour = !this.is24Hour;
        this.updateClock();
        this.toggleFormatBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.toggleFormatBtn.style.transform = 'scale(1)';
        }, 100);
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('clockTheme', theme);
        this.toggleThemeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.toggleThemeBtn.style.transform = 'scale(1)';
        }, 100);
    }

    toggleClock() {
        this.isRunning = !this.isRunning;
        this.startStopBtn.textContent = this.isRunning ? 'Pause' : 'Resume';
        if (this.isRunning) {
            this.start();
        } else {
            this.stop();
        }
    }

    resetClock() {
        this.isRunning = true;
        this.is24Hour = true;
        this.startStopBtn.textContent = 'Pause';
        document.body.classList.remove('light-theme');
        localStorage.setItem('clockTheme', 'dark');
        this.start();
        this.updateClock();
        this.resetBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.resetBtn.style.transform = 'scale(1)';
        }, 100);
    }

    start() {
        this.updateClock();
        if (this.clockInterval) clearInterval(this.clockInterval);
        this.clockInterval = setInterval(() => this.updateClock(), 1000);
    }

    stop() {
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
            this.clockInterval = null;
        }
    }

    loadTheme() {
        const theme = localStorage.getItem('clockTheme') || 'dark';
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
}

// Initialize the clock when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DigitalClock();
});
