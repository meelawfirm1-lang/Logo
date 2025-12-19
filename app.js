function generatePetition() {
    const getVal = (id) => {
        const el = document.getElementById(id);
        return (el && el.value.trim() !== "") ? el.value : "....................";
    };

    const paper = document.getElementById('petition-paper');
    
    paper.innerHTML = `
        <div class="legal-header">
            <h2>لدى محكمة ${getVal('courtName')}</h2>
        </div>

        <div style="text-align:right; margin-bottom: 10px;">
            <strong>رقم الدعوى: ${getVal('caseNumber')}</strong>
        </div>

        <div class="legal-parties">
            <h3>فيمـا بيــن</h3>
            <p><strong>${getVal('plaintiffName')}</strong> <span style="float:left;">(مدعي)</span></p>
            <p style="text-align:center; margin: 10px 0;">ضــــــــد</p>
            <p><strong>${getVal('defendantName')}</strong> <span style="float:left;">(مدعى عليه)</span></p>
        </div>

        <div class="legal-subject">
            <h4>الموضوع: ${getVal('petitionSubject')}</h4>
        </div>

        <div class="legal-address">
            السيد/ قاضي محكمة ${getVal('courtName')} الموقر
        </div>

        <p>بكل التقدير والاحترام ونيابة عن المدعي نلتمس تصريح دعوى مدنية للأسباب التالية:</p>

        <div class="legal-body">
            ${getVal('petitionBody').split('\n').map(line => `<p>${line}</p>`).join('')}
        </div>

        <div class="legal-requests" style="margin-top:20px;">
            <strong>بناءً عليه نلتمس الحكم للمدعي بـ:</strong>
            <div style="white-space: pre-wrap; margin-top:10px;">${getVal('petitionRequests')}</div>
        </div>

        <div class="legal-closing">
            <p>ولكم وافر الشكر والتقدير،،</p>
        </div>

        <div class="legal-signatures">
            <div class="signature-block">
                <p><strong>مقدم العريضة</strong></p>
                <p>${getVal('lawyerName')}</p>
                <p>التوقيع: ....................</p>
            </div>
        </div>

        <div class="legal-footer">
            <div style="display:flex; justify-content: space-between;">
                <div>
                    <strong>المستندات:</strong>
                    <div style="font-size: 11pt;">${getVal('attachedDocs')}</div>
                </div>
                <div>
                    <strong>الشهود:</strong>
                    <div style="font-size: 11pt;">${getVal('witnessesNames')}</div>
                </div>
            </div>
        </div>
    `;
}
