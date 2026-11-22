/** All editable content lives here — change text without touching components. */
const A = n => `assets/img/Activity/activity-${n}.jpg`;
const C = (n, ext = "jpg") => `assets/img/Certificate/Certificate-${n}.${ext}`;

/** ภาพย่อ (โหลดเร็ว) อยู่ใน assets/img/thumbs/ — ภาพเต็มใช้ตอนกดขยาย */
const thumb = p => p.replace("assets/img/", "assets/img/thumbs/").replace(/\.png$/, ".jpg");

/** ซ่อนหัวข้อที่ไม่ต้องการ (ข้อมูลยังอยู่ ลบชื่อออกเมื่ออยากให้กลับมา)
 *  ชื่อที่ใช้ได้: "about" "projects" "works" "education" "certificates" "contact"
 *  เช่น hiddenSections = ["certificates", "education"] */
export const hiddenSections = [];

export const githubConfig = {
  username: "Peeranat-Non",
  // เลือกเฉพาะโปรเจกต์ที่จะโชว์ (เรียงตามลำดับที่ใส่) เช่น ["LegoShopDB-POS", "Portfolio.github.io"]
  // ปล่อยว่าง [] = แสดงทุก repo สาธารณะ
  include: [],
  featured: [],   // ชื่อ repo ที่อยากให้ขึ้นก่อน เช่น ["my-best-project"]
  exclude: [],
  // กำหนดรูปเอง (ไม่บังคับ): { "ชื่อ repo": "assets/img/projects/xxx.jpg" }
  // ถ้าไม่ตั้ง เว็บจะหาไฟล์ assets/img/projects/<ชื่อ repo>.jpg|png|webp ให้อัตโนมัติ
  images: {},
  // แก้ข้อมูลโปรเจกต์เอง (ไม่บังคับ) — ใช้ชื่อ repo เป็นคีย์ ใส่เฉพาะช่องที่อยากแก้
  // language: ข้อความหรือรายการ ["C#", "SQL"] | tools: เครื่องมือ | description | displayName | image | homepage
  overrides: {
    "LegoShopDB-POS": {
      language: "C#",
      tools: ["Windows Forms", ".NET", "Entity Framework Core"],
    },
  },    // ชื่อ repo ที่ไม่อยากแสดง
};

export const nav = [
  { id: "about", label: "About" }, { id: "projects", label: "Projects" },
  { id: "works", label: "Activities" }, { id: "education", label: "Education" },
  { id: "certificates", label: "Certs" }, { id: "contact", label: "Contact" },
];

export const profile = {
  tagline: "Web Developer & Graphic Designer — ออกแบบและสร้างสรรค์งานด้วยโครงสร้างที่เป็นระเบียบ และรายละเอียดที่ใส่ใจ",
  about: "สวัสดีครับ พีรณัฐ อนันต์ธีรทัต (นนท์) ผมหลงใหลการเขียนโปรแกรมและเทคโนโลยีใหม่ ๆ พัฒนาทักษะทั้ง Hard Skills และ Soft Skills อยู่เสมอ เป้าหมายคือเข้าศึกษาคณะเทคโนโลยีสารสนเทศ สาขาเทคโนโลยีสารสนเทศ (SIT) มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี เว็บไซต์นี้รวบรวมผลงานเพื่อประกอบการสมัครรอบ Active Recruitment",
  facts: [
    ["ชื่อ-นามสกุล", "นายพีรณัฐ อนันต์ธีรทัต"], ["ชื่อเล่น", "นนท์"],
    ["วันเกิด", "25 กันยายน 2547 (19 ปี)"], ["สัญชาติ / ศาสนา", "ไทย / พุทธ"],
    ["การศึกษา", "ปวช. เทคโนโลยีสารสนเทศ · GPA 3.90"],
    ["ฝึกงาน", "Web Developer · มิ.ย. — ก.ย. 2565"],
    ["ความสามารถพิเศษ", "Graphic Design, Coding"],
  ],
  skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "MySQL", "Python", "C#", "C++", "Flutter", "WordPress", "Figma"],
  stats: [[3.9, "GPA ปวช.", 2], [12, "ใบประกาศนียบัตร"], [9, "กิจกรรมและเวิร์กช็อป"], [1, "รางวัลชนะเลิศ"]],
  email: "peeranat.anu25@gmail.com",
  phone: "094-406-2047",
  address: "367/3 ซอยโรงหนังกรุงสยาม ถนนพหลโยธิน แขวงอนุสาวรีย์ เขตบางเขน กรุงเทพมหานคร 10220",
  socials: [
    { label: "GitHub", url: "https://github.com/Peeranat-Non" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/peeranat-anunteratat/" },
    { label: "Instagram", url: "https://www.instagram.com/non_peeranat/" },
    { label: "Facebook", url: "https://www.facebook.com/profile.php?id=100014888114137" },
    { label: "X / Twitter", url: "https://twitter.com/Peeranat_anu25" },
  ],
};

export const activities = [
  { title: "Infographic Design", text: "รางวัลชนะเลิศอันดับ 1 ระดับ ม.ปลายหรือเทียบเท่า หัวข้อ บรรเทาทุกข์บำรุงสุขแก่ราษฎร์", img: A(10) },
  { title: "ToBeIT'67", text: "ค่ายปูพื้นฐานความรู้เบื้องต้นด้านเทคโนโลยีสารสนเทศ", img: A(9) },
  { title: "Huawei Connect 2022", text: "ศึกษาดูงาน Unleash Digital ณ ศูนย์การประชุมแห่งชาติสิริกิติ์", img: A(8) },
  { title: "HACKaTHAILAND", text: "โครงการส่งเสริมทักษะดิจิทัล ณ True Digital Park", img: A(7) },
  { title: "Database System", text: "เรียนรู้กระบวนการ Normalization เพื่อปรับปรุงโครงสร้างข้อมูล", img: A(2) },
  { title: "Interlink Campus Tour 2020", text: "อบรมการต่อสายสัญญาณเครือข่ายเบื้องต้น", img: A(5) },
  { title: "Smart Tech", text: "Workshop เสริมทักษะด้านเทคโนโลยีสารสนเทศ", img: A(3) },
  { title: "วาดภาพการ์ตูนดิจิทัลในงานเกม", text: "Workshop เทคนิคการวาดภาพการ์ตูนให้สอดคล้องกับงานเกม", img: A(4) },
  { title: "ประกวดวาดภาพพระอภัยมณี", text: "รางวัลชมเชย กลุ่มวาดภาพด้วยโปรแกรมคอมพิวเตอร์", img: A(6) },
];

export const education = [
  { years: "2563 — 2565", school: "วิทยาลัยเทคโนโลยีสยามบริหารธุรกิจ สะพานใหม่", text: "ประกาศนียบัตรวิชาชีพ สาขาเทคโนโลยีสารสนเทศ · GPA 3.90 · ฝึกงานตำแหน่ง Web Developer (มิ.ย. — ก.ย. 2565)" },
  { years: "2560 — 2562", school: "โรงเรียนไทยนิยมสงเคราะห์ (มัธยมศึกษา)", text: "มัธยมศึกษาปีที่ 1 — 3 · GPA 3.56" },
  { years: "2554 — 2559", school: "โรงเรียนไทยนิยมสงเคราะห์ (ประถมศึกษา)", text: "ประถมศึกษาปีที่ 1 — 6 · GPA 3.12" },
];

export const certificates = [
  { title: "Google Technical Support Fundamentals", img: C(1) },
  { title: "Programming Foundations with JavaScript, HTML and CSS", img: C(2) },
  { title: "ความรู้เบื้องต้นด้าน IT — สจล.", img: C(3, "png") },
  { title: "Kibo Robot Programming Challenge 2022", img: C(4) },
  { title: "UX Design สำหรับแอปพลิเคชันบนมือถือ", img: C(5) },
  { title: "Mobile Application Design (Figma) — HACKaTHAILAND", img: C(6) },
  { title: "Fundamental Data Analytics — HACKaTHAILAND", img: C(7) },
  { title: "Back-End Developing — HACKaTHAILAND", img: C(8) },
  { title: "DevLab 3 — Borntodev", img: C(9) },
  { title: "DevLab 3 — Borntodev", img: C(10) },
  { title: "AI Foundations: Imagine Cup Junior", img: C(13) },
  { title: "ชนะเลิศ Infographic Design", img: C(11) },
];

/** image: ใส่ path รูป เช่น "assets/img/projects/portfolio.jpg" (ถ้าว่างจะแสดงตัวอักษรแทน)
 *  tools: เครื่องมือ/เทคโนโลยีที่ใช้ */
/** Snapshot shown when the live GitHub API is unreachable. Add your repos here. */
export const fallbackProjects = [
  { name: "Portfolio.github.io", description: "เว็บไซต์ Portfolio ส่วนตัว สร้างด้วย HTML, CSS, JavaScript และเผยแพร่ผ่าน GitHub Pages", language: "HTML", tools: ["CSS", "JavaScript", "Bootstrap", "GitHub Pages"], image: "", url: "https://github.com/Peeranat-Non/Portfolio.github.io", homepage: "https://peeranat-non.github.io/Portfolio.github.io/", updated: "2026-11-01" },
];

activities.forEach(a => { a.thumb = thumb(a.img); });
certificates.forEach(c => { c.thumb = thumb(c.img); });
