// ตัวแปรเก็บข้อมูลหลัก (ใส่ข้อมูลเริ่มต้นตัวอย่างไว้ให้ 2 รายการ)
let transactions = [
    { id: 1, text: "กินข้าวกลางวัน", amount: -60, type: "รายจ่าย", category: "อาหาร" },
    { id: 2, text: "เงินเดือน", amount: 15000, type: "รายรับ", category: "เงินเดือน" }
];

let currentId = 3; // รันลำดับ ID ต่อจากข้อมูลเริ่มต้น

const list = document.getElementById('list');
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');

// ฟังก์ชันเพิ่มรายการ
function addTransaction(e) {
    e.preventDefault();

    const textInput = document.getElementById('text').value;
    const amountInput = parseFloat(document.getElementById('amount').value);
    const categoryInput = document.getElementById('category').value;
    const typeValue = amountInput >= 0 ? "รายรับ" : "รายจ่าย";

    const transaction = {
        id: currentId++,
        text: textInput,
        amount: amountInput,
        type: typeValue,
        category: categoryInput
    };

    transactions.push(transaction); // เพิ่มเข้า Array
    
    // อัปเดต UI และล้างค่าฟอร์ม
    updateDOM(transactions);
    updateValues();
    
    document.getElementById('text').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';
}

// โจทย์ที่ 3: อัปเดต DOM เพื่อแสดงผลแท็ก <li>
function updateDOM(dataArray) {
    list.innerHTML = ''; // เคลียร์ของเก่าออกก่อน

    dataArray.forEach(transaction => {
        const sign = transaction.amount < 0 ? '-' : '+';
        const item = document.createElement('li');
        
        // กำหนดคลาส income / expense เพื่อแสดงสีตัวอักษรตาม CSS
        item.classList.add(transaction.amount < 0 ? 'expense' : 'income');

        // แสดงผล: ID, หมวดหมู่, ชื่อรายการ, ประเภท, และ จำนวนเงิน (โจทย์ที่ 1 และ 3)
        item.innerHTML = `
            <span>
                <strong>#${transaction.id}</strong> | 
                [${transaction.category}] ${transaction.text} 
                <small>(${transaction.type})</small>
            </span>
            <span>${sign}฿${Math.abs(transaction.amount).toFixed(2)}</span>
        `;

        list.appendChild(item);
    });
}

// โจทย์ที่ 4: สรุปรายงานการเงิน (คำนวณยอด)
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);

    balance.innerText = `฿${total}`;
    money_plus.innerText = `+฿${income}`;
    money_minus.innerText = `-฿${expense}`;
}

// โจทย์ที่ 2: ระบบ Filter ค้นหาแบบ Real-time
function filterTransactions(keyword) {
    // กรอง Array ที่มีชื่อรายการตรงกับที่พิมพ์
    const filteredData = transactions.filter(transaction => 
        transaction.text.toLowerCase().includes(keyword.toLowerCase())
    );
    
    // อัปเดตหน้าจอโดยใช้ข้อมูลที่กรองแล้ว
    updateDOM(filteredData);
}

// โจทย์ที่ 5: ปุ่มล้างข้อมูลทั้งหมด
function clearAllData() {
    if(transactions.length === 0) return;
    
    const isConfirmed = confirm("คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลประวัติทั้งหมด? (ไม่สามารถกู้คืนได้)");
    
    if (isConfirmed) {
        transactions = []; // ล้างข้อมูลใน Array
        currentId = 1;     // รีเซ็ต ID
        
        document.getElementById('search').value = ''; // เคลียร์ช่องค้นหา
        
        updateDOM(transactions); // อัปเดตตารางให้ว่าง
        updateValues();          // อัปเดตยอดเงินเป็น 0
    }
}

// เรียกใช้ครั้งแรกเพื่อแสดงผลข้อมูลเริ่มต้น
updateDOM(transactions);
updateValues();