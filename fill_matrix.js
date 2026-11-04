const { execSync } = require("child_process");

// 1. Otomatis mendeteksi nama repo aktif dari git remote
let REPO = "";
try {
  const remoteUrl = execSync("git config --get remote.origin.url", { encoding: "utf8" }).trim();
  const match = remoteUrl.match(/github\.com[:/](.+\/.+?)(\.git)?$/);
  if (match) REPO = match[1];
} catch (e) {
  REPO = "Rinen-7701/Rinen-7701"; // Fallback ke repo profil
}

console.log(`📌 Target Repository: ${REPO}\n`);

const TOTAL = 3;

for (let i = 1; i <= TOTAL; i++) {
  console.log(`\n=================== [ Iterasi ${i}/${TOTAL} ] ===================`);
  const time = Date.now();
  const branch = `matrix-fix-${time}`;

  // A. Buat Issue
  console.log("--> Making Issue...");
  try {
    execSync(`gh issue create --repo ${REPO} --title "Matrix Issue #${time}" --body "Automated issue tracking."`, { stdio: "inherit" });
  } catch (e) {
    console.log("❌ Gagal buat Issue. Pastikan gh CLI sudah terhubung.");
  }

  // B. Buat Branch & Commit
  console.log("--> Pushing new branch...");
  try {
    execSync(`git checkout -b ${branch}`);
    execSync(`echo "log ${time}" >> matrix_log.txt`);
    execSync(`git add matrix_log.txt`);
    execSync(`git commit -m "feat: matrix log #${time}"`);
    execSync(`git push -u origin ${branch}`);
  } catch (e) {
    console.log("❌ Gagal push branch.");
  }

  // C. Buat Pull Request
  console.log("--> Making Pull Request...");
  try {
    execSync(`gh pr create --repo ${REPO} --title "Feat: Matrix PR #${time}" --body "Automated PR" --head ${branch} --base main`, { stdio: "inherit" });
  } catch (e) {
    console.log("❌ Gagal buat PR.");
  }

  // Kembali ke main
  try { execSync(`git checkout main`); } catch (e) {}
}

console.log("\n==================================================");
console.log("✅ Selesai! Tunggu 2-5 menit lalu tekan Ctrl + F5 di profil GitHub.");