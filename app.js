/* assets/app.js */

document.addEventListener('DOMContentLoaded', () => {
    // Global Search Logic
    const searchInput = document.getElementById('globalSearch');
    if(searchInput){
        searchInput.addEventListener('keyup', (e) => {
            // Placeholder for advanced search logic across pages
            console.log('Searching for:', e.target.value);
        });
    }

    // Auto-Generate on Input (Optional: remove 'input' event if you only want button click)
    const form = document.getElementById('petitionForm');
    if(form) {
        form.addEventListener('input', generatePetition); 
    }
});

function generatePetition() {
    // 1. Get Data or Use Placeholder
    const getVal = (id) => {
        const el = document.getElementById(id);
        return (el && el.value.trim() !== "") ? el.value : "(        )";
    };

    // 2. Map Data to Petition Structure
    const data = {
        court: getVal('courtName'),
        plaintiff: getVal('plaintiffName'),
        defendant: getVal('defendantName'),
        title: getVal('petitionTitle'), // e.g., صحيفة دعوى
        subject: getVal('petitionSubject'),
        judgeTitle: document.getElementById('judgeTitle') ? document.getElementById('judgeTitle').value : "السيد قاضي المحكمة",
        body: getVal('petitionBody'),
        lawyer: getVal('lawyerName'),
        docs: getVal('attachedDocs'),
        witnesses: getVal('witnessesNames')
    };

    // 3. Render HTML
    const paper = document.getElementById('petition-paper');
    
    paper.innerHTML = `
        <div class="legal-header">
            <h2>${data.court}</h2>
        </div>

        <div class="legal-parties">
            <h3>(بين)</h3>
            <p><strong>المدعي/الشاكي:</strong> ${data.plaintiff}</p>
            <p><strong>ضــــد</strong></p>
            <p><strong>المدعى عليه/المشكو ضده:</strong> ${data.defendant}</p>
        </div>

        <div class="legal-title">
            <h3>${data.title}</h3>
        </div>

        <div class="legal-subject">
            <h4>الموضوع: ${data.subject}</h4>
        </div>

        <div class="legal-address">
            ${data.judgeTitle} <span style="display:block; text-align:center; margin-top:5px;">الموقر</span>
        </div>

        <div class="legal-body">
            ${formatBody(data.body)}
        </div>

        <div class="legal-closing">
            <p>ولله التوفيق،،،</p>
        </div>

        <div class="legal-signatures">
            <div class="signature-block">
                <p><strong>مقدم العريضة</strong></p>
                <p>${data.lawyer}</p>
                <p>(التوقيع)</p>
            </div>
        </div>

        <div class="legal-footer">
            <div class="docs-section">
                <strong>المستندات المرفقة:</strong>
                <pre style="font-family:inherit; white-space:pre-wrap;">${data.docs}</pre>
            </div>
            <div class="witnesses-section">
                <strong>الشهود:</strong>
                <pre style="font-family:inherit; white-space:pre-wrap;">${data.witnesses}</pre>
            </div>
        </div>
    `;
}

// Helper to format body text with paragraphs
function formatBody(text) {
    if(!text || text === "(        )") return text;
    return text.split('\n').map(line => `<p>${line}</p>`).join('');
}

/* --- Export Functions --- */

function printPetition() {
    window.print();
}

function copyText() {
    const range = document.createRange();
    range.selectNode(document.getElementById('petition-paper'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("تم نسخ نص العريضة.");
}

function exportWord() {
    const content = document.getElementById('petition-paper').innerHTML;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40' dir='rtl'>";
    const body = "<body style='font-family: Amiri, serif; text-align: right;'>" + content + "</body></html>";
    
    const blob = new Blob(['\ufeff', header + body], {
        type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'petition.doc'; // Works better for simple HTML conversion than docx
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportPDF() {
    const element = document.getElementById('petition-paper');
    const opt = {
        margin:       10,
        filename:     'petition.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // Requires html2pdf library linked in HTML
    html2pdf().set(opt).from(element).save();
}
