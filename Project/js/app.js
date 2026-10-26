// ข้อมูลจำลอง: ภายหลังจะแทนด้วย GET /api/products จากฐานข้อมูล
var DB = [
  {
    id: 1,
    name: "MacBook Pro 14 M2 Pro",
    cat: "โน้ตบุ๊ก",
    ram: 16,
    gpu: "Integrated",
    cond: 98,
    price: 45900,
    spec: "SSD 512GB | Space Gray",
  },
  {
    id: 2,
    name: "Intel i7-13700KF RTX 4070",
    cat: "เดสก์ท็อป",
    ram: 32,
    gpu: "RTX",
    cond: 95,
    price: 38500,
    spec: "DDR5 | NVMe 1TB | ประกันร้าน 3 เดือน",
  },
  {
    id: 3,
    name: "Dell UltraSharp 34 Curved",
    cat: "จอมอนิเตอร์",
    ram: 0,
    gpu: "Integrated",
    cond: 90,
    price: 16900,
    spec: "WQHD | IPS | USB-C Hub",
  },
  {
    id: 4,
    name: "ASUS ROG Strix RTX 3080 10GB",
    cat: "การ์ดจอ",
    ram: 0,
    gpu: "RTX",
    cond: 92,
    price: 12900,
    spec: "ใช้งานน้อย ไม่เคยขุด | มีกล่องครบ",
  },
  {
    id: 5,
    name: "Lenovo ThinkPad T14",
    cat: "โน้ตบุ๊ก",
    ram: 8,
    gpu: "Integrated",
    cond: 82,
    price: 11500,
    spec: "Ryzen 5 PRO | SSD 256GB",
  },
  {
    id: 6,
    name: "HP Omen 15 GTX 1660 Ti",
    cat: "โน้ตบุ๊ก",
    ram: 16,
    gpu: "GTX",
    cond: 85,
    price: 19900,
    spec: "i7-9750H | SSD 512GB",
  },
  {
    id: 7,
    name: "Ryzen 5 5600 Radeon RX 6600",
    cat: "เดสก์ท็อป",
    ram: 16,
    gpu: "Radeon",
    cond: 88,
    price: 15900,
    spec: "B550 | NVMe 500GB | เคสกระจก",
  },
  {
    id: 8,
    name: "LG 27GL850 Gaming 144Hz",
    cat: "จอมอนิเตอร์",
    ram: 0,
    gpu: "Integrated",
    cond: 80,
    price: 6900,
    spec: "QHD | Nano IPS | G-Sync",
  },
  {
    id: 9,
    name: "MSI Katana RTX 4060",
    cat: "โน้ตบุ๊ก",
    ram: 32,
    gpu: "RTX",
    cond: 96,
    price: 32900,
    spec: "i7-13620H | SSD 1TB",
  },
  {
    id: 10,
    name: "Gigabyte GTX 1080 Ti 11GB",
    cat: "การ์ดจอ",
    ram: 0,
    gpu: "GTX",
    cond: 75,
    price: 7500,
    spec: "พัดลมเปลี่ยนใหม่ | ผ่านการทดสอบโหลด",
  },
];
var IMG = {
  1: "macbook-pro-14.jpg",
  2: "intel-i7-rtx4070.jpg",
  3: "dell-ultrasharp-34.jpg",
  4: "asus-rog-rtx3080.jpg",
  5: "lenovo-thinkpad-t14.jpg",
  6: "hp-omen-15.jpg",
  7: "ryzen5-rx6600.jpg",
  8: "lg-27gl850.jpg",
  9: "msi-katana-rtx4060.jpg",
};
DB.forEach(function (x) {
  if (IMG[x.id]) x.img = "images/" + IMG[x.id];
});
var $ = function (i) {
  return document.getElementById(i);
};
var cart = {};
function baht(n) {
  return "฿" + n.toLocaleString("th-TH");
}
// จำลอง fetch: หน่วงเวลาเล็กน้อยและกรองฝั่งเซิร์ฟเวอร์
function fetchProducts(p) {
  return new Promise(function (res) {
    setTimeout(
      function () {
        res(
          DB.filter(function (x) {
            return (
              (!p.q || x.name.toLowerCase().indexOf(p.q) > -1) &&
              (!p.cat || x.cat === p.cat) &&
              (!p.ram || x.ram >= p.ram) &&
              (!p.gpu || x.gpu === p.gpu) &&
              x.cond >= p.cond &&
              x.price <= p.price
            );
          }),
        );
      },
      120 + Math.random() * 120,
    );
  });
}
function params() {
  return {
    q: $("q").value.trim().toLowerCase(),
    cat: $("cat").value,
    ram: +$("ram").value,
    gpu: $("gpu").value,
    cond: +$("cond").value,
    price: +$("price").value,
  };
}
function render(list, ms) {
  $("count").textContent = "พบ " + list.length + " รายการ";
  $("timing").textContent = "ตอบสนอง " + (ms / 1000).toFixed(2) + " วินาที";
  $("grid").innerHTML = list.length
    ? list
        .map(function (x) {
          return (
            '<article class="card"><div class="thumb">' +
            (x.img ? '<img src="' + x.img + '" alt="' + x.name + '">' : x.cat) +
            '</div><div class="in"><span class="tag">สภาพ ' +
            x.cond +
            "%</span><h3>" +
            x.name +
            '</h3><div class="spec">' +
            (x.ram ? "RAM " + x.ram + "GB | " : "") +
            x.gpu +
            " | " +
            x.spec +
            '</div><div class="row"><span class="price">' +
            baht(x.price) +
            '</span><button class="btn" data-add="' +
            x.id +
            '">ใส่ตะกร้า</button></div></div></article>'
          );
        })
        .join("")
    : '<div class="empty">ไม่พบสินค้าตามเงื่อนไข ลองลดตัวกรองหรือเพิ่มราคาสูงสุด</div>';
}
function load() {
  var t = performance.now();
  $("grid").classList.add("loading");
  fetchProducts(params()).then(function (l) {
    render(l, performance.now() - t);
    $("grid").classList.remove("loading");
  });
}
["q", "cat", "ram", "gpu", "cond", "price"].forEach(function (id) {
  $(id).addEventListener("input", function () {
    $("condV").textContent = $("cond").value;
    $("priceV").textContent = (+$("price").value).toLocaleString("th-TH");
    load();
  });
});
function drawCart() {
  var ids = Object.keys(cart),
    sub = 0,
    n = 0;
  $("items").innerHTML = ids.length
    ? ids
        .map(function (id) {
          var x = DB.filter(function (d) {
              return d.id == id;
            })[0],
            q = cart[id];
          sub += x.price * q;
          n += q;
          return (
            '<div class="item"><span>' +
            x.name +
            "<br><small>จำนวน " +
            q +
            "</small></span><span>" +
            baht(x.price * q) +
            '<br><button class="btn ghost" data-rm="' +
            id +
            '" style="padding:2px 8px">ลบ</button></span></div>'
          );
        })
        .join("")
    : '<div class="empty">ยังไม่มีสินค้า เลือกสินค้าแล้วกด “ใส่ตะกร้า”</div>';
  var ship = sub && sub < 50000 ? 150 : 0;
  $("cnt").textContent = n;
  $("sub").textContent = baht(sub);
  $("ship").textContent = ship ? baht(ship) : "ฟรี";
  $("tot").textContent = baht(sub + ship);
}
document.addEventListener("click", function (e) {
  var a = e.target.getAttribute("data-add"),
    r = e.target.getAttribute("data-rm");
  if (a) {
    cart[a] = (cart[a] || 0) + 1;
    drawCart();
    $("cart").classList.add("open");
  }
  if (r) {
    delete cart[r];
    drawCart();
  }
});
$("openCart").onclick = function () {
  $("cart").classList.add("open");
};
$("closeCart").onclick = function () {
  $("cart").classList.remove("open");
};
$("checkout").onclick = function () {
  alert("ฟีเจอร์สั่งซื้อจะเชื่อมกับ POST /api/orders ในขั้นถัดไป");
};
function drawStats() {
  var cats = {},
    sum = 0;
  DB.forEach(function (x) {
    cats[x.cat] = 1;
    sum += x.cond;
  });
  $("statProducts").textContent = DB.length;
  $("statCats").textContent = Object.keys(cats).length;
  $("statCond").textContent =
    (DB.length ? Math.round(sum / DB.length) : 0) + "%";
}
drawStats();
var authMode = "login";
function sha(s) {
  return crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(s))
    .then(function (b) {
      return Array.from(new Uint8Array(b))
        .map(function (x) {
          return x.toString(16).padStart(2, "0");
        })
        .join("");
    });
}
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("users") || "{}");
  } catch (e) {
    return {};
  }
}
function authUI() {
  var me = localStorage.getItem("me");
  $("userName").hidden = !me;
  $("userName").textContent = me || "";
  $("logoutBtn").hidden = !me;
  $("loginBtn").hidden = !!me;
  $("signupBtn").hidden = !!me;
}
function openAuth(mode) {
  authMode = mode;
  var l = mode === "login";
  $("authTitle").textContent = l ? "เข้าสู่ระบบ" : "สมัครสมาชิก";
  $("authGo").textContent = l ? "เข้าสู่ระบบ" : "สมัครสมาชิก";
  $("authSwap").textContent = l
    ? "ยังไม่มีบัญชี? สมัครสมาชิก"
    : "มีบัญชีแล้ว? เข้าสู่ระบบ";
  $("authErr").textContent = "";
  if (!$("authDialog").open) $("authDialog").showModal();
}
$("loginBtn").onclick = function () {
  openAuth("login");
};
$("signupBtn").onclick = function () {
  openAuth("register");
};
$("authSwap").onclick = function () {
  openAuth(authMode === "login" ? "register" : "login");
};
$("authClose").onclick = function () {
  $("authDialog").close();
};
$("logoutBtn").onclick = function () {
  localStorage.removeItem("me");
  authUI();
};
$("authGo").onclick = function () {
  var email = $("authEmail").value.trim().toLowerCase(),
    pass = $("authPass").value;
  if (!/^\S+@\S+\.\S+$/.test(email) || pass.length < 6) {
    $("authErr").textContent = "อีเมลไม่ถูกต้อง หรือรหัสผ่านสั้นกว่า 6 ตัว";
    return;
  }
  sha(pass).then(function (h) {
    var users = getUsers();
    if (authMode === "register") {
      if (users[email]) {
        $("authErr").textContent = "อีเมลนี้ถูกใช้แล้ว";
        return;
      }
      users[email] = h;
      localStorage.setItem("users", JSON.stringify(users));
    } else if (users[email] !== h) {
      $("authErr").textContent = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
      return;
    }
    localStorage.setItem("me", email);
    $("authPass").value = "";
    $("authDialog").close();
    authUI();
  });
};
authUI();
drawCart();
load();
