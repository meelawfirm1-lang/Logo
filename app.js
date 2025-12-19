// وظيفة لتحديث مسميات الحقول بناءً على نوع الدعوى
function updateForm() {
    const type = document.getElementById('petitionType').value;
    const courtLabel = document.getElementById('courtLabel');
    const party1Label = document.getElementById('party1Label');
    const party2Label = document.getElementById('party2Label');

    if (type.startsWith('crim')) {
        courtLabel.innerText = "لدى نيابة / قسم شرطة";
        party1Label.innerText = "اسم الشاكي";
        party2Label.innerText = "اسم المشكو ضده";
    } else {
        courtLabel.innerText = "اسم المحكمة";
        party1Label.innerText = "المدعي";
        party2Label.innerText = "المدعى عليه";
    }
}

// وظيفة جلب القيمة أو وضع نقاط إذا كانت فارغة
function getVal(id) {
    const val = document.getElementById(id).value.trim();
    return val !== "" ? val : "................................";
}

// وظيفة تنسيق الأسطر
function formatBody(text) {
    if (!text || text.includes("....")) return text;
    return text.split('\n').map(line => `<div>${line}</div>`).join('');
}

function generatePetition() {
    const type = document.getElementById('petitionType').value;
    const petitionContent = document.getElementById('petitionContent');

    if (!type) {
        alert("من فضلك اختر نوع العريضة أولاً");
        return;
    }

    // تجهيز البيانات الأساسية
    const court = getVal('courtName');
    const p1 = getVal('party1');
    const p2 = getVal('party2');
    const facts = formatBody(document.getElementById('facts').value);
    const requests = formatBody(document.getElementById('requests').value);
    const evidence = getVal('evidence');

    // تحديد المسميات القانونية بناءً على التصنيف
    const isCriminal = type.startsWith('crim');
    const headerTitle = isCriminal ? "لدى نيابة " + court : "إلى محكمة " + court;
    const p1Title = isCriminal ? "الشاكي" : "المدعي";
    const p2Title = isCriminal ? "المشكو ضده" : "المدعى عليه";
    const bodyTitle = isCriminal ? "الموضوع: بلاغ جنائي" : "الموضوع: دعوى مدنية";
    const salute = isCriminal ? "السيد/ وكيل نيابة " + court : "السيد/ قاضي محكمة " + court;

    // بناء هيكل العريضة داخل الورقة
    let html = `
        <div class="petition-header text-center">
            <h4 class="fw-bold text-decoration-underline">${headerTitle}</h4>
            <div class="mt-3 d-flex justify-content-between">
                <span><strong>${p1Title}:</strong> ${p1}</span>
                <span class="fw-bold">ضد</span>
                <span><strong>${p2Title}:</strong> ${p2}</span>
            </div>
        </div>

        <div class="mt-4">
            <h5 class="fw-bold">${bodyTitle}</h5>
            <p class="mt-3"><strong>${salute} الموقر</strong></p>
            <p>بوفر الاحترام والتقدير، نلتمس تقديم الآتي:</p>
            
            <div class="facts-section mt-3">
                <h6 class="fw-bold"><u>أولاً: الوقائع</u></h6>
                <div class="ms-3">${facts || "تذكر هنا تفاصيل الواقعة..."}</div>
            </div>

            <div class="requests-section mt-4">
                <h6 class="fw-bold"><u>ثانياً: الطلبات</u></h6>
                <div class="ms-3">${requests || "تذكر هنا الطلبات القانونية..."}</div>
            </div>

            <div class="footer-section mt-5 pt-4 border-top">
                <div class="row text-sm">
                    <div class="col-6">
                        <p><strong>المرفقات/الشهود:</strong> ${evidence}</p>
                    </div>
                    <div class="col-6 text-start">
                        <p><strong>مقدم العريضة:</strong> ..........................</p>
                        <p><strong>التوقيع:</strong> ..........................</p>
                        <p><strong>التاريخ:</strong> ${new Date().toLocaleDateString('ar-EG')}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    petitionContent.innerHTML = html;
}
