
function toggleMobileMenu() {
    let m = document.getElementById('mobileMenu');
    m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
}

function getColor(s) {
    return s < 25 ? '#ff0055' : s < 50 ? '#ff7700' : s < 75 ? '#ffee00' : s < 90 ? '#aaff00' : '#00ff88';
}

document.getElementById('auditForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    let steps = ["Initializing scan...", "Parsing semantics...", "Evaluating metadata...", "Optimizing weights..."];
    let sIdx = 0, textEl = document.getElementById('loadText');

    let loadTimer = setInterval(function () {
        textEl.innerText = steps[sIdx];
        sIdx = (sIdx + 1) % steps.length;
    }, 600);

    setTimeout(function () {
        clearInterval(loadTimer);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';

        let scores = [22, 45, 68, 85, 88, 92, 34, 100];
        let metrics = document.querySelectorAll('.metric');

        for (let i = 0; i < metrics.length; i++) {
            let metric = metrics[i], score = scores[i], col = getColor(score);
            let label = metric.querySelector('.count'), ring = metric.querySelector('circle');

            metric.style.color = ring.style.stroke = col;

            let curr = 0;
            let anim = setInterval(function () {
                curr += 2;
                if (curr >= score) { curr = score; clearInterval(anim); }
                label.innerText = curr;
            }, 30);

            setTimeout(function () { ring.style.strokeDashoffset = 251 - (251 * score / 100); }, 100);
        }

        let avg1 = Math.floor((scores[0] + scores[1] + scores[2] + scores[3]) / 4);
        let avg2 = Math.floor((scores[4] + scores[5] + scores[6] + scores[7]) / 4);

        let b1 = document.getElementById('big1'), b2 = document.getElementById('big2');
        b1.style.borderColor = getColor(avg1);
        b2.style.borderColor = getColor(avg2);

        let v1 = 0, t1 = setInterval(function () { v1 += 2; if (v1 >= avg1) { v1 = avg1; clearInterval(t1); } b1.innerText = v1; }, 40);
        let v2 = 0, t2 = setInterval(function () { v2 += 2; if (v2 >= avg2) { v2 = avg2; clearInterval(t2); } b2.innerText = v2; }, 40);

        let names = ["Semantics", "Context", "Knowledge", "Crawl", "Speed", "SEO", "Authority", "Security"];
        let issues = [
            "Missing Schema.org data, making AI categorization hard.",
            "Disorganized headings confuse LLMs seeking context.",
            "Adding FAQs helps agents extract key brand facts.",
            "Low text density; AI needs more readable content.",
            "Images are unoptimized, slowing down crawlers.",
            "Meta descriptions need more descriptive text.",
            "Slow JS execution blocks fast AI parsing.",
            "Duplicate paths found; use canonical tags."
        ];

        let l1 = document.getElementById('list1'), l2 = document.getElementById('list2');
        l1.innerHTML = ''; l2.innerHTML = '';

        for (let i = 0; i < 4; i++) {
            let c = getColor(scores[i]);
            l1.innerHTML += `<div class="insight-item" style="border-color:${c}; box-shadow:0 0 20px ${c}33;">${names[i]}: ${scores[i]}%. ${issues[i]}</div>`;
        }
        for (let j = 4; j < 8; j++) {
            let c = getColor(scores[j]);
            l2.innerHTML += `<div class="insight-item" style="border-color:${c}; box-shadow:0 0 20px ${c}33;">${names[j]}: ${scores[j]}%. ${issues[j]}</div>`;
        }
    }, 2500);
});