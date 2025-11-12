var options = {
    series: [
        {
            data: [
                { x: '2008', y: [2800, 4500] },
                { x: '2009', y: [3200, 4100] },
                { x: '2010', y: [2950, 7800] },
                { x: '2011', y: [3000, 4600] },
                { x: '2012', y: [3500, 4100] },
                { x: '2013', y: [4500, 6500] },
                { x: '2014', y: [4100, 5600] }
            ]
        }
    ],
    chart: {
        height: 300,
        width: 500,
        type: 'rangeBar',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false  // This disables the export/download button
        }
    },
    plotOptions: {
        bar: {
            isDumbbell: true,
            columnWidth: 3,
            dumbbellColors: [['#008FFB', '#00E396']]
        }
    },
    legend: {
        show: true,
        showForSingleSeries: true,
        position: 'bottom',
        horizontalAlign: 'center',
        customLegendItems: ['Volume', 'service']
    },
    fill: {
        type: 'gradient',
        gradient: {
            type: 'vertical',
            gradientToColors: ['#00E396'],
            inverseColors: true,
            stops: [0, 100]
        }
    },
    grid: {
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: false
            }
        }
    },
    xaxis: {
        tickPlacement: 'on'
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();




// Example: Chart 2
var options1 = {
    series: [{
        name: 'Sales',
        data: [10, 20, 15, 30, 25, 40]
    }],
    chart: {
        type: 'line',
        height: 300,
        toolbar: { show: false }
    },
    stroke: { curve: 'smooth', width: 4 },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    legend: { show: false }
};
new ApexCharts(document.querySelector("#chart2"), options1).render();

// Example: Chart 3 (use your own previous chart3 JS)
var options2 = {
    series: [
        { name: 'Peter', data: [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9] },
        { name: 'Johnny', data: [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null] },
        { name: 'David', data: [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null] }
    ],
    chart: {
        height: 300,
        type: 'line',
        zoom: { enabled: false },
        toolbar: { show: false },
        animations: { enabled: false }
    },
    stroke: { width: [5, 5, 4], curve: 'smooth' },
    legend: { show: false },
    xaxis: { labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } },
    yaxis: { labels: { show: false } },
    grid: { borderColor: '#f1f1f1' }
};
new ApexCharts(document.querySelector("#chart3"), options2).render();


// card-ApexCharts



const TARGET_PERCENT = 80;
const ANIMATION_MS = 1300;

// ===== Select elements =====
const progressPath = document.getElementById('progress');
const percentText = document.getElementById('percentText');

// Get total length of the semicircle path
const totalLen = progressPath.getTotalLength();

// We use stroke-dasharray & stroke-dashoffset to "draw" the arc.
// Here totalLen corresponds to 100% of the semicircle.
progressPath.style.strokeDasharray = totalLen;
// Start with hidden arc (100% offset)
progressPath.style.strokeDashoffset = totalLen;

// Nice tiny initial stroke transition
progressPath.style.transition = `stroke-dashoffset ${ANIMATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;

// Function to animate from 0 to target percent
function animateTo(percent, duration) {
    // Clamp percent
    percent = Math.max(0, Math.min(100, percent));

    // Calculate final dashoffset (smaller offset => more arc visible)
    const finalOffset = totalLen * (1 - percent / 100);

    // Trigger visual update (percentage number)
    // We'll animate numeric text with requestAnimationFrame
    const startTime = performance.now();
    const startPercent = 0;
    function step(now) {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = easeOutCubic(t);
        const currentPercent = Math.round(startPercent + (percent - startPercent) * eased);
        percentText.textContent = currentPercent + '%';

        if (t < 1) {
            requestAnimationFrame(step);
        } else {
            percentText.textContent = percent + '%';
        }
    }
    requestAnimationFrame(step);

    // Animate the stroke (this uses CSS transition defined earlier)
    // We set the final value with a tiny setTimeout to ensure transition runs.
    setTimeout(() => {
        progressPath.style.strokeDashoffset = finalOffset;
    }, 20);
}

// cubic easing for smoother number animation
function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

// On DOM loaded, start animation
document.addEventListener('DOMContentLoaded', () => {
    // small delay so everything looks buttery

    setTimeout(() => animateTo(TARGET_PERCENT, ANIMATION_MS), 250);
});


let table = new DataTable('#usersTable', {
    pageLength: 4,
    lengthChange: false,
    info: false,
    responsive: true,
    ordering: true,
    order: [[1, 'asc']]
});

// collapsed

const sidebar = document.getElementById("sidebar");
const closebtn = document.getElementById("close-btn");
const overlay = document.getElementById("overlay");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
    if (window.innerWidth <= 600) {
        sidebar.classList.toggle("show");
        overlay.style.display = sidebar.classList.contains("show") ? "block" : "none";
        document.body.style.overflow = sidebar.classList.contains("show") ? "hidden" : "auto";
    } else {
        sidebar.classList.toggle("collapsed");
    }
});

closebtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
});

